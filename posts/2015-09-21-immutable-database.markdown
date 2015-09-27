---
author: 
date: 2015-09-21 14:41:28.957614
layout: post
slug: immutable-database
title: Immutable Database
id: 446
---

Functional programming teaches the value of immutable data and data structures.  Modern languages like Clojure and Scala offer first-class support for objects and collections that cannot be modified.  This offers numerous benefits, including ease of reasoning about code and thread safety.

However, for the most part, the belief in an use of immutable data has not permeated the database space.  There are still many CRUD apps that, while avoiding mutability at all costs in their language runtime, will still modify in-place rows in their database.  The user changes their email address and the "email" column in the users database is updated for that user's row.  A user updates their address and the old address is deleted and a new address row is created.  And when it comes down to it, the information stored in a database is often the lifeblood of a company.  Therefore, having that data be immutable may be more crucial than using immutable in-memory data structures.

There indeed is a growing trend toward immutable databases.  A good example is Diatomic, a database designed by Rich Hickey (the author of Clojure).  It is designed from the ground up as an immutable data store based on "facts" that each carry a timestamp, and this allows one to fully know the state of the database at any previous time.  As another example, HDFS is an immutable store of records (though, one shouldn't need to move to Hadoop in order to gain the benefits of immutability).  Even the Ruby community, well known for its mutability and "monkey-patching", is discussing how to store and leverage immutable data: http://solnic.eu/2015/09/18/ditch-your-orm.html

However, it's possible to gain all the benefits of an immutable database using something as common as SQL.  There may be a number of reasons why one wouldn't want to dive into Datomic (for example, one may have a team that knows SQL better or one may have other business reasons that require one to use a standard relational database).  But a developer, if they are sufficiently disciplined, can reap all the benefits of immutable data by using nothing more than Postgres.

I've been thinking about good ways to accomplish this.  I think if one follows a few rules and policies, this can be done without too much difficulty.  And the benifits that one would gain: never having to delete data and being able to fully audit the history of your base, are well worth the effort.

Here is one set of rules and patterns I've come up with that will enable one to build an immutable database in SQL:


- All tables must have an ID and a timestamp and the timestamp represents the row creation time
- Rows are never updated.  Tables are only appended to.
- Logical objects (eg users) must be decomposed into a base table (to be discussed below) and a set of fact tables.
- Use views to reconstruct these decomposed tables back into their logical objects (if necessary)
- Never delete data.  If one wants to delete a row, create a corresponding table that records the fact that a row was "deleted", and leverage this when creating views
- Data is updated by creating a new field (this may contain either the fully updated data, but probably better to only contain the fields one wants to update to avoid concurrency issues)
- One should probably not store failed update attempts (by users) or invalid objects in the database.  One should not strive to capture ALL data entering the system in this primary database.  Information about bad data attempts or invalid objects can be captured in logs or in separate databases specifically designed for that purpose (of course, your logs should be persistent and immutable, so all the same concepts remain)


Let's take a simple example.  Imagine that one has a standard CRUD app that has a concept of users.  Following the above rules, we're realize that a "User" is not a single thing: it's a collection of inputs and data provided from external sources (the user enters X data on a form and later clicks Y button and then enters Z information via a http request, etc).  Recognizing this, we're going to be storing our user's data across multiple tables.  In the end, we'll create views that give us a current, consistent picture of the user.


First, let's create our "base" table for the user.  A base table contains all the data about a concept that can never change, and it serves as the central hub for the facts around that object.  A base table may be as simple as a single "id".  Here we're going to assume that a user's name can never change (as part of our business logic).

<script src="https://gist.github.com/ghl3/7e8147ae4dcf08f3d325.js?file=create_base_user.sql"></script>

Note that we automatically add a timestamp for when any row in this table is created.  (We use a single id_sequence for all ids in this database, but that's not strictly necessary).


What are the facts around a user?  Facts are data that are supplied externally and are attached to the user's base.  Let's assume that we'd like to model the following facts:
- User created an account with credentials
- User added (or updated) their personal data (name, etc)
- User was deleted

So, let's create the first table, which stores the credentials of the user at creation time.  It would be as simple as this:

<script src="https://gist.github.com/ghl3/7e8147ae4dcf08f3d325.js?file=create_user_credentials.sql"></script>

Note that we automatically create a timestamp and that we reference the core "user_id" from the user_base table.  We add a number of indices, many of which include time, which will allow us to quickly slice through the history of our database.

Similarly, we create a table to store the user's name and other metadata:

<script src="https://gist.github.com/ghl3/7e8147ae4dcf08f3d325.js?file=create_user_metadata.sql"></script>

Finally, we create a table to represent the fact that a user is deleted:

<script src="https://gist.github.com/ghl3/7e8147ae4dcf08f3d325.js?file=create_user_deletion.sql"></script>

This table simply contains an id of the user, a timestamp for when the deletion took place, and potentially a boolean (which can be set to false in the case that that a user decides to un-delete an account).  Note that, instead of actually deleting the user and cascading that to delete all information around the user, we simply mark that the user was deleted in our database and, as we'll later see, we leverage this when querying the user or creating views (I'll here note that there are many cases where one may actually be required to scrub the information about a user from a database, in which case you may need to actually delete rows on that user.  This is not meant to be a comment on user data privacy but instead to demonstrate a pattern of how data can be "deleted" without actually removing rows).

## Updating

This is all pretty simple so far: We've created a standard SQL schema.  The key here is how we handle updates and how we create the current state of the user (or the state at any past time).

Let's say that the user wanted to update their metadata, say by changing their first name.  As we described previously, we never mutate data when doing an update.  So, we need to come up with a strategy for managing this transition.  The one that we'll use here is for the user to create a new row and append it to the user_metadata table.  

This can be done simply by doing the following (assuming the user_id is 12345):

    INSERT INTO user_metadata VALUES (DEFAULT, DEFAULT, 12345, 'Jane', 'Doe') RETURNING id;

This will automatically append this row, creating a fresh timestamp.  However, one issue is that a user may only want to update one field (say, their firstname) but leave their lastname as it was before.  One can do such an update by creating a new row with the NEW firstname and the OLD lastname.  But this can run into concurrency problems: if the user is updating ONLY their firstname in one thread and ONLY their lastname in another thread concurrently, their final name may not be well-defined.  Instead, a pattern that I'll use here is that the user ONLY updates the one piece of data that they want to and leaves the rest NULL.  In an update, if a field is NULL, it means "keep the previous value as-is".  

So, in the previous example, the update would actually be:

    INSERT INTO user_metadata VALUES (DEFAULT, DEFAULT, 12345, 'Jane', NULL) RETURNING id;

With this pattern in mind, we can now finally create a view that represents the current state of a user (including any updates and deletions).  One implementation of this (that I'm not here claiming is the most optimal) is the following:

<script src="https://gist.github.com/ghl3/7e8147ae4dcf08f3d325.js?file=create_user_view.sql"></script>

There's a lot going on there.  First, we start with the user_base.  We then do LATERAL LEFT JOINS to get the rows of all the credential and metadata tables for that user (if they exist).  We are using a custom aggregate function to get the most recent non-null value of a row (where we order by time descending).  We calculate this for each field that we want to pull out and include in our user view.  This requires a bit of manual effort, as we have to write this for every field we want in our view and maintain this moving forward.  Perhaps there are ways to make this syntactically more simple.  Note that one benefit here is that one can explicitly choose which columns to include in the view, so one can hide non-public columns automatically.

Finally, note that, if the most recent row of the delete table has "is_deleted" set to true, the entire user doesn't appear in this view.  This is how we effectively delete a user.  One can create multiple views a user for whatever business logic one represents.  One can create an "initial user" view, a "current user" view, or a "user at start of year" view.  There is a lot of flexibility here.

## Concurrency

The concurrency model is much simpler since all data is immutable.  One has a few options here depending on specific constraints that one have, but having append-only rows with intelligent views downstream means that one can multiple threads or queries to update a fact table and leverage the view to enforce "last write wins".  The database's concurrency model will ensure that all updates appear in the table, and when you query the view, you simply get the the latest data for each fact table.  So, a lot of the concurrency headaches involved with mutating data in-place go away.  But the database's very nice concurrency primitives are still useful in this model, for example, if one wants to query two different views and ensure that the state of those views is consistent with each other.  One one can leverage transactions to create atomicity across updates.

This pattern also allows for implementing optimistic locking on fact tables if one wants a stricter concurrency model than "last write wins", and "SELECT FOR UPDATE" is always available if one wants to leverage pessimistic locking.  But, for many cases, these aren't necessary.

## ORM

One big advantage of this type of setup, and my primary motivation for thinking about it,is that it eliminates the need for an ORM.  Without having to mutate objects, one doesn't need data entities to come with a ".save()" method.  One simply needs to be able to do two things:
- Add new rows to fact tables
- Read from views

One can therefore create a data model for an in-memory representation of one's data, but those objects don't need to be "magic" and won't have to be polluted by an ORM.  One can instead leverage plain-old-objects simple-to-reason-about functions.  For example, in a Java-like language:

    public class User {
         public final String name;
         public final String firstname;
         public final String lastname;
         public final String email;
    }


    public static User getUser(Long id) {
         ...
    }

    public static Long createNewUser(name) {
	    return id;
    }

    public static User updateMetadata(Long id, String firstname, String lastname) {
	    validate(firstname, lastname);
	    DB.newRow(id, firstname, lastname);
	    return getUser(id);
    }

The above functions are pseudo-code.  They may internally be wrapped in database transactions.  But the main point is that what goes into them or comes out of them is pure and simple data.  Since that data doesn't have the entire global state of the database attached to it (as is the case for data entities attached to an ORM), they can be freely passed to pure functions without fear of side effects.

## Example Data

To test out this concept, I've created a gist that instantiates a database following these principals and fills it with fake data.  The gist can be found <a href=https://gist.github.com/ghl3/7e8147ae4dcf08f3d325>here</a>.  Specifically, one can see a script populate the database with fake data <a href="https://gist.github.com/ghl3/7e8147ae4dcf08f3d325#file-generate_data-py">here</a>.

Adding 100,000 rows, with occasional updates and deletes, we see similar performance in direct-user queries both by looking at the simple user_base table and by querying the view:


<pre>
immutable_database=> EXPLAIN ANALYZE SELECT * FROM user_base WHERE id=177526;
                                                        QUERY PLAN                                                         
---------------------------------------------------------------------------------------------------------------------------
 Index Scan using user_base_pkey on user_base  (cost=0.29..8.31 rows=1 width=12) (actual time=0.025..0.026 rows=1 loops=1)
   Index Cond: (id = 177526)
 Total runtime: 0.062 ms
(3 rows)
</pre>


<pre>
immutable_database=> EXPLAIN ANALYZE SELECT * FROM users WHERE id=177526;
                                                                                QUERY PLAN                                                                                 
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
 Nested Loop Left Join  (cost=20.56..36.67 rows=1 width=108) (actual time=0.210..0.212 rows=1 loops=1)
   ->  Nested Loop Left Join  (cost=10.07..26.15 rows=1 width=44) (actual time=0.094..0.096 rows=1 loops=1)
         ->  Nested Loop Left Join  (cost=0.58..16.63 rows=1 width=12) (actual time=0.029..0.030 rows=1 loops=1)
               Join Filter: (user_deletion.user_id = user_base.id)
               Filter: (user_deletion.id IS NULL)
               ->  Index Scan using user_base_pkey on user_base  (cost=0.29..8.31 rows=1 width=12) (actual time=0.018..0.018 rows=1 loops=1)
                     Index Cond: (id = 177526)
               ->  Index Scan using user_deletion_user_id_time_is_deleted_idx on user_deletion  (cost=0.29..8.30 rows=1 width=8) (actual time=0.005..0.005 rows=0 loops=1)
                     Index Cond: (user_id = 177526)
         ->  Aggregate  (cost=9.49..9.50 rows=1 width=27) (actual time=0.062..0.062 rows=1 loops=1)
               ->  Index Scan using user_credentials_user_id_idx on user_credentials  (cost=0.42..8.49 rows=4 width=27) (actual time=0.007..0.008 rows=1 loops=1)
                     Index Cond: (user_id = user_base.id)
   ->  Aggregate  (cost=10.49..10.50 rows=1 width=21) (actual time=0.114..0.114 rows=1 loops=1)
         ->  Index Scan using user_metadata_user_id_idx_idx on user_metadata  (cost=0.42..8.49 rows=4 width=21) (actual time=0.010..0.011 rows=4 loops=1)
               Index Cond: (user_id = user_base.id)
 Total runtime: 0.303 ms
(16 rows)
</pre>

So, there's clearly overhead in pulling al the additional data, looking for the most recent values, etc.  But at a runtime of < 1 ms, this pattern should be sufficiently performant for most apps without further optimizations.  (On the other hand, doing a COUNT(*) is much slower on the user table, but this isn't a common operation for production apps, and is more likely to be used in offline analytics where it can be specifically optimized).
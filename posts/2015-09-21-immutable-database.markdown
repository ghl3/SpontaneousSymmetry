---
author: 
date: 2015-09-21 14:41:28.957614
layout: post
slug: immutable-database
title: Immutable Database
id: 446
---

Functional programming teaches the value of immutable data and data structures.  Modern languages like Clojure and Scala offer first-class support for collections that cannot be modified.  This offers numerous benefits, including ease of reasoning about code and thread safety.

However, in my experience, the use of immutable data has not permeated the database space as strongly as the in-memory collections space.  There are still many CRUD apps that, while avoiding mutability at all costs in their language runtime, will still modify in-place rows in their database.  The user changes their email address and the "email" column in the users database is updated for that user's row.  A user updates their address and the old address is deleted and a new address row is created.

There is a growing trend to spread the benefits of immutability to databases.  HDFS, among other things, is an immutable store of records (though, one shouldn't need to move to Hadoop in order to gain the benefits of immutability).  Datomic is a database designed by Rich Hickey (the author of Clojure) that is designed from the ground up as an immutable data store.  Even the Ruby community is discussing how to store and leverage immutable data: http://solnic.eu/2015/09/18/ditch-your-orm.html

However, it's possible to gain all the benefits of an immutable database using something as common as SQL.  There may be a number of reasons why one wouldn't want to dive into Datomic (for example, one may have a team that knows SQL better or one may have other business reasons that require one to use a standard relational database).  But a developer, if they are sufficiently disciplined, can reap all the benifits of immutable data even in SQL.

I've been thinking about the best way to accomplish this.  I think if one follows a few rules and policies, this can be done without too much difficulty.  Here are the set of rules that one can follow to create and query an immutable SQL database:


- All tables must have an ID and a timestamp and the timestamp represents the row creation time
- Rows are never updated.  Tables are only appended to.
- Logical objects (eg users) must be decomposed into a base table and a set of fact tables.
- Use views to reconstruct the data into objects (if necessary)
- Never delete data.  If one wants to delete a row, create a delete table
- Data is updated by creating a new field (this may contain either the fully updated data, but probably better to only contain the fields one wants to update to avoid concurrency issues)
- One should only include valid objects in the database (based on whatever combination of application-level or DB level validation one wants).  Invalid object attempts may be logged or stored in separate columns, or perhaps separate databases (where joining the data isn't necessary)


Let's take a simple example.  Imagine that one has a standard CRUD app that has a concept of users.  Following the above rules, we're realize that a "User" is not a single thing: it's a collection of input and data provided from external sources.  Recognizing this, we're going to be storing our user's data across multiple tables.  In the end, we'll create views that give us a current, consistent picture of the user.

First, let's create our "base" table for the user.  A base table contains all the data about a concept that can never change, and it serves as the central hub for the facts around that object.  A base table may be as simple as a single "id".  Here we're going to assume that a user's name can never change (as part of our business logic).

What are the facts around a user?  Facts are data that are supplied externally and are attached to the user's base.  Let's assume that we'd like to model the following facts:
- User was created
- User added (or updated) their credentials
- User added (or updated) their metadata
- User was deleted

Note that these are all things that the user DOES.  We should seek to store these things in as raw a form as possible, which is what our above rules attempt to do (it's probably okay to avoid storing EVERY request from a user, at least in the type of database that we're talking about.  Things like that are better stored in logs.  Of course, your logs should be persistent and immutable, so all the same concepts remain).

Based on that model, we're going to create the following logical tables:

base_user
id | time | name

user_credentials
id | time | user_id | password_hash

user_metadata
id | time | user_id | email | firstname | lastname

user_deletion
id | time | user_id | deleted?


So, we've tried to have every action map to its own table.  The base_user table is immutable and only one row should ever exist for a logical user.  Note that every fact table (in addition to having its own id) has a foreign key back to the base_user table.  A logical user may be created before any of these other items are entered (perhaps one has a multi-page sign-up process) or one may create rows in all of these tables atomically (say, in a transaction).

When a user wants to update their metadata, they simply create a new row in the user_metadata table.  There are a few choices around this.  One may require that the new row contain all the updated metadata for that user (including the data that changed and the values of data that remain the same, should the user only want to update one piece of their data).  But I think it's better if a new metadata row ONLY contain the data that is updated (and have all other values be NULL).  That maps better to what the user is actually doing and makes it easier to go back and see what data the user updated at exactly what time.

Similarly, deleting a user simply means adding a row for that user in the user_deletion table.  One may allow a user to become un-deleted by leveraging a boolean "deleted?" column in there (if the most recent row is "false" for a given user, that user isn't deleted.

The question then is: how can one work with these tables in a reasonable way.  Having the raw data laid out like this puts a lot of onus on the app or analyst to determine the state of a user at any given time.  To make this easier, one should create views that summarize the current state of a user.

view user
id | creation_time | name | email | firstname | lastname

Using a view pattern allows for a number of nice features:
- One can create multiple views a user for whatever business logic one represents.  One can create an "initial user" view, a "current user" view, or a "user at start of year" view.  There is a lot of flexibility here.
- One can hide any fields that one doesn't want to be queried.  Here, we're opting to not show the password_hash field for this user, and we're also hiding the times and ids of the various fact tables (though, we're free to show those if we so desire).  This is a good way to create simple tables that an app developer or an analyst can understand.
- The view automatically looks for the latest non-null value in each column of each fact table (more on implementing this later).
- A row for the user in the view will simply not exist if the user is in a deleted state.


The concurrency model is much simpler since all data is immutable.  One has a few options here, but one is free to simply allow multiple threads or queries to update a fact table and leverage the view to enforce "last write wins" on the table.  The database's concurrency model will ensure that all updates appear in the table, and when you query the view, you simply get the the latest data for each fact table.  So, a lot of the concurrency headaches involved with mutating data in-place go away.  But one can still leverage the database's beautiful concurrency primitives.  For example, if one wants to query two different views and ensure that the state of those views are consistent with each other, the database can enforce that (for example, by making the queries in a single transaction and leveraging the database's consistency and isolation guarantees).

One can also pretty easily implement optimistic locking on fact tables if one wants a stricter concurrency model than "last write wins", and "select for update" is always available if so desired.  But, for many cases, these aren't necessary

One big advantage of this type of setup is that it eliminates the need for an ORM.  Without having to mutate objects, one doesn't need data entities to come with a ".save()" method.  One simply needs to be able to do two things:
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

The above functions are pseudo-code.  They may internally be wrapped in database transactions.  But the main point is that the data going into them or coming out of them is simple data.  Since that data doesn't have the entire global state of the database attached to it (as is the case for data entities attached to an ORM), they can be freely passed to pure functions without fear of side effects.
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

The question then is: how can one work with these tables in a reasonable way.  Having the raw data laid out like this puts a lot of onus on the app or analyst to determine the state of a user at any given time.  To make this easier, one should create views that 

When a user wants to update their m

This allows for a few things


What are the pieces of data, or facts, about a user that we're here going to recognize?  First of all, a user has a core nebulous that we're here going to call a "base" that forms the central hub of all facts about the user.

Example:

User
What are the stages of a user?
- User creation
- User update
- Additional User Metadata
- Delete user

Tables

user_signup
id | time | name | email | password_hash
12 | XX-YY-2015 | user@site.com | #####

user_metadata
id | time | user_id | firstname | lastname
15 | 01-01-ZZZZ | 12 | John | Doe
16  | 01-02-ZZZZ | 12 | Jane | NULL

User:
View of user_signup + latest non-null column in user_metadata

Optionally, one can create a view of user_metadata_latest

Notes
- Concurrency: The concurrency model is much simpler since all data is immutable.  The database will ensure that all views are consistent.  One can leverage transactions to get consistent values of a view over a longer duration.  If, for example, one needs two views to be consistent, one should still leverage a transaction to pull them with separate queries.  But, one can also simply pull an updated view on-demand instead of holding a transaction open, or just pull data once and be done with it.
- ORM: This eliminates much of the need of an ORM.  One can leverage queriers that return data.  This data can map to in-memory objects in your data model, but the need for those objects to be "magic" and to have "save" functions is eliminated.  Rows are not saved.  One has functions which generate new rows from objects, and one has functions that return objects from existing rows.

Example:

public class User {
     public final String name;
     public final String email;
}


public static User getUser(Long id) {
     ...
}

public static Boolean saveUserSignUp(String name, String email) {
     if (! valid) { return false;}
     ... save ...
     if (success) { return true;}
     else { return false; }
}
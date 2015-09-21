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

There is a growing trend to spread the benefits of immutability to databases.  HDFS, among other things, is an immutable store of records (though, one shouldn't need to move to Hadoop in order to gain the benefits of immutability).  Datomic is a database designed by Rich Hickey (the author of Clojure) that is designed from the ground up as an immutable data store.  

However, it's possible to gain all the benefits of an immutable database using something as common as SQL.  There may be a number of reasons why one wouldn't want to dive into Datomic (for example, one may have a team that knows SQL better or one may have other business reasons that require one to use a standard relational database).  But a developer, if they are sufficiently disciplined, can reap all the benifits of immutable data even in SQL.

I've been thinking about the best way to accomplish this.  I think if one follows a few rules and policies, this can be done without too much difficulty.  Here are the set of rules that one can follow to create and query an immutable SQL database:


- All tables must have an ID and a timestamp and the timestamp represents the row creation time
- Rows are never updated.  Tables are only appended to.
- Decompose "objects" into data and store the raw data in the table
- Use views to reconstruct the data into objects (if necessary)
- Never delete data.  If one wants to delete a row, create a delete table
- Data is updated by creating a new field (this may contain either the fully updated data, but probably better to only contain the fields one wants to update to avoid concurrency issues)
- One should only include valid objects in the database (based on whatever combination of application-level or DB level validation one wants).  Invalid object attempts may be logged or stored in separate columns, or perhaps separate databases (where joining the data isn't necessary)

---
author: ghl3
comments: true
date: 2009-08-13 17:38:00+00:00
layout: post
slug: airplane-seats
title: Airplane Seats
wordpress_id: 96
categories:
- Math
- Puzzles
---

I just learned this one the other day.  It's pretty cute.

There's an airplane with 100 seats and 100 passengers each with a ticket and an assigned seat.  The airplane is boarded one person at a time.  The first person to board the plane, however, has lost his seating assignment.  So, when he gets on the plane, he just picks a seat at random to sit in.  The second person comes onto the plane.  If his assigned seat is unoccupied, he sits in it.  If the first person has taken his seat, then the second person also randomly picks a seat.  The third person either sits in his assigned seat or, if it's occupied by either the first or second people, randomly picks a seat.  This continues all the way down.

What is the probability that the last person will end up in his assigned seat?


![](https://www3.timeoutny.com/newyork/upstaged/wp-content/uploads/2009/07/pigeon.jpg)
Oh, and in case you didn't figure out the shaking of hands at a party question:

The answer is an application of the so called "Pigeon Hole Principle."  Imagine that I have 100 mailboxes and 101 letters.  No matter how I decide to put the letters in the boxes, one box will have at least two letters.  So simple, but it comes up a lot in proofs, so it gets its own name.

In terms of shaking hands, imagine that there are N people at a party.  Any person can shake at least 0 hands and at most N-1 hands (he can't shake his own hand).  If he shakes N-1 hands, it means he has shaken everybody at the party's hand.  So, if we want all N people to have shaken a different number of hands, we could have the situation where person A shook 0 hands, person B shook 1 hand, person C shook 2 hands.... etc all the way up to the last person who shook N-1 hands.  This is the only way for everybody to have shaken a different number of hands.  But it's clearly impossible, because if the last person shook N-1 hands, then he shook the hand of the person who supposedly shook 0 hands, so there's a contradiction.  So, the N people can only take values between 0 and N-2, or 1 and N-1.  Those ranges contain N-1 entries and there are N people.  So, if we are trying to put these N people into N-1 mailboxes, inevitably two people get put into the same mailbox.  Pigeon Hole.

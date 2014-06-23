---
author: ghl3
comments: true
date: 2009-08-17 21:20:19+00:00
layout: post
slug: airplane-solution
title: Airplane Solution
wordpress_id: 101
categories:
- Math
- Puzzles
---

So, did anyone figure out the airplane seating problem?

Little hint: consider the symmetries of the problem.

Really big hint:  The answer is the same for any number of people.  100 is just arbitrary.


Okay, here's my version of the solution:

There are only two seats on the airplane that interest us.  There is the seat of the that the first person (person A) was assigned to sit in (call it seat A) and the seat that the last person (person Z) was assigned to sit in (call it seat Z).  They key is to the problem is the fact that, in the eyes of every person but the last, seat A and seat Z are seen as identical; they are symmetric.  What does this mean?

When person A enters the plane, he has lost his boarding pass and doesn't know what his real seat is.  So, to him, every seat is identical.  He's just as likely to sit in seat A as seat Z, and or any other seat for that matter.  So, for him, there is a symmetry between A and Z.  Consider the next person on the plane, person B.  The only seat that is "different" for him is seat B.  If B is open, he will sit in it.  Otherwise, he will pick a seat at random.  To him, there is no intrinsic difference between seat A and seat Z.  The same is true for everyone else except for the last person, person Z.  So, because seats A and Z are **symmetric**, then with the exception of person Z, **anybody is just as likely to sit in seat A as they are seat Z**.  This doesn't of course mean that they're the only possibilities, but it means that whatever the probability is for a person to sit in seat A, it must be the same to sit in seat Z.

The key is the fact that most of the people's choices are irrelevant.  If person A sits in seat A in the beginning, then we automatically win.  In this case, everyone else will sit in their proper seat, and person Z will sit in seat Z.  If person A sits in seat Z, then everybody will sit in their proper seat (person B in seat B, person C in seat C, etc) except person Z will sit in seat A, and we lose.

If person A sits in seat B, he is essentially delaying the important decision.  By this, I mean that person B will become "an effective person A."  This means that seat B will be gone so person B must randomly select a seat.  The possibilities are he sits in seat A and we win, seat Z and we lose, or another seat and he will delay the choice further.  Again, if he sits in A, then person C sits in seat C, D in D, etc all the way up to Z sitting in Z.  If he sits in Z we clearly lose.  If he sits in seat C, then seats B and C are occupied, and person C becomes an "effective person A" again.

Eventually, there is a first person who chooses to sit in either seat A or seat Z, and this is the only person we really care about.  So, the question becomes, "Is the person of interest more likely to sit in seat A or seat Z."  But we decided above that, for all people except for person Z, there is a symmetry between A and Z.  Thus, there are as many scenarios where the person of interest chooses seat A as when he chooses seat Z.  So, we can only conclude that there is a 50% chance that the person of interest will sit in seat A, and a 50% chance that the person of interest will sit in seat Z.  Thus, there is a 50% chance that person Z will get seat Z, and a 50% chance that he won't.

Incidentally, we can also conclude that person Z can ONLY sit in either seat Z or seat A.

I like this problem because it seems extremely complicated at first.  It seems that we must do some sort of sum over allowed arrangements of seats.  But if we recognize a symmetry, the problem becomes quite simple.  We don't have to actually calculate anything.  If we know that there are two possibilities and they are both symmetric, they are both as likely as each other, then the probabilities can only be 50/50.

Going the other way, almost every seemingly complicated problem that has a simple solution has a symmetry that leads to that nice solution.  So, if you do a really complicated calculation and come up with a really nice answer, most likely there was a simpler way to do your problem.  There was something you missed, and you ended up doing a lot more work than you had to.

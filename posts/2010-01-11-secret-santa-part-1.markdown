---
author: ghl3
comments: true
date: 2010-01-11 18:52:59+00:00
layout: post
slug: secret-santa-part-1
title: Secret Santa, part 1
wordpress_id: 172
---

Every year, as a means of reducing the amount of gifts that each person has to buy, my family organizes a Secret Santa drawing.  This means that we each put our names in a hat, and everybody picks out a name and buys a gift for the person the pick.  No one can pick himself, of course, so if you do so, you must put your name back.  It's fun.

But there's a pretty devastating catch.  What happens when the last person goes to draw and discovers that his name is the last one in the hat?  He is forced to draw himself since there are no other names.  Disastrous! This could potentially ruin one's holiday season.  Are we gambling by playing Secret Santa, knowing that there are potentially pathological scenarios that could ruin Christmas?

What are the odds that, after the first N-1 people draw names, that the last person is left with only his own name?  This problem is actually somewhat challenging.

Let's do what I always do when I approach a hard problem: start with the simplest, non trivial case.  This should give us a good sense of the work we must do and how we must do it.  Imagine there are three people playing the game (N=3).  Let's call the people 1, 2, and 3.  Here are the possible draw combination:

231
213
312

(The first one means that the first person to draw picked person 2, the second person to draw picked person 3, and the last person picked person 1, etc.  No other cases are available because if one of the first two picked themselves, he would put his name back and continue to draw until his picked someone other than himself.)

The only case where the last person draws himself is the second case that I have written: 213.  Naively, one would then state that the probability of a person picking himself is 1/3, since one third of the cases end up with the person picking himself.  This is wrong, however.

It's a common mistake in probability to assume that every possible outcome is equally likely.  When that IS the case, one can simply divide the total outcomes by the interesting outcomes to get the probability.  But that is not the case here, so we have to be a bit more clever.

How did we mess up?  Let's look closer at the example.

-The first person is equally likely to pick 2 or 3.   If he picks 1, he keeps drawing until he picks 2 or 3, and will get each with equal probability.

2 -> 50%
3 -> 50%

In the case that the first person picked 3: The second person MUST pick 1 because he can not pick 2.  Thus, we get:

3 1 2 -> 50%

In the case that the first person picked 2: Half the time the second person will pick 1, and the other half he will pick 3.  So, this adds the following probabilities:

213 -> 50% * 50% = 25%
231 -> 50% * 50% = 25%

From the above analysis, one can see that ending up with 312 is twice as likely as either 213 or 231.  All outcomes are not equally probable.  This makes the problem more difficult.

Aside:

When I first attempted the problem, I missed the above fact and solved the problem assuming that all cases were equal.  This was wrong.  But I'm going to go through it because it's somewhat interesting.  I'll just frame it as a completely separate problem so we don't get confused.

Imagine that we have N numbered positions and we randomly assign N numbers to those positions:

For instance, if N=5, we have the numbers 1, 2, 3, 4, 5 and we assign them to some ordering:

2,3,4,1,5
3,5,2,4,1
5,4,3,2,1
or
2,4,5,1,3
...
etc

What fraction of those assignments end up with 5 in the last position, but NO OTHER NUMBERS in their own positions.  An acceptable example would be:

2,3,4,1,**5**
3,1,4,3,**5**

etc

To find the answer, we use what are called the ["Derangement Numbers"](http://en.wikipedia.org/wiki/Derangement).  They tell you the amount of rearrangements of a set that leave no element in its original position.  Their derivation is described in that article (they are constructed using induction, as one may guess).  These are related to the problem at hand.  But how?

The acceptable ways to rearrange the numbers are the ways where no element is in its original position, and the ways where ONLY 5 is in its original position.  The first of these, by definition, is D5 (the derangement number as described in the wiki article.)  With some thought, one can convince oneself that the ways to rearrange the numbers such that ONLY 5 is in its original position is D4 (we fix 5 and derange the other 4 numbers).  The fraction then is D4 / (D5 + D4).

This is what I originally thought the answer was.  This is incorrect, for reasons described before, and we will soon see the real answer.

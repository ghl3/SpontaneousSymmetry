---
author: ghl3
comments: true
date: 2010-02-28 03:51:13+00:00
layout: post
slug: secret-santa-part-iii
title: Secret Santa, Part III
wordpress_id: 232
---

In order to solve the problem exactly, we going to have to use a bit of math.  Sorry.

I’ll start by defining a quantity that may seem arbitrary at first.  Hopefully it’s meaning and usefulness will become clear:

Let P(i, j) be the probability that, after the first i people have picked names, they have picked only among the first j names.  For this to make sense, clearly j must be greater than or equal to i.  Similarly, let (i, j) represent the case where the first i people have picked only among the first j names.

For example, (2,3) would represent the following cases:

2,3
3,1
2,1

As you can see, two people picked names, and they only picked among the first three names.  So, how does this help us solve our problem? 
We want to calculate the probability that the last person is forced to pick himself.  This only occurs when his is the only name left after everyone else picked.  If there are N people playing the game, it means that the first N-1 people picked among the first N-1 names, and the only name left is N.  Clearly, this is the same as the probability P(N-1, N-1).  So, if we can somehow calculate that quantity, then we’ve solved the problem.

We will show a method to calculate the quantity iteratively.  First, let’s begin with the simplest case.  It’s easy to find the probability that the first person picked only among the first j names, which would be calculating P(1, j).  There are N names total, but the first person can’t pick himself, so he essentially must pick from among N-1 names.  We are calculating the probability that he picks among the first j names only.  But since the first j names includes the first name, which he can’t pick, we are really calculating the probability that he picks among the first j names NOT including the first one.  It’s easy to see therefore that the probability is given by:

$latex P(1,j) = \frac{j-1 } {N-1} $


This will serve as our base case for our iterative solution.  The next step is to figure out how to calculate different P(i, j)’s.  I will show a way that we can calculate the different P’s by iterating over i.

In other words, I will show how to calculate P(i+1, j) based only on values of P(i, j) and P(i, j-1), for all j.  This way, we can start with our base case, P(1, j) and use that to find all the P(2,j)’s.  We can then continue along and use those values to find the P(3, j)’s, etc all the way up to P(N-1, N-1), which is our answer.


If the first i + 1 people have picked among the first j names,it must also be true that that the first i people also picked among the first j names.  Let’s denote the case where the first i people picked among the first j names as (i, j).  Clearly, we can see that (i, j) = (i, j-1) + (i, j) - (i, j-1).

So, we want a formula for P(i+1,j) based on different P(i,j)’s, with i fixed.  In other words, we are assuming that the first i people have picked and we know the probabilities that they picked among the first j names for all j.  It is now the i+1 person’s turn to pick.  There are two interesting cases, when the i+1 person’s name has already been picked and when it hasn’t.  Let’s call these Case A and Case B.

Case A: The first i people picked from among the first j names but DIDN’T pick the i+1th name.

The probability of this case is easy to calculate using a simple symmetry argument.  To the first i people, there is no difference between any person whose position is > i.  The probability of one the first i people picking the name i+2 is the same as them picking i+3 is the same as them picking i+4, etc.  This must be true because there is nothing to differentiate between i+2 and i+3, they are just names in a hat.  (Notice, however, that the probability that one of the first i people picked the ith name is different, in this case we have to take into account the fact that the ith person can’t pick himself).

So, using that symmetry argument, I claim that the probability that the first i people picked among the first j names but didn’t pick i+1 is the same as the first i people picking among the first j names but not picking j.  At first, selecting out j may seem arbitrary, but I picked it because that quantity is easy to calculate.  The probability that the first i people picked among the first j names but didn’t pick j is simply (i, j-1).

So, the probability of Case A is (i, j-1).

Case B: The first i people picked from among the first j names and DID pick the i+1th name.  By the same argument as in case A, this is the same as the probability that the first i people picked among the first j names and DID pick j.  The probability of this is given by (i, j) - (i, j-1).  This is just (i, j) - the probability of case A.

Now, if we’re in case A, what is the probability that the next person, the i+1th person, picks among the first j people?  Well, there are a total of N people, I have been picked, and one remaining is his own name that he can’t pick, so he could potentially choose from n - i - 1 names.  The ones that remain that would mean that he picks from the first j are j - i - 1.  So, from case A, the probability that we get (i+1, j) is

$latex \frac{j - i - 1}{n - i - 1}$.

If we’re in case B, we don’t have to worry about the i+1th person picking himself because his name has already been picked.  So, the probability, using similar logic to the above, is $latex \frac{j -1}{n - i} $.


Therefore, using what we’ve learned, we come up with the following formula:

$latex P(i+1, j) = P(i, j-1) * \frac{j-i-1}{n-i-1} + ( P(i, j) - P(i, j-1) ) * \frac{j-i}{n-i} $


This formula provides an algorithm to calculate P(n-1,n-1).  Choose i = 1, and calculate all the different P(1,j)’s using our base case formula.  Then use those to calculate P(2,j) for each j.  Then use those to calculate P(3,j) for each j.  Continue this process until you are able to get P(n-1, n-1), and that is the final answer.

This type of solution is an algorithm, it isn’t a direct formula.

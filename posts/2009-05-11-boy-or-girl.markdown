---
author: ghl3
comments: true
date: 2009-05-11 03:49:00+00:00
layout: post
slug: boy-or-girl
title: Boy or Girl
wordpress_id: 9
categories:
- Math
- Puzzles
---

So, who doesn't love getting confused by probability?  I know I do.  Let's just jump in right now without further ado.  
  
  
A couple has two children.  Assume that when a person gives birth, they have a 50% chance of having a boy and a 50% chance of having a girl.  The couple tells you that at least one of their children is a boy.  What is the probability that the other child is a boy?  
  
This is a pretty simple puzzle in terms of calculations, but it causes a lot of confusion in a lot of people, so I thought it'd be fun to address.  Since the chances of having a boy or a girl is 50/50, one would naively assume that the knowledge about the first child doesn't effect the probability of the other being a boy or girl.  Thus, most people say the answer is 50/50.  
  
But this is of course wrong.  If the couple tells you that they have at least one boy, there is a 2/3 chance that the other child is a girl.  Weird, right?  Remember, this has nothing to do with correlations between children.  We are assuming that all births are independent of each other.  So, why is this so.  The easiest way to figure it out is by examining the ways that a couple can have two children and finding their probabilities.  They are as follows (B = Boy, G = Girl):  
  
BB  25%  
BG  25%  
GB  25%  
GG  25%  
  
Each of these have an equal probability (50% * 50% = 25%).  If the couple tells us that they have at least one boy, than all that they have done is eliminated the last way of having two kids; meaning that we ignore the GG combination.  
  
Thus, the remaining combinations are:  
  
BB  
BG  
GB  
  
and they occur with equal probability.  Of the remaining choices, two of them involve a boy and a girl, and the other involves two boys.  Thus, it is twice as likely to have a boy and a girl than two boys.  Thus, if a couple tells you that they have at least one boy, it means that 2/3's of the time, their other child is a girl.  This is really a problem of semantics.  Most of people's confusion comes from the idea of having "at least" one boy.  
  
We get a different answer if we phrase the question in the following way:  "A couple has two children.  The youngest child is a boy.  What is the probability of the sex of the other child?"  Here, the answer is 50% boy and 50% girl.  So, what's the difference?  Again, it becomes clear if we list the possibilities:  
  
BB  
BG  
GB  
GG  
  
If they tell us that the younger child is a boy, we are only left with:  
  
BB  
BG  
  
and these have equal probability.  Thus, the second child is a boy half the time and a girl the other half.  
  
  
Interesting, no?  This is a relatively simple problem.  Maybe we'll get some harder ones in the future...

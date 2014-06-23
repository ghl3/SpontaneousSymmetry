---
author: ghl3
comments: true
date: 2009-07-12 19:22:00+00:00
layout: post
slug: heads-and-tails-solution
title: Heads and Tails Solution
wordpress_id: 39
categories:
- Math
- Puzzles
---

So, we've made the wager that we're going to bet on which string, either HTH or HTT, comes first.  Let's try to find the solution by diving into the minds of the people playing the game.

Imagine first that we are the person who wants HTH to win.  The first flip of the coin, for example, could be a tails.  We would be unhappy with this result because we need a head to begin our sequence.  So, let's say that our level of happiness is 0.  The next flip, however, comes up heads.  That's the first character in our desired string, so we move to happiness level 1.  The next is a tails.  Even better news!  Our happiness level is now at 2.  If the next flip were to give us a head, our happiness level would become a maximum 3 and we would win the game.  Rejoice!  But what happens if it lands a tails?  Well, we fall all the way back down to happiness level 0.  We have to start all over again!

Let's see how the same thing works for the person hoping for HTT.  First flip is a tails.  Happiness 0.  Then a Heads.  Happiness 1.  Then a tails.  Happiness 2.  If the next flip is a tails, we get happiness 3 and we win.  But what if it's a heads?  Well, we are upset because we didn't win.  But we don't fall back to happiness 0, because we just got a heads which could potentially be the start of a winning string.  So, we only fall back to happiness level 1, and all we need now to win is TT.  See, the person who wants the string HTT has hedged his bet.  Even when he misses on the last flip, he is still well on his way to the winning string.  The other person needs 3 magical coin flips, while the HTT guy only needs two.

Since everything else is equal between the two, it we would certainly imagine that the person seeking HTT would tend to win since his needs less luck for his chains to come up.

---
author: ghl3
comments: true
date: 2010-01-12 17:07:22+00:00
layout: post
slug: secret-santa-part-2
title: Secret Santa, part 2
wordpress_id: 192
---

So, from the previous post, we should understand the problem and we should have a good idea of how NOT to solve it.  We still have a bit of work to do.

An easy way to solve this problem is to use a computer simulation.  We can get our answer using “Monte Carlo” by having a computer play many, many Secret Santa games and then count the fraction of those games where the last person is forced to pick himself.  Actually, there are many ways that one could use a computer to solve this problem.  One could attempt to solve it EXACTLY by having the computer enumerate all the possible ways that the people could pick names and calculate their relative probabilities.  That’s certainly possible, but would be more difficult to program than what I’m suggesting here.  Rather, what I intend to do is to get and APPROXIMATION by using random numbers to generate many Secret Santa games.

I wrote the code in C++ (my weapon of choice).  The code can viewed here:

[SecretSanta](http://www.spontaneoussymmetry.com/blog/wp-content/uploads/2010/01/secretsanta5.pdf)

The fraction of the time that the last person is forced to pick himself, as a function of the number of people playing the game, goes as follows:

3 - 0.24939
4 - 0.13813
5 - 0.13105
6 - 0.11143
7 - 0.09975
8 - 0.09124
9 - 0.08313
10 - 0.07422
11 - 0.06987
12 - 0.06505

These are of course just approximations, but they give you rough idea of what's going on.

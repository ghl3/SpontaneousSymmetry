---
author: ghl3
comments: true
date: 2009-07-10 18:15:00+00:00
layout: post
slug: i-like-this-one
title: I like this one
wordpress_id: 19
categories:
- Puzzles
---

So, my friend and I start flipping coins for.  We keep track of the string of results, which could, for example, look like:

HHTHTHTTHT

I then suggest to my friend that we make a wager.  We begin a new sequence of coin flips.  I say that if the sequence "HTT" comes up first, he owes me $10, but if the sequence "HTH" comes up before mine, then I owe him $10.  My friend says, "Sure, that seems fair.  Since they're just arbitrary triplets of heads and tails, and each one comes up with a 50/50 probability, there is nothing to distinguish the two, so the probability of one chain coming up first should be the same as the other."  A reasonable assumption!

We play this game many times and it becomes clear that I'm by far getting the best of it, and my friend is quickly going broke of his life's savings.  What's the catch?

//

Oh, and here's my solution to the 4-d cube.  There's probably a simpler way to say the solution, but I like being wordy and clear.

What is a cube?  In one dimension, a cube is a line.  We can choose that line to be the one connecting the points (0) and (1).  In two dimensions, it is a square.  We can choose the four corners of the square to be (0,0), (1,0), (0,1), and of course (1,1).  Simple so far.  Each edge of the square connects two corners.  So, how many edges are there.  Well, we simply count the ways that we can connect two corners, right?  No, not quite, because we don't want to count the diagonal.  The line between (0,0) and (1,1) is not an edge  So, let's take a step back.

Each edge of the square connects two corners.  But the better way to think about it is by saying that each corner has two edges touching it.  Since there are 4 corners, we must have 4*2 = 8 edges  But of course by doing it this way we are exactly double counting, so we include a factor of 1/2.  Thus, we arrive at our formula:

# of edges = # of corners * edges touching a corner * 1/2

So, we have to figure out how many edges touch each corner and the number of corners for a given dimension of cube.  It's pretty easy to see that the number of edges touching a corner must be N.  In 2-d, each corner touches two edges in 3-d it touches 3, etc.  This is obvious by taking the origin as an example.  The origin is defined as the point (0,0,.....0,0) with N zeros, where N is the dimension.  This only connects to the corners (1,0,.....0), (0,1,0,.....0), ....., (0,.....,0,1).  Clearly there are N of those.  So, this one particular corner touches N edges.  Thus, by the symmetry of the cube we can generalize this property of the origin to all corners and we learn that there are N edges touch at a corner.

This may seem like a stupid way of thinking about what a side of the square is, but it becomes easy to generalize to 3, 4, and N dimensions.  Often times, the best way to find a solution is to find a really complicated way to solve the easy version.

Finally, we just need the number of corners for an N dimensional square.  Well, what are the corners?  For the cube, the corners are (0,0,0), (0,0,1), (0,1,0), (1,0,0), (1,1,0), (1,0,1), (0,1,1), (1,1,1)  (we got all 8 of them).  In general, we can list all the corners by listing the N-tuples (meaning the string of n digits) that contain only 0's or 1's.  Each corners is of the type, and this spans all the corners.  For each digit, we have two choices, and there are N digits, so the total number is just 2^N.

Thus, number of toopicks we need, meaning the number of edges on an N-d cube, are:

2^N * N * 1/2

For a 4-d cube, this is 32.  A 4-d cube has 32 edges, and you'd need 32 toothpicks to build it.

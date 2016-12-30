---
title: Probability Cheat Sheet
---


This is a short reference guide discussing probability probability distributions.

<hr>


## Definitions and discussion

There are a number of terms related to probability that are closely related by can be confused.

- Random Variable
- Probability Distribution
- Probabilistically Generated Value

A "random variable" and a "probability distribution" are essentially the same thing



## Computations on distributions vs computations on distributed quantities

A common source of confusion when dealing with probabilities is understanding the distribution of functions of probabilistically distributed variables.  Let's say that I have two variables, x and y, which each follow a probability distribution: P(x) and P(y).  Let's then say that I create a quantity z which is the sum of these two variables: $z = x + y$.  What is the probability distribution of z, p(z)?

Before we answer that, let's make sure that we understand what it means to add two probabilistically distributed variables.  One should hold on one's head the following procedure.  First, obtain a value for x by drawing from the probability distribution p(x).  For example, if x is a variable representing the roll of a die, then roll that die to obtain an instance of x, which is one of the numbers in 1 through 6.  Then, obtain a value for y by drawing from p(y).  Finally, add those two numbers up to get an instance of the probabilistically distributed variable z.

Naively, one may think that the probability p(z) is given by:

$$ p(z) = p(x) + p(y) $$

But this is not the case.  It's clear that this is wrong because, as defined above, p(z) would not add up to 1.  Moreover, it has invalid units (note that p(x) has units of 1/[x] and p(y) has units of 1/[y], and these cannot be added together.


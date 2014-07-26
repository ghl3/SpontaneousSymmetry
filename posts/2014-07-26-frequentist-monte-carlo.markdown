---
author: ghl3
date: 2014-07-26 15:51:29.513712
layout: post
slug: frequentist-monte-carlo
title: Frequentist Monte Carlo
id: 446
---


The following post is my response to a very well-written blog on differences between Frequentists and Baysenians written by Jake Vanderplas that can be found <a href="http://jakevdp.github.io/blog/2014/06/06/frequentism-and-bayesianism-2-when-results-differ/">here</a>.


I believe he's mis-interpreting how a frequentist is “allowed” to approach a problem like this one, and more generally what types of calculations a frequentist can philosophically perform.

There’s a nice symmetry between how bayesians and Frequentists are able to make calculations.  They both are fully free to create any likelihood function that they’d like.  This is a common misconception about the difference between frequentists and bayesians.  Many naively favor bayesianism because they believe that a bayesian is able to make detailed and nuinanced likelihood functions than frequentists are.  This is incorrect.  Any likelihood function written by a Bayesian can equivalently be written by a frequentist.  The difference is how they interpret that likelihood function.

There are different calculations that frequentists and bayesians are allowed to do to a likelihood functions.  Summarized succinctly, bayesians are able to integrate a likelihood function and frequents are able to create sets using the likelihood function.  Bayesians interpret the mass of their integration, and frequentists count the measure of the resulting sets.  These calculation rules nicely map to the underlying probability interpretations: bayesians integrates over their subjectivity and frequentists count the relative size of sets to measure probability.

So, how does this apply to the problem at hand.  The problem is better illuminated by fully describing the generative process that sets up the problem.  One first draws from a flat probability distribution between 0 and 1 to get the value of p.  Then, one draws 11 bernoulli variables (or boolean variables with values “left” or “right”) with probability p for “left” and 1-p for “right”.  With that, the problem is fully defined.  The concept of “winning” is a latent variable of the 11 bernoulli draws and is deterministically defined as whether there are more “left” values or “right” values.

The experiment is a single draw from this likelihood that consists of the 12 variables (p, d1…d11).  The data that we observe are the first 9 rolls: d1 -> d8.  The nuisance parameters are therefore the variables p, d9, d10, and d11.

The likelihood is therefore:

L(d1…d8 | p, d9, d10, d11) = Prob(p) * Prob(d1…d11 | p)

(this is pretty much what was written in the post, but with explicitly including the unknown draws.

A frequentist, given this likelihood function, is fully able to calculate the size of different sets of the nuisance parameters.  He is allowed to count the measure of all sets of nuisance parameters that result in victory and the measure of all nuisance parameters that result in defeat, and he is allowed to calculate the relative proportion of those measures.  To a frequentist, a probability is simply a proportion of measures, and therefore a frequentist is fully allowed to calculate the probability of victory from this procedure.

The fact that he does an integral to calculate this measure doesn’t mean that he’s doing something Bayesian.  It only means that he’s using a continuous parameter in his likelihood and in his calculation of measure.

As described earlier in Jake's blog post, the main difference between the frequentist approach and the bayesian one is that the frequentist uses a flat metric when calculating a measure of a set of nuisance parameter values.  A bayesian would do the equivalent calculation by introducing a prior, which may add a non-flat metric to a set of nuisance parameters, and he will then integrate using that prior as a metric (this explains why the frequentist approach and the bayesian approach converge when the prior is flat: it just means that the measures of a set is equal to the integral of that sets using a flat metric).

In fact, the "Monte Carlo" solution to the first problem precisely the frequentist approach: One sets the problem up as random draws from a underlying distribution and  counts the number of these draws having a certain property.  This is how a frequentist would approach the problem: drawing from a likelihood function to calculate the size of a certain set of the nuisance parameters.
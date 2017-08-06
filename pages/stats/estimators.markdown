---
author: 
date: 2016-09-03 11:25:54.397075
layout: post
slug: statistics-cheat-sheet
title: Inference
---


Up until now, we've been discussing probability.  But the real value of statistics is the ability to use probability distributions and models to learn facts about the real world and, crucially, to know how certain one should be in those facts.

There are a number of different ways to infer the values of parameters given measured data.  The ones we will discuss in this work are:

- Estimators
- Confidence Intervals
- p-values
- Posterior Distributions

Each of these is a way of using probability distributions and data to make statements about the values of unknown parameters.  Importantly, the nature of those statements should be understood in detail.  The statements that frequentists can make about unknown parameters (given data) are mathematically rigorous and are unambiguous, but are often confusing or contrary to how a lay person may think about them (possibly to a fault!).  Bayesian posterior distributions are somewhat more intuitive, but require more assumptions about the nature of the universe


## Estimators

An estimator is a algorithm used to create a value from data that approximates, or is a stand-in for, the value of an unknown parameter.  The precise meaning of "approximates" depends on the estimator, and we will discuss properties that estimators can have which make them good or bad approximations.

Imagine one has a probability distribution, $p$, which generates data $x$ and is a function of a single parameter $\mu$:

$$
p = p(x | \mu)
$$

An estimator is a function of the data $x$ that approximates the value of $\mu$.  Importantly, an estimator is a single number; it is a "point estimate" of the unknown parameter, and not some range.  It does not have a level of confidence associated with it or any errors.  One must simply believe it, or at least think it to be valuable, based on how it's constructed and the properties it obeys (or not believe it and ignore it).  Again, the argument in favor of an estimator being valuable are ad-hoc and must be unique to the distribution and estimator in question.

We will use the notation that an estimator for a parameter $\mu$ is written as $\hat{\mu}$.  One should not confuse an estimator, which is a function of the data and is itself a random variable, with the underlying parameter, which is a fixed (but usually unknown) quantity describing the true model of a system.


### Estimator for mean of a gaussian distribution

The most common estimator is the sample mean.  Imagine I have a gaussian distribution $g(x_i | \mu, \sigma)$ and I draw n points from it.  I'd like to use my measured data, ${x_i}$, to estimate the value of $\mu$.  The simplest estimator that one may come up with is the sample mean:

$$
\mu \sim \bar{x} = \sum_i \frac{x_i}{n}
$$

In other words, if a person showed you this data, told you that it came from a gaussian distribution, and asked you for a good guess for $\mu$, you could simply say $\bar{x}$.  But why would this guess be justified?

From the discussion of the gaussian distribution, we know that the distribution of $\bar{x}$ given $\mu$ is also a gaussian:

$$
p(\bar{x} | \mu, \sigma) = gauss(\bar{x} | \mu, \frac{\sigma}{\sqrt{n}})
$$

This implies that if n is very large, the distribution of $\bar{x}$ will be tightly centered around $\mu$.  SO, if you draw many points and measure $\bar{x}$, it is very likely to be close to the true value of $\mu$.  And this may be sufficient for your purposes, so in such cases, using $\bar{x}$ to estimate $\mu$ is well justified.
An important thing to note about the above example is that the distribution of $\bar{x}$ given $\mu$ was centered around the true value of $\mu$.  

### Properties of estimators

In the general case, imagine we have a parameter $\mu$ that we are estimating.  We will define our estimator for that parameter to be $\hat{\mu}$ (following common notation).  In the above gaussian example, $\hat{\mu} = \bar{x}$, which reads as "an estimator to the value of $\mu$ is the sample mean."

An estimator whose distribution is centered around the value it is attempting to estimate is said to be "unbiased".  (Conversely, if the mean of the distribution of the estimator was greater than the true value of the parameter, than measuring the estimator would give you a number that, on average, was greater than the true value of the parameter, and your inference of that parameter would be biased on the high side).  We can mathematically define bias as:

$$
bias = E[\hat{\mu}] - \mu
$$

We say that an estimator whose bias is equal to 0 is "unbiased", which is usually a desirable property of an estimator.

Another important property to consider is how far off of the true value is the estimator.  One can do this by measuring the mean square error (or distance) between the value of the estimator and the true parameter:

$$
MSE = E[(\hat{\mu} - \mu)^2]
$$

In addition, one can measure the variance of the estimator itself.  In contrast with the mean square error, the variance of estimator isn't considered in terms of the true value of the parameter.  It is defined as:

$$
variance = E[(\hat{\mu} - E[\hat{\mu}])^2]
$$

It is the mean square distance between the value of the estimator and the mean value of the estimator.

A fact that directly follows from these definitions is known as the bias-variance trade-off, which states that:

$$
MSE = bias^2 + variance
$$

In other words, for fixed MSE, one can reduce the variance, but this will case the bias to increase, and visa versa. 


A "consistent" estimator is one that converges to the true value of the parameter, usually defined as a function of sample size.  It is defined by finding an estimator that, for all $\epsilon$ and [0 < $\delta$ < 1], there exists a sample size $n$ such that:

$$
prob (|\hat{\mu} - \mu| < \epsilon) > \delta
$$

In other words, with high enough n, the probability that the estimator is arbitrarily close to the true value approaches 1.  Our gaussian example above was consistent, which was intuitively why we liked it as an estimator of $\mu$.  An estimator can be consistent but biased (as long as the bias gets arbitrarily small for large n).


As mentioned above, it may be a desirable property for an estimator to be unbiased.  A common concept is the "Minimum Variance Unbiased Estimator", which is exactly what the name suggestions.  An important theorem is that there is a minimum bound for the variance of any unbiased estimator.  This is known as the Cramer-Rao bound and states that the variance for any unbiased estimator must obey:

$$
var > \frac{1}{FI}
$$

where $FI$ is the Fisher information of the distribution, which is defined as:
$$
FI(x | \theta) = -\frac{(d^2L(x | \theta)}{d\theta^2}
$$

We will not concern ourselves with the details of this calculation here, but instead will note that the existence of such a bound means that it's possible in some cases to obtain the "best" unbiased estimator as the one whose variance is falls right on the boundary.  The efficiency of an estimator is the ratio of it's variance to the Cramer-Rao variance bound, where an efficiency of 1 is the best an estimator can do.

## Maximum Likelihood Estimator

One of the most useful estimators, and certainly one of the most widely applicable, is the so-called Maximum Likelihood Estimator.

For a probability distribution function p that generates data $x$ and has a single parameter $\mu$, the maximum likelihood estimator for the parameter $\mu$ is the value of $\mu$ that maximizes the likelihood function:

$$
\hat{\mu}_{mle} = argmax_{\mu} p(x|\mu)
$$

where the argmax views p as a likelihood function, meaning the parameter is $\mu$ and the data $x$ is fixed.  In the general case of multiple parameters, the maximum likelihood estimators are given by:

$$
mle(s) = \{\hat{\mu_1}, ..., \hat{\mu_N}\} = argmax_{\mu_1, ..., \mu_N} (L(\vec{x} | \mu_1, ..., \mu_N)
$$

The concept of a maximum likelihood estimator makes intuitive sense.  It is the value of the parameter that corresponds to a model that has the highest probability of generating the observed data.  If we saw data and had to infer which model generated it, we may feel well-justified in picking the model that has the highest probability of producing that data (from among the family of models that we're considering).

Other than that intuitive motivation, the maximum likelihood estimator has a number of desirable properties.


Given a family of models specified by one or more parameters and an observed dataset, the maximum likelihood estimator is the set of parameters that maximize the value of the likelihood function (over the fixed observed data):

- A mle is consistent, as defined above
- If considered on a compound likelihood, the distribution of the mle approaches a gaussian distribution around the true parameter as $n \lim \inf$
- It tends to an efficiency of 1 as $n \lim \inf$

The property that the distribution of a mle tends to a gaussian turns out to be a very useful one.  Specifically, it means that, given sufficiently large n, the distribution of the estimator approaches:


$$
pdf(\hat{\theta} | \theta) = gauss(\hat{\theta} | \theta, \frac{1}{FI(\theta)}).
$$

where, as above, $FI$ stands for the Fisher Information.  In particular, it means that one can obtain a good estimate of the distribution of an estimator.  Specifically, the distribution of $\sqrt{n}(\hat{\mu}_{mle} - \mu)$ converges to a gaussian with mean 0 and variance given by $\frac{1}{FI}$.

We will not prove this, but the proof essentially follows from the central limit theorem: The log likelihood is a sum of the logs of the individual likelihoods, each of which is an independent random variable.  The central limit theorem states that the sum of independent random variables is gaussian distributed.  The main thing to note is that, as n gets larger, the approximation becomes better.  So, for experiments with a large number of observations, this approximation becomes very useful.

This variance, as discussed above, is the one defined by the Cramer-Rao bound.  Given an closed form likelihood, one can calculate the Fisher information $FI$ exactly and therefor obtain an asymptotic distribution (the distribution as $n \lim \inf$) for a mle.  This is true for any likelihood, making this method of obtaining estimators very useful.  We will later take advantage of this same property when calculating confidence intervals.

For the gaussian example, one can show that the maximum likelihood estimators for $\mu$ and $\sigma$ are given by:

$$
\hat{\mu}_{mle} = \bar{x}
$$

$$
\hat{\sigma}_{mle} = \frac{1}{n} \sum (x_i - \bar{x})^2
$$

The mle for $\mu$ for a gaussian is the familiar sample mean.  Note that the mle for $\sigma$ is not our usual definition for the sample variance $s^2$, as it has a factor of $\frac{1}{n}$ and not $\frac{1}{n-1}$.  This implies that the mle for $\sigma$ is biased (but it is still consistent, as the difference between $\frac{1}{n}$ and $\frac{1}{n-1}$ goes to 0 as $n \lim \inf$).

https://ocw.mit.edu/courses/mathematics/18-443-statistics-for-applications-fall-2006/lecture-notes/lecture3.pdf

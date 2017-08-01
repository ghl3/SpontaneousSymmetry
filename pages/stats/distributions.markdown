---
author: 
date: 2016-09-03 11:25:54.397075
layout: post
slug: statistics-cheat-sheet
title: Distributions
---


# Distributions

This section serves as a short reference guide, or cheat sheet, for common probability distributions and how they may be applied.


## Bernoulli Distribution

The Bernoulli distribution is possibly the simplest distribution in statistics.  It is a 1-parameter distribution whose range consists only of the set {0, 1}.  It is defined simply as:

$$
\begin{align}
ber(1 | p) &=& p   \\
ber(0 | p) &=& 1-p
\end{align}
$$

The simplest example is a weighted coin flip where heads is valued at 1 and tails at 0: With probability p, the coin lands on heads and with probability 1-p, the coin lands on tails.

A Bernoulli random variable can represent anything that has some probability of success, such as the outcome of a sports game, the winning of the lottery, or whether or not an event will occur over a fixed period of time.  Because it is so versatile, it forms the basis for many of the distributions that will follow.

The Bernoulli distribution is simple because its distribution is fully specified by its definition.  For other distributions, it will take more work to go from their definition (such as "a series of coin flips") to the mathematical function representing its probability distribution function. 

## Binomial Distribution

The binomial distribution is an extension of the Bernoulli distribution: it represents an aggregate of multiple Bernoulli random variables (all with the same probability of heads, $p$).  Specifically, the binomial distribution is a 2-parameter distribution representing the number of Bernoulli random variables, n, whose value is 1 (or "heads" or "up") out of a possible N.

For example, imagine we have 3 Bernoulli variables, $b_1$, $b_2$, and $b_3$ (each with the same probability of heads $p$), and we draw values from them.  Possible outcomes of the Bernoulli variables and the total number of 1 outcomes are:

$$
0,0,0 \rightarrow 0 \\
0,0,1 \rightarrow 1 \\
0,1,0 \rightarrow 1 \\
0,1,1 \rightarrow 2 \\
1,0,0 \rightarrow 1 \\
1,0,1 \rightarrow 2 \\
1,1,0 \rightarrow 2 \\
1,1,1 \rightarrow 3 \\
$$

The binomial distribution here is the distribution of the sum.  In this case, $n=3$ and probability of the various outcomes is given by:

$$
\begin{align}
binom(0 | N=3, p) =& (1-p)(1-p)(1-p) \\
binom(1 | N=3, p) =& (1-p)(1-p)p + (1-p)p(1-p) + p(1-p)(1-p) \\
binom(2 | N=3, p) =& (1-p)pp + p(1-p)p + pp(1-p) \\
binom(3 | N=3, p) =& ppp \\
\end{align}
$$

One could enumerate the odds for every value of $n$, just as we did above with n=3.  Thus, it's simple to calculate the Binomial distribution from first principles, starting with the Bernoulli distribution (if not quite tedious).  

One could program a computer to perform these calculations, thereby fully specifying the binomial distribution.  To make the calculations simpler and easier to write down, one can leverage combinatorics.  Doing so, the binomial distribution may be written as:

$$
Binom(n | N, p) = \frac{N!}{n!(N-n)!}p^n(1-p)^{(N-n)}
$$

## Poisson Distribution

The Poisson distribution can be thought of as a generalization of the Bernoulli distribution.  The Bernoulli distribution represents an event which can take on values of 0 or 1 and has an intrinsic rate of occurrence $p$.  The Poisson distribution, in contrasts, represents an event that can happen any integer number of times (0, 1, 2, 3...).  The only requirement is that occurrences are independent: the occurrence or non-occurrence of an event cannot make repeat occurrence more or less likely.

Examples are the number of raindrops hitting your roof in a short period of time, or the number of popcorn kernels that pop in your microwave in a small interval, or the number of people who arrive at a bank between 3:00 and 3:15.

The Poisson distribution is a 1-parameter model, and the single parameter, $\lambda$, represents the expected number of event occurrences (usually in some unit time interval).  The typical setup is to have some ground truth for how many events are expected to occur on average.  For example, one could have measured over the past year the average number of people who walk into a bank in a 15 minute interval.  Based on that average, and assuming that people's schedules are independent, one can assume that the number of people arriving at the bank in a SINGLE day is described by the Poisson distribution.

One way to derive the poisson distribution is to think of a period of time T, during which we expect on average $\lambda$ events to occur, as consisting of many infinitesimal periods of time, $\delta t$.  We assume that that the $\delta t$s are small enough such that only one event can occur in each time window.  The question we are asking is, "How many total events occurred in time $T$" which, with these assumptions, becomes, "How many of the $\delta t$ events resulted in success?".  


This is the equivalent of a binomial distribution where we have MANY individual coin flips, each with a very small probability of being heads.  We overall expect $\lambda$ events in this period T, so the rate of occurrence of an event is $\lambda / T$.  In each small period of time, the probability of an event occurring is $rate * \delta t = (\lambda / T) * (T/N) = \lambda / N$

We therefore take the binomial equation  $binom(n | N, p)$ and make the replacements:

- $N \rightarrow \infty$
- $p = \lambda/N$

Making these substitutions and taking the limit, one arrives at the formula for the Poisson distribution: 

$$
pois(n|\lambda) = \frac{\lambda^n}{e^{-\lambda}}{n!}
$$

which is the probability of n events occurring in a time period during which we expect $\lambda$ events on average.


https://www.pp.rhul.ac.uk/~cowan/stat/notes/PoissonNote.pdf

http://www.math.wm.edu/~leemis/chart/UDR/PDFs/BinomialPoisson.pdf


## Gaussian Distribution

Unlike the previous distributions, we will not motivate the Gaussian distribution from a specific scenario (flipping coins, etc), but instead will motivate it from a more general fact, known as the Central Limit Theorem.  The Central Limit Theorem states that the distribution of the sum of MANY independent random variables (each having an arbitrary distribution with loose conditions) will tend to a Gaussian distribution.  For example, if I add together many Bernoulli variables, their sum will tend toward a gaussian distribution (we know that their sum is exactly a Binomial distribution, which also implies that a Binomial distribution tends toward a Gaussian distribution as $N \rightarrow \infty$) .  

This is a complicated theorem to prove, so we will here only assert it.  However, it is very powerful and implies that Gaussian distributions will arise naturally in many situations.  For example, consider a process that has many small errors.  Even if we don't know the distribution of individual errors, if there are sufficiently many independent errors, the sum of these errors, that is the overall error, will be shaped like a Gaussian.  We can therefore use a Gaussian distribution to model many errors (one can fit it to data to obtain parameters, for example).

The Gaussian distribution describes a 1-dimensional continuous variable, $x$, as a function of two parameters: $\mu$, it's mean, and $\sigma$, it's standard deviation. The distribution is given by:

$$
gauss(x | \mu, \sigma) = \frac{1}{\sqrt{2\sigma^2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

The Gaussian distribution will be important for understanding following distributions, so we will take some time to understand it's properties.  Using the formula above, one can confirm that the mean and standard deviation are indeed $\mu$ and $\sigma$, respectively.

Because the gaussian distribution is so ubiquitous, it is worthwhile to spend some time to understand it's properties.  Imagine w draw $n$ points from a gaussian and measure the mean of those points.  We define that mean as $\mu_s$, the mean of the sample we drew (or "sample mean").  The quantity $\mu_s$ is itself a random variable: it as a real value after drawing the $n$ points and it depends on the random draws of individual gaussians.  On can mathematically show that the distribution of $\mu_s$ is itself a gaussian and is given by 


$$ p(\hat{\mu} | \mu, \sigma, n) = Gauss(\mu, \frac{\sigma}{\sqrt{n}}) $$

Reference: https://onlinecourses.science.psu.edu/stat414/node/173


The $\frac{1}{\sqrt{n}}$ part of that formula is important: it means that the standard deviation of the sample mean drops by $1/\sqrt{n}$ as you draw more and more points.  If you are trying to measure the true $\mu$ of a gaussian distribution, you can do so by observing many points drawn from it and calculating the sample mean of those points, $\mu_s$.  If you observe many points, that distribution of $\mu_s$ will be tightly centered around the expected sample mean, $\frac{\mu}{\sqrt{n}}$, and you can use that to infer the true value of $\mu$.

TODO: Introduce Maximum Likelihood Estimators somewhere...
Similarly, the maximum likelihood estimator for $\sigma$ is given by:

$$
\hat{\sigma^2} = \frac{1}{n} \sum(x_i - \overbar{x})^2
$$





## Chi-Squared Distribution


The Chi-Squared distribution is closely related to the gaussian distribution.   

Let's say we have a gaussian distribution: $x \sim gauss(x, \mu, \sigma)$ with known parameters $\mu$ and $\sigma$, and we draw a value $x_1$ and calculate:

$$
z_1^2 = \frac{(x_1 - \mu)^2}{\sigma^2}
$$

Here, $x_1$ was a draw from a random variable, and we have scaled and transformed it by the parameters of the gaussian distribution.

The distribution of our newly defined variable $z_1^2$ is known as the Chi-Squared distribution with "1 degree of freedom".  

Imagine we instead draw two numbers from the same gaussian, $x_1$ and $x_2$ and calculate:

$$
z_2^2 = \frac{(x_1 - \mu)^2}{\sigma^2} + \frac{(x_2 - \mu)^2}{\sigma^2}
$$

The distribution of this variable is known as the Chi-Squared distribution with "2 degrees of freedom".

To generalize this, imagine we consider N different gaussian distributions, each with known but possibly different values of $\mu_i$ and $\sigma_i$.  We draw a value from each, $x_i$, and define:

$$
z^2_N = \sum_i \frac{(x_i - \mu_i)^2}{\sigma_i^2}
$$

The distribution of $z^2_N$ is the Chi-Squared distribution with "N degrees of freedom".  The mean of the Chi-Squared distribution with N degrees of freedom is N (simply enough).  By construction, the distribution of the sum of two Chi-Square distributed variables is itself Chi-Square distributed:

$$
\chi^2_n + \chi ^2_m \sim \chi ^2_{n+m}
$$

Note that the Chi-Squared distribution with 1 degree of freedom is simply the distribution of the square of a gaussian-distributed variable.

In order to calculate the test statistic $Z^2_N$, one must know BOTH the true mean, $\mu$, and the true standard deviation, $\sigma$.  We will later show how one can use the Chi-Squared distribution to perform inference on these parameters.  However, often one only wants to perform inference on one of these parameters, usually the true mean $\mu$.  In these cases, one must either know the true standard deviation, must assume it, or must use another test statistic (with another distribution). 

## Gaussian Distribution, continued

With the Chi-Squared distribution in hand, we can state another property of the gaussian distribution.  Imagine that we draw n samples from a gaussian distribution with mean $\mu$ and standard deviation $\sigma$.  We then calculate the quantity:

$$
z^2 = \frac{1}{n} \sum (x_i - \mu)^2
$$

This is like a variance, but we are using the true mean, $\mu$, and not the sample mean.  We can re-write this equation as:

$$
\frac{z^2n}{\sigma^2} = \sum \frac{(x_i - \mu)^2}{\sigma^2}
$$

We see that quantity on the right-side of this equation is described by a Chi-Squared distribution with n degrees of freedom (as $x_i$ are drawn from a gaussian with mean $\mu$ and standard deviation $\sigma$).  We can then directly state that the distribution of $s^2$ is given by:

$$
\frac{z^2}{\sigma^2} \sim \frac{1}{n} \chi^2_{n}
$$

Note that, in the above equation, we are assuming that we know the true standard deviation $\sigma$.     A more useful relationship uses the sample mean, $\hat{X}$, and the sample variance, $s^2$, defined as:

$$
s^2 = \sum (x_i - \bar{x})^2
$$

We start with the quantities

$$
U_i = \frac{x_i - \mu}{\sigma}
$$

and re-writing it as:

$$
\sum U_i^2 = \sum(\frac{x_i - \mu}{\sigma})^2 = \sum \frac{x_i - \bar{x}}{\sigma}^2 + N (\frac{\bar{x} - \mu}{\sigma})^2
$$

This final quantity is the sum of quadratic terms in $x_i$, where the $x_i$ are independent.  A theorem called Cochran's theorem states that sums of quadratic terms of gaussian variables can be expressed as the sum of terms where each term is distributed as a Chi-Squared, and the number of degrees of freedom of each chi-squared is the number of linearly independent combinations of the $x_i$ variables in that term.  This theorem can be used to prove the following important facts:

- $\sum (\frac{x_i - \bar{x}}{\sigma})^2$ is distributed as a Chi-Squared with n-1 degrees of freedom
- $ N\frac{(\bar{x} - \mu)^2}{\sigma^2}$ is distributed as a Chi-Squared with 1 degree of freedom
- These two quantities are independent of each other

The first of these terms can be related to the sample variance and the second can be related to the sample mean (given fixed true values of $\mu$ and $\sigma$).  This allows us to show that the distribution of the sample variance is given by:

$$
s^´2 = \frac{1}{(n-1)} \sum(x_i - \hat{x})^2 \sim \frac{\sigma^2}{(n-1)} \chi^2_{n-1}
$$

and, importantly, that it is independent of the distribution of the sample mean.  The fact that the sample mean and sample standard deviation are independent is unique to the gaussian distribution and, in fact, fully specifies the gaussian, a property known as Basu's theorem). These facts will be important when performing inference on the gaussian distribution (trying to infer $\sigma$ and $\mu$ given a sample of gaussian-distributed data).  This will be discussed in a later section.

https://stats.stackexchange.com/questions/121662/why-is-the-sampling-distribution-of-variance-a-chi-squared-distribution

https://en.wikipedia.org/wiki/Cochran%27s_theorem#Sample_mean_and_sample_variance

https://en.wikipedia.org/wiki/Basu%27s_theorem

Reference: http://courses.education.illinois.edu/EdPsy580/lectures/6ChiSq_Fdist_ha.pdf


## Student's t-distribution

Imagine we have a gaussian-distributed variable $Z$ and a Chi-Square distributed variable $V$ with $N$ degrees-of-freedom, where $Z$ is independent of $V$.  We define the student's t distribution as the distribution of the quantity:

$$
t = \frac{Z}{\sqrt{V/N}}
$$


The canonical example motivating this distribution is similar to the example motivating the Chi-Squared distribution.  Imagine that we have a single gaussian distribution with true mean $\mu$ and true standard deviation $\sigma$.  We draw n points from that distribution, $x_1$, $x_2$, ..., $x_n$.

From the above section we know:

- The quantity $N\frac{\bar{x} - \mu}{\sigma}$ is gaussian distributed
- The quantity $\sum{\frac{(x_i - \bar{x})^2}{\sigma^2}}$ is Chi-Square distributed with N-1 degrees-of-freedom
- The distribution of these two quantities is independent

Therefore, by the definition of the student's t distribution, we know that the following quantity is follows the student's t distribution:

$$
t = \frac{\frac{\bar{x} - \mu}{\sigma/\sqrt{N}}}{\sqrt{\sum{\frac{(x_i - \bar{x})^2}{\sigma^2}}/(N-1)}}
$$

We can then define the sample standard deviation as 

$$
s^2 = \frac{1}{n-1} \sum (x_i - \bar{x})^2
$$

and cancel out the factors of $\sigma$ in the definition of $t$ to obtain:

$$
t = \sqrt{N} \frac{ \bar{x} - \mu}{\sqrt{s^2}}
$$

which is follows the student's t distribution with n-1 degrees of freedom.  The important aspect of this quantity is that it depends on the true mean $\mu$ but does not depend on the true standard deviation $\sigma$ (it canceled out above).  We will later show that we can use this test statistic to perform inference on the true mean $\mu$ without knowing or assuming the true standard deviation $\sigma$ (we only need to assume that the underlying distribution is a Gaussian).

The probability distribution for the student's t distribution can be calculated by starting with the PDF distributions for a gaussian and for a chi-squared and applying the laws of probabilistic transformation.

  
- http://www.math.ntu.edu.tw/~hchen/teaching/StatInference/notes/lecture35.pdf


It is shaped like a gaussian, but has larger tails (because the fact that we are using the sample mean and not the true mean adds additional "uncertainty" to the distribution).

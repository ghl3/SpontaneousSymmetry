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

A Bernoulli random variable can represent anything that has a binary outcome, such as the outcome of a sports game, the winning of the lottery, or whether or not an event will occur over a fixed period of time.  Because it is so versatile, it forms the basis for many of the distributions that will follow.

The Bernoulli distribution is simple because its distribution is fully specified by its definition.  For other distributions, it will take more work to go from their definition (such as "a series of coin flips") to the mathematical function representing its probability distribution function. 

## Binomial Distribution

The binomial distribution is an extension of the Bernoulli distribution: it represents an aggregate of multiple Bernoulli random variables (all with the same probability of heads, $p$).  Specifically, the binomial distribution is a 2-parameter distribution that describes the number of Bernoulli random variables, $n$, whose value is 1 (or "heads" or "up") out of a possible $N$.

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

The binomial distribution here is the distribution of the total number of heads.  In this case, $N=3$ and probability of the various outcomes is given by:

$$
\begin{align}
binom(0 | N=3, p) =& (1-p)(1-p)(1-p) \\
binom(1 | N=3, p) =& (1-p)(1-p)p + (1-p)p(1-p) \\
                   &  + p(1-p)(1-p) \\
binom(2 | N=3, p) =& (1-p)pp + p(1-p)p + pp(1-p) \\
binom(3 | N=3, p) =& ppp \\
\end{align}
$$

One create such a table for $N$ just by enumerating the possibilities, just as we did above with $N=3$.  Thus, it's simple to calculate the Binomial distribution from first principles, starting with the Bernoulli distribution (though it may be quite tedious for large $N$).  

One could program a computer to perform these calculations, thereby fully specifying the binomial distribution.  To make the calculations simpler and easier to write down, one can leverage combinatorics.  Doing so, the binomial distribution may be written as:

$$
Binom(n | N, p) = \frac{N!}{n!(N-n)!}p^n(1-p)^{(N-n)}
$$


## Beta Distribution

The Beta Distribution is closely related to the Binomial distribution.  As described above, the binomial distribution describes the probability of flipping $n$ heads out of a total of $N$ using a weighted coin with probability of heads $p$:

$$
p(n | N, p) = Binom(n, N, p)
$$

Imagine we have such a coin but don't know the value of its weight factor $p$.  We could try to infer it by flipping the coin $N$ times and calculating the $n$ heads we get.  We can invert this to obtain the probability of $p$ in terms of $n$ and $N$.  Recall that Bayes theorem tells us that we can invert the probability according to the following:

$$
p(A | B) = \frac{P(A) P(B | A)}{\int P(B | A) P(A) dA}
$$

Applying this to our binomial distribution of coin flips and assuming a flat prior on $p$ such that $P(p) = 1$, we get:

$$
P(p | n, N) = \frac {P(p) P(n | p, N)} {\int P(n | p, N) P(p) dp}
$$

which, when we plug in the definition of the binomial distribution for $P(n | p, N)$ gives us:

$$
P(p | n, N) = \frac {p^n(1-p)^{N-n}} {\int x^n(1-x)^{N-n} dx}
$$

where we have canceled out factors of $\frac{N!}{n!(N-n)!}$.  We then make the following definitions:

$$
\begin{eqnarray}
\alpha &=& n + 1 \\
\beta &=& N - n + 1 \\
B(x, \alpha, \beta) &=& \int x^{\alpha-1} (1-x)^{\beta-1} dx \\
\end{eqnarray}
$$

which gives us

$$
Beta(p | \alpha, \beta) = \frac {p^{\alpha-1} (1-p)^{\beta-1}} {B(p, \alpha, \beta)}
$$

This is the definition of the Beta distribution.  The interpretation is that we can use it to infer the distribution of the parameter $p$ of a binomial distribution given the counts of heads and tails.

The Beta distribution turns out to be the "conjugate prior" to the binomial distribution.  Mathematically, this means that:

$$
\begin{eqnarray}
P(p | \alpha, \beta, n, N) &=& \frac{Binom(n | N, p)*Beta(p | \alpha \beta)} {\int Binom(n |x, N) Beta(x | \alpha, \beta) dx} \\
 &=& Beta(p | \alpha', \beta')
\end{eqnarray}
$$

In other words, if we have a prior belief on $p$ that is represented by $\alpha$ and $\beta$, and we measure $n$ heads of a total of $N$ from a binomial distribution, then our posterior belief in the distribution of $p$ is also a beta distribution with new parameters $\alpha'$ and $\beta'$, where

$$
\begin{eqnarray}
\alpha' = \alpha + n \\
\beta' = \beta + (N-n)
\end{eqnarray}
$$

This means that that if we have a prior believe of $p$ represented by $\alpha$ and $\beta$ and we observe $h$ heads and $t$ tails, then our posterior is represented by $\alpha+h$ and $\beta+t$.  This makes the process of updating extremely easy, which is why it is so often used when performing inference on binomial distributed data.


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

which describes the probability of n events occurring in a time period during which we expect $\lambda$ events on average.


## Gaussian Distribution

Unlike the previous distributions, we will not motivate the Gaussian distribution from a specific scenario (flipping coins, etc), but instead will motivate it from a more general fact, known as the Central Limit Theorem.  The Central Limit Theorem states that the distribution of the sum of MANY independent random variables (each having an arbitrary distribution with loose conditions) will tend to a Gaussian distribution.  For example, if I add together many Bernoulli variables, their sum will tend toward a gaussian distribution (we know that their sum is exactly a Binomial distribution, which also implies that a Binomial distribution tends toward a Gaussian distribution as $N \rightarrow \infty$) .  

This is a complicated theorem to prove, so we will here only assert it.  However, it is very powerful and implies that Gaussian distributions will arise naturally in many situations.  For example, consider a process that has many small errors.  Even if we don't know the distribution of individual errors, if there are sufficiently many independent errors, their sum, the total error, will follow a Gaussian distribution.  Therefore, it is common to model the errors of situations when the exact error is unknown as a Gaussian distribution (with unknown parameters).

The Gaussian distribution describes a 1-dimensional continuous variable, $x$, as a function of two parameters: $\mu$ and$\sigma$. The distribution is given by:

$$
gauss(x | \mu, \sigma) = \frac{1}{\sqrt{2\sigma^2\pi}} e^{-\frac{(x-\mu)^2}{2\sigma^2}}
$$

Using the formula above, one can show that the mean of the distribution if $\mu$ and the standard deviation is given by $\sigma$.  In fact, the parameters $\mu$ and $\sigma$ are often referred to as the "mean" and "standard deviation".

Because the gaussian distribution is so ubiquitous, it is worthwhile to spend some time to understand it's properties.  Imagine w draw $n$ points from a gaussian describing the random variable $x$ and take the mean of those measured points.  We define that "sample mean" of $x$ to be $\bar{x}$, nothing that this refers to the mean of a specific realized sample.  The quantity $\bar{x}$ is itself a random variable (as it is just a function of the data) and therefore it has a distribution that depends on the model and it's parameters.  On can mathematically show that the distribution of $\mu_s$ is itself a gaussian and is given by 

$$ p(\bar{x} | \mu, \sigma, n) = Gauss(\mu, \frac{\sigma}{\sqrt{n}}) $$

<!-- Reference: https://onlinecourses.science.psu.edu/stat414/node/173-->

It is a remarkable mathematical coincidence that the sample mean follows the same distribution family as the gaussian itself; this is not a property that other distribution functions will have.

The $\frac{1}{\sqrt{n}}$ part of that formula is important: it means that the standard deviation of the sample mean drops by $1/\sqrt{n}$ as you draw more and more points.  If you are trying to measure the value of $\mu$ of a gaussian distribution, you can do so by observing many points drawn from it and calculating the sample mean of those points, $\bar{x}$.  If you observe many points, that distribution of $\bar{x}$ will be tightly centered around the expected sample mean, $\frac{\mu}{\sqrt{n}}$, and you can use that to infer the true value of $\mu$.


## Chi-Squared Distribution


The Chi-Squared distribution is closely related to the gaussian distribution.   

Let's say we have a gaussian distribution: $x \sim gauss(x, \mu, \sigma)$ with known parameters $\mu$ and $\sigma$.  Define another random variable named $z_1^2$ by:

$$
z_1^2 = \frac{(x_1 - \mu)^2}{\sigma^2}
$$

(By this, we mean that one produces a draw of the random variable named $z_1^2$ by drawing an instance of $x$ from the gaussian above, subtracting $\mu$, and dividing by $\sigma^2$). 

The distribution of our newly defined variable $z_1^2$ is known as the Chi-Squared distribution with "1 degree of freedom".  

Imagine we instead draw two numbers from two independent gaussian distributions (or the same distribution twice, as long as the second draw is independent) and define the random variable:

$$
z_2^2 = \frac{(x_1 - \mu)^2}{\sigma^2} + \frac{(x_2 - \mu)^2}{\sigma^2}
$$

The distribution of this variable is known as the Chi-Squared distribution with "2 degrees of freedom".

To generalize this, imagine we consider N different gaussian distributions, each with known but possibly different values of $\mu_i$ and $\sigma_i$, and each statistically independent from each other.  We draw a value from each to form the set $\{x_i\}$ and define:

$$
z^2_N = \sum_i \frac{(x_i - \mu_i)^2}{\sigma_i^2}
$$

The distribution of $z^2_N$ is the Chi-Squared distribution with "N degrees of freedom".  The mean of the Chi-Squared distribution with N degrees of freedom is N (simply enough).  By construction, the distribution of the sum of two Chi-Square distributed variables is itself Chi-Square distributed:

$$
\chi^2_n + \chi ^2_m \sim \chi ^2_{n+m}
$$

The domain of the Chi-Squared distribution is all non-negative real numbers.  The formula for the probability distribution function is given by:

$$
\chi^2(x, n) = \frac {x^{\frac{n}{2} - 1}e^{-x/2}} {2^{n/2}\Gamma(\frac{n}{2})}
$$

where $\Gamma$ is the Gamma Function.

<!--

In order to calculate the test statistic $Z^2_N$, one must know BOTH the true mean, $\mu$, and the true standard deviation, $\sigma$.  We will later show how one can use the Chi-Squared distribution to perform inference on these parameters.  However, often one only wants to perform inference on one of these parameters, usually the true mean $\mu$.  In these cases, one must either know the true standard deviation, must assume it, or must use another test statistic (with another distribution). 

For example, if one has a gaussian variable $x$ with true mean $\mu$ and true variance $\sigma^2$ and draws n samples from it, one can show that the quantity

$$
\chi^2 = \sum_i \frac{(x - \overbar{x})}{\sigma^2}
$$

follows a chi-squared distribution with n-1 degrees of freedom.  This is an exact relationship and can be proven using Cochran's theorem.

-->

Important in the definition of the Chi-Squared distribution is the requirement that the gaussians being squared and added all be independent.  However, it is common to encounter statistical situations involving the sum of squares of gaussians htat are not all independent, but instead are correlated due to the presence of one or more linear constraints on their values.  A linear constraint is a fixed linear relationship between the values of these gaussian random variables, which typically takes the form of the sum of 2-or-more of the variables equaling some fixed value.

If I have n gaussian variables, $g_1, ..., g_n$, and I have m linear constraints on the values of these variables, then one can show that the sum of the squares of these variables is distributed as:

$$
\sum_i g_i^2 \sim \chi^2_{n-m}
$$

In the typical language, the degrees of freedom of the chi-squared is given by the number of independent variables minus the number of constraints applied.  This is known as Cochran's theorem, which more generally states that the sums of quadratic terms of gaussian variables can be expressed as the sum of terms where each term is distributed as a Chi-Squared, and the number of degrees of freedom of each chi-squared is the number of linearly independent combinations of the $x_i$ variables in that term.  

The typical proof of this describes the linear constraint as a projection operator that maps the space of constrained-and-correlated gaussian variables to a sub-space in which the gaussian are uncorrelated.  It can be shown that this projection preserves the sum of the squares in the original space (essentially because the trace of a matrix is invariant under orthogonal transformations).

<!--



http://sites.stat.psu.edu/~drh20/asymp/lectures/p175to184.pdf

http://courses.education.illinois.edu/EdPsy580/lectures/7ChiSq_Fdist_05_online.pdf

-->

## Gaussian Distribution, continued

With the Chi-Squared distribution in hand, we can state another property of the gaussian distribution.  Imagine that we draw n samples from a gaussian distribution with mean $\mu$ and standard deviation $\sigma$.  We then calculate the quantity:

$$
Z^2 = \frac{1}{n} \sum (x_i - \mu)^2
$$

This is like a sample variance, but we are using the true mean, $\mu$, and not the sample mean.  We can re-write this equation as:

$$
\frac{Z^2n}{\sigma^2} = \sum \frac{(x_i - \mu)^2}{\sigma^2}
$$

We see that quantity on the right-side of this equation is described by a Chi-Squared distribution with n degrees of freedom (as $x_i$ are drawn from a gaussian with mean $\mu$ and standard deviation $\sigma$).  We can then directly state that the distribution of $Z^2$ is given by:

$$
\frac{Z^2}{\sigma^2} \sim \frac{1}{n} \chi^2_{n}
$$

Note that, in the above equation, we are assuming that we know the true standard deviation $\sigma$.  Thus, if we know $\mu$ and $\sigma$, we can calculate the distribution of $Z^2$.  

More useful, however, is an expression for the distribution of the sample variance, $var(x)$, which we define as
<!--
 common, however, is the situation where $\sigma$ is unknown A more useful relationship uses the sample mean, $\bar{x}$, and the sample variance, $var(x)$, defined as:
 -->

$$
var(x) = \frac{\sum (x_i - \bar{x})^2}{n-1}
$$

To obtain this distribution, we start with the quantities

$$
U_i = \frac{x_i - \mu}{\sigma}
$$

and create the following expression:

$$
\sum U_i^2 = \sum(\frac{x_i - \mu}{\sigma})^2 = \sum \frac{x_i - \bar{x}}{\sigma}^2 + N (\frac{\bar{x} - \mu}{\sigma})^2
$$

This final quantity is the sum of quadratic terms in $x_i$, where the $x_i$ are independent.  By Cochran's theorem, described above, we can show the following important fact:

- $\sum (\frac{x_i - \bar{x}}{\sigma})^2$ is distributed as a Chi-Squared with n-1 degrees of freedom
- $ N\frac{(\bar{x} - \mu)^2}{\sigma^2}$ is distributed as a Chi-Squared with 1 degree of freedom
- These two quantities are independent of each other

The first of these terms can be related to the sample variance and the second can be related to the sample mean (given fixed true values of $\mu$ and $\sigma$).  This allows us to show that the distribution of the sample variance is given by:

$$
var(x) \sim \frac{\sigma^2}{(n-1)} \chi^2_{n-1}
$$

and, importantly, that it is independent of the distribution of the sample mean.  The fact that the sample mean and sample standard deviation are independent is unique to the gaussian distribution and, in fact, fully specifies the gaussian, a property known as Basu's theorem. These facts will be important when performing inference on the gaussian distribution (trying to infer $\sigma$ and $\mu$ given a sample of gaussian-distributed data).  This will be discussed in a later section.

<!--

https://stats.stackexchange.com/questions/121662/why-is-the-sampling-distribution-of-variance-a-chi-squared-distribution

https://en.wikipedia.org/wiki/Cochran%27s_theorem#Sample_mean_and_sample_variance

https://en.wikipedia.org/wiki/Basu%27s_theorem

Reference: http://courses.education.illinois.edu/EdPsy580/lectures/6ChiSq_Fdist_ha.pdf
-->

To summarize, if we draw n points from a gaussian distribution:

$$
\begin{eqnarray}
\bar{x} \sim gaus(\mu, \frac{\sigma}{\sqrt{n}}) \\
var(x) \sim \frac{\sigma^2}{(n-1)} \chi^2_{n-1} \\
\end{eqnarray}
$$

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

We can then define the sample variance as 

$$
s^2 = \frac{1}{n-1} \sum (x_i - \bar{x})^2
$$

and cancel out the factors of $\sigma$ in the definition of $t$ to obtain:

$$
t = \frac{ \bar{x} - \mu}{\sqrt{s^2 / N}}
$$

which, by construction, follows the student's t distribution with $n-1$ degrees of freedom.  The important aspect of this quantity is that it depends on the true mean $\mu$ but does not depend on the true standard deviation $\sigma$ (it canceled out above).  We will later show that we can use this test statistic to perform inference on the true mean $\mu$ without knowing or assuming the true standard deviation $\sigma$ (we only need to assume that the underlying distribution is a Gaussian).

The probability distribution for the student's t distribution can be calculated by starting with the PDF distributions for a gaussian and for a chi-squared and applying the laws of probabilistic transformation, but we will not do so here.  A student's t-distribution is shaped like a gaussian, but has larger tails.  The standard interpretation of the longer tails is the fact that we are using the sample mean and not the true mean in it's definition, which adds additional "uncertainty" to the distribution.

<!--
- http://www.math.ntu.edu.tw/~hchen/teaching/StatInference/notes/lecture35.pdf
-->


## F-Distribution


The F-Statistic is a random variable that can be generated from two independent Chi-Squared distributed variables.  Given $U_1$ which follows a Chi-Squared distribution with $d_1$ degrees of freedom and $U_2$ with $d_2$ degrees of freedom (with the two distributions independent), we define the F-Distribution (with degrees $d_1$ and $d_2$) as the distribution of the random variable $F$ defined as:

$$
F = \frac{U_1/d_1}{U_2/d_2}
$$

Equivalently, one can define an F-statistic from Gaussian distributions.  Imagine we have a gaussian distributed variable $g_1$ with parameter $\sigma_1$ and another independent variable $g_2$ with parameter $\sigma_2$, and we draw $n_1$ values from $g_1$ and $n_2$ values from $g_2$.  Letting $s_1$ be the sample variance of the draws from $g_1$ and $s_2$ be the sample variance from the draws from $g_2$, then the following quantity follows the F-Distribution (with $n_1-1$ and $n_2-1$ degrees of freedom):

$$
F = \frac{s_1^2/\sigma_1^2}{s_2^2/\sigma_2^2}
$$

Note that the F distribution is NOT symmetric in terms of its parameters $d_1$ and $d_2$.  The domain of $F$ is from 0 to infinity.

The mean of an F distribution with $d_1$ and $d_2$ is given by:

$$
\bar{F}_{d_1, d_2} = d_2 / ( d_2 - 2 )
$$

and it's variance is given by:

$$
var(F_{d_1, d_2}) = \frac{ 2 d_2^2 ( d_1 + d_1 - 2 ) }  { d_1 ( d_2 - 2 )^2 ( d_2 - 4 ) }
$$

A common application of the F-statistic is known as the "Analysis of Variance", or ANOVA.  Consider a situation when one has a multiple measurement of a continuous variable that is separated into several groups.  The goal of an anova analysis is to determine if the distribution of the variable is different in the various groups (in other words, does the group have any effect on the variable).  To measure this, imagine we have N measurements of a variable $y$ with $y_{ij}$ being the $i^{th}$ measurement of the $j^{th}$ group.  We have K groups total, and the size of the $i^{th}$ group is $n_i$.

First, define the means:

$$
\begin{eqnarray}
\overline{Y_i} &=& \text{mean of group i} \\
\overline{Y} &=& \text{The total mean of the data (across all data points)} \\
\end{eqnarray}
$$ 

Next, we define a quantity called the "between-group variability".  If we assume that the distribution of $y$ is independent of the group label, and that we have many samples in each group, then the mean of the $i^{th}$ group $Y_i$ is a gaussian distributed variable about the true mean $\mu$ (which we assume to be the same across all groups) with variance given by $\sigma^2/n_i$.  With that in hand, we can define the following quantity:

$$
\text{between-group variability} = \frac{ ( \overline{Y_i} - \overline{Y})^2}{\sigma^2 / n_i}
$$

which follows a chi-squared distribution with K-1 degrees of freedom, as it is the sample mean of K (approximately) gaussian distributed variables (each variable being the group mean).  We call this quantity the "between-group variability".

We then define a quantity called the "within-group variability".  For each group j, we can define the sample variance:

$$
s^2_j = \sum_i \frac{(y_{ij} - \overline{Y_j})^2}{\sigma^2}
$$

and we know that this follows a chi-square distribution with $n_i - 1$ degrees of freedom (again, we know that under the null distribution, the true mean of each group is $\sigma$).  We can sum them all up to get the quantity:

$$
\text{within-group variability} = \sum_j \sum_i \frac{(y_{ij} - \overline{Y_j})^2}{\sigma^2}
$$

And since each term follows a chi-squared with $n_i-1$ degrees of freedom, the total sum follows a chi-squared with $\sum_i (n_i - 1)$ degrees of freedom, which is also equal to $N-K$.

With these two in hand, we can define the following term:

$$
F = \frac{\text{between-group variability} / (K-1)} {\text{within-group variability}/(N-K)}
$$

As shown above, the numerator follows a chi-squared with $(K-1)$ degrees of freedom divided by $(K-1)$, and the denominator follows a chi-squared with $(N-K)$ degrees of freedom divided by $(N-K)$.  Therefore, F follows a F-distribution with degrees $(K-1)$ and $(N-K)$ (under the null hypothesis).  This is where the null hypothesis comes in: If, as we supposed, the true variance is the same across groups, then when we divide the numerator by the denominator, the $\sigma^2$ terms cancel out.  Thus, we can calculate F directly from the data without knowing or supposing $\sigma$.


<!--
https://en.wikipedia.org/wiki/F-test

http://courses.education.illinois.edu/EdPsy580/lectures/7ChiSq_Fdist_05_online.pdf

http://stattrek.com/probability-distributions/f-distribution.aspx

https://www.youtube.com/watch?v=ITf4vHhyGpc
-->



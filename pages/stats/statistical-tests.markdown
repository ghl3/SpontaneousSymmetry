---
author: 
date: 2016-09-03 11:25:54.397075
layout: post
slug: statistics-cheat-sheet
title: Statistics Cheat Sheet
id: 446
---


Having spent some time building up a framework for statistical reasoning, let's apply it to a number of examples.  Many of these were touched upon in previous sections, but are here repeated to make this a complete reference for common statistical tests and problems.


### Comparing measured data to a Gaussian Distribution

***I have a dataset consisting of a number of 1-d observations.  I know the true variance of my sample, but the mean is unknown to me.  I would like to perform inference on the mean $\mu$.***

Apply a Gaussian Z-test.  A Z-test allows us to perform two types of inference:
- Calculate a p-value that the data is generated form a fixed $\mu_0$
- Calculate a confidence interval on the inferred value of $\mu$

The test statistic is the Z-score of the data:

$$
z = \frac{\hat{x} - \mu}{\sigma/\sqrt{n}}
$$

where

- $\bar{x}$ as the sample mean
- n is the sample size
- $\mu$ is theoretical mean of the distribution we're testing against
- $\sigma$ is the known variance of the distribution

This test statistic follows a gaussian distribution:

$$
z ~ gauss(1, 0)
$$

- To perform a p-value test for a fixed $\mu_0$, plug  $\mu_0$ in for $\mu$ in the definition for $Z$, calculate $Z$ for the given dataset, and then use the known CDF distribution to calculate either the 1-sided or 2-sided p-value.  Compare this to a threshold to see if $\mu_0$ is accepted or rejected
- To calculate a confidence interval of size $\alpha$, use the known gaussian CDF to find the value of $z_0$ such that the 2-sided probability of $|z| < z_0 = \alpha$.  Invert the equation for $z(\mu_0) = z_0$ to find $\mu_0$, the boundary of the confidence interval on $\mu$

Note that sample mean is a sufficient test statistic for estimating the mean of a gaussian distribution, so this test is the best that one can do (we lose no information relative to the full data distribution when we take the mean as our test statistic).  This fact makes tests with gaussians much easier to calculate without loss of power.

References:

- https://en.wikipedia.org/wiki/Z-test
- http://www.statsdirect.com/help/parametric_methods/z_normal.htm
- https://people.richland.edu/james/lecture/m170/ch09-mu.html


__


***I have a dataset consisting of a number of 1-d observations.  I don't know what the true variance is, but I don't need to infer it.  Does my data come from a Guassian distribution with a known mean?*** 

<!--If I assume that my data comes from some Gaussian distribution with unknown mean and unknown variance, does it come from a gaussian with a given mean (regardless of the unknown variance)?-->

In this instance, we are going to perform a p-value test to compare our data to a gaussian model with a known mean.  However, we are allowing any possible variance for the gaussian, which introduces a nuisance parameter.  In order to perform the test, we must think of a way to handle the nuisance parameter.  When calculating a p-value, we can always scan over the full space of nuisance parameters and take the extrema among all calculated p-values.  But, in general, this procedure tends to be less powerful than other alternatives.

Thankfully, in this case, we can apply a t-test.  As discussed in the <a href="#students-t">section</a> on the t-distribution, the following test statistic follows a t-distribution:


$$
t = \frac{\hat{x} - \mu}{s/\sqrt{n}}
$$

where,  $\bar{x}$ is the sample mean, $s$ is the sample variance, and n is the sample size.

We can use the t-distribution to create a confidence interval in the parameter $\mu$ with size $\alpha$ by finding all points in the space of $\mu$ that have a probability of data (p-value) greater than $\alpha$.

References:

- http://lap.umd.edu/psyc200/handouts/psyc200_0810.pdf
- http://www.statisticssolutions.com/manova-analysis-one-sample-t-test/

__


***I have a dataset consisting of a number of 1-d observations.  Does my data comes from a Gaussian distribution with a specific mean and variance?***

Unlike previous examples, we're here looking to perform simultaneous inference on two parameters.  Instead of making a confidence interval for a single parameter, we instead will attempt to make a confidence region, consisting of a 2-d region in ($\mu$, $\sigma$) space.

The brute force procedure to accomplish this is well defined:
- Pick a test statistic (which may be a pair of statistics)
- For each point in ($\mu$, $\sigma$) space, find the distribution of the test statistic
- Using each distribution, define a region whose integral contains $\alpha$ of integrated probability (where $\alpha$ is the size of the test)
- Measure the test statistic
- The confidence region consists of all points in ($\mu$, $\sigma$) where the measured value of the test statistic falls within the $\alpha$ sized region.

This procedure, however, can be computationally intensive.  Moreover, it requires coming up with a test statistic that has power to constrain both $\mu$ and $\sigma$, which may be difficult (or, it may be difficult to determine the distribution of that statistic and to integrate it to find regions of size $\alpha$.

Luckily, the gaussian distribution has properties that make this calculation easier.  If we recall the definitions:

$$
t = \frac{\bar{x} - \mu}{s/ \sqrt{n}}
$$
$$
s^2 = \sum (\frac{x_i - \hat{x}}{\sigma})^2
$$

then, we can leverage the following properties:

- The distribution of t is a Student's T distribution and the distribution is independent of the true values of $\mu$ or $\sigma$
- The distribution of $s^2$ is a Chi-Squared distribution and is also independent of the true values of $\mu$ or $\sigma$
- The two distributions are independent of each other
- t only depends on $\mu$ (not $\sigma$) and $s^2$ only depends on $\sigma$ (not $\mu$)

Knowing this, one can consider the somewhat simple test statistic $(t, s^2)$.  These two variables are independent, and therefore we can write down the distribution:

$$
p(t, s^2) = t_{n-1}\chi^2_{n-1}
$$

Importantly, as we discussed above, this is the distribution for all values of $\mu$ and $\sigma$ (and this is possible because $\mu$ and $\sigma$ are used in the definitions of $t$ and $s^2$ to cancel out their influence on the distribution).

Even with this distribution in hand, however, we are not done.  There is a lot of ambiguity in how we use this distribution to define the confidence regions.  Specifically, we must find a region in $(t, s^2)$ with total integrated probability of size $\alpha$.  There are many such regions!  And so we have to agree in advance on which region we're interested in.  In doing so, one may think through the following considerations:

- Simplicity of defining the region
- Symmetry of the region
- Minimizing the overall area of the region

(In this example, one has freedom to, in a sense, divvy the $alpha$ between the distributions of $t$ or $s^2$, making the region very wide in $t$ and narrow in $\sigma$, or visa versa, as long as it's total area integrates to $alpha$).

One reasonable choice is to define a region defined by $(-|a| < t < |a|)$ and $(b < s^2 < c)$ with $a = \alpha_1/2$ 

$$
Region = \{ \bar{x} - a \frac{\sigma}{\sqrt{n}} < \mu < \bar{x} + a \frac{\sigma}{\sqrt{n}}, \\
 \frac{\sum(x_i - \bar{x})^2}{c} < \sigma^2 <  \frac{\sum(x_i - \bar{x})^2}{b}\}
$$

This region is a trapezoid, as $\bar{x}$ appears in both the $\mu$ and $\sigma$ region.

https://www.math.tecnico.ulisboa.pt/~apacheco/ID1/artigo%20n%BA2.pdf

___

### Comparing measured data to a various distributions

***I have measured $N_succ$ successes out of a total of N trials.  I assume that my data comes from a binomial distribution and I want to perform inference on the true success rate p***

If N is large, one can take into account the fact that a binomial distribution approaches a normal distribution.  The mean of the gaussian approximation is given by:

$$
\mu = p*N
$$

and the standard deviation parameter is given by:

$$
\sigma = \sqrt{\frac{1}{n}p(1-p)}
$$

Following the normal logic of calculating gaussian confidence intervals, 

TODO:
- Wilson Approximate Interval
- Clopper–Pearson exact interval


https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval


***I have measured $N$ counts.  I assume that my data comes from a poisson distribution and I want to perform inference on the true rate $\lambda$***

TODO: Gaussian Approximation
TODO: Garwood exact interval

https://arxiv.org/pdf/1412.0442.pdf
https://www.immagic.com/eLibrary/ARCHIVES/GENERAL/WIKIPEDI/W121109P.pdf
https://www.ine.pt/revstat/pdf/rs120203.pdf



***Does my data come from some known (but arbitrary) continuous probability distribution?***

Perform a one-sample Kolmogorov-Smirnov test.

A K-S test is an exact test comparing the distribution of a sample to a known theoretical distribution.  The K-S test is valid regardless of the underlying distribution the data is being compared to.  The exactness, however, only applies if the theoretical distribution being compared against is fully specified: one cannot fit parameters from the data and then perform a K-S test.

The test statistic for a K-S test is is the the maximum deviation between the theoretical CDF and the empirical CDF of the measured data.

$$
Dn=sup_x[|Fn(x)−F_0(x)|]
$$

where the $sup_x$ is the suprema (maximum), $Fn(x)$ is the nth value of the empirical cumulative distribution, and $F_0(x)$ is the value of the true distribution at point $x$.

The distribution of this test statistic, under the hypothesis that the data is drawn from the true distribution $F$, is independent of the true distribution $F$.  Therefore, one can use it as a pivotal quantity and compare the value of the test statistic to the known distribution of a K-S test statistic.  The distribution of this test statistic is typically used via a lookup table.


References:

- http://www.itl.nist.gov/div898/handbook/eda/section3/eda35g.htm

___


***Does my binned data come from a known distribution (describing binned data)?***

If one has a binned dataset consisting of measured bin counts and a theoretical distribution that predicts the expected bin count, one can use a Chi-Squared test (goodness-of-fit test) to calculate the p-value that the data was generated by the theoretical distribution.

If one's theoretical distribution is continuous, but one is drawing many values from it and binning them, one may also uses this Chi-Squared test.  One may determine the theoretical number of counts in a bin by the total number of values drawn times the total probability within a given bin.

This is an approximate test.  It assumes that the number of data points in each bin are large enough for their uncertainties to be approximated by a gaussian distribution.

To perform the test, one calculates the test statistic:

$$
\chi^2 = \sum_i (h_i - T_i)^2 / T_i
$$

where:
- $h_i$ is the measured number of counts in bin i (the measured height)
- $T_i$ is the theoretical number of counts in bin i (the theoretical height)

Here, we assume that the error on the size of each bin is the square root of the theoretical value, $T_i$.  This makes sense in the case where the theoretical bin hight is given by drawing poisson counts with some overall expected rate.  However, if one has other external knowledge of the errors, one can leverage these here.

This test statistic follows a chi-squared distribution with degrees of freedom $d$, where $d$ is the number of non-empty bins. This is evident because, if $\sqrt{T_i}$ is the uncertainty on the bin height (or if we use an otherwise-known uncertainty) each term above, $(h_i - T_i)^2 / T_i$, is gaussian distributed.  Thus, $\chi^2$ above is the sum of the square of gaussian distributed variables and is therefore follows a chi-square distribution.

If the theoretical distribution was obtained by fitting a parameterized distribution, then the number of degrees of freedom is given by:

$$
d = (number of non-empty bins) - (number of parameters fitted in obtaining the theoretical distribution)
$$


For further discussion of chi-squared tests, see <a href="#chi-squared">here</a>.


References: 

- http://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm
- http://stattrek.com/chi-square-test/goodness-of-fit.aspx?Tutorial=AP

___


### Determining if two measured datasets came from the same distribution.


If we first assume that the two distributions are both normal (gaussian) distributions, then there are a variety of tests we can employ, depending on further assumptions


*** I have two datasets of continuous data, and I assume that they are both drawn from gaussian distributions and those distributions have the same mean, which is unknown to me.  I want to determine if the two gaussian distributions have the same mean.***

This can be solved by performing a t-test.

Assume that we have:

- Sample X consisting of n samples with true mean $\mu_X$, sample mean $\bar{X}$ and sample variance $S_X^2$
- Sample Y consisting of m samples with true mean $\mu_Y$, sample mean $\bar{Y}$, and sample variance $S_X^2$.
- The true variance of samples X and Y are the same (which is an unknown nuisance parameter $\sigma$)

Define the "pooled sample variance" to be:

$$
S_p^2 = \frac{(n-1)S_X^2 + (m-1)S_Y^2}{n+m-2}
$$

Under these conditions, the following test statistic is t-distributed:

$$
T = \frac {(\bar{X} - \bar{Y}) - (\mu_X - \mu_Y)} {S_p \sqrt{\frac{1}{n} + \frac{1}{m}}}
$$

This can be shown by noting that the distribution of $\bar{X}$ is a gaussian with mean $\mu_X$ and variance $\frac{\sigma}{n}$, and similarly for sample Y.  Since the samples are independent, their difference is also a gaussian:

$$
\bar{X} - \bar{Y} \sim Gauss(\mu_X - \mu_y, \frac{\sigma^2}{n} + \frac{\sigma^2}{m})
$$

By the properties of the gaussian distribution, we also know that the sample variances are Chi-Square distributed (with n-1 and m-1 degrees of freedom) and are independent of the sample means, and are independent of each other.  This implies that their sum is also distributed like a Chi-Squared with (n+m-2) degrees of freedom:

$$
U = \frac{(n-1)S^2_X}{\sigma^2} + \frac{(m-1)S^2_Y}{\sigma^2} \sim \chi^2_{n+m-2}
$$

So, we have two quantities, T and U.  T is a gaussian, and U is a Chi-Squared.  We can use them to construct a variable that is t-distributed by calculating:

$$
T = \frac{Z}{\sqrt{U/(n+m-2)}}
$$

This follows the student's t distribution by construction, and it reduces to the value of $T$ above (importantly, the value of $\sigma$ cancels out, making the test statistic independent of the nuisance parameter).

The distribution of the difference in mean of the two samples (assuming that they are both gaussian with the sam variance) follows a t-distribution.

https://onlinecourses.science.psu.edu/stat414/node/201

This is an exact test, applicable for all values of n and m.  Further, if the sample sizes n and m are the same, this test will be robust against deviations from the normal distribution assumption.


*** I have two 1-d datasets drawn from gaussian distributions, but I don't assume anything about the means and variance of those distributions.  I want to know if both distributions are the same.***

This problem is known as the Behrens-Fisher Problem.  A number of approximate solutions exist.

The most famous approximate solution is "Welch's t-test", which creates a test statistic that is approximately t-distributed (under certain conditions).

https://en.wikipedia.org/wiki/Behrens%E2%80%93Fisher_problem
http://www.sciencedirect.com/science/article/pii/S0378375806002382
http://www.sciencedirect.com/science/article/pii/S0378375806002382


***I have two datasets of continuous data.  I have no assumptions about the underlying distribution that generated them.  I want to test if they came from the same continuous probability distribution***

Perform a two-sample Kolmogorov-Smirnov test.


***I have two sets of binary data (weighted coin flips, or counts of successes and failures).  Do they have the same intrinsic rate?***

To solve this, we have to make certain assumptions.  The main assumption that we're going to make here is that each dataset comes from a binomial distribution with a fixed rate.  The question then becomes: for both of these distributions, is the rate the same?

To answer that, we have a few choices

If we assume the samples are sufficiently large and that we can approximate the binomial distribution by a gaussian.  The problem then becomes the same as asking if two gaussian distributions are equal.  One should use a standard Z-Test in this instance.

TODO: Clean this up

*If we want an exact solution (and are willing to assume that the total number of each type and the total number of each category are both fixed)*

Use Fischer's exact test.  This test uses a frequentists p-value to reject the hypothesis that:
- All both groups have the same rate over categories
- That rate over categories is given by the total observed rate of categories (ignoring any groups)

This can be generalized past the binary case for N groups and M categories.

Given those assumptions, the probability of observing n events in group N and category M is given by the hypergeometric distribution.  The "trick" of this assumption is that the distribution ends up no longer depending on the overall rate for each category.  The result essentially reduces to combinatorics: since we are fixing the total number of observations and the total number in each class (as we are only testing against the observed rate), we can get this with combinatorics.  One must then sum these distributions over all possible values in the table to obtain the p-value.

To determine what tables are "more extreme", one must choose a test statistic, which determines an ordering of extremeness.  One popular example is the "Wald" statistic

*If we want an exact solution but want to relax the above requirement*

Use Bernard's test, which allows the number of observations for each class to fluctuate.  In essence, this is a version of Fischer's test that includes the nuisance parameter of the "true" distribution over classes (instead of assuming fixed class numbers).  

Using the binomial distribution directly, one can create an expression for the p-value, but it turns out to depend on the probability distribution over the classes.  One can avoid this "nuisance" parameter by finding the probability distribution that maximizes the p-value (eg makes the result the least extreme).


http://www.nbi.dk/~petersen/Teaching/Stat2009/Barnard_ExactTest_TwoBinomials.pdf


References:

http://www.itl.nist.gov/div898/handbook/prc/section3/prc33.htm

https://en.wikipedia.org/wiki/Fisher%27s_exact_test


### Miscellaneous Problems


***I fit a regression. How statistically significant is the slope?***

If we fit:

Y = a + bx

we are testing the p-value of whether b is equal to 0.  

If we agree with the assumptions of the linear regression fit (that the data is a line with gaussian errors having 0 bias), then it turns out that this follows a t-distribution with n-2 degrees of freedom (where n is the number of points fitted).



#### Test whether the variance of a sample, assumed to be gaussian distributed, has a variance of some fixed value V.

The test statistic is the sample variance divided by the test variance, and the chi-squared distribution has n-1 degrees of freedom (where n is the sample size).


#### Test for independence of 2 groups with 2 categories.  


#### Test for "goodness of fit"


#### Test that N categorical observations match expected distribution (the loaded dice test) 


#### Test for independence of M groups with N categories.

Assume that we have M separate groups, and in each group, individual observations can fall into one of N categories.  We are going to test whether all groups have the same probability distribution over the N categories. 


This is best represented by a table:

|       | category: | X   | Y   | Z   |
|-------|-----------|-----|-----|-----|
| group |           |     |     |     |
| A     |           | nAX | nAY | nAZ |
| B     |           | nBX | nBY | nBZ |
| C     |           | nCX | nCY | nCZ |

In this example, we have 3 sample groups (A, B, and C) and 3 categories that any individual data point can fall into (X, Y, and Z).  We do a sample/experiment/survey and find the group counts, per category, as defined by the `n` values in the table.

To do the test, we take the following procedure:
- For each category, calculate the OVERALL rate of that category (ignoring groups)
- For each group, given the group size and using the OVERALL rate, calculate the expected number of observations of each category
- For each cell, calculate:

    $$\frac{(observed-expected)^2}{expected}$$
    

- Sum these values over all cells to calculate the test statistic
- Compare the test statistic to a chi-square distribution with degrees of freedom equal to (number of rows - 1)*(number of columns - 1)

Reference: https://en.wikipedia.org/wiki/Chi-squared_test




## Specific Tests


#### What is a Gaussian Z test?

Any frequentist p-value based test where the distribution of the test statistic under the null hypothesis is gaussian.


Typically, this involves determining of a distribution of observations is drawn fro a gaussian distribution with known mean and standard deviation.  


Another common set of examples is when examining the maximum likelihood estimate of a statistical fit.  Maximum likelihood estimates are approximately gaussian (and the variance from gaussianity can be determined using the Fisher information).  If $\hat{\theta}}$ is the maximum likelihood estimate of the experiment and $\theta_0$ is the estimate under the null hypothesis, then the following is normally distributed:

$$({\hat{\theta }}-\theta _{0})/{{\rm {SE}}}({\hat  {\theta }})$$


<a name="students-t"></a>
#### What is a Student's t test?

<a name="chi-squared"></a>
#### What is a chi-squared test?


A Chi-Squared test refers to many statistical tests that have one thing in common: the distribution of the test statistic under the null hypothesis follows the chi-squared distribution (with n degrees of freedom, where n can be defined based on the problem at hand).

The chi-squared distribution is the distribution of the sum of the squares of N independent random variables (which turns out to be common, making the chi-squared test useful).

Chi-Squared tests are frequentist and are all based on rejecting a null hypothesis using the p-value.

Chi-Squared tests are approximations that assume sufficient statistics.  There are a few rules of thumbs here:
- At least 5 counts in each observation
- At least 5 counts in at least 80% of observations

It also assumes that all observations are independent.

A subset of all Chi-Squared tests fall into the category of Pearson's chi-squared test, which involves comparing an observed rate of an observation falling into one of several categories to an expected rate (which is either theoretical or derived from a larger dataset).  These tests generally take the following form:

- Calculate the square of the difference between observed rate and expected rate, all divided by the expected rate
- Sum this for every category to form the test statistic
- Determine the degrees of freedom by the number of categories - the number of any "free parameters".

---
author: 
date: 2016-09-03 11:25:54.397075
layout: post
slug: statistics-cheat-sheet
title: Statistics Cheat Sheet
id: 446
---


This is a short reference guide, or cheat sheet, for how to solve some well-defined and well studied statistical questions.

<hr>



### Comparing measured data to an expected distribition


***I have a dataset consisting of a number of 1-d observations.  Does my data comes from a Gaussian distribution with a specific mean and variance?***

To answer this question, one can apply a Gaussian Z-Test.  This is a hypothesis test that calculates the p-value of your data given a gaussian distribution with fully specified mean and variance.  There are no nuisance parameters, so the p-value is well defined.  The p-value is calculated analytically using known properties of the gaussian distribution.

To perform this test, first define:

- $\bar{x}$ as the sample mean
- n is the sample size
- $\mu$ is theoretical mean of the distribution we're testing against
- $\sigma$ is the theoretical variance of the distribution we're testing against

Next, calculate the test statistic as 

$$
z = \frac{\hat{x} - \mu}{\sigma/\sqrt{n}}
$$

This test statistic follows a gaussian distribution and one can use gaussian CDF tables to determine the p-value of the given data (either one-tailed or two-tailed).

References:

- https://en.wikipedia.org/wiki/Z-test
- http://www.statsdirect.com/help/parametric_methods/z_normal.htm
- https://people.richland.edu/james/lecture/m170/ch09-mu.html

___

***I have a dataset consisting of a number of 1-d observations.  Does my data come from a Guassian distribution with a known mean but unknown variance*** 
<!--If I assume that my data comes from some Gaussian distribution with unknown mean and unknown variance, does it come from a gaussian with a given mean (regardless of the unknown variance)?-->

In this instance, we are going to perform a p-value test to compare our data to a gaussian model with a known mean.  However, we are allowing any possible variance for the gaussian, which introduces a nuisance parameter.  We must first think through what we are really trying to determine.  One interpretation is, "Does there exist a gaussian distribution with the given mean and SOME variance which is consistent with the data I'm observing".  




One should apply a one-sample t-test.  This is essentially a Z-test where one doesn't know the population variance.  One therefore must estimate it from the sample, which adds additional uncertainty.

Note that it does not depend on the population size: it is applicable to small populations, assuming the initially stated assumptions are met.


To perform this test, first define:

- $\bar{x}$ as the sample mean
- $s$ is the sample variance
- n is the sample size
- $\mu$ is theoretical mean of the distribution we're testing against

One then calculate the test statistic as 

$$
t = \frac{\hat{x} - \mu}{s/\sqrt{n}}
$$

To calculate the p-value, one compares this test statistic to the CDF of a t-distribution, where the degrees of freedom is n-1 (n being the sample size).

A t-distribution approaches a gaussian as sample size increases.

For further discussion of t-tests, see <a href="#students-t">here</a>.

References:

- http://lap.umd.edu/psyc200/handouts/psyc200_0810.pdf
- http://www.statisticssolutions.com/manova-analysis-one-sample-t-test/

___

***Does my distribution come from some known (but arbitrary) probability distribution?***

Perform a one-sample Kolmogorov-Smirnov test.

A K-S test is an exact test comparing the distribution of a sample to a known theoretical distribution.  The K-S test is valid regardless of the underlying distribution the data is being compared to.  The exactness, however, only applies if the theoretical distribution being compared against is fully specified: one cannot fit parameters from the data and then perform a K-S test.

The test is performed by taking the maximum deviation between the theoretical CDF and the CDF of the measured data  It is performed by comparing the CDF of both distributions in question and does not depend on the underlying CDF being tested.  This test statistic is compared to a look-up table.


References:

- http://www.itl.nist.gov/div898/handbook/eda/section3/eda35g.htm

___


***Does my binned data come from a known distribution?***

Use a chi-squared goodness-of-fit test.  This is an approximate that depends on sufficient sample sizes to be fully accurate.

It is performed by defining:

- $O_i$ as the bin height
- $T_i$ is the theoretical bin height

If the theoretical distribution is continuous, the theoretical bin height, $T_i$, *can* be obtained by taking the value of the continuous variable at the center of each bin, $f_i$, and multiplying it by the sample size, $n$:

- $T_i$ = $f_i$n (if the distribution is continuous)

One need not use the bin center and there are other ways to define this.

The test statistic is calculated as:

$$
\chi^2 = \sum_i (O_i - T_i)^2 / T_i
$$

Note that, in a typical chi-square test, we are summing the square difference between the observed value and the theoretical value divided by the square of the error.

Here, we assume that the error on the size of each bin is the square root of the theoretical value, $T_i$.  This makes sense in the case where the theoretical bin hight is given by drawing poisson counts with some overall expected rate.  However, if one has other external knowledge of the errors, one can leverage these here.

This test statistic is follows a chi-squared distribution with degrees of freedom, $d$, given by:

$$
d = (number of non-empty bins) - (number of parameters fitted in obtaining the theoretical distribution)
$$

(If you are simply handed the theoretical distribution, then $d$ is equal to the number of non-empty bins).

For further discussion of chi-squared tests, see <a href="#chi-squared">here</a>.


References: 

- http://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm
- http://stattrek.com/chi-square-test/goodness-of-fit.aspx?Tutorial=AP

___


## I have two samples of 1-d data.  Do they come from the same distribution?


If we first assume that the two distributions are both normal (gaussian) distributions, then there are a variety of tests we can employ, depending on further assumptions


#### If we assume they are Guassian random variables and that their underlying distributions have the same variance (but possibly different means)

We use the student's t-test.  

The sample sizes may vary here, but if the sample sizes are the same, the test is robust against deviations from the assumption of equal underlying variance of the two distributions.


#### If we assume they are Guassian random variables but with different means and variances

We use Welch's t-test


#### If we are simply wondering if they come from the same distribution, regardless of what that distribution is

Perform a two-sample Kolmogorov-Smirnov test.


## I have two sets of binary data.  Do they have the same intrinsic rate?

To solve this, we have to make certain assumptions.  The main assumption that we're going to make here is that each dataset comes from a binomial distribution with a fixed rate.  The question then becomes: for both of these distributions, is the rate the same?

To answer that, we have a few choices:

#### Assume the samples are sufficiently large and that we can approximate the binomial distribution by a gaussian

The problem then becomes the same as asking if two gaussian distributions are equal.  One should use a standard Z-Test in this instance.

#### Assume that the samples are sufficiently large (but we don't want to make the gaussian approximation)

Use the Chi-Squared Test


#### If we want an exact solution (and are willing to assume that the total number of each type and the total number of each category are both fixed)

Use Fischer's exact test.  This test uses a frequentists p-value to reject the hypothesis that:
- All both groups have the same rate over categories
- That rate over categories is given by the total observed rate of categories (ignoring any groups)

This can be generalized past the binary case for N groups and M categories.

Given those assumptions, the probability of observing n events in group N and category M is given by the hypergeometric distribution.  The "trick" of this assumption is that the distribution ends up no longer depending on the overall rate for each category.  The result essentially reduces to combinatorics: since we are fixing the total number of observations and the total number in each class (as we are only testing against the observed rate), we can get this with combinatorics.  One must then sum these distributions over all possible values in the table to obtain the p-value.

To determine what tables are "more extreme", one must choose a test statistic, which determines an ordering of extremeness.  One popular example is the "Wald" statistic


### If we want an exact solution but want to relax the above requirement

Use Bernard's test, which allows the number of observations for each class to fluctuate.  In essence, this is a version of Fischer's test that includes the nuisance parameter of the "true" distribution over classes (instead of assuming fixed class numbers).  

Using the binomial distribution directly, one can create an expression for the p-value, but it turns out to depend on the probability distribution over the classes.  One can avoid this "nuisance" parameter by finding the probability distribution that maximizes the p-value (eg makes the result the least extreme).


http://www.nbi.dk/~petersen/Teaching/Stat2009/Barnard_ExactTest_TwoBinomials.pdf



References:

http://www.itl.nist.gov/div898/handbook/prc/section3/prc33.htm

https://en.wikipedia.org/wiki/Fisher%27s_exact_test





## Misc


#### I fit a regression. How statistically significant is the slope?

If we fit:

Y = a + bx

we are testing the p-value of whether b is equal to 0.  

If we agree with the assumptions of the linear regression fit (that the data is a line with gaussian errors having 0 bias), then it turns out that this follows a t-distribution with n-2 degrees of freedom (where n is the number of points fitted).



## Specific Tests


#### What is a Gaussian Z test?

Any frequentist p-value based test where the distribution of the test statistic under the null hypothesis is gaussian.


Typically, this involves determining of a distribution of observations is drawn fro a gaussian distribution with known mean and standard deviation.  


Another common set of examples is when examining the maximum likelihood estimate of a statistical fit.  Maximum likelihood estimates are approximately gaussian (and the variance from gaussianity can be determined using the Fisher information).  If $\hat{\theta}}# is the maximum likelihood estimate of the experiment and $\theta_0$ is the estimate under the null hypothesis, then the following is normally distributed:

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





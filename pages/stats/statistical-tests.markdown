---
author: 
date: 2016-09-03 11:25:54.397075
layout: post
slug: statistics-cheat-sheet
title: Statistics Cheat Sheet
id: 446
---


Having spent some time building up a framework for statistical reasoning, let's apply it to a number of examples.  Many of these were touched upon in previous sections, but are here repeated to make this a complete reference for common statistical tests and problems.

Each will be presented as a scenario, a question that you are attempting to answer, and our proposed solution.  They are organized into broad categories based on the type of statistical situation.

_____

### Gaussian Distributed Data

***You have a dataset consisting of a number of 1-d observations which you assume come from a gaussian distribution.  You know the true variance of the sample, but the mean is unknown.  You would like to perform inference on the mean $\mu$.***

Apply a Gaussian Z-test.  A Z-test allows us to perform two types of inference:

- Calculate a p-value that the data is generated from a fixed $\mu_0$
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
z \sim gauss(1, 0)
$$

- To perform a p-value test for a fixed $\mu_0$, plug  $\mu_0$ in for $\mu$ in the definition for $Z$, calculate $Z$ for the given dataset, and then use the known CDF distribution to calculate either the 1-sided or 2-sided p-value.  Compare this to a threshold to see if $\mu_0$ is accepted or rejected
- To calculate a confidence interval of size $\alpha$, use the known gaussian CDF to find the value of $z_0$ such that the 2-sided probability of $|z| < z_0 = \alpha$.  Invert the equation for $z(\mu_0) = z_0$ to find $\mu_0$, the boundary of the confidence interval on $\mu$

Note that sample mean is a sufficient test statistic for estimating the mean of a gaussian distribution, so this test is the best that one can do (we lose no information relative to the full data distribution when we take the mean as our test statistic).  This fact makes tests with gaussians much easier to calculate without loss of power.

<!--
- https://en.wikipedia.org/wiki/Z-test
- http://www.statsdirect.com/help/parametric_methods/z_normal.htm
- https://people.richland.edu/james/lecture/m170/ch09-mu.html
-->

_____


***You have a set of Gaussian distributed data that you know has zero mean.  You'd like to perform inference on the variance of the unknown gaussian distribution***

From our earlier work on the gaussian, we know that the distribution of the sample variance of the gaussian is given by:

$$
s^2 ~ \frac{\sigma^2}{n-1} \chi^2_{n-1}
$$

Therefore, the test statistic:

$$
t = \frac{s^2(n-1)}{\sigma^2}
$$

is a pivotal quantity that follows a Chi-Squared distribution.  We can use its known cumulative distribution to create intervals of a chose size $\alpha$ in the space of the test statistic and then invert the definition of the test statistic to obtain intervals in $\sigma$.

______

***You have a dataset consisting of a number of 1-d observations which you assume come from a gaussian distribution.  You know neither the true mean nor the true variance and would like to perform inference on the mean (but you don't care to learn about the uncertainty)***

<!--If I assume that my data comes from some Gaussian distribution with unknown mean and unknown variance, does it come from a gaussian with a given mean (regardless of the unknown variance)?-->

In this instance, we are going to perform a p-value test to compare our data to a gaussian model with a known mean.  However, we are allowing any possible value for the variance of the gaussian, which introduces a nuisance parameter.  In order to perform the test, we must think of a way to handle the nuisance parameter.  When calculating a p-value, we can always scan over the full space of nuisance parameters and take the extrema among all calculated p-values.  But, in general, this procedure tends to be less powerful than other alternatives.

Thankfully, in this case, we can apply a t-test.  As discussed in the <a href="#students-t">section</a> on the t-distribution, the following test statistic follows a t-distribution:


$$
t = \frac{\hat{x} - \mu}{s/\sqrt{n}}
$$

where,  $\bar{x}$ is the sample mean, $s$ is the sample variance, and n is the sample size.

We can use the t-distribution to create a confidence interval in the parameter $\mu$ with size $\alpha$ by finding all points in the space of $\mu$ that have a probability of data (p-value) greater than $\alpha$.  The distribution of $t$ is independent of the unknown variance $\sigma$, so we don't need to know it, but we don't learn anything about it during this test.

<!--
References:

- http://lap.umd.edu/psyc200/handouts/psyc200_0810.pdf
- http://www.statisticssolutions.com/manova-analysis-one-sample-t-test/
-->

_____


***You have a dataset consisting of a number of 1-d observations, which you assume come from a gaussian distribution.  You want to perform inference on both the mean and the variance parameters.***

Unlike previous examples, we're here looking to perform simultaneous inference on two parameters.  Instead of making a confidence interval for a single parameter, we instead will attempt to make a confidence region, consisting of a 2-d region in ($\mu$, $\sigma$) space.

The brute force procedure to accomplish this is well defined:

- Pick a test statistic (which may be a pair of statistics)
- For each point in ($\mu$, $\sigma$) space, find the distribution of the test statistic
- Using each distribution, define a region whose integral contains $\alpha$ of integrated probability (where $\alpha$ is the size of the test)
- Measure the test statistic
- The confidence region consists of all points in ($\mu$, $\sigma$) where the measured value of the test statistic falls within the $\alpha$ sized region.

This procedure, however, can be computationally intensive.  Moreover, it requires coming up with a test statistic that has power to constrain both $\mu$ and $\sigma$, which may be difficult (or, it may be difficult to determine the distribution of that statistic and to integrate it to find regions of size $\alpha$).

Luckily, the gaussian distribution has properties that make this calculation easier.  If we recall the definitions:

$$
t = \frac{\bar{x} - \mu}{s/ \sqrt{n}}
$$
$$
s^2 = \sum (\frac{x_i - \hat{x}}{\sigma})^2
$$

then, we can leverage the following properties:

- The distribution of t is a Student's T distribution and its distribution is independent of the true values of $\mu$ or $\sigma$
- The distribution of $s^2$ is a Chi-Squared distribution and is also independent of the true values of $\mu$ or $\sigma$
- The two distributions are independent of each other
- t only depends on $\mu$ (not $\sigma$) and $s^2$ only depends on $\sigma$ (not $\mu$)

Knowing this, one can consider the somewhat simple test statistic $(t, s^2)$.  These two variables are independent, and therefore we can write down the distribution:

$$
p(t, s^2) = t_{n-1}(t)\chi^2_{n-1}(s^2)
$$

Importantly, as we discussed above, this is the distribution for all values of $\mu$ and $\sigma$ (and this is possible because $\mu$ and $\sigma$ are used in the definitions of $t$ and $s^2$ to cancel out their influence on the distribution).

Even with this distribution in hand, however, we are not done.  There is a lot of ambiguity in how we use this distribution to define the confidence regions.  Specifically, we must find a region in $(t, s^2)$ with total integrated probability of size $\alpha$.  There are many such regions!  And so we have to agree in advance on which region we're interested in.  In doing so, one may think through the following considerations:

- Simplicity of defining the region
- Symmetry of the region
- Minimizing the overall area of the region

(In this example, one has freedom to, in a sense, divvy the $\alpha$ between the distributions of $t$ or $s^2$, making the region very wide in $t$ and narrow in $\sigma$, or visa versa, as long as it's total area integrates to $\alpha$).

One reasonable choice is to define a region defined by $(-|a| < t < |a|)$ and $(b < s^2 < c)$ with $a = \alpha_1/2$ 

$$
\text{Region} = ( \bar{x} - a \frac{\sigma}{\sqrt{n}} < \mu < \bar{x} + a \frac{\sigma}{\sqrt{n}},
$$

$$
\frac{\sum(x_i - \bar{x})^2}{c} < \sigma^2 <  \frac{\sum(x_i - \bar{x})^2}{b})
$$

This region is a trapezoid, as $\bar{x}$ appears in both the $\mu$ and $\sigma$ region.

<!--
https://www.math.tecnico.ulisboa.pt/~apacheco/ID1/artigo%20n%BA2.pdf
-->
_____
_____

### Comparing measured data to a various distributions

***You have a dataset of binary data consisting of measured $N_s$ successes out of a total of $N$ trials.  You assume that my data comes from a binomial distribution and you want to perform inference on the true success rate $p$ ***

If N is large, one can use the fact that a binomial distribution approaches a normal distribution.  The mean of the gaussian approximation is given by:

$$
\mu = pN
$$

and the standard deviation parameter is given by:

$$
\sigma = \sqrt{\frac{1}{n}p(1-p)}
$$

Using this, we can define a test statistic, $z$, that is gaussian distributed:

$$
z = \frac{N_s - pN} {\sqrt{\frac{1}{n}\hat{p}(1-\hat{p})} }
$$

With this in hand, we can create a confidence interval of size alpha on $z$, which we call $z_\alpha$.  We can then invert the above equation, solving for $N_s$, to give us confidence intervals on $N_s$.  The solution to this equation is known as the "Wilson Interval" or Wilson approximation to the binomial confidence interval.  The formula is not repeated here but can be readily looked up.

Note that many references make an additional approximation to simplify the math: plug in $p \rightarrow \hat{p} = N_s/N$ in the formula for Z.  This makes the algebra easier but makes the interval less accurate for lower $N$, so we will not suggest it, as the calculation for the Wilson interval is just as easy.

However, we can forego an approximation all together to obtain the true binomial confidence intervals, which should be valid for all values of N.  These are known as the Clopper-Pearson exact intervals.  The formula is not repeated here but can be readily looked up.

The issue with the Clopper-Pearson exact intervals is that their coverage is not perfect.  This is not because an approximation is used in their derivation, but instead because the distribution is discrete, so, for most values of $\alpha$, intervals of size exactly $\alpha$ can not be found.  The interval is conservative, meaning that it's wider than it needs to be.  If one wants to be really cute, one can leverage randomization on the boundary to achieve exact coverage (it's not obvious to me that this is useful, but formally it will work).

It turns out that, because of this conservatism, the Wilson intervals usually end up having better coverage than the Clopper-Pearson intervals, even for small values of N.  For N as low as 5, a good rule of thumb is just to use the Wilson intervals.

<!--
http://www.stat.ufl.edu/~aa/articles/agresti_coull_1998.pdf
https://en.wikipedia.org/wiki/Binomial_proportion_confidence_interval
http://www.ucl.ac.uk/english-usage/staff/sean/resources/binomialpoisson.pdf
-->

_____

***You have observed a random process that can occur multiple times and have measured $N$ counts.  You assume that the data comes from a poisson distribution and you want to perform inference on the true rate $\lambda$***

Similar to how we treat the binomial distribution, we can start by using the gaussian approximation to the poisson.  To do this we associate:

$$
\mu = \lambda
$$

and 

$$
\sigma = \sqrt{\lambda}
$$

We can then construct the quantity:

$$
z = \frac{N - \lambda}{\sqrt{\lambda}}
$$

For a desired confidence interval size $\alpha$, we can define the critical value of z, $z_{\alpha}$, and use it to find the critical values of $\lambda$.

One can also calculate exact intervals.  Doing so requires complicated calculations involving the poisson distribution.  However, one can take into account the following result:

$$
\sum_{k=0}^x pois(k | \mu) = P(\chi^2_{2(1+x)} > 2\mu)
$$

where the right half of the equation represents the probability of a chi-square distributed variable with $2(1+x)$ degrees of freedom having a value > $2\mu$.  Using this, one can express the exact intervals in terms of quantiles of an appropriate chi-squared distribution:

$$
\frac{1}{2} \text{Quantil}e_{\alpha/2}(\chi^2_{2N}) < \lambda < \frac{1}{2} \text{Quantil}e_{1 - \alpha/2}(\chi^2_{2N + 2})
$$


This formulation of a 2-sided exact confidence interval is attributed to Garwood.  Similar to the binomial case, the exact intervals tend to over-cover (due to the discrete nature of the data a poisson distribution describes).  There are a number of other interval versions that are designed to have better coverage properties.

<!--
http://citeseerx.ist.psu.edu/viewdoc/download?doi=10.1.1.900.3700&rep=rep1&type=pdf
http://ms.mcmaster.ca/peter/s743/poissonalpha.html
https://arxiv.org/pdf/1412.0442.pdf
https://www.immagic.com/eLibrary/ARCHIVES/GENERAL/WIKIPEDI/W121109P.pdf
https://www.ine.pt/revstat/pdf/rs120203.pdf
-->

_____

***You have a set of continuous data and you want to determine whether it came from a known (but arbitrary) probability distribution?***

One can perform a one-sample Kolmogorov-Smirnov test to determine arbitrary continuous data likely came from some known distribution.

A K-S test is an exact test comparing the distribution of a sample to a known theoretical distribution.  The K-S test is valid regardless of the underlying distribution the data is being compared to.  The exactness, however, only applies if the theoretical distribution being compared against is fully specified: one cannot fit parameters from the data and then perform a K-S test.

The test statistic for a K-S test is is the the maximum deviation between the theoretical CDF and the empirical CDF of the measured data, where the empirical CDF is given by:

$$
CDF_{em}(x) = \frac{1}{N} (\text{# of data points < x})
$$

The test statistic is then:
$$
D=sup_x(|F(x) - CDF_{em}(x)|)
$$

where the $sup_x$ is the suprema (maximum) and $F(x)$ value of the true cumulative distribution at point $x$.

The distribution of $\sqrt{n}D$, under the hypothesis that the data is drawn from the true distribution $f$, follows what is known as the Kolmogorov distribution.  Because the distribution of the test statistic is independent of the details of the true pdf, the test statistic is a pivotal quantity that can be used to calculate confidence intervals using the the test statistic's known distribution.  Typically, the distribution of this test statistic is used via a lookup table.

<!--
References:
- http://www.itl.nist.gov/div898/handbook/eda/section3/eda35g.htm
-->

____


***You have a collection of counts in various bins.  You want to know if that binned data comes from a known distribution (describing binned data)?***

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

If the theoretical distribution was obtained by fitting a parameterized distribution, then the number of degrees of freedom, $d$, is equal to the number of non-empty bins minus number of parameters fitted in obtaining the theoretical distribution.

For further discussion of chi-squared tests, see <a href="#chi-squared">here</a>.

<!--
References: 
- http://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm
- http://stattrek.com/chi-square-test/goodness-of-fit.aspx?Tutorial=AP
-->

____
____

### Determining if two measured datasets came from the same distribution.


*** You have two datasets of continuous data, and you assume that they are both drawn from gaussian distributions with the same variance, which is unknown to me.  You want to determine if the two gaussian distributions have the same mean.***

This can be solved by performing a statistical test by creating a test statistic that follows the t-distribution.

Assume that we have:

- Sample X consisting of n samples with true mean $\mu_X$, sample mean $\bar{X}$ and sample variance $s_X^2$
- Sample Y consisting of m samples with true mean $\mu_Y$, sample mean $\bar{Y}$, and sample variance $s_Y^2$.
- The true variance of samples X and Y are the same (which is an unknown nuisance parameter $\sigma$)

Define the "pooled sample variance" to be:

$$
s_p^2 = \frac{(n-1)s_X^2 + (m-1)s_Y^2} {n+m-2}
$$

Under these conditions, the following test statistic is t-distributed:

$$
T = \frac {(\bar{X} - \bar{Y}) - (\mu_X - \mu_Y)} {s_p \sqrt{\frac{1}{n} + \frac{1}{m}}}
$$

This can be shown by noting that the distribution of $\bar{X}$ is a gaussian with mean $\mu_X$ and variance $\frac{\sigma}{n}$, and similarly for sample Y.  Since the samples are independent, their difference is also a gaussian:

$$
\bar{X} - \bar{Y} \sim Gauss(\mu_X - \mu_y, \frac{\sigma^2}{n} + \frac{\sigma^2}{m})
$$

By the properties of the gaussian distribution, we also know that the sample variances are Chi-Square distributed (with n-1 and m-1 degrees of freedom) and are independent of the sample means, and are independent of each other.  This implies that their sum is also distributed like a Chi-Squared with (n+m-2) degrees of freedom:

$$
U = \frac{(n-1)s^2_X}{\sigma^2} + \frac{(m-1)s^2_Y}{\sigma^2} \sim \chi^2_{n+m-2}
$$

So, we have two quantities, T and U.  T is a gaussian, and U is a Chi-Squared.  We can use them to construct a variable that is t-distributed by calculating:

$$
T = \frac{Z}{\sqrt{U/(n+m-2)}}
$$

This follows the student's t distribution by construction, and it reduces to the value of $T$ above (importantly, the value of $\sigma$ cancels out, making the test statistic independent of the nuisance parameter).

The distribution of the difference in mean of the two samples (assuming that they are both gaussian with the sam variance) follows a t-distribution.

<!--
https://onlinecourses.science.psu.edu/stat414/node/201
-->

This is an exact test, applicable for all values of n and m.  Further, if the sample sizes n and m are the same, this test will be robust against deviations from the normal distribution assumption.

_____

*** You have two 1-d datasets drawn from gaussian distributions, but you don't assume anything about the means and variance of those distributions.  You want to know if both distributions are the same.***

This problem is known as the Behrens-Fisher Problem.  A number of approximate solutions exist.

The most famous approximate solution is "Welch's t-test", which creates a test statistic that is approximately t-distributed (under certain conditions).

<!--
https://en.wikipedia.org/wiki/Behrens%E2%80%93Fisher_problem
http://www.sciencedirect.com/science/article/pii/S0378375806002382
http://www.sciencedirect.com/science/article/pii/S0378375806002382
-->

_____

***You have two datasets of continuous data.  You have no assumptions about the underlying distribution that generated them.  You want to test if they came from the same continuous probability distribution***

To determine if two datasets of continuous, 1-d data came from the same distribution (without specifying what that distribution is), one can perform what is called a two-sample Kolmogorov-Smirnov test (2 sample KS test).

Similar one-sample KS test described above, this test uses the empirical cumulative distributions of the two datasets to create a test statistic.  Specifically, defining the empirical cumulative distribution as:

$$
CDF_{em}(x) = \frac{1}{N} (\text{# of data points < x})
$$

then the test statistic of our problem becomes:

$$
D=sup_x(|CDF_{em}^A(x) - CDF_{em}^B(x)|)
$$

where $CDF_{em}^A$ and $CDF_{em}^B$ are the empirical cumulative distributions of the two datasets $A$ and $B$. 

The distribution of $\sqrt{\frac{nm}{n+m}}D$ follows the same Kolmogorov Distribution as in the one-sample test.  One can lookup the properties of the cumulative distribution function of the Kolmogorov distribution to calculate the p-value that these datasets come from the same distribution.

_____

***You have two sets of binary data (weighted coin flips, or counts of successes and failures) with potentially differing counts N_1 and N_2.  You want to infer if they have the same intrinsic rate?***

To solve this, we have to make certain assumptions.  The main assumption that we're going to make here is that each dataset comes from a binomial distribution with a fixed rate.  The question then becomes: for both of these distributions, is the rate the same?

There are a few ways to address this question.

If we assume the samples are sufficiently large, we can approximate the binomial distribution by a gaussian.  Because the counts of each dataset vary, the variance of the approximate gaussians will be different.  The null hypothesis that we're trying to test is whether the means of these two approximate gaussians are equal ($p_1 = p_2 = p$).

Recall that the gaussian approximation to a binomial with true rate $p$ involves setting:

$$
\mu \rightarrow Np
$$
$$
\sigma \rightarrow Np(1-p)
$$

and therefore the quantity

$$
Z = \frac{\hat{p} - Np}{\sqrt{Np(1-p)}}
$$

is gaussian distributed.  Further, recall that the difference in gaussian distributed variables $\hat{p_1} - \hat{p_2}$ is itself gaussian distributed with

$$
\mu = p_1−p_2 
$$
$$
\sigma^2 = \frac{p_1(1-p_1}{N_1} + \frac{p_2(1-p_2)}{N_2}
$$

which means that the quantity

$$
Z = \frac {(\hat{p_1} - \hat{p_2}) - (p_1 - p_2)}
          {\sqrt{\frac{p_1(1-p_1}{N_1} + \frac{p_2(1-p_2)}{N_2}}}
$$

setting $p_1=p_2$, this reduces to

$$
Z = \frac{\hat{p}_1 - \hat{p}_2} {\sqrt{p(1-p)(\frac{1}{N_1} + \frac{1}{N_2})}}
$$

Here, $p$ is still a nuisance parameter.  We can perform inference on it if we assume that the rates in the two groups are equal.  But, if we want to test whether they're equal, we have to eliminate it somehow.  A common approach is to replace it with it's maximum likelihood estimator: 

$$
\hat{p} = \frac{\hat{p}_1N_1 + \hat{p}_2N_2 }{N_1 + N_2}
$$

and using that method the following test statistic approximately normally distributed:


$$
Z = \frac{\hat{p}_1 - \hat{p}_2} {\sqrt{\hat{p}(1-\hat{p})(\frac{1}{N_1} + \frac{1}{N_2})}}
$$

This can be used to calculate a z-score and use the standard z-distribution to calculate either a 1-sided or 2-sided p-value.

<!--
https://onlinecourses.science.psu.edu/stat414/node/268
-->


An exact solution to this problem uses Bernard's test.  The aspect of this problem that makes an exact solution challenging is the fact that the true binomial rate is a nuisance parameter (remember, we are only testing that they're the same binomial, we don't care what their common rate is).  Bernard's test addresses the issue in a brute-force way:  It calculates the p-value for each possible value of the parameter $p$ and then takes the maximum of all p-values (the most conservative choice).  For each possible value of the true rate, it calculates the p-value by considering all possible observable counts.  This is conceptually simple but can be computationally expensive.  Since there is only 1 nuisance parameter $p$, one can have a computer grid-search through a range of values relatively quickly.

_____
_____

### Determining if multiple measured datasets came from the same distribution.


***I have a contingency table, which is a collection datasets (one per group) each consisting of counts of categorical data (a multinomial distribution over N categorical outcomes).  What is the p-value that the distribution over outcomes is equal for all groups?***
 
This is the generalization of the binomial example discussed above and is a common situation in statistics.  A contingency table can be visualized as the following:

| groups   | a       | b       | c       |
|----------|---------|---------|---------|
| outcomes |         |         |         |
| x        | $n_x^a$ | $n_x^b$ | $n_x^c$ |
| y        | $n_y^a$ | $n_y^b$ | $n_y^c$ |
| z        | $n_z^a$ | $n_z^b$ | $n_z^c$ |

Here, we have 3 groups, a, b, and c.  In each group, we measure the count of outcomes, x, y, and z.  One can imagine that each group is a die and each outcome is the count of the die rolls (1-6).  The question then boils down to: "do each of these dice have the same distribution over the outcomes (1-6)?"

To clarify the problem, when randomizing the experiment, we're going to assume that we throw a total of $N_a$, $N_b$, and $N_c$ random variables in classes a, b, and c, respectively, and from those draws, we count the occurrence of x, y, and z in each class.  

The common approximate solution of this is the Chi-Squared test of independence (for contingency tables).  This tests is performed by taking the following procedure:

- Calculate the expected value of each class under the hypothesis that all datasets come from the same distribution (this typically entails calculating the total rate for each class across all datasets)
- Assume that the count for each class and in each dataset is gaussian distributed about that expected amount, with variance given by the square root of the count
- Calculate $\chi^2$ as the sum of the square differences between expected and observed counts across all classes and datasets and compare it to the expected value under the null hypothesis

To calculate the expected rate per outcome, define:

$$
p_x = \frac{\sum_i n_x^i}{N}
$$

and $p_y$ and $p_z$ similarly, where N is the total number of draws (across all classes) and $n_x^i$ is the count of draws with outcome x in class i.  In other words, $p_x$ is the measured rate of $x$ (regardless of classes).

Given that, the expected count in each bin is given by:

$$
\hat{n_x^a} = p_x N_a
$$

and the standard deviation on that (using the gaussian assumption) is $\sqrt{p_x N_a}$.

We can therefore define a sum of squares of gaussian random variables:

$$
\chi^2_\nu = \sum_{i,j} \frac {n_i^j - p_i n_j} {p_i N_j}
$$

This would follow a chi-squared distribution of degree $(\text{num classes}) * (\text{num outcomes})$ EXCEPT for the fact that the observed counts $n_y^b$ are not statistically independent.  Instead, they are constrained based on the setup of our experiment.  Specifically, we specified that the count of each class is fixed in advance, so for every class $j$ there is a linear constraint that specifies that their sum is $N_j$.  In addition, all the values $n_i^j - p_i n_j$ are constrained because we defined $p_i$ in terms of $n_i^j$.  For each possible outcome $i$, we add a constraint such that the total probability of that outcome is given by $p_i$.  These constraints are not all linearly independent.

<!--
http://www.stat.wisc.edu/~st571-1/06-tables-2.pdf
-->

It turns out that the number of linearly independent constraints is given by $(\text{num classes} - 1) + (\text{num outcomes} - 1) + 1$.  Therefore, we are taking as our test statistic the sum of $(\text{num classes}) * (\text{num outcomes})$ gaussian variables that have $(\text{num classes} - 1) + (\text{num outcomes} - 1) + 1$ linear constraints on them.  Based on an earlier discussion, the sum of the squares of these variables follows a chi-squared distribution with degrees of freedom $\nu$ given by the number of gaussian variables minus the number of linearly independent linear constraints on them, which is


$$\begin{eqnarray}
\nu &=& (\text{num classes}) * (\text{num outcomes}) \\
    & & - (\text{num classes} - 1) \\
    & & - (\text{num outcomes} - 1) \\
    & & -1 \\
    &=& (\text{num classes} - 1) * (\text{num outcomes} - 1) \\
\end{eqnarray}$$

One can therefore use the distribution of $\chi^2_\nu$ to calculate the p-value of the observed data given the hypothesis that all classes have the same distribution over the possible outcomes.

A different approximate test, known as the G-Test, doesn't start with the normal approximation to the Binomial/Multinomial distribution, but instead starts with the full log likelihood distribution and creates a statistical test by approximating the distribution of the log likelihood ratio.

To develop this, we start by writing down the likelihood ratio for a multinomial.  In this example, we have I different outcomes, each with true probability $p_i$ and we measure counts of each outcome as $n_i$ (with N total counts).  The likelihood of this data is given by:

$$
L(n_i | p_i) = \prod_{i} p_i^{n_{i}}
$$

The maximum likelihood estimators of the $p_i$ are given by:

$$
\hat{p_i} = \frac{n_{i}}{N}
$$

and the log likelihood ratio is give by:

$$\begin{eqnarray}
 -2*LLR &=& -2*Log[L(n_i | p_i) / L(n_i | \hat{p_i})] \\
        &=& -2*(Log [\prod p_i^{n_i}] - Log [\prod \hat{p}_i^{n_i}]) \\      
        &=& -2*\sum_i n_i(Log[p_i] - Log[\hat{p}^i]) \\
        &=& -2 * \sum_i n_i Log[\frac{p_i}  {\hat{p}_i}] \\
\end{eqnarray}$$

Substituting in the maximum likelihood estimate for $\hat{p_i}$ and defining $n_{obs}$ = $n_i$ and $n_{exp}$ = $p_i*N$, we get:

$$\begin{eqnarray}
      &=& -2 \sum_{i} n_{i} Log[\frac{p_i}{n_i/N}] \\
      &=& -2 \sum_{i} n_{i} Log[\frac{p_i N}{n_i}] \\
      &=& 2 \sum_i n_{obs} Log[\frac{n_{obs}}{n_{exp}}] \\
\end{eqnarray}$$


We know from previous results that the log likelihood ratio is approximately distributed by a chi-squared distribution.  The number of degrees of freedom of that distribution would normally be given by the number of rows, which here is $i$.  However, in this case we have fewer degrees of freedom since we are constraining the total count per class to be the observed count and we are using the observed rates per outcome to infer the true value.  One can show that the -2*LLR defined above follows a chi-squared with degrees of freedom given by $(\text{num classes} - 1) * (\text{num observations} - 1)$.

In summary, the G-Test uses the approximation of:
$$
2 \sum_i n_{obs} Log[\frac{n_{obs}}{n_{exp}}] \sim \chi^2_{(\text{num classes} - 1)*(\text{num observations} - 1)}
$$

where we sum over the expected and encountered counts in each cell, to approximately determine the p-value.

<!--
https://nlp.stanford.edu/manning/courses/ling289/contingency-table-stats.pdf
https://www.unc.edu/courses/2006spring/ecol/145/001/docs/lectures/lecture14.htm
https://en.wikipedia.org/wiki/G-test
https://en.wikipedia.org/wiki/Multinomial_test
-->

For an exact solution, one may calculate the p-value exactly using monte-carlo methods.  This would be a generalization of Bernard's test, but it becomes more computationally expensive as the number of outcomes grows larger, as each new outcomes introduces a new nuisance parameter $p_i$ which much be scanned over.  One can grid search through all values of $p1, ..., p_i$, calculate the p-value of the data for those values, say by using the likelihood ratio as an ordering rule.  One would then take the maximum p-value as the suprema p-value used to perform the hypothesis test.

If one insists on an exact solution but doesn't want to computationally use Monte Carlo to calculate p-values, one can use a famous exact solution is known as Fischer's exact test.  Fisher solved the problem exactly by adding an additional restriction to what we've assumed above (one that made the problem tractable with simple mathematics).  In addition to fixing the total count per class to be the observed count, he also fixes the total count per outcome (across all classes) to be the observed count per outcome.  Fisher restricted the space of all solutions considered when calculating the p-value to consist of only those whose total count per class and whose total count per outcome match the observed count per outcome and class.  This restriction is somewhat artificial, but it allowed him to reach an exact solution.  

Given those assumptions, Fisher showed that the probability of observing n events in group N and category M is given by the hypergeometric distribution.  The "trick" of this assumption is that the distribution ends up no longer depending on the overall rate for each category.  The result essentially reduces to combinatorics: since we are fixing the total number of observations and the total number in each class (as we are only testing against the observed rate), we can calculate the probability of all possible tables.  To calculate the p-value, one then sums the probability of all such tables that are less likely than the observed table.


<!--
References:

https://www.unc.edu/courses/2006spring/ecol/145/001/docs/lectures/lecture11.htm#randomization

https://ncss-wpengine.netdna-ssl.com/wp-content/themes/ncss/pdf/Procedures/NCSS/Contingency_Tables-Crosstabs-Chi-Square_Test.pdf

https://ocw.mit.edu/courses/mathematics/18-443-statistics-for-applications-fall-2006/lecture-notes/lecture11.pdf

http://sites.stat.psu.edu/~drh20/asymp/lectures/p175to184.pdf

https://math.stackexchange.com/questions/304732/chi-square-degrees-of-freedom-proof

http://www.itl.nist.gov/div898/handbook/prc/section3/prc33.htm

https://en.wikipedia.org/wiki/Fisher%27s_exact_test


https://stats.stackexchange.com/a/16931/16736
-->

_______

***I have a datasets broken into groups, and within each group, I have measurements of a continuous variable.  Assuming the distribution of the variable is gaussian in each group (with unknown mean and variable), what is the p-value that the true means and variances of the distributions across all groups are equal?***

This problem is addressed with a technique known as the "Analysis of Variance", or ANOVA.  Consider a situation when one has a multiple measurement of a continuous variable that is separated into several groups.  The goal of an anova analysis is to determine if the distribution of the variable is different in the various groups (in other words, does the group have any effect on the variable).  To measure this, imagine we have N measurements of a variable $y$ with $y_{ij}$ being the $i^{th}$ measurement of the $j^{th}$ group.  We have K groups total, and the size of the $i^{th}$ group is $n_i$.

First, define the means as:

$$
\overline{Y_i} = \text{mean of group i}
$$
$$
\overline{Y} = \text{The total mean of the data (across all data points)}
$$

Next, we define a quantity called the "between-group variability".  If we assume that the distribution of $y$ is independent of the group label, and that we have many samples in each group, then the mean of the $i^{th}$ group $Y_i$ is a gaussian distributed variable about the true mean $\mu$ (which, under the null hypothesis, is the same across all groups) with variance given by $\sigma^2/n_i$.  With that in hand, we can define a quantity known as the "between-group variability":

$$
\text{between-group variability} = \frac{ ( \overline{Y_i} - \overline{Y})^2}{\sigma^2 / n_i}
$$

This quantity, under the null hypothesis, is the sample mean of K gaussian distributed variables (each variable being the group mean) and therefore follows a chi-squared distribution with K-1 degrees of freedom.

We then define a quantity called the "within-group variability".  For each group j, we can define the sample variance:

$$
s^2_j = \sum_i \frac{(y_{ij} - \overline{Y_j})^2}{\sigma^2}
$$

and we know that, under the null hypothesis, this follows a chi-square distribution with $n_i - 1$ degrees of freedom.  We can sum them all up to get the quantity:

$$
\text{within-group variability} = \sum_j \sum_i \frac{(y_{ij} - \overline{Y_j})^2}{\sigma^2}
$$

And since each term follows a chi-squared with $n_i-1$ degrees of freedom, the total sum follows a chi-squared with $\sum_i (n_i - 1)$ degrees of freedom, which is also equal to $N-K$.

With these two in hand, we can define the following term:

$$
F = \frac{\text{between-group variability} / (K-1)} {\text{within-group variability}/(N-K)}
$$

As shown above, the numerator follows a chi-squared with $(K-1)$ degrees of freedom divided by $(K-1)$, and the denominator follows a chi-squared with $(N-K)$ degrees of freedom divided by $(N-K)$.  Therefore, F follows a F-distribution with degrees $(K-1)$ and $(N-K)$ (under the null hypothesis).

The logic of the test is the following: If, as we supposed, the true variance is the same across groups, then when we divide the numerator by the denominator, the $\sigma^2$ terms in the "between-group variability" and in the "within-group variability" cancel out.  Thus, we can calculate F directly from the data without knowing or supposing $\sigma$.  After canceling out $\sigma$, the test statistic for F becomes:

$$
F = \frac {\sum_i n_i ( \overline{Y_i} - \overline{Y})^2 / (K-1)} {\sum_j \sum_i (y_{ij} - \overline{Y_j})^2 / (N-K)}
$$

If the null hypothesis is false, if the true means vary across groups, then, intuitively, the between-group variability would tend to be larger than the within-group variability (as there is a true difference in means across different groups).   Therefore, we conduct a 1-sided test of the F distribution and reject the null if the f statistic is too high.

<!--
https://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=3&cad=rja&uact=8&ved=0ahUKEwibuq6xvc3WAhUD9WMKHdP9BVQQFggwMAI&url=http%3A%2F%2Fwww.springer.com%2Fcda%2Fcontent%2Fdocument%2Fcda_downloaddocument%2F9781848829688-c2.pdf%3FSGWID%3D0-0-45-1121038-p173940731&usg=AOvVaw25VisbaXWE07pmwhrmXw9k
-->

______
______

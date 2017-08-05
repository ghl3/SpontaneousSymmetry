---
author: 
date: 2016-09-03 11:25:54.397075
layout: post
slug: statistics-cheat-sheet
title: Inference
---


Up until now, we've been discussing probability.  But the real value of statistics is the ability to use probability distributions and models to learn facts about the real world and, crucially, to know how certain one should be in those facts.

We will here deal with 3 frequentist ways of performing inference:

- Estimators
- p-values
- Confidence Intervals

Each of these is a way of using probability distributions and data to make statements about the values of unknown parameters.  Importantly, the nature of those statements should be understood in detail.  The statements that frequentists can make about unknown parameters (given data) are mathematically rigorous and are unambiguous, but are often confusing or contrary to how a lay person may think about them (possibly to a fault!).  


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
var > \frac{1}{I}
$$

where $I$ is the Fisher information of the distribution.  We will not concern ourselves with the details of this calculation here, but instead will note that the existence of such a bound means that it's possible in some cases to obtain the "best" unbiased estimator as the one whose variance is falls right on the boundary.  The efficiency of an estimator is the ratio of it's variance to the Cramer-Rao variance bound, where an efficiency of 1 is the best an estimator can do.

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

The property that the distribution of a mle tends to a gaussian turns out to be a very useful one.  Given sufficiently large n, it means that one can obtain a good estimate of the distribution of an estimator.  Specifically, the distribution of $\sqrt{n}(\hat{\mu}_mle - \mu)$ converges to a gaussian with mean 0 and variance given by:

$$
var(\hat{\mu}_mle) = \frac{1}{nI}
$$

where, again, $I$ is the Fisher information.  This variance, as discussed above, is the one defined by the Cramer-Rao bound.  Given an closed form likelihood, one can calculate the Fisher information $I$ exactly and therefor obtain an asymptotic distribution (the distribution as $n \lim \inf$) for a mle.  This is true for any likelihood, making this method of obtaining estimators very useful.  We will later take advantage of this same property when calculating confidence intervals.


For the gaussian example, one can show that the maximum likelihood estimators for $\mu$ and $\sigma$ are given by:

$$
\hat{\mu}_mle = \bar{x}
$$

$$
\hat{\sigma}_mle = \frac{1}{n} \sum (x_i - \bar{x})^2
$$

The mle for $\mu$ for a gaussian is the familiar sample mean.  Note that the mle for $\sigma$ is not our usual definition for the sample variance $s^2$, as it has a factor of $\frac{1}{n}$ and not $\frac{1}{n-1}$.  This implies that the mle for $\sigma$ is biased (but it is still consistent, as the difference between $\frac{1}{n}$ and $\frac{1}{n-1}$ goes to 0 as $n \lim \inf$).


### Test Statistics


A test statistic is a value can be calculated as a function of a given dataset and a given model (or model parameters) associated with that dataset.  A test statistic is used as the starting point of a statistical test (to be covered in detail).  One typically performs a test by considering a model, defining a test statistic for that model, measuring data, calculating the test statistic for that model (or model parameters) and the measured data, and comparing that value to the known distribution of the test statistic (given the assumed model).

So, important properties of the test statistic are that:

- It can be easily calculated
- It's distribution (given a fixed model or model parameters) is known

For a given model, there are many possible test statistics.  So, how should one go about picking the "best" test statistic, or what does it even mean for a test statistic to be good?  When using a test statistic for inference a requirement is that the test statistic be a function of the parameter of interest (after all, if the distribution of the test statistic didn't depend on the parameter of interest, than measuring the test statistic wouldn't tell us anything about that parameter).  With that requirement satisfied, as a rule of thumb, a test statistic is good if it's distribution under different values of the parameter(s) of interest varies dramatically.  This allows one to use the test statistic to determine which model is most likely the "true" model (again, this loose language will be made more formal later).

As described above, we want the distribution of the test statistic to depend on the parameter of interest.  However, the calculation of the test statistic may or may not depend on the parameter of interest.  Say that we have a test statistic t and a probability distribution function pdf for t under a given model, and we are interested in a parameter $\mu$.  We want pdf(t) = pdf(t | $\mu$).  However it may be the case that t itself depends on mu: $t = t(\vec{x}, \mu)$ or that t is independent of the parameter: $t = t(\vec{x})$.

For certain models and parameters of that model that we're interested in learning about, there may be one (or more) "best" test statistic to choose.  A "sufficient statistic" is a statistic for a given model and parameter(s) of interest that has as much information as the full set of raw data.  In other words, for the purpose of performing inference on the parameter of interest, one does not lose any information by summarizing the data with the value of that test statistic.

We will point out examples of sufficient statistics when discussing how to perform inference for various distributions and parameters.


If the distribution of the test statistic does not depend on the parameter of interest, is known as a Ancillary statistic.  A test statistic that is Ancillary to a parameter $\mu$ cannot tell us anything about the true value of $\mu$; we cannot use it for inference.  In a certain sense, an Ancillary statistic is the opposite of a sufficient statistic.  Specifically, Basu's Theorem tells us that a statistic that is both sufficient and complete for a parameter of interest is independent of an Ancillary statistic for that parameter.






<INSERT SECTION ON WHAT A CONFIDENCE INTERVAL IS>


## Example: Gaussian Distribution

Let's start with the simple example of a gaussian distribution and determine it's confidence interval.  It will turn out that this solution is extremely useful, as gaussian distributions appear often in nature due to the central limit theorem and that many distributions can, under certain conditions, be approximated as a gaussian distribution.

We start by assuming that we know our model is a gaussian distribution with known-and-fixed standard deviation $\sigma$ but an unknown mean $\mu$.  We are running an experiment to measure the mean.  In this experiment, we draw N points from the gaussian to give us the dataset $\{x\} = \{x1, x2, ..., x_N\}$.

The question then becomes: "Given this measured data, what can we learn about the true mean of our model, $\mu$?"

We can measure the mean of our data $\{x\}$, which we will name $\hat{\mu}$, but it's not immediately clear how this relates to the true mean $\mu$.  We would expect that these would be close to each other, so in a very loose sense, measuring $\hat{\mu}$ gives us a "ballpark" estimation of the true mean $\mu$.  Depending on one's purposes, this may be good enough.  If one isn't looking for statistical exactness or rigor, measuring the mean of a dataset and assuming it's "pretty close" to the true mean is certainly a fine thing to do.

But let's take our inference further and see what rigorous statements we can say about the parameter $\mu$.  At this point, the typical frequentist thing to do is to calculate a confidence interval, which we will do here.  I'll note that this is only an example of one thing that a person *could* do when faced with this data, and not the be-all-and-end-all thing that **can** be done.  Again, how one chooses to use data or what one wants to calculate all depend on one's purposes, the level of rigor necessary, and one's philosophy.  But, for now, let's assume that calculating a confidence interval is what we'd like to do here.

So, how do we calculate it in this gaussian example?  Recall that a confidence interval is not just a single interval $[min, max]$, but instead a procedure for calculating a $[min, max]$ set **given** some measured data.  Every possible dataset has a corresponding confidence interval on the parameter $\mu$, and the many intervals calculated on those hypothetical datasets must contain the true mean, $\mu_{true}$ with fraction $\alpha$ (where $\alpha$ is the "size" of the interval we're interested in, for example 95%).  

It isn't immediately clear how to translate the definition of a confidence interval into an actual calculation.  The definition is more of a description of the properties that an interval must have and not a prescription of how to create an interval with such properties.  Let's walk through how to actually translate this description into an actual interval.


### Procedure 1: Brute Force

To me, the simplest way conceptually to calculate a confidence interval is using the "brute force" method of generating fake data using the statistical model for different possible values of $\mu$ and calculating the sample mean, $\hat{\mu}$ for each "fake" dataset.  By doing this, we can create a distribution of $\hat{\mu}$ as a function of $\mu$ and we can use that to approximate a probability distribution: $p(\hat{\mu} | \mu)$ (for example, by using a sufficiently granular histogram distribution or possibly by leveraging a kernel method).

How does generating this distribution help us to create the confidence interval?  We know that the true value of $\mu$, $\mu_{true}$, is some fixed number, for example $\mu_{true} = 1.2234$.  Therefore, if we are building a 95% confidence interval, we need to construct an interval on our fake data such that 95% of the intervals contain 1.2234.  More generally, we need to show that, for EVERY possible value of $\mu$, our procedure will generate confidence intervals that contain $\mu$ 95% of the time.

Using our "brute-forced" distribution, we will attempt to do this by construction.  We do this with the following procedure:

- Scan over values of $\mu$ and, for each value, generate fake data to build a distribution of our sample mean, $\hat{\mu}$.
- For each value of $\mu$, using that distribution, find a window of $\hat{\mu}$ whose total probability given $\mu$% is $\alpha$ (this is a valid statement to make in the frequentist framework since it describes the probability of data, $\hat{\mu}$, based on a model, summarized by $\mu$). <!--  We then find an interval in that distribution of size $\alpha$.  In other words, for a given value of $\mu$, the value of $\hat{\mu}$ will be in THAT interval with probability $\alpha$. -->  Thus, for each value of $\mu$, we have built a window of $\hat{\mu}$.
- For the measured value of $\hat{\mu}$, find all values of $\mu$ whose window, as defined above, contains that measured value of $\hat{\mu}$.
- The set of all such values of $\mu$ is the confidence interval of $\mu$ for this particular value of $\hat{\mu}.  

Why does this work?  Why does an interval, defined in this way, have the properties of the confidence interval that we desire (namely that it contains the true value of $\mu$ with probability $\alpha$)?

Well, we start with the statement that here is only one TRUE value of $\mu$.  It is unknown to the person performing the experiment, but it exists.  For that fixed value of $\mu$, there will be a distribution of $\ht{\mu}$ generated (and we will measure a single random variable from that distribution when we perform the experiment).  

By tautology, there is a 95% change that the value of $\hat{\mu}$ that we draw will be in a 95% interval of the distribution of $\hat{\mu}$ given $\mu$.  There are two cases to example:

- Case 1: Given our true $\mu$, the value of $\hat{\mu}$ that we draw **IS** in that interval.  In this case, when the experimenter builds their confidence interval, it will contain the true value of $\mu$, since the true $\mu$ will be one of the $\mu$ values whose 95% confidence window contains $\hat{\mu}$
- Case 2: Given our true $\mu$, the value of $\hat{\mu}$ that we draw **IS NOT** in that interval.  Therefore, by the same logic, the experimenter's confidence interval will NOT contain the true value of $\mu$, since the measured value of $\hat{\mu}$ is outside of the 95% window of $\hat{\mu}$ given $\mu$.

And, as described, we know that case 1 occurs 95% of the time and case 2 5% of the time.  Therefore, we have proven that a confidence interval, as described above, will have the properties that we desire.


### Procedure 2: Exact Distribution

Since the gaussian example is a simple case, we can find the solution without resorting to brute force.  We used sampling to determine the distribution of $\hat{\mu}$ as a function of $\mu$.  But, for a Gaussian, we can find this distribution analytically.  It is given by:

$$
p(\hat{\mu} | \mu) = gauss(\hat{\mu} | \mu, \frac{\sigma}{\sqrt{N}})
$$

And since we have formulas/tables for taking the integrals of the gaussian, we can directly look up a 95% window for a given $\mu$.  For example, if we want a window of size $\alpha$, we know that the range of $\hat{\mu}$ in that window is given by:

$$
-1.96 < \frac {\hat{\mu} - \mu} {\sigma/\sqrt{N}} < 1.96
$$

(Knowing this formula is what allows us to shortcut past having to sample the distribution as we did above).

Let's say that we then measure a specific quantity $\hat{\mu}_{meas}$.  Following our procedure in the brute force example, we need to figure out which values of $\mu$ have a window that contains $\hat{\mu}_{meas}$.  In other words, we need to find all values of $\mu$ such that $-1.96 < \frac {\hat{\mu} - \mu} {\sigma/\sqrt{N}} < 1.96$.

We can do this by algebraically manipulating the inequality.  One can transform it to be:

$$
\hat{\mu} - 1.96\frac{\sigma}{\sqrt{n}} < \mu < \hat{\mu} + 1.96\frac{\sigma}{\sqrt{n}}
$$

To reiterate, this inequality gives us the set of all values of $\mu$ such that a given value of $\hat{\mu}$ is in the 95% probability window of $p(\hat{\mu} | \mu)$.  From this inequality, one can simply read off the confidence interval: Just plug in the measured value of $\hat{\mu}$ to obtain the upper and lower bounds on the confidence interval of $\mu$.  And, as demonstrated in the brute force example, we know that 95% of confidence intervals generated this way (across all hypothetical datasets) will contain $\mu_{true}$.


<!--
  It is sufficient to pick an arbitrary value of $\mu$ and show that the confidence intervals we generate contain the $\,mu$ 95% of the time.  Here's how: For our measured value of $\hat{\mu}$, we will find the distribution of $\mu$ and create an interval that contains 95% of the values of $\mu$ (or whatever $\alpha$ is.  The next step is to convince you that this procedure will result in 95% of confidence intervals containing the true mean $\mu$.

The fraction of confidence intervals that contain the true mean $\mu$ is given by:

$$
f_{\text{contains }\mu} = \sum_{\hat{\mu}} prob(\hat{\mu} | \mu) * I_{interval(\hat{\mu}) \text{ contains } \mu}
$$

where $I_{interval(\hat{\mu}) \text{ contains } \mu}$ is an indicator function whose value is 1 when the confidence interval created for the measured value $\hat{\mu}$ contains the true mean $\mu$ and 0 otherwise.
-->

## Generalizing

Let's try to generalize what we did above for a general probability distribution.  For now, we'll require that it has only one unknown parameter (just as the only unknown parameter of the gaussian example was $\mu$).  We'll later discuss how to handle multiple unknown parameters.

In our example, we have a probability distribution function:

$P(x | \theta)$

We also have a measured dataset $\{x\} = \{x1, x2, ..., xn\}$ and a function $g(x1, x2, ..., xn, \theta)$ that depends on both the data and the parameter we want to measure (which in the gaussian example, $g(\vec{x}, \mu) =  \frac{\hat{\mu} - \mu}{\sigma / \sqrt{N}}$).

To calculate the confidence interval, we have two possible procedures, one using brute-force and one using analytic inversion.

### Brute force

- For each value of $\theta$, generate many datasets.  For each value of $\theta$ and for each dataset generated from that value, calculate $g = g(x, \theta)$ and build up a distribution $p(g | \theta)$.
- Find a window in each such distribution that contains $\alpha$% of the total probability
- Given the measured data, $\vec{x}$, find all parameters $\theta$ such that $g(\vec{x}, \theta)$ is in the $\alpha$-sized window for that value of $\theta$.  Those values form the confidence interval of size $\alpha$.

### Analytic

Assume that we have an analytic formula for $p(g | \theta)$, and further assume that we can invert this formula:

- Find $C_L(\alpha)$ and $C_U(\alpha)$ such that the probability of $C_L(\alpha) < g(x, \theta) < C_U(\alpha)$ is equal to  $\alpha$. This is typically done by integrating over the known pdf $p(g | \theta)$.
- Invert this inequality to find: $g^{-1}(C_L(\alpha)) < \theta < g^{-1}(C_U(\alpha))$
- The confidence interval is then given by $[g^{-1}(C_L(\alpha)), g^{-1}(C_U(\alpha))]$.

Note that this procedure makes a strong assumption: $C_L(\alpha)$ and $C_U(\alpha)$ must not be functions of $\theta$.  (In the gaussian example, $C_L(\alpha) = -1.96$ and $C_U(\alpha) = 1.96$, which are independent of $\mu$.  This was because we constructed the function $\frac{\hat{\mu} - \mu}{\sigma / \sqrt{N}}$ to be independent of $\mu$, as subtracting $\mu$ in the equation cancels out the dependence of $\mu$ in $\hat{\mu}$).



"Whatever the true value is, it will produce data within the band 95% of the time..."

## Discussion

The procedure outlined above, where we scan over every possible value of $\theta$ and use the distribution of the data given that value of $\theta$ to build a confidence interval, is known as the Neyman Construction.  An important note is that the problem that the examples we've looked at only have a single parameter for which we're interested in calculating confidence intervals, and there are no other free parameters in the model (we assume that other parameters are both known and fixed).

[7] J. Neyman. Outline of a theory of statistical estimation based on the classical theory of probability.
Phil. Trans. Royal Soc. London, Series A, 236, 1937.

ORDERING RULE

What is a good choice of region?  Want to maximize "power".

LIKELIHOOD FUNCTION GAUSSIAN APPROXIMATION

RELATIONSHIP TO HYPOTHESIS TESTING

Notes:


## Using the Likelihood Function




## Bootstrapping




We need to assume that $p(\hat{mu} | \mu) is independent of mu.

http://www.stat.ucla.edu/~hqxu/stat105/pdf/ch08.pdf


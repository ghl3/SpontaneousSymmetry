---
author: 
date: 2016-09-03 11:25:54.397075
layout: post
slug: statistics-cheat-sheet
title: Inference
---



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


## Discussion

The procedure outlined above, where we scan over every possible value of $\theta$ and use the distribution of the data given that value of $\theta$ to build a confidence interval, is known as the Neyman Construction.  An important note is that the problem that the examples we've looked at only have a single parameter for which we're interested in calculating confidence intervals, and there are no other free parameters in the model (we assume that other parameters are both known and fixed).

[7] J. Neyman. Outline of a theory of statistical estimation based on the classical theory of probability.
Phil. Trans. Royal Soc. London, Series A, 236, 1937.

Notes:


## Using the Likelihood Function




## Bootstrapping




We need to assume that $p(\hat{mu} | \mu) is independent of mu.

http://www.stat.ucla.edu/~hqxu/stat105/pdf/ch08.pdf


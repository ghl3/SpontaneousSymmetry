---
title: Frequentist Hypothesis Tests and Inference 
---



# Scenario 1: Comparing a model to data


We will discuss the seemingly straightforward scenario of having a model and a dataset and asking whether the data is "consistent" with the model.  Depending on one's philosophy, there are a number of ways to think about what "consistent" means in concrete mathematical terms.

The classical frequentist way of answering this question was pioneered by Fischer and is based on a calculated quantity known as the "p-value".  Given a model and a dataset, the p-value is defined as the probability of that model generating that dataset OR generating a dataset "more extreme" than the measured dataset.  The logical underpinning of this calculation is answer the question, "Is my data so rare given my model that I should reject my model?".  If the model is very likely to generate the given dataset, or i it is likely to generate data that is even more "extreme", then one intuitively should not reject the model based on the measured data.  If I flip a coin and get 2 heads in a row, but I know that the odds of getting even 3 heads in a row given a fair coin aren't SO low, then I shouldn't conclude that my coin isn't fair.  If I roll a dice and get 2 1's in a row, but I know that the total probability of getting the any number twice in a row isn't so low, then I shouldn't conclude that my dice is somehow faulty.

It is clear how to calculate the probability of the measured dataset given the model, but it remains to be defined what hypothetical datasets should be included in the set of "more extreme" data.  This definition may vary depending on the problem.  These definitions of "extreme" may include:
- Any dataset that is equally likely or less likely than the measured dataset
- In the case of 1-d data, any value that is less likely than the measured data and is on the same side relative to the mode of the distribution as the measured data (one-sided p-value).
- Any dataset having some chosen summary statistic whose probability is less than or equal to the value of the summary statistic calculated on the observed data

There are numerous other ways, and choosing a good definition of more extreme data is an important part of conducting a good model comparison.  It depends on the problem and the statistical argument that one is attempting to make.

I'll emphasize that this procedure is merely a heuristic.  It is meant to be a check that should be considered when comparing data and a model.  It should not be interpreted religiously and has little meaning outside of its definition.  

Given the definition of a p-value, a typical p-value test consists of the following steps:
- Determine in advance a p-value threshold that will be used to conclude if the model and data are consistent or not.  A typical values is 0.05 (5%).
- Measure your data and calculate the p-value using the model
- If the p-value is < the threshold value, then conclude that the data and model are inconsistent.  If not, maintain belief that they are consistent.

<!--
Having run an experiment and obtained a dataset, the probability of measuring that data or data that is "more extreme" GIVEN THAT the null hypothesis is true is known as the "p-value".  For this to make sense, one needs a definition of what "more extreme means".  For now, let's assume that we have a definition of the extremeness of data.

A p-value test, not surprisingly, consists of running an experiment, calculating the p-value, and compares that p-value to some predetermined threshold.  If the p-value is less than that threshold, one rejects the null hypothesis (and is therefore forced to accept the alternate hypothesis since we initially agreed that there are only two possible hypotheses).  If not, then one maintains belief in the null hypothesis.
-->

<!--
A p-value test can be thought of as a subset of the general hypothesis testing framework above: it is a means of diving the space of data into regions that support $H_0$ and complementary regions that support $H_1$.  In this test, the summary statistic of the data is the p-value itself: we associate each possible data value with its p-value and those regions of space which have a p-value less than some pre-defined limit will be considered regions that reject the null hypothesis.

Seemingly, one difference between this test and the likelihood-ratio test described above is that this p-value test doesn't appear to depend on the model of the alternative hypothesis.  We are only calculating the total probability of a certain space of data given the null hypothesis and making our hypothesis choice based on that.  Historically, this type of hypothesis testing that only considered the null hypothesis was supported by Fischer, where as the type of hypothesis testing that explicitly compared $H_0$ to $H_1$ was supported by Neyman and Pearson (hence the Lemma named after them).
-->


# Scenario 2: Comparing two models given data


The case when there are only two possible models describing a phenomenon, where only one of which is true, is known as a "Simple Hypothesis".  Typically, these models are thought of asymmetrically: one model, known as the "Null Hypothesis" and here referred to as $H_0$, is thought of as the current understanding of the world and the other model, known as the "Alternate Hypothesis" and here referred to as $H_1$, is the challenger theory which, depending on the data, may unseat the null hypothesis.

The name "Simple Hypothesis" does not mean that the models corresponding to the two hypotheses themselves have to be "simple": The data being generated can be high dimensional and the models can have a complicated functional form.  The only requirement is that there only be 2 possible models and that those models have no free or unknown parameters.

This version of hypothesis testing ultimately boils down to considering the possible space of data and labeling certain regions of that space as supporting $H_0$ and other regions as supporting $H_1$ in a way that fully partitions the space.  If the data lands in a region of space that supports $H_0$, you maintain the null hypothesis and reject the alternate hypothesis.  Otherwise, you reject the null and support this alternate hypothesis.  There are a number of properties to consider when determining these partitions.

Any partitioning of the space can be considered in terms of the following:
- The probability of rejecting the null hypothesis GIVEN THAT the null hypothesis is actually true
- The probability of continuing to support the null hypothesis GIVEN THAT the alternative hypothesis is true

Rejecting the null hypothesis when it is actually true is known as a "Type 1 Error", and the probability of a "Type 1 Error" often called the "size" of a hypothesis test.  The probability of accepting the alternative hypothesis when the alternative hypothesis is indeed true is known as "power".  Intuitively, one would like to partition space in a way that minimizes the probability of a "Type 1 Error" and maximizes the power.  Note that the size of the test and power are determined by how one partitions the data space into $H_0$ and $H_1$ regions and not by the data itself.  These can be determined before you even run your experiment and observe the data, as long as you know what your two hypothesis are.

In this language, this process of testing a Simple Hypothesis is easy.  You can just partition the space however you choose, measure your data, pick $H_0$ or $H_1$ based on your partitioning, and then go home.  But, clearly, some partitioning must be better than others, so let's figure out what it means to be "better" and how to actually calculate those partitions that have the property of being "better".

The typical way to think about these properties and the constraints on the data space partitions that on draws is the following:
- Pick a fixed value for the size of the test (the probability of rejecting the null hypothesis GIVEN that it's true)
- Find the distribution of your data given $H_0$ and $H_1$.  Typically, this is done by calculating a single value representative of your data (a "summary statistic") and finding the probability distribution of that single-valued summary statistic given both hypotheses.  For high dimensional data, this is often easier to contemplate and visualize.
- Using those distributions, find the partitioning of the data space that maximizes the power of the test given the chosen size of the test.  This partitioning fully specifies the test.

Typically, people choose a size of the test to be 0.05 (5% chance of wrongly rejecting the null hypothesis), or one of a few other well-rounded numbers.  From there, they strive to pick regions that have high power.

Fortunately, in the case of a Simple Hypothesis, there is a way to find a division of space between the null and alternate hypothesis that maximizes the power of the test for a fixed value of the size of the test.  This procedure can be proven, and the proof is called the Neyman–Pearson Lemma.

The lemma simply states that on should parametarize the partitions of space by a single parameter, $\eta$, which is defined by:

$$
\frac {L(data | H_0)} {L(data | H_1)} <= \eta
$$

In other words, one should consider contours defined by the likelihood ratio of the null hypothesis and the alternate hypothesis.  Given those contours, the size of the test then fully determines the partitioning of the space: just pick the $H_0$ region such that the total probability of the region (given the null hypothesis) corresponds to the size of the test.

As far as things go in statistics, this is thus a solved problem.  If you are really in the case where you have only two possible models that could describe your problem, you should then delight.  However, that is rarely, if ever, the case.  Most problems have many possible models and each model has many parameters that are initially unknown, and this makes the problem of hypothesis testing much more challenging.


*"Null-hypothesis significance testing"*

http://www.stat.ualberta.ca/~wiens/stat665/TAS%20-%20testing.pdf

http://stats.stackexchange.com/questions/23142/when-to-use-fisher-and-neyman-pearson-framework

# Scenario 3: Finding values of a parameter that are consistent with data


Let's consider a more complicated scenario.  Instead of considering two discrete hypotheses, we consider a family of hypotheses parameterized by a single variable.  <!--Sometimes, in this case, it is instructive to consider a single value of this variable to represent the null hypothesis and for all other points to represent a family of alternative hypotheses.  Depending on the problem, there may not actually be a null hypothesis, in which case all values of the parameter can be considered on common grounds.-->  We imagine that we have a function representing a model which contains exactly one "free" or unknown parameter, and we further assume that SOME value of that parameter corresponds to the "true" model of our data.  We will refer to that value as the "true" value of the parameter (if our parameter is $\mu$, we will write it's true value as $\mu_{\text{true}}$).

The question we then want to answer is, "For a given measured dataset, what is the set of points of the parameter which are supported by the data (or, conversely, which points are rejected by the data)?"

The typical frequentist method for addressing this problem is by calculating what is known as a "Confidence Interval".  We will discuss what this means and how to calculate it in some detail.

Before doing so, I'll note that a confidence interval is only an example of one thing that a person *could* do when faced with this scenario; it is not be-all-and-end-all thing that **can** be done.  It is a procedure, motivate by statistical intuition, that can be a useful took when thinking about a problem or making a decision.  But how one chooses to use data or what one wants to calculate all depend on one's purposes, the level of rigor necessary, and one's philosophy.  For now, let's assume that calculating a confidence interval is what we'd like to do here.



## Definition

Formally, a confidence interval is a procedure for calculating an interval in parameter space based on observed data that has a fixed probability of containing the "true" value of the parameter.  I emphasize that the interval is based on the data.  Because the data is based on a random distribution, then the interval itself is a random variable (different data would produce a different interval).  To a frequentist, the true value of a parameter is NOT a random variable: it is some fixed (but unknown) value.  Therefore, a frequentist does not talk about the probability that the true value is in some fixed interval.  Instead, they talk about the probability that an interval contains the true value.  For any fixed interval, it either DOES contain the true value or DOES NOT.

The probability that the confidence interval contains the true value of the parameter is known as the "size" of the interval, and is usually chosen in advance of calculating the interval.  For example, a 95% confidence interval will contain the true value of a parameter 95% of the time (depending on what observed data is generated by the model).

It isn't immediately clear how to translate the definition of a confidence interval into an actual calculation.  The definition is more of a description of the properties that an interval must have and not a prescription of how to create an interval with such properties.  Let's walk through how to actually translate this description into an actual interval.



## Brute Force Calculation

Calculating a confidence interval means coming up with a procedure that will contain the true value of the parameter some pre-determined percentage of the time.  There is only one single true value of the parameter, and so our procedure must produce an interval from data generated GIVEN that true value which contains that true value some pre-determined percentage of the time.  The trouble is that, since we don't KNOW that true value, we must ensure our procedure works for ALL possible values of the parameter, knowing that ANY of them could be the true value.  That's the challenge of a confidence interval.  While this seems initially foreboding, it turns out that it can be calculated using a relatively simple method which creates intervals having this property "by construction".

To me, the simplest way conceptually to calculate a confidence interval is using what I'll call the "brute force" method.  This method relies on generating many possible datasets for many possible values of the parameter of interest, which will be used to infer the distribution of our data for every possible parameter value (or as many as we need to satisfy our desired level of exactness).  We will first describe this procedure and then discuss why it creates confidence intervals (as defined above).

Let's label our data as $x$ and our single parameter as $\theta$, and assume that we want to generate a confidence interval of size $\alpha$.  Given that. the brute force procedure is as follows:
- For each value of our parameter $\theta$, generate many datasets.  For each value of $\theta$, using the generated data, create a distribution $p(x | \theta)$. <!-- and for each dataset generated from that value, calculate $g = g(x, \theta)$ and build up a distribution $p(g | \theta)$.-->
- For every value of $\theta$, choose a window in the domain of the data ($x \ele [a, b]$) such that the total probability of that window is the size of the confidence window: $\int_a^b $p(x | \theta)$ dx = \alpha$.  Record these windows $[a, b]$ for each value of $\theta$.
- Run the experiment and measure the observed value of x
- Given that measured data, find all values of the parameter $\theta$ such that x falls in the window created above.  In other words, determine the set ${\theta : a(\theta) < x b(\theta)}$.
- That set of values of $\theta$ forms the confidence interval on the parameter $\theta$ of size $\alpha$.
   

## Analytic Calculation

## Approximations





There are two formal ways that we can answer this initially-vague question.  The first is to create what's called a "Confidence Interval" for the this parameter given the data.  The second is to consider each individual point to specify a model and to perform a p-value hypothesis test on each point to determine those that aren't rejected.  These two approached, it turns out, will result in the same answer.



*A (1 − α) confidence region can be defined simply as a collection of parameter values that would not be rejected by a Fisherian α level test, that is, a collection of parameter values that are consistent with the data as judged by an α level test.*










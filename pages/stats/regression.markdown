---
author: George Lewis
date: 2017-05-13 13:44:25.403028
layout: post
slug: statistics-regression
title: Regression
id: 450
---

# Regression


Regression is one of the most useful tools for a statistical modeler.  


# Linear Regression

A linear regression is a statistical model that describes the distribution of a variable $y$ (known as the "target") as a function of a number of "feature" variables $x_1, ..., x_n$.  The model is typically applied to instances where we have multiple independent draws from the x and y vectors. The model consists of the following assumptions:

- The distribution of $y$ is a Gaussian that is centered around a mean $\hat{y}$.
- The variance of the gaussian is an unknown variable $\sigma$
- The value of $\hat{y}$ is a linear function of the feature variables:

$$
\hat{y} = w_1x_1 + w_2x_2 + ... + w_ix_i + C
$$

where $C$ is a constant known as the "intercept".  We will use a simplified notation where there is always a "dummy" feature $x_0$ whose value is always 1, and therefore the corresponding weight $w_0$ will act as an intercept.  This is fully equivalent to the previous formulation and only serves to make he equations easier.  In addition, if we assume that we have $i$ features and $N$ observations of each feature and target, we denote the $n^{th}$ observation of y as $y_n$ and the $n^{th}$ observation of the $i^{th}$ feature as $x_n^i$.

The likelihood function for this model can be written as:

$$
L({y_n, x_n^i} | w_0...w_i, \sigma) = \prod_n Gauss(y_n | \sum_i w_i x_n^i, \sigma)L(\vec{x})
$$

Note that we likelihood consists of two parts: The likelihood for the values of $\vec{x}$ and the likelihood for the value of $y$ conditional on those values of $x^i$.  For the rest of this discussion, we will ignore the second part of the likelihood $L(\vec{x})$, as when performing regression we are typically interested in obtaining the set of weights $w_i$, which do not appear in the term $L(\vec{x})$.

This likelihood has i+2 parameters, where $i$ is the number of non-intercept features chosen for the model (different choices of features would result in different models with different likelihood functions).  An important assumption here is the fact that $\sigma$ is a constant: It doesn't depend on the values of $x_n^i$.  This means that the gaussian "noise" is independent of the features.  Because of this property, it is said that the errors are "heteroscedastic" (this sounds fancy, but just means that the $\sigma$ in the gaussian likelihood is a constant).

<!--
The typical use case of this model assumes that one has N independent draws of the variable $y$, each at possibly-different points in $\vec{x}$ space.  The fact that these draws are independent allows us to write the joint likelihood function as:

$$
L(\vec{y}, \vec{x}_1, \vec{x}_2, \vec{x}_n | w_1, w_2, ..., C, \sigma ) = \prod_n Gauss(y_n | \vec{w} \cdot \vec{x}_n + C, \sigma)
$$
-->

Note that including more points $(y_n, x_n^i)$ doesn't add more parameters to the model, which remain the coefficients $w_0, ..., w_i$ and $\sigma$.  This is good, as it means that we can gather more data and not make the model more complex.

It turns out that one can obtain the maximum likelihood estimators for these parameters exactly (which is one of the most important properties of linear regression).  Before presenting this result, we will re-write the likelihood function as the log-likelhood (to better match how it is most commonly encountered in statistical textbooks):

\begin{align}
log(y_n, x_n^i | {w_i}, \sigma)   & = &  \sum_n log(Gauss(y_n | x_n^i \cdot w_i, \sigma)) \\\\
   & = & \sum_n  \frac{(y_n - (x_n^i \cdot w_i))^2}{\sigma^2} + \frac{N}{2} log(\sigma^2) \\\\
\end{align}

Since maximizing the likelihood is equivalent to minimizing the log-likelihood, one can obtain the maximum likelihood estimators by minimizing the above equation for the log-likelihood.  Most people, when thinking about linear regression, interpret the above as a "cost" function that is defines linear regression and proceeds to minimize it.  But it is instructive to understand how it follows from a likelihood-based model definition.

In particular, one can see from the above that the optimal coefficients for $\vec{w}$ can be found by minimizing the term:

$$
\sum_n  (y_n - (x_n^i \cdot w_i))^2
$$ 

In other words, the likelihood only depends on $\vec{w}$ via the above term.  This is the typical way that many introduce regression; it is instructive to see that the likelihood minimization results in the "least-squares" formulation of regression.  This also implies that $\vec{w}$ can be minimized without optimizing $\sigma$.

The analytic solution to this is the following (using matrix notation to simplify):

$$
\hat{\vec{w}} = (X^TX)^{-1}X^T\vec{y} \\\\
\hat{\sigma} = \frac{1}{N} \sum_n (y_n - x_n^i \cdot w_i)^2 \\\\
$$

where $X^T$ stands for the transpose of the full matrix of observables (all n observations and all i variables per observation).

Having obtained the maximum likelihood estimators for the weights $w_i$ and the standard error $\sigma$, one may ask what the properties of these quantities are.  We know from our discussion of maximum likelihood estimators that mles are asymptotically consistent and gaussian-distributed.  So, if N is large enough, we know that the value of each weight $w_i$ is approximately distributed about its mle with some uncertainty.


<!-- 

!!!FIGURE OUT THE DERIVATION!!!

As a more exact solution, let's see if we can come up with the distribution of $\hat{w_i} - w_{true}$.  Assuming our model is true, we know that $y_n = w_i \cdot x_n^i + \epsilon_n$, where $\epsilon _n \sim Gauss(0, \sigma)$.  Plugging this into the MLE values $\hat{\vec{w}} = (X^TX)^{-1}X^T\vec{y}$ gives:

\begin{align}
\hat{\vec{w}} &=& (X^TX)^{-1}X^T(XW +\epsilon) \\\\
\hat{\vec{w}} &=& (X^TX)^{-1}X^TXW + (X^TX)^{-1}X^T\epsilon \\\\
\hat{\vec{w}} &=& W + (X^TX)^{-1}X^T\epsilon \\\\
\end{align}

which implies

$\hat{\vec{w}} - W = (X^TX)^{-1}X^T\epsilon$

This shows that $\hat{\vec{w}} - W$ is normally distributed...

FINISH FROM HERE:
https://stats.stackexchange.com/questions/117406/proof-that-the-coefficients-in-an-ols-model-follow-a-t-distribution-with-n-k-d
http://www.econ.ohio-state.edu/dejong/note5.pdf
http://people.stern.nyu.edu/wgreene/MathStat/GreeneChapter4.pdf

$$
\hat{w}_i - w_i = 
$$

-->

In the non-asymptotic regime, the distribution of $w_i$ is given by:

$$
p(\hat{w_i}) = gauss(\hat{w_i} | w_i, \sigma \sqrt{S_{kk}})
$$

where 

$$
S_{kk} = (X^TX)^{-1}_{kk}
$$

And if we define

$$
s^2 = \frac{\sum y_n - \hat{w}_ix_n^i}{N-p}
$$

where N is the number of observations and P is the number of features, then it can also be shown that 

$$
V = \frac{(N-P)s^2}{\sigma^2} \sim \chi_{N-P}
$$

Further, one can show that the distributions of the mle coefficients and the distribution of the sample variance are independent.

These two quantities, and knowing that  allow us to construct a value that follows the student's t distribution:

$$
t_i = \frac
{\frac{\hat{w_i} - w_i}{\sigma\sqrt{S_{ii}}}}
{\sqrt{\frac{(N-P)s^2}{\sigma^2}}/(N-P)}
$$

which we can simplify to get

$$
\frac{\hat{w}_i - w_i}{s^2 S_{ii}} \sim t_{N-P}
$$

This gives us a pivotal quantity that we can use to create confidence intervals on the fitted coefficients $\hat{w}_i$.  To do so, we follow our usual procedure:

- Define a size $\alpha$
- Find the points in the space of $t_{N-P}$ that define region of cumulative probability $\alpha$ (it would make sense to choose a central, symmetric region
- Invert the definition of $t_{N-P}$ to find the value of $\hat{w}_i$ that correspond to those boundary points, which form the confidence interval boundaries for $\hat{w}_i$.

It can be shown that the estimators $\hat{\vec{w}}$ are unbiased (even in the non-asymptotic regime).  In addition, they are the best linear unbiased estimators (BLUE), where "best" means they have the lowest variance among linear unbiased estimators, and they are efficient.  These properties are shown by the Gauss-Markov theorem (when the assumptions of that theorem are met).

On the other hand, the estimator for $\sigma$ is biased.  One can create an unbiased version by dividing by $N-i$ instead of simply $N$ (the version with $N-i$ is what people often ad-hoc state the estimate of the variance to be.  But it's the same as the maximum likelihood estimator).


With the distribution of $\hat{\vec{w}}$ in hand, one of the common things to do is to, parameter by parameter, find those features whose parameter's estimator is nonzero with statistical significance.  Specifically, this means testing (and possibly rejecting) the hypothesis that the parameter's true value is 0.  This can be tested directly using a p-value test: Assuming the null hypothesis that the parameter is equal to exactly 0, what is the probability of seeing a fitted value of the coefficient as far from zero or farther.  Note that this is a 2-sided test: we consider possible parameter values in both the positive and negative direction.  To do this, set $w_i=0$ in the equation above, calculate the t test-statistic, and compare it to the 2-sided tails defined above of total size $\alpha$.  The interpretation is that a parameter whose p-value is very small "rejects" the null hypothesis of the parameter's true value being 0.  Thus, that parameter is likely "significant", or is an important component of the model.  While the calculation defined above is exact, since very few real life situations perfectly meet the assumptions of a regression, this procedure should mostly be thought of as a heuristic for determining which features in a model may be considered for dropping and which ones are likely to be important to the model's overall performance.

http://reliawiki.org/index.php/Simple_Linear_Regression_Analysis

### F Test

We above described how to do a p-value test to determine if a parameter is significant.  One may be tempted to perform this test on every parameter and find those that are not significant.  However, with many parameters, the probability of finding ANY parameter that is not significant becomes significant.  Do enough p-value tests and you're bound to find an interesting result eventually!

As an alternative, one can perform a test to see if a model with fewer variables is as good as the model with all variables.  Typically, this test is performed against the most minimal model possible: one in which the only variable is the intercept.  In other words, one performs a tests to see if the model is significantly better than a model with no coefficients.  A model with more coefficients will always produce a better overall fit than a model with fewer or no free coefficients (since it is more flexible).  The question is whether this fit is significantly better than the 0-parameter model.

http://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/10/lecture-10.pdf



https://stats.stackexchange.com/questions/258461/proof-that-f-statistic-follows-f-distribution

http://pages.stern.nyu.edu/~churvich/MBA/Handouts/23-Reg8.pdf

https://onlinecourses.science.psu.edu/stat501/node/295

TODO:

- Distribution of $\sigma
- F Statistic to determine improvement based on variables
- Discussion on Correlated inputs

Correlated Inputs
Contrary to a common mis-understanding, a regression model doesn't assume that input features are statistically uncorrelated.  The only assumption is that the mean of the dependent variable, $y$, is determined by the weighted sum of the inputs.  Two features being statistically correlated with each other (one tends to be high when the other is high and visa versa, in some population) doesn't break this assumption.  However, it may lead to misleading interpretations when fitting the data.  Specifically, the presence of correlated features will cause the variance on the fitted value of the features to be larger than the variance of any individual feature would be.  Intuitively, if you copy a feature exactly, the model has full freedom to adjust the coefficients for those features as long as their sum remains the same.  This can be thought of as high variance on the fitted parameters (since they cannot be fitted unquely).  This can hurt the interpretability of a model: you may want to draw a conclusion based on the value of one of the fitted parameters, but since it is so volitile, your conclusion will have little statistical significance.

The extent to which the variance of fitted predictors is increased is known as the Variance Inflation Factor (VIF).

However, multicollinearity often does not effect the overall performance of the model.  

The variances of the fitted parameters are higher

http://data.princeton.edu/wws509/notes/c2s2.html

https://stats.stackexchange.com/questions/117406/proof-that-the-coefficients-in-an-ols-model-follow-a-t-distribution-with-n-k-d


http://ctu.edu.vn/~dvxe/econometrics/MLE_simple_linear_regression.pdf


http://www.le.ac.uk/users/dsgp1/COURSES/MATHSTAT/13mlreg.pdf

http://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/05/lecture-05.pdf
http://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/06/lecture-06.pdf


# Logistic Regression

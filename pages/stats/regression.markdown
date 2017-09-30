---
author: George Lewis
date: 2017-05-13 13:44:25.403028
layout: post
slug: statistics-regression
title: Regression
id: 450
---

# Regression


Regression is one of the most useful tools for a statistical modeler.  It is an extremely simple model but can often fit real world data surprisingly well.  It is readily interpretable, as each feature contributes to the prediction in a univariate way.  And it is well-studied, so there are numerous exact and approximate ways to determine its statistical properties.

## Linear Regression

Linear regression is a statistical model that describes the distribution of a variable $y$ (known as the "target") as a function of a number of "feature" variables $x_1, ..., x_n$.  The model is typically applied to instances where we have multiple independent draws from the x and y vectors. The model consists of the following assumptions:

- The distribution of $y$ is a Gaussian that is centered around a mean $\hat{y}$.
- The variance of the gaussian is an unknown variable $\sigma$
- The value of $\hat{y}$ is a linear function of the feature variables:

$$
\hat{y} = w_1x_1 + w_2x_2 + ... + w_ix_i + C
$$

where $C$ is a constant known as the "intercept".  We will use a simplified notation where there is always a "dummy" feature $x_0$ whose value is always 1, and therefore the corresponding weight $w_0$ will act as an intercept.  This is fully equivalent to the previous formulation and only serves to make he equations easier.  In addition, if we assume that we have $I$ features and $N$ observations of each feature and target, we denote the $n^{th}$ observation of y as $y_n$ and the $n^{th}$ observation of the $i^{th}$ feature as $x_n^i$.

### The Model

The likelihood function for this model can be written as:

$$
L({y_n, x_n^i} | w_0...w_i, \sigma) = \prod_n Gauss(y_n | \sum_i w_i x_n^i, \sigma)L(x_n^0, ..., x_n^i)
$$

The likelihood consists of two parts: The likelihood for the values of $x^i$ and the likelihood for the value of $y$ conditional on those values of $x^i$.  For the rest of this discussion, we will ignore the second part of the likelihood $L(\vec{x})$, as when performing regression we are typically interested in obtaining the set of weights $w_i$, which do not appear in the term $L(\vec{x})$.  This is equivalent to assuming that the $x^i$ are fixed in all of the statistical tests that will follow, and only the targets $y_n$ vary.

This likelihood has $i+2$ parameters, where $i$ is the number of non-intercept features chosen for the model (different choices of features would result in different models with different likelihood functions).  An important assumption of the model is the fact that $\sigma$ is a constant: It doesn't depend on the values of $x_n^i$.  This means that the gaussian "noise" is independent of the features (errors that are independent of the features like this are said to be "heteroscedastic").

<!--
The typical use case of this model assumes that one has N independent draws of the variable $y$, each at possibly-different points in $\vec{x}$ space.  The fact that these draws are independent allows us to write the joint likelihood function as:

$$
L(\vec{y}, \vec{x}_1, \vec{x}_2, \vec{x}_n | w_1, w_2, ..., C, \sigma ) = \prod_n Gauss(y_n | \vec{w} \cdot \vec{x}_n + C, \sigma)
$$
-->

It is important to note that including more points $(y_n, x_n^i)$ doesn't add more parameters to the model, which remain the coefficients $w_0, ..., w_i$ and $\sigma$.  This is good, as it means that we can gather more data and not make the model more complex.

### Fitting the Model

To "fit" a logistic regression model is to obtain the values of the weights.  The most common technique used to determine the weights is to find their maximum likelihood estimators.  It turns out that one can obtain the maximum likelihood estimators for these parameters exactly (which is one of the most important properties of linear regression).  Before presenting this result, we will re-write the likelihood function as the log-likelhood (to better match how it is most commonly encountered in statistical textbooks):

$$\begin{align}
log(y_n, x_n^i | {w_i}, \sigma)   & = &  \sum_n log(Gauss(y_n | x_n^i \cdot w_i, \sigma)) \\
   & = & \sum_n  \frac{(y_n - (x_n^i \cdot w_i))^2}{\sigma^2} + \frac{N}{2} log(\sigma^2) \\
\end{align}
$$

Since maximizing the likelihood is equivalent to minimizing the log-likelihood, one can obtain the maximum likelihood estimators by minimizing the above equation for the log-likelihood.  Often, performing inference on a regression model is viewed from an optimization perspective, in which case the log likelihood ratio is interpreted as a "cost" function that one must minimize.

In particular, one can see from the above that the optimal coefficients for $\vec{w}$ can be found by minimizing the term:

$$
\sum_n  (y_n - (x_n^i \cdot w_i))^2
$$ 

In other words, the likelihood only depends on $\vec{w}$ via the above term.  This is the typical way that many introduce regression; it is instructive to see that the likelihood minimization results in the "least-squares" formulation of regression.  This also implies that $\vec{w}$ can be minimized without considering or first optimizing $\sigma$.  This fact means that most discussions of fitting a regression model ignore $\sigma$ as a parameter to be fit.

The analytic solution to this is the following (using matrix notation to simplify):

$$
\hat{\vec{w}} = (X^TX)^{-1}X^T\vec{y} \\\\
\hat{\sigma}^2 = \frac{1}{N} \sum_n (y_n - x_n^i \cdot w_i)^2 \\\\
$$

where $X^T$ stands for the transpose of the full matrix of observables (all n observations and all i variables per observation).

### Distributions of fitted parameters

Having obtained the maximum likelihood estimators for the weights $w_i$ and the standard error $\sigma$, one may ask what the properties of these quantities are.  We know from our discussion of maximum likelihood estimators that mles are asymptotically consistent and gaussian-distributed.  So, if N is large enough, we know that the value of each weight $w_i$ is approximately gaussian distributed about its mle with some uncertainty.

However, it turns out that (under the assumptions of the linear regression model) the coefficients are exactly gaussian distributed about their true (but unknown) mean and with true variance $\sigma$.  This can be seen from the solution for $\hat{\vec{w}}$ above.  Under the assumption of the model, $y$ is gaussian distributed and the $x$ feature values are fixed.  Therefore, $(X^TX)^{-1}X^T\vec{y}$ is just a linear combination of gaussian-distributed variables, which itself is gaussian distributed.

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

Specifically, one can show that the distribution of $w_i$ is given by:

$$
p(\hat{w_i}) = gauss(\hat{w_i} | w_i, \sigma \sqrt{S_{kk}})
$$

where 

$$
S_{kk} = (X^TX)^{-1}_{kk}
$$


Similarly, the definition of $\hat{\sigma} = \frac{1}{N} \sum_n (y_n - x_n^i \cdot w_i)^2$ is the sum of the squares of gaussian-distributed variables (since $y$ is the only random variable in that equation and it is gaussian-distributed).  Therefore, $\hat{\sigma}$ follows a chi-squared distribution.  There are N gaussian added together, and the fit of the $w_i$ variables required solving a linear equation with $I$ constraints (one per feature/weight), therefore the number of degrees of freedom of the chi-squared is given by $(N-I)$.

Specifically, if we define

$$
s^2 = \frac{\sum_i (y_n - \hat{w}_ix_n^i)^2}{N-I}
$$

then it can also be shown that 

$$
V = \frac{(N-I)s^2}{\sigma^2} \sim \chi_{N-I}
$$

Further, one can show that the distributions of the mle coefficients and the distribution of the sample variance are independent.

The fact that we have a gaussian and a chi-square distributed quantity above, and the fact that we can show that they are independent, allows us to construct a quantity which follows the student's t distribution:

$$
t_i = \frac
{\frac{\hat{w_i} - w_i}{\sigma\sqrt{S_{ii}}}}
{\sqrt{\frac{(N-P)s^2}{\sigma^2}}/(N-I)}
$$

which we can simplify to get

$$
\frac{\hat{w}_i - w_i}{s^2 S_{ii}} \sim t_{N-P}
$$

One can see that the dependence on the unknown parameter $\sigma$ canceled out, leaving us with a statistic that we can calculate from data.  This gives us a pivotal quantity that we can use to create confidence intervals on the fitted coefficients $\hat{w}_i$.  To do so, we follow our usual procedure:

- Define a size $\alpha$
- Find the points in the space of $t_{N-P}$ that define region of cumulative probability $\alpha$ (it would make sense to choose a central, symmetric region
- Invert the definition of $t_{N-P}$ to find the value of $\hat{w}_i$ that correspond to those boundary points, which form the confidence interval boundaries for $\hat{w}_i$.

The estimators $\hat{\vec{w}}$ are exactly unbiased (we see this since they are exactly t-distributed around their true value).  In addition, they are the best linear unbiased estimators (BLUE), where "best" means they have the lowest variance among linear unbiased estimators, and they are efficient.  These properties can be shown by what is known as the Gauss-Markov theorem.

On the other hand, the estimator for $\sigma$ is biased.  One can create an unbiased version by dividing by $N-I$ in the definition of $\hat{\sigma}^2$ (instead of simply $N$), but such a quantity would then differ from the maximum likelihood estimator.

### Analysis of features

One of the most common applications of the t-distribution that we derived above is to determine which features have weights that are significantly different from 0. This can be tested directly using a p-value test on the t-distributed test statistic.  Note that this is a 2-sided test: we consider possible parameter values in both the positive and negative direction.  To do this, set $w_i=0$ in the equation above, calculate the t test-statistic, and compare it to the 2-sided tails defined above of total size $\alpha$.  The interpretation is that a parameter whose p-value is very small "rejects" the null hypothesis of the parameter's true value being 0.  Thus, that parameter is likely "significant", or is an important component of the model.

This is an exact test, assuming the assumptions built into the regression model.  In practice, very few real life situations perfectly meet the assumptions of a regression.  Therefore, this procedure should mostly be thought of as a heuristic for determining which features in a model may be considered for dropping and which ones are likely to be important to the model's overall performance.

<!--
http://reliawiki.org/index.php/Simple_Linear_Regression_Analysis
-->


<!-- F TEST -->

One may be tempted to perform this test on every parameter individually and find those that are not significant.  However, with many parameters, the probability of finding ANY parameter that is not significant becomes high.  If you do enough p-value tests, you're bound to find a "significant" result by chance alone.

As an alternative to performing a series of t-tests, one can perform a single test to compare two models that differ by using a different number of features.  Typically, this test compares the nominal model against the most minimal model possible: one in which the only variable is the intercept.  In other words, one performs a test to see if the nominal model is significantly better than a model with no features at all.  A model with more coefficients will always produce a better overall fit than a model with fewer or no free coefficients (since it is more flexible).  The question is whether this fit is significantly better than the 0-parameter model.




<!--
http://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/10/lecture-10.pdf

https://stats.stackexchange.com/questions/258461/proof-that-f-statistic-follows-f-distribution

http://pages.stern.nyu.edu/~churvich/MBA/Handouts/23-Reg8.pdf

https://onlinecourses.science.psu.edu/stat501/node/295

-->

<!-- Issues -->

### Issues and Pitfalls

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


### Regularization



## Logistic Regression

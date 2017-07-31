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

A linear regression model is a statistical model that describes the distribution of a variable $y$ as a function of a number of "feature" variables $x_1, ..., x_n$.  The model consists of the following assumptions:

- The distribution of $y$ is a Gaussian that is centered around a mean $\hat{y}$.
- The variance of the gaussian is an unknown variable $\sigma$
- The value of $\hat{y}$ is a linear function of the feature variables:

$$
\hat{y} = w_1x_1 + w_2x_2 + ... + w_ix_i + C
$$


where $C$ is a constant known as the "intercept".

The likelihood function for this model can be written as:

$$
L(y, x_1...x_i | w_1...w_i, C, \sigma) = Gauss(y | \sum_i w_ix_i + C, \sigma)
$$

This likelihood has i+2 parameters, where $i$ is the number of features chosen for the model (different choices of features would result in different models with different likelihood functions).  An important assumption here is the fact that $\sigma$ is a constant: It doesn't depend on the values of $\vec{x}$.  This means that the gaussian "noise" is independent of the features.  Because of this property, it is said that the errors are "heteroscedastic" (this sounds fancy, but just means that the $\sigma$ in the gaussian likelihood is a constant).

The typical use case of this model assumes that one has N independent draws of the variable $y$, each at possibly-different points in $\vec{x}$ space.  The fact that these draws are independent allows us to write the joint likelihood function as:

$$
L(\vec{y}, \vec{x}_1, \vec{x}_2, \vec{x}_n | w_1, w_2, ..., C, \sigma ) = \prod_n Gauss(y_n | \vec{w} \cdot \vec{x}_n + C, \sigma)
$$

Note that including more points $(y_n, \vec{x}_n)$ doesn't add more parameters to the model, which remain the coefficients $w_1, ..., w_i = \vec{w}$, $\sigma$ and $C$.  This is good, as it means that we can gather more data and not make the model more complex.

It turns out that one can obtain the maximum likelihood estimators for these parameters exactly (which is one of the most important properties of linear regression).  Before presenting this result, we will re-write the likelihood function as the log-likelhood (to better match how it is most commonly encountered in statistical textbooks):

\begin{align}
log(\vec{y}, x_{i, j} | \vec{w}, \sigma)   & = &  \sum_n log(Gauss(y_n | \vec{x}_n \cdot \vec{w} + C, \sigma)) \\\\
   & = & \sum_n  \frac{(y_n - (\vec{x}_n \cdot \vec{w} + C))^2}{\sigma} + \frac{N}{2} log(\sigma^2) \\\\
\end{align}

Since maximizing the likelihood is equivalent to minimizing the log-likelihood, one can obtain the maximum likelihood estimators by minimizing the above equation for the log-likelihood.  Most people, when thinking about linear regression, interpret the above as a "cost" function that is defines linear regression and proceeds to minimize it.  But it is instructive to understand how it follows from a likelihood-based model definition.

The solution to this is the following (we simplify notation by interpreting the intercept as another coefficient $w_0$ that is aligned with a fake observable $x_0$ whose values is always 1):

$$
\hat{\vec{w}} = (X^TX)^{-1}X^T\vec{y} \\\\
\hat{\sigma} = \frac{1}{N} \sum_n (y_i - X \vec{\hat{w}})^2 \\\\
$$

where $X^T$ stands for the transpose of the full matrix of observables (all n observations and all i variables per observation.  Note that the solution for $\hat{\sigma}$ is written in terms of $\hat{\vec{w}}$ (it turns out that the  solution for $\hat{\vec{w}}$ is independent of $\sigma$ but not visa versa).


TODO:

- Distribution of fitted variables
- P Valus
- F Statistic to determine improvement based on variables
- Discussion on Correlated inputs

Correlated Inputs
Contrary to a common mis-understanding, a regression model doesn't assume that input features are statistically uncorrelated.  The only assumption is that the mean of the dependent variable, $y$, is determined by the weighted sum of the inputs.  Two features being statistically correlated with each other (one tends to be high when the other is high and visa versa, in some population) doesn't break this assumption.  However, it may lead to misleading interpretations when fitting the data.  Specifically, the presence of correlated features will cause the variance on the fitted value of the features to be larger than the variance of any individual feature would be.  Intuitively, if you copy a feature exactly, the model has full freedom to adjust the coefficients for those features as long as their sum remains the same.  This can be thought of as high variance on the fitted parameters (since they cannot be fitted unquely).  This can hurt the interpretability of a model: you may want to draw a conclusion based on the value of one of the fitted parameters, but since it is so volitile, your conclusion will have little statistical significance.

The extent to which the variance of fitted predictors is increased is known as the Variance Inflation Factor (VIF).

However, multicollinearity often does not effect the overall performance of the model.  

The variances of the fitted parameters are higher



http://www.le.ac.uk/users/dsgp1/COURSES/MATHSTAT/13mlreg.pdf

http://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/05/lecture-05.pdf
http://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/06/lecture-06.pdf

# Logistic Regression

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
L(y | \vec{x}) = Gauss(y | \sum_i w_ix_i + C, \sigma)
$$

This likelihood has i+2 parameters, where $i$ is the number of features chosen for the model (different choices of features would result in different models with different likelihood functions).  An important assumption here is the fact that $\sigma$ is a constant: It doesn't depend on the values of $\vec{x}$.  This means that the gaussian "noise" is independent of the features.  Because of this property, it is said that the errors are "heteroscedastic" (this sounds fancy, but just means that the $\sigma$ in the gaussian likelihood is a constant).

The typical use case of this model assumes that one has N independent draws of the variable $y$, each at possibly-different points in $\vec{x}$ space.  The fact that these draws are independent allows us to write the joint likelihood function as:

$$
L(\vec{y}, \vec{x}_1, \vec{x}_2, \vec{x}_n | w_1, w_2, ..., C, \sigma ) = \prod_n Gauss(y_n | \vec{w} \cdot \vec{x}_n + C, \sigma)
$$

Note that including more points $(y_n, \vec{x}_n)$ doesn't add more parameters to the model, which remain the coefficients $w_1, ..., w_i = \vec{w}$, $\sigma$ and $C$.  This is good, as it means that we can gather more data and not make the model more complex.

It turns out that one can obtain the maximum likelihood estimators for these parameters exactly (which is one of the most important properties of linear regression).  Before presenting this result, we will re-write the likelihood function as the log-likelhood (to better match how it is most commonly encountered in statistical textbooks):

\begin{align\*}
log(\vec{y}, x_{i, j} | \vec{w}, \sigma)  & = &  \sum_n log(Gauss(y_n | \vec{x}_n \cdot \vec{w}   + C, \sigma))) \\\\
  & = &  \sum_n  \frac{(y_n - (\vec{x}_n \cdot \vec{w} + C))^2}{\sigma} + \frac{N?{2} log(\sigma^2) \\\\
\end{align\*} 

Since maximizing the likelihood is equivalent to minimizing the log-likelihood, one can obtain the maximum likelihood estimators by minimizing the above equation for the log-likelihood.  Most people, when thinking about linear regression, interpret the above as a "cost" function that is defines linear regression and proceeds to minimize it.  But it is instructive to understand how it follows from a likelihood-based model definition.

The solution to this is the following (we simplify notation by interpreting the intercept as another coefficient $w_0$ that is aligned with a fake observable $x_0$ whose values is always 1):

$$
\hat{\vec{w}} = (X^TX)^{-1}X^T\vec{y} \\\\
\hat{\sigma} = \frac{1}{N} \sum_n (y_i - X \vec{w})^2 \\\\
$$

where $X^T$ stands for the transpose of the full matrix of observables (all n observations and all i variables per observation.  Note that the solution for $\hat{\sigma}$ depends on the unknown values of $w$.  One typically substitutes the values of $\hat{w}$ in that equation to obtain the estimator $\hat{\sigma}$.


http://www.le.ac.uk/users/dsgp1/COURSES/MATHSTAT/13mlreg.pdf

# Logistic Regression

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

Linear regression is a statistical model that relates the distribution of a continuous variable $y$ (known as the "target") to a function of a number of "feature" variables $\vec{x} = (x_1, ..., x_n)$.  The model is typically applied to situations where we have multiple iid draws from the join distribution of $\vec{x}$ and $y$. The model consists of the following assumptions:

- The distribution of $y$ is a Gaussian that is centered around a mean $\hat{y}$ with variance $\sigma$
- The mean of the gaussian, $\hat{y}$, is a linear function of the feature variables
- The variance of the gaussian, $\sigma$, is unknown and fixed

The mean of the target $\hat{y}$ is given by:

$$
\hat{y} = w_1x_1 + w_2x_2 + ... + w_ix_i + C
$$

where $C$ is a constant known as the "intercept".  We will use a simplified notation where there is always a "dummy" feature $x_0$ whose value is always 1, and therefore the corresponding weight $w_0$ will act as an intercept.  This is fully equivalent to the previous formulation and only serves to make he equations easier.  In addition, if we assume that we have $I$ features and $N$ observations of each feature and target, we denote the $n^{th}$ observation of y as $y_n$ and the $n^{th}$ observation of the $i^{th}$ feature as $x_n^i$.

### The Model

The likelihood function for this model can be written as:

$$
L({y_n, x_n^i} | w_0,...,w_i, \sigma) = \prod_n Gauss(y_n | \sum_i w_i x_n^i, \sigma)L(x_n^0, ..., x_n^i)
$$

The likelihood consists of two parts: The likelihood for the features $x^i$ and the likelihood for the value of $y$ conditional on the feature values.  For the rest of this discussion, we will ignore the second part of the likelihood $L(\vec{x})$, as when performing regression we are typically interested in obtaining the set of weights $w_i$, which do not appear in the term $L(\vec{x})$.  This is equivalent to assuming that the $x^i$ are fixed in all of the statistical tests that will follow, and only the targets $y_n$ vary.

This likelihood has $i+2$ parameters, where $i$ is the number of non-intercept features chosen for the model (different choices of features would result in different models with different likelihood functions).  An important assumption of the model is the fact that $\sigma$ is a constant: It doesn't depend on the values of $x_n^i$.  This means that the gaussian "noise" is independent of the features (errors that are independent of the features like this are said to be "heteroscedastic").

<!--
The typical use case of this model assumes that one has N independent draws of the variable $y$, each at possibly-different points in $\vec{x}$ space.  The fact that these draws are independent allows us to write the joint likelihood function as:

$$
L(\vec{y}, \vec{x}_1, \vec{x}_2, \vec{x}_n | w_1, w_2, ..., C, \sigma ) = \prod_n Gauss(y_n | \vec{w} \cdot \vec{x}_n + C, \sigma)
$$
-->

It is important to note that including more points $(y_n, x_n^i)$ doesn't add more parameters to the model, which remain the coefficients $w_0, ..., w_i$ and $\sigma$.  This is good, as it means that we can gather more data and not make the model more complex.

### Fitting the Model

To "fit" a logistic regression model is to obtain the values of the weights.  The most common technique used to determine the weights is to find their maximum likelihood estimators.  It turns out that one can obtain the maximum likelihood estimators for these parameters exactly (which is one of the most important properties of linear regression).  Before presenting this result, we will re-write the likelihood function as the negative-log-likelhood (to better match how it is most commonly encountered in statistical textbooks):

$$\begin{align}
-log(y_n, x_n^i | {w_i}, \sigma)   & = &  \sum_n -log(Gauss(y_n | x_n^i \cdot w_i, \sigma)) \\
   & = & \sum_n  \frac{(y_n - (x_n^i \cdot w_i))^2}{\sigma^2} + \frac{N}{2} log(\sigma^2) \\
\end{align}
$$

Since maximizing the likelihood is equivalent to minimizing the negative-log-likelihood, one can obtain the maximum likelihood estimators by minimizing the above equation for the negative-log-likelihood.  Often, performing inference on a regression model is viewed from an optimization perspective, in which case the log likelihood ratio is interpreted as a "cost" function that one must minimize.

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
p(\hat{w_i}) = gauss(\hat{w_i} | w_i, \sigma \sqrt{S_{ii}})
$$

where $S_{ii}$ is the ith diagonal element of the matrix:

$$
S = (X^TX)^{-1}
$$

In addition, the distribution of the various $w_i$s are correlated to each other.  The full covariance matrix for the fitted weights is given by:

$$
Cov(\hat{w_i}, \hat{w_j}) = \sigma^2 (X^TX)^{-1}_{ij}
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


### Prediction Errors

When actually using a regression to make a prediction on new data, one often wants to know what the uncertainty on that prediction is.  To make this more concrete, let's think through where this error comes from using a generative perspective.  Say that assume that the true distribution of $p(y|x)$ = $gauss(w_{true} \cdot x | \sigma)$.  We then generate a dataset of size N and estimate $\hat{w}$ and $\hat{\sigma}$ from that dataset, and then apply the predictions to a test point $x_0$ to obtain $\hat{y}(x_0)$.  In parallel, we take our true distribution and make a draw from it to obtain $y_{true}(x_0)$.  The questions is: What is the mean squared error between $y_{true}(x_0)$ and $\hat{y}(x_0)$.

The sources of error here are the following:

- If we knew $w_{true}$ exactly, we'd still be off due to the random draw from the true distribution from a gaussian with mean $\sigma$
- Our estimation of $\hat{w}$ differs from $w_{true}$ due to the finite statistics we used to estimate $\hat{w}$ in our dataset

Fortunately, these errors are uncorrelated (the draw from the true distribution doesn't care what our generated training dataset was, and therefore is uncorrelated from the parameters fitted on that dataset).  So, the absolute error is the difference of two uncorrelated, gaussian distributed random variables and is given by:

$$
\begin{eqnarray}
\text{err}(x_0) & = & \hat{y}(x_0) - y_0 \\
& = &  (\hat{w_i} \cdot x_0^i) - (w_i  \cdot x_0^i + \epsilon_0) \\
& = &  (\hat{w_i} - w_i) \cdot x_0 - \epsilon_0 \\
\end{eqnarray}
$$

Where $\epsilon_0$ is the true stochastic error.  In the above equation, each $(\hat{w_i} - w_i)$ is gaussian distributed with mean 0 and $\epsilon_0$ is gaussian distributed with mean zero.  The full sum of these terms will therefore be gaussian distributed with mean zero.  And while $\epsilon_0$ is uncorrelated to all $(\hat{w_i} - w_i)$ terms, the individual $(\hat{w_i} - w_i)$ have nonzero covariance with each other.  Therefore, to find the disribution of the sum of these gaussians, we need to use the non-zero elements of the covariance matrix $Cov(\hat{w_i}, \hat{w_j})$.

Using this, one can show that the distribution of the prediction errors is given by:

$$
p( \hat{y}(x_0) - y_0) ~ gauss(0, \sigma \sqrt{1 + x_0^T (X^TX)^{-1}x_0})
$$

Thus, the distribution of the absolute error is a gaussian with zero mean (i.e. the predictions are unbiased) and with the variance proportional to $\sigma$, as shown above.  Unfortunately, we don't know the true value of $\sigma$.  However, we can do our usual trick, which is to divide by the estimator of the standard deviation to produce a quantity that is t-distributed.  Noting that:

$$
\frac{err(x_0)}{ \sigma \sqrt{1 + x_0^T (X^TX)^{-1}x_0}} \sim gauss(0, 1)
$$

and recalling that:

$$
\frac{(N-I)s^2}{\sigma^2} \sim \chi_{N-I}
$$

allows us to show that:

$$
\begin{eqnarray}
t_{N-I} & \sim & \frac{gauss}{\sqrt{\chi^2_N / N}} \\
 & \sim & \frac{\frac{err(x_0)}{ \sigma \sqrt{1 + x_0^T (X^TX)^{-1}x_0}}} {\sqrt{\frac{(N-I)s^2}{\sigma^2} / (N-I)}} \\
& \sim & \frac{err(x_0)}{s\sqrt{1 +x_0^T (X^TX)^{-1}x_0}} \\
\end{eqnarray}
$$

This allows us to show that the distribution of the absolute error on the prediction is given by:

$$
err(x_0) \sim s \sqrt{1 + x_0^T (X^TX)^{-1}x_0} t_{N-I}
$$

and we can use our knowledge of the Student's t distribution to create confidence intervals.

<!--

http://www.uio.no/studier/emner/sv/oekonomi/ECON4150/v04/seminar/Var_f.pdf

http://www.stats.uwo.ca/faculty/braun/ss3859/notes/Chapter4/ch4.pdf

  We have an estimator of it, $\hat{\sigma}$, which we can plug in.  However, as we saw previously, that estimator is biased (it tends to under-estimate the true error), so our prediction errors would also be under-estimated (which we don't want).  So, we can instead use the unbiased estimate of $\sigma$.  This means that our estimate of the MSE on our prediction will be wrong (because we don't know the true $\sigma$), but at least it'll be wrong in an unbiased way (unfortunately, it'll be wrong in the same way for ALL future predictions using the same fitted model.  So, for a given fitted model, the prediction errors may be either under-estimated or over-estimate for all possible predictions).

We've already shown that the maximum likelihood estimator of the true standard deviation $\sigma$ is given by:

$$
\hat{\sigma}^2 = \frac{1}{N} \sum_n (y_n - x_n^i \cdot w_i)^2
$$

And, as we previous mentioned, this is a biased estimator of $\sigma$.  We can create an unbiased estimator of $\sigma$ as:

$$
\hat{\sigma}_{ub}^2 = \frac{1}{N-2} \sum_n (y_n - x_n^i \cdot w_i)^2 
$$

This is one of the two sources of error that we identified above.  To calculate the other source of error, we have to find the error on the estimated mean at the prediction point $x_0$.  


  There are three sources of error when considering a regression prediction:

- The true error $\sigma$ for the real model around the true mean $y = w_{true} \dot x$
- The uncertainty in the predicted mean $y = \hat{w} \dot x$ which comes from the uncertainty in the coefficients $\hat{w}$
- The uncertainty in the predicted standard deviation $\hat{\sigma}$
-->


<!--
http://www.stat.wisc.edu/courses/st572-larget/Spring2007/handouts03-1.pdf

http://people.stern.nyu.edu/wgreene/MathStat/GreeneChapter4.pdf

-->


### Analysis of features

When building a regression model, one has to assert in advance which features contribute to the mean of the target.  The features weights are determined by the data, but which features enter the model must be known in advance.  However, in most realistic problems, one does not know which features may contribute to the mean of the target.  Often, one attempts to determine the model of the target variable by considering a superset of all possible features and using the properties of the regression to determine which subset of those features best approximates the true, unknown model.

One can use the distribution of the fitted weights that we derived above to determine whether a feature has a true weight that is significantly different from 0. We showed that the fitted weights are t-distributed, and therefore we can construct a p-value significance test.  This will be a 2-sided test, as we consider possible parameter values in both the positive and negative direction.  To do this, set $w_i=0$ in the equation above, calculate the t test-statistic, and compare it to the 2-sided tails defined above of total size $\alpha$.  The interpretation is that a parameter whose p-value is very small "rejects" the null hypothesis of the parameter's true value being 0.  Thus, that parameter is likely "significant", or is an important component of the model.

This is an exact test, assuming the assumptions built into the regression model.  In practice, very few real life situations perfectly meet the assumptions of a regression.  Therefore, this procedure should mostly be thought of as a heuristic for determining which features in a model may be considered for dropping and which ones are likely to be important to the model's overall performance.

<!--
http://reliawiki.org/index.php/Simple_Linear_Regression_Analysis
-->


<!-- F TEST -->

One may be tempted to perform this test on every parameter individually and find those that are not significant.  However, with many parameters, the probability of finding ANY parameter that is not significant becomes high.  If you do enough p-value tests, you're bound to find a "significant" result by chance alone.

As an alternative to performing a series of t-tests, one can perform a single test to compare two models that differ by using a different number of features.  Typically, this test compares the nominal model against the most minimal model possible: one in which the only variable is the intercept.  In other words, one performs a test to see if the nominal model is significantly better than a model with no features at all.  A model with more coefficients will always produce a better overall fit than a model with fewer or no free coefficients (since it is more flexible).  The question is whether this fit is significantly better than the 0-parameter model.  This procedure is usually performed by conducting an F-Test, which compares the fit of the model with all parameters to the fit of a model with only an intercept.  It attempts to answer the question, "Is my model fitting to anything real other than just noise".



<!--
http://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/10/lecture-10.pdf

https://stats.stackexchange.com/questions/258461/proof-that-f-statistic-follows-f-distribution

http://pages.stern.nyu.edu/~churvich/MBA/Handouts/23-Reg8.pdf

https://onlinecourses.science.psu.edu/stat501/node/295

-->

<!-- Issues -->

### Regularization

When fitting a regression, one rarely (if ever) knows the true set of features that contribute to the target variable's distribution.  In principle, one should be able to include many variable in a regression, and those that don't contribute will have fitted weight values that are very close to 0.  However, with finite data, and in particular if many features are considered, statistical chance will make it likely that features whose true weights are 0 will be fit with significantly nonzero weights.

If one believes that the number of features with nonzero true weights is less than the number of features presented to the model, or if one believes that a small subset of the features presented is sufficient to model the target, one may use regularization to minimize or avoid the numbers of features whose weights are incorrectly found to be significantly nonzero.

Regularization is a general term that describes adjustments to a model which work to enforce certain desired properties of fitted parameters, usually that their fitted values are close to zero.

In regression, regularization can be introduced by adding a term to the likelihood function:

$$
L({y_n, x_n^i} | w_0,...,w_i, \sigma) = \prod_i Gauss(w_i^{k/2}| 0, \sqrt{C}) \prod_n Gauss(y_n | \sum_i w_i x_n^i, \sigma)L(x_n^0, ..., x_n^i)
$$

We are here adding a new term to the likelihood that constraints the power of all the weights to be close to 0 (with variance C).  When the model is fit, the weights will balance between the constraining power of the first term (which depends on the data) and this new regularization term in the likelihood (which is independent of the data).  If the data very strongly constraints the weights, the regularization term will not have much of an effect.  For weights that aren't highly constrained by the data, the regularization will dominate their fit and they will be pulled toward 0.

From a Bayesian perspective, one can interpret this regularization as a prior on the value of the weights.  From a frequentist perspective, one can interpret this generatively.  One first generates the true weights from a gaussian distribution, and then one generates the values of $\vec{x}$, and then (given the weights and the values of $\vec{x}$, on generates the values of $y$.  Both of these interpretations are somewhat artificial: It is unlikely that any real problem came about in the generative way described above.  However, in practice, it results in models that are simpler and that generalize better.

This likelihood can be translated into a cost function by calculating the negative-log-likelihood and dropping terms which don't depend on the weights, which results in:

$$
Cost = \sum_i w^k/C + \sum_n  (y_n - (x_n^i \cdot w_i))^2
$$

Here, the interpretation is that regularization acts as an additional cost which contributes to the total cost function.  The most common choices for the power $k$ are 1 (known as L1 regularization) and 2 (known as L2 regularization).


### Correlations

Contrary to a common mis-understanding, a regression model doesn't assume that input features are statistically uncorrelated.  The only assumption is that the mean of the dependent variable, $y$, is determined by the weighted sum of the inputs.  Having features that are correlated with each other (for example, when one tends to be high while the other is high and visa versa) doesn't break this assumption.  However, it may lead to misleading interpretations when fitting the data.  Specifically, the presence of correlated features will cause the variance on the fitted value of the features to be larger than the variance of any individual feature would be.  Intuitively, if you copy a feature exactly, the model has full freedom to adjust the coefficients for those features as long as their sum remains the same.  This leads to a high variance on the fitted values of the parameters (since they cannot be fitted unquely).  This can hurt the interpretability of a model: you may want to draw a conclusion based on the value of one of the fitted parameters, but since it is so volatile, your conclusion will have little statistical significance.

The extent to which the variance of fitted predictors is increased is known as the Variance Inflation Factor (VIF).  However, multicollinearity tends to not effect the overall performance of the model.



<!--
http://data.princeton.edu/wws509/notes/c2s2.html

https://stats.stackexchange.com/questions/117406/proof-that-the-coefficients-in-an-ols-model-follow-a-t-distribution-with-n-k-d


http://ctu.edu.vn/~dvxe/econometrics/MLE_simple_linear_regression.pdf


http://www.le.ac.uk/users/dsgp1/COURSES/MATHSTAT/13mlreg.pdf

http://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/05/lecture-05.pdf
http://www.stat.cmu.edu/~cshalizi/mreg/15/lectures/06/lecture-06.pdf
-->




## Logistic Regression


Logistic regression is a variation on normal regression that is designed to be used for classification instead of the prediction of a continuous value.  We will here apply logistic regression to the problem of binary classification, where the two classes are represented by the target variable values of 0 and 1.

One may be tempted to solve this problem by encoding the target into 0 and 1 values and then performing normal regression.  However, this will create a regression function whose range can be all real numbers, where as the real range of our target variable is only the discrete values 0 and 1.  One may attempt to fix this by picking a threshold in the space of the regression output and labeling points with value greater that this threshold as being class 1 and points less than the threshold as being class 0.  And this may work reasonably well!  Logistic regression is essentially a more principled version of this approach, and the extra formalism endows it with some nice additional properties.

It's clear that a regression by itself can't be used to model a discrete variable, as regressions model only continuous variables.  So, in order to be able to use a regression in the context of a classification problem, we have to find a continuous variable that occurs within the classification model and we need to find a way to use regression to model that variable.

A common model for binary classification problems is assuming that each data point randomly picks between the two output classes with some probability, and that probability depends on the value of the input features:

$$\begin{align}
p(y=1 | x) &=& f(x) \\
p(y=0 | x) &=& 1 - f(x) \\
\end{align}
$$

where $f(x)$ is has a range between 0 and 1 (since it represents a probability).  The probability $p(y|x)$ for a single data row represents a Bernouilli variable, or a weighted coin-flip.  We're getting closer: we've taken a discrete problem and identified a continuous variable $p$ that we can try to model with a regression.  However, our model for $p$ must produce values between 0 and 1, so using a regression out-of-the-box won't work here.  But we're conceptually close.  We just need to come up with a variable that, when high (approaching infinity), can be associated with probabilities approaching 1 and, when low (approaching negative infinity) can be associated with probabilities approaching 0.

Toward that end, we define a concept known as the  "odds ratio".  Imagine an event occurs $n$ times out of a total of $N$ tries.  The probability can be estimated as $n/N$.  We define the odds ratio to be: $n / (N-n)$.  It is the ratio of the amount of times it occurred to the amount of times it did not occur.  If the event occurred every time, then the odds ratio is infinity.  If the event never occurred, then the odds ratio is 0.  This concept, therefore, fits our need.

One can determine the probability from the odds, and visa versa, using the following:

$$\begin{align}
prob &=& \frac{odds}{1 + odds} \\
odds &=& \frac{prob}{1-prob} \\
\end{align}
$$

Introducing the odds has gotten us closer to what we want.  We see that, when the odds ratio is very high (approaching infinity), the probability approaches 1.  This is half of our need.  However, the odds (by construction) can never be negative.  Therefore, we can't model the odds directly using a regression (since the output of a regression can approach negative infinity).  The output of the regression goes from $(-\inf, \inf)$ but the input to the odds only goes from $[0, \inf)$.  If we want to use a regression to model the odds, we have to do one last transformation to make these line up.  The exponential is a function that fits our need here.  The exponential takes values from negative to positive infinity and maps them to values between 0 and positive infinity.

So, let's summarize our chain of logic here:

- Use a regression to model a value in $(-\inf, \inf)$ as a function of the features
- Apply the exponential function to turn it into a value whose range is $(0, \inf)$
- Interpret that value as the "odds"
- Apply the transformation $prob = odds/(1 + odds)$ to convert the odds to a probability
- Create a likelihood function using the measured classes and their probabilities, as predicted above

One can combine the middle steps of taking the exponential and then converting odds to probabilities as a single step using the logistic function:

$$
\text{logistic}(x) = \frac{e^x}{1 + e^{x}}
$$

We can interpret this framework as using a regression to model the logarithm of the odds, or the "log odds" (since we use the exponential to turn our log-odds into the odds).  It gets the name "logistic regression" since we use the logistic function to transform the output of our regression into the probability of the classes that we're modeling.

One can also interpret this framework in the reverse direction.  Instead of starting with the regression output and converting it to a probability, one can start with the data and transform it until it matches something that we can regress on.  The essentially amounts to applying the inverse of the transformations we did above on the data.  Confusingly, the inverse of the logistic function is named the "logit" function:

$$\begin{align}
\text{logit}(x) &=& -log(\frac{1}{x} -1) \\
\text{logistic}(x) &=& \text{logit}^{-1}(x) \\
\end{align}$$

However, I find it conceptually simpler to think of the probabilities as being modeled by the logistic of the output of our regression.

Part of our logic involved identifying the odds as an intermediate quantity to take us from our regression's output to the class probabilities.  But, really, all we needed was a function that took a number whose range is between negative and positive infinity (the regression output) and turns it into a number whose value is between 0 and 1 (the probabilities).  The logistic function does this, and has an odds-based motivation.  But really, any function with that property would work.  An example of another such function that is commonly used when applying regression to classification is the probit function, which is the cumulative distribution of a gaussian (whose value therefore varies between 0 and 1).  Using this function gives us "Probit Regression", and it is a generalization of the logic we used to derive "Logistic regression".  <!--We will talk about other variations on regression later when we discuss generalized additive models.-->

We can now readily write down the likelihood for the logistic regression model.  Since the model directly calculates the probabilities of each class for each row, we can use these probabilities to determine the total probability of the data we observed given the model:

$$\begin{align}
p(y_i=1 | x_i) &= logistic(\sum_j w_j x_i^j) \\
L(x, y | w) &= \prod_{i: y_i = 1} p(y=1 | x_i)  \prod_{i: y_i = 0} (1 - p(y_i=1 | x_i)) \\
\end{align}$$

Plugging in $p(y_i=1 | x_i)$, we can obtain the log likelihood as:

$$\begin{align}
log[L] &= \sum_{i: y_i = 1} log[p(y=1 | x_i)] + \sum_{i: y_i = 0} log[(1 - p(y_i=1 | x_i))] \\
&= \sum_{i} y_i log[p(y=1 | x_i)] + (1-y_i) log[(1 - p(y_i=1 | x_i))] \\
& = \sum_i y_i (\sum_jw_j x_i^j) - log[1 + e^{\sum_j w_j x_i^j}] \\
\end{align}$$

Note that there isn't an additional $\sigma$ parameter that we had to introduce here, as we did with ordinary regression.  The weights $w_j$ are obtained as the maximum likelihood estimators of this likelihood function.  Unlike in the case of ordinary regression, one cannot readily find a closed form solution for the weights.  Instead, packages typically use numerical optimization routines to solve for $w_j$, typically utilizing a form of Newton's Method.  This can be readily done since we have an exact mathematical form for the likelihood.

<!--
http://www.stat.cmu.edu/~cshalizi/uADA/12/lectures/ch12.pdf

http://www.win-vector.com/blog/2011/09/the-simpler-derivation-of-logistic-regression/
-->

### Confidence Inervals of fitted parameters


In the case of linear regression, we were able to show that the distribution of a fitted parameter $w_i$ follows a Student's t distribution.  It would be nice to be able to come up with an exact, closed-form distribution for the fitted parameters of a logistic regression model.  However, just as there is no closed form for the MLEs of the parameters, there is no closed form for their distribution either.  Instead, most inference done on the fitted parameters of a logistic model use an approximation that becomes asymptotically more accurate as the size of the data increases.

A common approach for determining confidence intervals on fitted parameters uses a Wald test, which is based on the asymptotic distribution of a maximum likelihood estimator.  The test is typically performed by the following steps:

- Using the likelihood function, calculate the Fisher information matrix as a function of the true values of the parameters
- Fit the model using maximum likelihood estimation to produce estimates of the parameters
- Plug these estimates into the Fisher information matrix to estimate the variance of the maximum likelihood estimators
- Assuming the gaussian asymptotic distribution, divide the fitted parameter value by it's variance, square it, and compare it to a chi-squared distribution with 1 degree of freedom.

Note here that we are making two approximations.  We're first assuming that the asymptotic form for the distribution for the MLEs holds.  And we're second assuming that the Fisher information matrix evaluated with the MLEs is close to the fisher information matrix evaluated with the true parameters.  The fact that we're using two assumptions here can make this test inaccurate, but it is still commonly used.  Most likely, the statistical package that you're using to fit a logistic regression will return to you the results of this test.

A second, somewhat less common approximation, is based on the profile likelihood distribution.  Recall that the profile likelihood, defined as:

$$
\lambda(\theta) = \frac{L(x | \theta, \hat{\hat{\nu}})} {L(x | \hat{\theta}, \hat{\nu})}
$$

is asymptotically related to a Chi-Squared distribution:

$$
-2 log(\lambda(\theta)) \sim \chi^2_{1}
$$

For a logistic regression, we can write down the likelihood and take the parameter of interest $\theta$ to be the ith fitted parameter $w_i$.  To use the profile likelihood to calculate confidence intervals, one can perform the following procedure:

- Find the global MLEs using the normal fit of the logistic regression likelihood
- Pick a range of points along the parameter of interest $w_i$ as test points
- For each test point, fix $w_i=w_{test}$ and minimize the likelihood over the other coefficients $w_{j !+ i}$
- Calculate the Profile Likelihood ratio at that point as the ratio of the local fit to the global fit
- Use the Chi-Squared distribution to determine if that point is in the confidence interval
- Repeat over all points to find the full confidence interval

As noted previously, this will produce potentially asymmetric confidence intervals on the fitted parameters $w_i$.



<!--
http://people.upei.ca/hstryhn/stryhn208.pdf

https://stats.stackexchange.com/questions/144603/why-do-my-p-values-differ-between-logistic-regression-output-chi-squared-test

https://courses.washington.edu/b515/l13.pdf

https://support.sas.com/documentation/cdl/en/statug/63962/HTML/default/viewer.htm#statug_logistic_sect040.htm

https://stats.stackexchange.com/questions/112241/testing-logistic-regression-coefficients-using-t-and-residual-deviance-degrees

https://stats.stackexchange.com/questions/60074/wald-test-for-logistic-regression

https://stats.stackexchange.com/questions/237073/how-does-r-calculate-the-p-value-for-this-binomial-regression

http://www.stata-press.com/journals/stbcontents/stb14.pdf
-->

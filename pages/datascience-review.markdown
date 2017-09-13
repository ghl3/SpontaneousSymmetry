---
author: George Lewis
date: 2017-09-10 11:25:54.397075
layout: post
slug: datascience-review
title: Data Science Review
---


# Outline of Data Science with Notes

## Programming

## Probability and Statistics

### Kullback–Leibler divergence (K-L Divergence)

The K-L Divergence is a measure of the difference between two distributions.  Specifically, if we have distributions P and Q, the divergence from P to Q, denoted as $D_{KL}(P||Q)$ measures the information gained when using P over Q.  It is typically used with P as the true distribution and Q being an estimate and it helps to answer the question of how good of a stand-in the replacement is over the true distribution.

For discrete distributions, it is defined as:

$$
D_{KL}(P||Q) = \sum_i P_i log \frac{P_i}{Q_i}
$$

and for continuous distributions it is 

$$
D_{KL}(P||Q) = \int  P(x) log \frac{P(x)}{Q(x)} dx
$$

It is always non-negative.  However, it is also not symmetric and doesn't obey the triangle inequality, so it cannot be interpreted as a distance metric.


## Supervised Learning

### Classification Metrics

#### Based on class predictions

- Accuracy: $\frac{t_p + t_n}{t_p + t_n + f_p + f_n}$ The rate of correct labels (for both goods and bads).  Accuracy is sensitive to datasets that are very imbalanced: if a dataset is mostly good, one can label all points as good and be quite accurate.
- Precision: $\frac{t_p}{t_p + f_p}$ The number of true goods out of all rows that were labeled as good.
- Recall: $\frac{t_p}{t_p + f_n}$ The number of goods that we labeled as good. Also: Sensitivity, True Positive Rate
- Specificity: $\frac{t_n}{t_n + f_p}$ The number of true bads out of all rows that were labeled bad (the opposite of precision)  Also known as true negative rate

- True positive rate: $\frac{t_p}{t_p + f_n}$ Fraction of true goods labeled as good.  Also known as Recall, sensitivity
- False positive rate: $\frac{f_p}{f_p + t_n}$ The fraction of bad rows labeled as good.

The F-1 Score is defined as

$$
F_1 = 2 \frac{2 t_p} {2 t_p + f_p + f_n}
= 2 \frac{precision*recall}{precision + recall}
$$

F1 is a balance between precision and recall.  Specifically, it is the harmonic mean between the two.

#### ROC

If a classifier provides scores, and not just class predictions, one can calculate a number of additional metrics.  In particular, it allows one to plot the ROC curve.

Plots the true positive rate (as the y-axis) vs the false positive rate (as the x-axis).  Said differently, it plots the recall vs one minus the specificity.  It essentially plots the fraction of goods labeled as good vs the fraction of bads labeled as good.  An advantage of an ROC curve is that it is independent of the relative rate of good and bad in the whole sample, as it only takes as input the fraction of good classified as good and the fraction of bad classified as bad (but nothing that depends on the ratio of the number of true goods to true bads).

Good classifiers have curves that stretch far to the upper-left.  Bad classifiers have curves that stay close to the diagonal.  Here's why:

- If the threshold on our classifier is very low, we will call everything a good.  Therefore, or false-positive rate will be 1.0 (all bads incorrectly called goods) and our true positive rate will also be 1.0 (as we are calling all goods good)
- As we increase the threshold, a classifier with high accuracy will be able to label most good points as good while not labeling many bad points as bad.  This means that the fraction of goods labeled as good will be high (high y-value) but the fraction of bads labeled as good will be low (low x-value), which adds a point in the upper-left of the graph.
- A bad classifier will nearly randomly sample points from the full distribution.  If it samples randomly with at a rate of $x%$, it'll label $x%$ of the goods as good and $x%$ of the bads as bad.  This will cause it to have points in the graph close to the y=x axis.
- Finally, as the threshold is turned up all the way, we'll end up labeling very few rows as good, so we'll have close to 0 of the true goods labeled as good and 0 of the true bads labeled as good.  Therefore, we'll end up with points toward the bottom-left.

A good metric for a classifier is the area under ROC Curve.  Because the ROC curve doesn't depend on the relative ratio of true goods to bads, this metric too will be insensitive to that ratio.  So, this metric is valid even when the data is imbalanced.

#### Other score-based metrics

**Brier Score**: A measure of the accuracy of classification scores.  It can be thought of the mean square error between the score and whether the event happened

$$
Brier = \frac{1}{N} \sum (f_i - I_i)^2
$$

where

- $f_i$ is the score for the ith data point.  The score goes between 0 and 1 and is close to 1 if the prediction is likely a good
- $I_i$ is the indicator function denoting 1 if the true class of the point was good and 0 otherwise.

The brier score can be thought of as a measure of classification calibration.

**Log Likelihood**

If we interpret $f_i$ as a calibrated probability of good (an not just an arbitrary score), we can calculate a log likelihood as:

$$
LogLikelihood = \sum_{i \ele good} log(f_i) + \sum_{i \ele bad} log(1-f_i)
= \frac{1}{N}\sum_i I_i log(f_i) + (1-I_i)log(1-f_i)
$$

The second form is a trick that takes into account the fact that the indicator is 1 for goods and 0 for bads, allowing us to collapse the sum into only one term.

**Cross Entropy**

Often used as a cost function (and not an evaluation metric) this is simply the negative of the Log Likelihood:

$$
Cross Entropy = - \frac{1}{N} \sum_i (I_i log(f_i) + (1-I_i)log(1-f_i))
$$


### Regression



- $R^2$, or "Coeficient of determination", or "Multiple $R^2$ if there is more than 1 feature in the model, describes the fraction of the uncertainty in the data is explained by a linear model.  If we have true values $y_i$ and predicted values $f_i$, $R^2$ is defined as:

$$
R^2 = 1 - \frac{ \sum (y_i-f_i)^2 }{ \sum (y_i - \overbar{y})^2 }
$$

with $\overbar{y}$ as the mean of y.  It is interpreted (one minus) as the fraction of the average squared error of the regression out of the variance.  It varies between 0 and 1.  If it is 1, it means that all of the variance in the data can be captured in a regression (eg there are no errors outside of the regression), and if it's 0, then the regression captures none of the error (even after regressing, the variance is just as large).

- Adjusted $R^2$ is a version of $R^2$ that is penalized for the number of features

$$
Adjusted R^2 = R^2 - (1-R^2)\frac{p}{n-p-1}
$$

where n is the number of rows and p is the number of variables.

- F-Score or the F-test, is a statistic that can one can calculate when fitting a regression model to determine if a more complex model fits the data better.  An F-Test compares two models, one of which "contains" the other (uses all the features as the other plus additional features).  If it is significant, it means that the bigger model fits the data better (but it doesn't tell you precisely which feature in the bigger model is better).  Typically, after a regression, one records the F-Statistic compared to a constant model (intercept only).

- Residual standard error is a term mostly used in R.  In a regression, it is the estimate of the $\sigma$ parameter from an OLS fit.

### Feature Selection

#### Forward Stepwise
#### Backwards Stepwise

#### Metrics

- Akaike information criterion (AIC)

The AIC is a metric for measuring the goodness of fit of a model relative to it's complexity.  Because it takes into account the number of features used in the model, it is suitable for use in feature selection.  It essentially answers the question, "Does adding more complexity to a model give me an overall better fit?"  To answer this question in full, one should leverage a hold-out set.  The AIC is a way to measure this using the same dataset that the model was trained on, making it a faster metric for this decision.  Without including a penalty for model complexity, one would always conclude that a more complex model is better when only looking at the dataset it was trained on. 

It is defined as:

$$
AIC = 2k - 2 log (L(\vec{\hat{\theta}}))
$$

where $L(\vec{\hat{\theta}})$ is the maximum likelihood function (with MLEs $\vec{\hat{\theta}}$) evaluated on the training data.

Lower values of AIC are better.  One can interpret it as the difference in information between the true model and the estimated model (and when this is small, it means our estimated model is faithful to the true model).


### Logistic Regression
### Decision Trees
### Random Forest
### Gradient Boosted Trees

## Unsupervised learning

### Singular Value Decomposition (SVD)

SVD is a matrix technique for expressing a matrix in terms of a product of 3 different matrices.

Imagine we have an nxm matrix F.  For any such matrix, we can express it as:

$$
F = U \Sigma V^*
$$

where
- U is m*m
- $\Sigma$ mxn and diagonal 
- V is nxn and unitary (meaning it's complex conjugate is its inverse)

The diagonal elements of $\Sigma$ are the "singular values".  

The value of this technique is that one approximate $F$ by ignoring small values along the diagonal of $\Sigma$.  This effectively achieves a smaller-dimension representation of the original matrix F (or any matrix in it's space that is statistically similar to F).


### Principal Component Analysis (PCA)

PCA is a matrix technique that rotates a matrix, usually a matrix of features, to create new set of features.  The goal of this rotation is for the first feature to be the linear transformation of existing features that maximizes the variance in the feature dataset, and the second feature to be the feature that maximizes the variance in the subspace orthogonal to the first feature, and so on.

It is calculated by calculating the eigenvalues and eigenvectors of the covariance matrix.  The eigenvalues are the new features and the eigenvectors are there variance.

PCA can also be calculated by performing SVD on the covariance matrix:

Let $F$ be our feature matrix.

Let $C$ be the covariance matrix: 
$$
C = \frac{X^TX}{(n-1)}
$$

Do a SVD decomposition on X:

$$
X = USV^T
$$

In this space:

$$
C = \frac{(USV^T)^TUSV^T}{n-1}
= \frac{VSU^TUSV^T}{n-1}
= V \frac{S^2}{n-1} V^T
$$

We can see that this is a rotation of the matrix $\frac{S^2}{n-1}$, performed by the rotation matrix $V$.  And since $S$ is diagonal, we can see that this produces the eigenvectors of C, which is what PCA is defined as.


## Timeseries

## Data Engineering / System Design
### Consistent hashing

## SQL



## Applications

### Recommendation

#### Collaborative Filtering

Collaborative filtering is a general term describing recommendation techniques where one attempts to find users similar to a given user and recommends items that those users like.  The canonical version of the problem creates a matrix where each row is a "user", each column is an "item", and the value of each cell is a rating or preference of that user for that item.  Typically, there are many missing values, and the goal is to infer those values (so one can recommend what a user should buy next).  There are a few specific algorithms that fall into this category.

There are two broad categories of collaborative filtering:
- User-Based, where one finds users similar to the target user and aggregates the items liked by those users to recommend items to the original user.  This can be thought of as, "People like you also liked X"
- Item-Based, where one finds items most similar to the items that a user has rated positively.  This can be thought of as, "Because you liked Y, here is X"


#### Latent Semantic Indexing (LSI)

LSI is a search/recommendation technique that leverages SVD plus truncation to create a lower dimensional representation of the user-term matrix.  One then defines similarities in the reduced space, typically using the cosine distance to define similarity.


### A/B Testing

The typical setup of an A/B test is to divide users into two groups, one of size N and another of size M, in a way such that the groups are statistically equivalent, and to apply different treatments to both groups.  One then measures some metric on both groups, and the goal is to determine if the metric is significantly different due to the different applied treatments.

An A/B test is typically interpreted as a hypothesis test: we have two datasets and we want to determine if they came from the same underlying distribution (eg the treatment made no statistical difference) or not.

Typical metrics used are counts and rates (such as the fraction of users that sign up) or averages of continuous metrics (such as average time spent on some site).


#### Test Statistics

For the case of counting, say, sign-ups, the dataset consists of a 2x2 table

| groups   | treatment A       | treatment B      |
|----------|---------|---------|
| took action? |         |         |
| Yes        | $N_{AY}$ | $N_{BY}$ |
| No        | $N_{AN}$ | $N_{AN}$ |


One can use the following statistical tests for this data:
- Binomial Test of Proportions via Gaussian Approximation
- G-test (log likelihood ratio approximation)
- Bernard's exact test


#### Power Analysis

A power analysis is either an analysis of the power of a statistical test before it is run or a way to design the test to achieve a certain level of power.  For a binary hypothesis (with fixed null and alternate hypotheses), for any acceptance region (usually defined by a test statistic, an ordering rule, and a size $\alpha$), one can calculate the power (which is one minus the probability of a type-2 error).

However, often one does not have a single alternate hypothesis but rather a family of alternate hypotheses.  The power of a test will often vary based on the different assumptions of the alternate hypothesis, or different values of a parameter on the alternate hypothesis.  In the case of comparing two rates/proportions, one can define a hypothesis test for the null hypothesis that both proportions are the same, and this is well defined.  But the power depends on the alternate hypothesis and how far is it is from the rate of the control group.  If the rate in the experimental group is very close to the control group, we can define a test of size $\alpha$, but it will have very little power.  In the limiting case, the probably of accepting the alternate hypothesis (given that it's true) is the same as the probability of rejecting the null hypothesis (given that it's true), since the distributions of the control group will be nearly identical under both the null and alternate hypotheses.

So, one often decides on a minimum difference between the two rates and calculates the power for that difference (differences larger than that minimum difference should always have more power, so this is the power a the threshold of what we want to detect).  Given the power at the threshold difference that one wants to detect, one often determines a power they want to have (often 80%) and inverts the threshold to determine the sample size(s) they need in the control and variable samples.


#### Frequentist vs Bayesian

http://elem.com/~btilly/effective-ab-testing/
http://exp-platform.com/Documents/GuideControlledExperiments.pdf
http://multithreaded.stitchfix.com/blog/2015/05/26/significant-sample/



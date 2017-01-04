---
title: Probability Cheat Sheet
---


This is a short reference guide discussing probability and probability distributions.

<hr>


There are two competing schools of thought which offer differing definitions of the term "probability".

The "frequentist" definition of probability, as the name suggests, thinks of probability as describing the relative frequency with which an event occurs.  The frequentist definition of probability describes an event that can occur many times, where the outcome of each occurrence is random.  The probability of a specific outcome is, on average, how often that outcome occurs.  If the event were to be run a very large number of times, it would be the fraction of that large number of events whose outcome is the specific outcome in question.

$$
prob(x) = \frac{\text{# of events whose outcome is x}}{\text{total # of events}}
$$

The "Bayesian" definition interprets a probability as a level of subjective belief in a particular outcome.  In some sense, this is more general than the frequentist definition, as it isn't limited to events which are repeatable.

A few examples illustrate the differences in these definitions.  Any layman knows that the odds of getting a "1" when rolling a dice is 1/6.  A frequentist would say that the probability is 1/6 because we can roll the dice many times and measure how often each face comes up.  A Bayesian would have an intrinsic belief in the probability of the dice roll (possibly motivated by a symmetry argument).  These interpretations are slightly different, but they both agree on the probability.  Another example is the probability that the Sun will explode tomorrow.  A Bayesian would believe that the probability of a Sun explosion is very low, but a frequentist would have to argue that he cannot assign a probability to this event, for it is not repeatable: it can only happen once, and it either will happen or won't happen.  As a final example, consider the statement that the speed of light is $3.8 * 10^8$.  A Bayesian would say that this has a high probability of being true (based on accumulative evidence).  A frequentist, however, wouldn't be able to assign a probability to whether or not it's true: it either IS true or it ISN'T.  The universe, as far as we know, was only created once, and this parameter is fixed in that universe.

While these differences seem somewhat esoteric, they have tangible implications on how each group performs a data analysis:
- A frequentist cannot assign a probability to a parameter of a model.  The parameter has some fixed value, just as the speed of light is some fixed value that doesn't change based on our measurements or beliefs.  A frequentist is able to make statements that try to illuminate what that value is.  Specifically, a frequentist can never write a term that includes an intrinsic probability of a model
- A bayesian, on the other hand, MUST assign probabilities to each parameter of the model that they want to measure (known as a "prior").  This means that every Bayesian measurement is influenced by this choice.  The choice may be obvious and useful in some cases, but it may be arbitrary in others, and so this is not always a desirable property.

Based on this, it seems that the Bayesian framework is more flexible.  Indeed, it is a common misconception that only Bayesians are able to build complicated models or are able to take into account accumulated worldly knowledge.  But this is untrue.  An important point to note is that the difference in these philosophies determines how they each perform *inference*, but doesn't place restrictions on the functional forms of the models that they can build.  Any model designed by a Bayesian can also be used by a frequentist within a formal frequentist framework.  The difference is that the frequentist would perform a different set of calculations using that model to infer the models' parameters than the Bayesian would.

As an example, consider the following model:

$$
p(x | \alpha) = e^{-(x-\alpha)^2}*e^{-(\alpha - 1.0)^2}
$$

A Bayesian would describe this model as a probability distribution function for the data $x$ in terms of the parameter $\alpha$, where $alpha$ has a prior probability whose shape is $p(\alpha) = e^{-(\alpha - 1.0)^2}$.  

But a frequentist is free to construct and consider this model as well.  To him, the term $e^{-(\alpha - 1.0)^2}$ is not a statement about the prior belief on the parameter $\alpha$, but instead is typically referred to as a "constraint term" and can be thought of as describing some previous measurement on the parameter $/alpha$ whose result is included in the current likelihood.  The functional form of this probability distribution function is the same for both philosophies.

The main difference is that a Bayesian is free to integrate over the parameter $\alpha$ to get a probability that depends only on $x$.  A frequentist cannot perform this integral.

One is fully free to build deep, hierarchical models in a frequentist settings, they simply cannot eliminate model parameters by integrating them away (using a prior probability).  A frequentist must instead handle these parameters in a different way (which we will discuss later).


## Definitions and discussion

There are a number of terms related to probability that are closely related by can be confused.

- Random Variable
- Probability Distribution
- Probabilistically Generated Value

A "random variable" and a "probability distribution" are essentially the same thing



## Pitfalls and Sources of Confusion

- Marginalization and bayesian inference

There are two probabilistic operations that superficially look similar, so it is best to not confuse them.

The first is the marginalization of a probability density functions.  Imagine on has a pdf that describes the probability of two random variables x and y:

$$
p(x, y) = ...
$$

If one doesn't care about values of y and only wants the distribution of x, one can "marginalize" y by integrating it away:

$$
p(x) = \int p(x, y) dy
$$

Note that, in this case, our pdf describes two random variables, x and y, each of which can be drawn from the model.

Consider a similar situation where we have a pdf of a single variable x given a parameter a:

$$
p(x | a) = ...
$$

If they don't care about the parameter $a$, one may be tempted to "marginalize" it away by doing:

$$
p(x) = \int p(x | a) da
$$

but this is an invalid transformation.  In order to remove the functional dependence on $a$, one must factorize the distribution by doing:

$$
p(x, a) = p(x|a)*p(a)
$$

NOW, we can perform a marginalization:

$$
p(x) = \int p(x, a) da = \int p(x|a)*p(a) da
$$

Note that this requires having $p(a)$ handy.  This may be problematic for two reasons:
- One may not have a reasonable model for $p(a)$
- One may be a frequentist and may think of $a$ merely as a parameter and may believe that the probability of a parameter is a meaningless notion.


- Functions of random variables

A common source of confusion when dealing with probabilities is understanding the distribution of functions of probabilistically distributed variables.  Let's say that I have two variables, x and y, which each follow a probability distribution: P(x) and P(y).  Let's then say that I create a quantity z which is the sum of these two variables: $z = x + y$.  What is the probability distribution of z, p(z)?

Before we answer that, let's make sure that we understand what it means to add two probabilistically distributed variables.  One should hold on one's head the following procedure.  First, obtain a value for x by drawing from the probability distribution p(x).  For example, if x is a variable representing the roll of a die, then roll that die to obtain an instance of x, which is one of the numbers in 1 through 6.  Then, obtain a value for y by drawing from p(y).  Finally, add those two numbers up to get an instance of the probabilistically distributed variable z.

Naively, one may think that the probability p(z) is given by:

$$ p(z) = p(x) + p(y) $$

But this is not the case.  It's clear that this is wrong because, as defined above, p(z) would not add up to 1.  Moreover, it has invalid units (note that p(x) has units of 1/[x] and p(y) has units of 1/[y], and these cannot be added together.


---
title: Probability
---



# Probability

There are two competing schools of thought which offer differing definitions of the term "probability".

The "Frequentist" definition of probability, as the name suggests, thinks of probability as describing the relative frequency with which an event occurs.  Frequentist probability applies to an event that can occur many times, where the outcome of each occurrence is random.  The probability of a specific outcome is how many times that outcome occurs divided by the total number of event trials, as the total number of trials approaches infinity:

$$
\text{prob}(x) = \frac{\text{# of events whose outcome is x}}{\text{total # of events}}
$$

The "Bayesian" definition interprets a probability as a level of subjective belief in a particular outcome.  In some sense, this is more general than the frequentist definition, as it can be used to describe events which which aren't repeatable.  Outcomes with higher bayesian probability are more likely to occur than outcomes with lower probability.

A few examples illustrate the differences in these definitions.  Any layman knows that the odds of getting a "1" when rolling a dice is 1/6.  A frequentist would say that the probability is 1/6 because we can roll the dice many times and measure how often each face comes up.  A Bayesian would have an intrinsic belief in the probability of the dice roll (possibly motivated by a symmetry argument based on how the dice is designed).  These interpretations are slightly different, but they both agree on the probability.  Another example is the probability that the Sun will explode tomorrow.  A Bayesian would believe that the probability of a Sun explosion is very low, but a frequentist would have to argue that he cannot assign a probability to this event, for it is not repeatable: it can only happen once, and it either will happen or won't happen.  As a final example, consider the statement that the speed of light is $3.8 * 10^8$.  A Bayesian would say that this has a high probability of being true (based on a large body of scientific evidence).  A frequentist, however, wouldn't be able to assign a probability to whether or not it's true: it either IS true or it ISN'T.  The universe, as far as we know, was only created once, and the sped of light is a fixed parameter of this universe that takes on a single value with absolute certainty.

While these differences seem somewhat esoteric, they have tangible implications on how each group performs a data analysis.  For example:

- A frequentist cannot assign a probability to a parameter of a model.  The parameter has some fixed value, just as the speed of light is some fixed value that doesn't change based on our measurements or beliefs.  A frequentist is only able to make statements that try to illuminate what that value is.  Specifically, a frequentist can never make a statement expressing the probability that a model is true.
- A bayesian, on the other hand, MUST assign probabilities to each parameter of the model that they want to measure (known as a "prior").  This means that every Bayesian measurement is influenced by the choice of priors for inferred parameters.  The choice of these priors may be obvious and useful in some cases, but it may be arbitrary in others.

Based on this, it may seems that the Bayesian framework is more flexible.  Indeed, it is a common misconception that only Bayesians are able to build complicated models or are able to take into account accumulated worldly knowledge.  But this is untrue.  An important point to note is that the difference in these philosophies determines how they each perform *inference*, but doesn't place restrictions on the functional forms of the models that they can build.  Any model designed by a Bayesian can also be used within a formal frequentist framework.  The difference is that the frequentist would perform a different set of calculations than a Bayesian would to infer the values of parameters using that model.

As an example, consider the following model:

$$
p(x | \alpha) = e^{-(x-\alpha)^2}*e^{-(\alpha - 1.0)^2}
$$

A Bayesian would describe this model as a probability distribution function for the data $x$ in terms of the parameter $\alpha$, where $\alpha$ has a prior probability whose shape is $p(\alpha) = e^{-(\alpha - 1.0)^2}$.  

But a frequentist is free to construct and consider this model as well.  To him, the term $e^{-(\alpha - 1.0)^2}$ is not a statement about the prior belief on the parameter $\alpha$, but instead is typically referred to as a "constraint term" and can be thought of as describing some previous measurement on the parameter $\alpha$ whose result is included in the current model.  The functional form of this probability distribution is the same for both philosophies.

In practice, he main difference between how a Frequentist and Bayesian uses this distribution function is that a Bayesian is free to integrate over the parameter $\alpha$ to get a probability that depends only on $x$.  A frequentist cannot perform this integral.

One is fully free to build deep, hierarchical models in a frequentist settings, they simply cannot eliminate model parameters by integrating them away (using a prior probability).  A frequentist must instead handle these parameters in a different way (which we will discuss later).

## Probabilistic Variables

The theory of probability has a number of similar but subtly different concepts, which is a large source of confusion.  To make matters worse, the notation employed often elides these differences instead of using unambiguous syntax.  We will try here to be clarify all the possible meanings of this syntax, but will later fall back to the usual sloppiness, for convenience.

First, a probabilistic variable is a process or procedure that can result in more than one outcome, and the actual outcome is based in some way on a random process.  This abstract process is different than an actual, observed draw from a probabilistic variable, which is some number (or set of numbers) that was actually generated by the process.

So, if we have a random variable that we denote $x$.  This is not a number, it's an abstract process.  If we make observations, or draws, from that variable , we obtain the numbers $x_1$, $x_2$, $x_3$, etc, which ARE numbers.  The probability of obtaining a number $x_i$ from a draw from the distribution of x is denoted as $p(x_i)$.

A probability distribution may describe multiple variables.  The probability distribution function $p(x, y)$ describes a random process that generates two values at a time: $(x_1, y_1)$, $(x_2, y_2)$, $(x_3, y_3)$.  The random variables, $x$ and $y$, are said to be correlated because they are generated from a single abstract process.  I guess if you go back far enough, all variables are correlated, as they were generated by whatever process set the universe into motion.  Two variables are said to be independent if their joint probability distribution can be factorized as:

$$
p(x, y) = p(x)p(y)
$$ 

A probability distribution, $p(x)$ is a function.  If may be parameterized by some parameter, $a$, in which case we write it as $p(x | a)$.  Here, $a$ is simply a number that appears in the definition of the function, and $p(x| a_1)$ and $p(x|a_2)$ are different probability distribution functions for the random variable $x$.  We often think of $a$ as a parameter whose value we want to know or a "parameter of interest".  We will discuss how to perform this inference in later sections.


### Marginalization and bayesian inference

There are two probabilistic operations that superficially look similar but represent different concepts all together.  

The first is the marginalization of a probability density functions.  Imagine on has a pdf that describes the probability of two random variables x and y:

$$
p(x, y) = ...
$$


If one doesn't care about values of y and only wants the distribution of x, one can "marginalize" y by integrating it away:

$$
p(x) = \int p(x, y) dy
$$

Our original pdf, $p(x, y)$, described two random variables, x and y, and one generates them in pairs using this joint distribution.  The new pdf, $p(x)$, represents the distribution of x if we draw many join values of $(x, y)$ and discard y values to get a list of x values.  An important thing to note is that one can only "marginalize" the data that a pdf describes; one cannot marginalize away any parameters of a pdf.

One should not confuse this with a similar Bayesian operation.  Consider the situation where we have a pdf of a single variable x given the parameter $a$:

$$
p(x | a) = ...
$$

One may be tempted to remove the dependence on the parameter $a$ by "marginalizing" it away, like so:

$$
p(x) = \int p(x | a) da
$$

However, this is an invalid transformation.  Here, $a$ is not a random variable, it's a parameter, so one cannot integrate over it.  In order to remove the functional dependence on $a$, one must factorize the distribution by doing:

$$
p(x, a) = p(x|a)*p(a)
$$

NOW, we can perform a marginalization:

$$
p(x) = \int p(x, a) da = \int p(x|a)*p(a) da
$$

In other words, in order to use a parameterized distribution function $p(x|a)$ to obtain $p(x)$, one must have the prior distribution $p(a)$ handy.  This may be problematic for two reasons:

- One may not have a reasonable model for $p(a)$
- One may be a frequentist and may think of $a$ merely as a parameter and may believe that the probability of a parameter is a meaningless notion.


### Functions of random variables

A common source of confusion when dealing with probabilities is understanding the distribution of functions of probabilistically distributed variables.  Let's say that I have two variables, x and y, which each follow a probability distribution: $p(x)$ and $p(y)$.  Let's then say that I create a quantity z which is the sum of these two variables: $z = x + y$.  What is the probability distribution of z, $p(z)$?

Before we answer that, let's make sure that we understand what it means to add two probabilistically distributed variables.  One should hold on one's head the following procedure.  First, obtain a value for x by drawing from the probability distribution p(x).  For example, if x is a variable representing the roll of a die, then roll that die to obtain an instance of x, which is one of the numbers in 1 through 6.  Then, obtain a value for y by drawing from p(y).  Finally, add those two numbers up to get an instance of the probabilistically distributed variable z.

Naively, one may think that the probability p(z) is given by:

$$ p(z) = p(x) + p(y)$$

But this is not the case.  It's clear that this is wrong because, as defined above, p(z) would not add up to 1.  Moreover, it has invalid units (note that p(x) has units of 1/[x] and p(y) has units of 1/[y], and these cannot be added together.

So how, then, do we come up with $p(z)$?  Essentially, we are asking, "If we draw from x at random and draw from y at random and add them together, what is the probability that their sum is equal to some value z?"  We can write this as:

$$
p(z) = \int \int p(x) p(y) \delta(z = x+y) dx dy
$$

If x and y are not independent, as was implied in our example, then one must write the more general expression:

$$
p(z) = \int \int p(x, y) \delta(z = x+y) dx dy
$$


## Likelihood

The likelihood function for a given model (with some parameters) and a given dataset is the probability distribution function of that model evaluated on the data and interpreted as a function of the model's parameters.

Imagine we have a model for a single probabilistic variable $x$ that is described by a single parameter $\mu$:

$$
model = p(x) = p(x | \mu)
$$

$p$ is a function of the data (given $\mu$) that returns the probability of the data.  The likelihood function for $p$, $x$, and $\mu$ is given by:

$$
likelihood = L(\mu) = p(x | \mu)
$$

It looks the same as the model, but it is interpreted as a function of the parameter $\mu$.  In a likelihood, the data is fixed, and we instead vary the possible models that could have produced that data.


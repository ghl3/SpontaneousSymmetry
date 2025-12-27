---
title: Probability
---



# Probability

There are two competing schools of thought which offer differing definitions of the term "probability".

The "Frequentist" definition of probability, as the name suggests, thinks of probability as describing the relative frequency with which an event occurs.  This definition is therefore limited to describing events that can occur many times and whose outcome for each occurrence is random.  A Frequentist defines probability of a specific outcome as how many times that outcome occurred divided by the total number of events (in the limit as the number of event trials approaches infinity):

$$
\text{prob}(x) = \frac{\text{\# of events whose outcome is x}}{\text{total \# of events}}
$$

The "Bayesian" definition of probability is the subjective belief that an event will occur, weighted by the evidence for that event occurring.  It is both more vague and more general than the frequentist definition.  It is vague because it includes a subjective component, which is ill defined and is based on a person's belief in the likelihood of an event.  It is more general because it is based on a belief that an event will occur,  which allows it to describe events which which aren't repeatable.

A few examples illustrate the differences in these definitions.  Any layman knows that the odds of getting a "1" when rolling a dice is 1/6.  A frequentist would say that the probability is 1/6 because we can roll the dice many times and measure how often each face comes up.  A Bayesian would have an intrinsic belief in the probability of the dice roll (possibly motivated by a symmetry argument based on how the dice is designed).  These interpretations are slightly different, but they both agree on the probability.  Another example is the probability that the Sun will explode tomorrow.  A Bayesian would believe that the probability of a Sun explosion is very low, but a frequentist would have to argue that he cannot assign a probability to this event, for it is not repeatable: it can only happen once, and it either will happen or won't happen.  As a final example, consider the statement that the speed of light is $3.8 * 10^8$.  A Bayesian would say that this has a high probability of being true (based on a large body of scientific evidence).  A frequentist, however, wouldn't be able to assign a probability to whether or not it's true: it either IS true or it ISN'T.  The universe, as far as we know, was only created once, and the sped of light is a fixed parameter of this universe that takes on a single value with absolute certainty.

While these differences seem somewhat esoteric, they have tangible implications on how each group performs a data analysis.  For example:

- A frequentist cannot assign a probability to a parameter of a model.  The parameter has some fixed true value, just as the speed of light is some fixed value that doesn't change based on our measurements or beliefs.  A frequentist is only able to make statements that try to illuminate what that value is.  Specifically, a frequentist can never make a statement expressing the probability that a model is true.
- A bayesian, on the other hand, MUST assign probabilities to each parameter of the model that they want to measure (known as a "prior").  This means that every Bayesian measurement is influenced by the choice of priors for inferred parameters.  The choice of these priors may be obvious and useful in some cases, but it may be arbitrary in others.

Based on this, it may seems that the Bayesian framework is more flexible.  Indeed, it is a common misconception that only Bayesians are able to build complicated models or are able to take into account accumulated worldly knowledge.  But this is untrue.  An important point to note is that the difference in these philosophies determines how they each perform *inference*, but doesn't place restrictions on the functional forms of the models that they can build.  Any model designed by a Bayesian can also be used within a formal frequentist framework.  The difference is that the frequentist would perform a different set of calculations than a Bayesian would to infer the values of parameters using that model.

As an example, consider the following model which describes the probability of event x and is governed by a parameter $\alpha$:

$$
p(x | \alpha) = e^{-(x-\alpha)^2}*e^{-(\alpha - 1.0)^2}
$$

A Bayesian may interpret this equation as a probability distribution function for the data $x$ given by $e^{-(x-\alpha)^2}$, which depends on the parameter $\alpha$ that has a prior probability whose shape is $p(\alpha) = e^{-(\alpha - 1.0)^2}$.  

But a frequentist is free to construct and consider this model as well.  To him, the term $e^{-(\alpha - 1.0)^2}$ is not a statement about the prior belief on the parameter $\alpha$, but instead is typically referred to as a "constraint term" and can be thought of as describing some previous measurement on the parameter $\alpha$ whose result is included in the current model.  The functional form of this probability distribution is the same for both philosophies.

In practice, the main difference between how a Frequentist and Bayesian uses this distribution function is that a Bayesian is free to integrate over the parameter $\alpha$ to get a probability that depends only on $x$.  A frequentist cannot integrate over parameters, for doing so would require assigning them probabilities to serve as the kernel of integration.  Instead, a frequentist can only consider the set of different values of parameters and sets of results under the assumptions of those parameters.

But this difference doesn't affect the types of models one can build using either philosophy.  One is fully free to build deep, hierarchical models in a frequentist settings, they simply cannot eliminate model parameters by integrating them away (using a prior probability).  A frequentist must instead handle these parameters in a different way (which we will discuss later).


## Probabilistic Variables

The core concept of probability is the idea of a probabilistic variable, or stochastic variable, which is a measurement or observable whose value (upon observation) is non-deterministic but instead is government by a probability distribution.  It is important to keep separate the concept of a random variable with an actual observed or measured value of that variable.  A random variable is a process that may generate one of several values.  Any actual value observed is a fixed real-valued number.  Unfortunately, the mathematical notation often hides the difference between these two concepts.

<!--

The theory of probability has a number of similar but subtly different concepts, which is a large source of confusion.  To make matters worse, the notation employed often elides these differences instead of using unambiguous syntax.  We will try here to be clarify all the possible meanings of this syntax, but will later fall back to the usual sloppiness, for convenience.

First, a probabilistic variable is a process or procedure that can result in more than one outcome, and the actual outcome is based in some way on a random process.  This abstract process is different than an actual, observed draw from a probabilistic variable, which is some number (or set of numbers) that was actually generated by the process.

-->

Imagine we have a random variable that we denote $x$.  This is not a number, it's an abstract process.  If we make observations, or draws, from that variable , we obtain the numbers $x_1$, $x_2$, $x_3$, etc, which ARE numbers.  The probability of obtaining a real-valued number $x_i$ from a draw of the distribution of x is denoted as $p(x=x_i)$ or simply $p(x_i)$.  Unfortunately, this is often written as $p(x)$, which is somewhat confusing, as $x$ here means both the random variable itself AND some value that it may probabilistic have.

A probability distribution may describe multiple variables.  The probability distribution function $p(x, y)$ describes a random process that generates two values at a time: $(x_1, y_1)$, $(x_2, y_2)$, $(x_3, y_3)$.  The random variables, $x$ and $y$, are said to be correlated because they are generated from a single abstract process.  (I guess if you go back far enough, all variables are correlated, as they were generated by whatever process set the universe into motion.)  Two variables are said to be independent if their joint probability distribution can be factorized as:

$$
p(x, y) = p(x)p(y)
$$ 

A probability distribution may be "conditioned" on the observed value of another random variable or some state of the universe.  We write this as:

$$
p(x=x_0 | A=A_0)
$$

which reads as, "The probability that the random variable $x$ has value $x_0$ given that the random variable $A$ was observed to have the value $A_0$".  Unfortunately, this is often just written as $p(x | A)$ and the reader is asked to assume that the $A$ in the term represents BOTH the random variable AND the observed value that we are conditioning on.

A probability distribution, $p(x)$ is a function.  Like any function, it may be parameterized by some parameter, $\alpha$, in which case we write it as $p(x | \alpha)$.  This is the same notation that we use to write a conditional distribution.  The meaning is essentially the same: we are here describing the probability of $x$ given that the value of parameter $\alpha$ is some fixed value.  One often jumps back and forth between the interpretation of $\alpha$ as a mathematical parameter of a function and an assumed value of state of the universe that the distribution of $x$ is conditioned on.

We often think of $\alpha$ as a parameter whose value we want to know or a "parameter of interest".  One of the most common things to do is to "infer" the true value of a parameter $\alpha$ given some measured data $x$.  We will discuss the details of how to perform this inference in later sections.


## Operations and Transformations

One of the most important transformations that one can do on a probability is marginalization.  For a probability distribution function of two variables, $p(x, y)$, one may perform an operation called marginalization to turn it into a probability distribution function of only one variable:

$$
p(x) = \int p(x, y) dy
$$

The act of marginalization is to simply ignore one of the dimensions of the probability distribution.  Our original pdf, $p(x, y)$, described two random variables, x and y, and one generates them in pairs using this joint distribution.  The new pdf, $p(x)$, represents the distribution of x if we draw many join values of $(x, y)$ and discard y values to get a list of x values.  An important thing to note is that one can only "marginalize" the data that a pdf describes.  One cannot marginalize away any parameters of a pdf, so one cannot try to do:

$$
p(x) = \int p(x | a) da \quad \text{WRONG!}
$$

In other words, marginalization gets rid of one of the variables to the left of the $|$ bar in the probability distribution function.

A similar transformation is factorization.  Probability factorization says that one can write a joint distribution as the product of two univariate distributions, one of which is conditional:

$$
p(A, B) = p(A) p(B | A)
$$

The interpretation of this is that we draw joint values of $A$ and $B$ by first drawing a value of $A$ and then drawing a value of $B$ given that value of $A$.  The notation makes this operation seem somewhat subtle: we're simply moving the $A$ across the $|$ bar in our probability distribution functions.  But this transformation is not vacuous, as each of $p(A, B)$, $p(A)$, and $p(B | A)$ are different mathematical functions.

We can combine this equation with marginalization (above) to obtain:

$$
p(x) = \int p(y) p(x | y) dy
$$

Finally, we can perform a transformation better known as Bayes Theorem.  Unlike marginalization, Bayes' theorem allows one to turn a parameter of a probability distribution into a random variable, and visa versa.  Specifically, it says that:

$$
p(A | B) = \frac {p(B | A) p(A)} {p(B)}
$$

or, it is often equivalently written as:

$$
p(A | B) = \frac {p(B | A) p(A)} {\int p(B | A) p(A) dA}
$$

Bayes theorem allows us to swap a parameter to the right of the $|$ bar with a random variable to the left of the $|$ bar.  It is really just a re-arrangement of the rules of factorization above.

One should not confuse a transformation using Bayes theorem with marginalization.  The key difference is that Bayes theorem requires knowing the probability distributions $p(A)$ and $p(B)$.  These are known as "prior" distributions in the context of Bayes Theorem (they're merely unconditional distributions).  The term on the left, after being transformed, is known as the "posterior".  The interpretation of Bayes theorem is that we start with our prior information about the parameter $A$.  We then make a measurement of the random variable $B$ and we use that measurement via $p(B | A)$ to obtain an updated "posterior" of distribution of $p(A | B)$.

The denominator term in Bayes theorem, $p(B)$ or $\int p(B | A) p(A) dA$, is not a function of the random variable $A$ and instead can be thought of as an overall normalization factor that turns $p(B | A) p(A)$ into a function that integrates to total probability of 1.

One should not confuse Bayes theorem with the Bayesian interpretation of probability.  Bayes theorem is a mathematical statement that any frequentist would fully believe in.  The only thing a frequentist would argue with is when one is allowed to use Bayes Theorem.  Because a frequentist does not interpret parameters as random variables, then the expression $p(a)$ with $a$ being a parameter of a distribution $p(x | a)$ makes no sense to them.  Hence, a frequentist is unable to leverage Bayes theorem to obtain $p(a | x)$ from $p(x | a)$, as they ascribe no meaning to $p(a)$.

Bayes theorem, therefore, should not be used when:

- One may not have a reasonable model for $p(a)$
- One may be a frequentist and may think of $a$ merely as a parameter and may believe that the probability of a parameter is a meaningless notion.

## Conjugate priors

As seen above, applying Bayes Theorem involves transforming a probability distribution function using priors to obtain a posterior.  It turns out that there exist certain families of prior distributions and primary distributions such that their posterior is in the same family as the prior.  If we have a variable $A$ whose prior distribution is in the family $f(A | \theta)$ with $\theta$ a parameter and we have the variable $B$ whose distribution depends on $A$ and is in the family $g(B | A)$, then we say that the family of functions $f$ is the "conjugate prior" to the family of functions $g$ if:

$$
p(A) \sim f(A| \theta)
$$

$$
p(A | B) = \frac {f(A | \theta) g(B | A)} {\int g(B | a) f(a| \theta) da} = f(A| \theta')
$$

Conceptually, this means that we start with a prior distribution for variable $A$ of $f(A | \theta)$.  By measuring $B$ (and assuming it's distribution follows $g$), we get an updated distribution of $A$ which is also in the family $f$ but with a different parameter (or parameters) $\theta$.  Verbally, we say that "$f$ is the conjugate prior to $g$".

This may seem like a mathematical gimmick, but finding such pairs is extremely valuable, as it means that if one can obtain a simple relationship between $\theta$ and $\theta'$, then one can perform the Bayesian update step without using Bayes' theorem directly, but instead just by calculating $\theta'$.  Many examples and techniques will utilize conjugate prior pairs to make the math simpler (even if their true prior doesn't exactly match the conjugate prior).

We will see specific examples of conjugate prior pairs when we discuss probability distributions in later sections.

## Functions of random variables

A common source of confusion when dealing with probabilities is understanding the distribution of functions of probabilistically distributed variables.  Let's say that I have two variables, x and y, which each follow a probability distribution: $p(x)$ and $p(y)$.  Let's then say that I create a quantity z which is the sum of these two variables: $z = x + y$.  What is the probability distribution, $p(z)$, of the derived variable $z$?

Before we answer that, let's make sure that we understand what it means to add two probabilistically distributed variables.  One should hold on one's head the following procedure.  First, obtain a value for $x$ by drawing from the probability distribution $p(x)$.  For example, if $x$ is a variable representing the roll of a die, then roll that die to obtain an instance of $x$, which is one of the numbers in 1 through 6.  Then, obtain a value for $y$ by drawing from $p(y)$.  Finally, add those two numbers up to get an instance of the probabilistically distributed variable $z$.

Naively, one may think that the probability p(z) is given by:

$$ p(z) = p(x) + p(y)$$

But this is not the case.  It's clear that this is wrong because, as defined above, $p(z)$ would not add up to 1.  Moreover, it has invalid units (note that $p(x)$ has units of $1/[x]$ and $p(y)$ has units of $1/[y]$, and these cannot be added together.

So how, then, do we come up with $p(z)$?  Essentially, we are asking, "If we draw from x at random and draw from y at random and add them together, what is the probability that their sum is equal to some value z?"  We can create the PDF for Z by taking the PDF of x and applying a change of variables followed by a marginalization.

If we make the following definitions:

$$
z = x + y
$$
$$
w = y
$$

we can write our expression as:

$$
p(z, w) = p(z-w, w) Jac(x, y \rightarrow z, w)
$$

where $Jac(x, y \rightarrow z, w)$ is the magnitude of the determinant of the jacobian of the transformation.  Here, the transformation is simple, so the jacobian factor is just the constant $1$.  We can then marginalize out $w$ to obtain:

$$
p(z) = \int p(z-w, w) dw
$$

A variable transformation of this type, where a new variable is just a sum of other random variables, is known as a convolution.

For more complicated transformations, the jacobian will not be $1$ in general and the integral may be challenging integral to perform.  If is often easier to simulate the value of $z$ by drawing values of $x$ and $y$ and to create an empirical distribution of z using those values than to mathematically calculate this integral, especially when the relationship between $z$ and the random variables $x$ and $y$ becomes more complicated than a simple sum.


## Likelihood

The likelihood function is on of the most important concepts in probability, statistics, and inference.  The likelihood is a function of a probability distribution function AND a specific realization of the random variables described by that distribution, also known as a "dataset".  It is defined as the probability of generating that dataset from the given probability distribution.

The likelihood function itself is not a probability distribution function.  Unlike a probability distribution function, which is a function of the data that a model may generate, a likelihood is interpreted as a function of the parameters of the model (keeping the data fixed).  The likelihood function, unlike a probability distribution function, is not constrained to integrate to 1.  With a probability distribution function, we fix the model and vary the data (say, by calculating the probability of various hypothetical datasets).  With a likelihood, we fix the data and vary the possible models that could have produced that data (by which I mean we vary the parameters of the model).

For a concrete example, imagine we have a model for a single probabilistic variable $x$ that is described by a single parameter $\mu$:

$$
model(x) = p(x | \mu)
$$

$p$ is a probability distribution function that, for fixed $\mu$, gives the probability that the random variable process $x$ yields a specific value of $x$.  Imagine that we draw from the random variable $x$ and obtain the observed value $x_0$.  The likelihood function is given by:

$$
likelihood(\mu) = p(x_0 | \mu)
$$

It is a function of $\mu$ and is obtained by plugging in the specific measured data $x_0$ into the probability distribution function $p$.

The likelihood function is a construct that is commonly used during statistical inference.  We will later see in great deal how it is used and why it's such a useful concept.

A common situation is for a likelihood function to describe independent, identically-distributed data, which is commonly known as iid data.  In such an example, the data consists of N draws from a single probability distribution function, $p(x)$.  The dataset then is given by $\vec{x} = \{x_1, x_2, ..., x_n\}$ and the likelihood function is:

$$
L(\vec{x}) = \prod_i^N p(x_i | \theta)
$$

We will counter a number of examples of models of this form in the sections to come.

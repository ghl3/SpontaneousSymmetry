
---
author: george
date: 2015-04-04 11:20:54.134914
layout: post
slug: raven-paradox
title: Raven Paradox
id: 447
---


I came across a thought experiment known as the "<a href=http://en.wikipedia.org/wiki/Raven_paradox>Raven Paradox</a>" recently.

The idea is to consider the logical statement "All ravens are black".  Using basic logic, one can conclude from this that "any object that isn't black isn't a raven".  Those two are completely equivalent statements.  The paradox asks one to consider an object, say a green apple, that is neither black nor a raven and to ask if the existence of such an object is evidence in support of the statement "All ravens are black".  

The paradox is that one may think it is evidence since it is an example of an object that is neither black nor a raven, and since that being true is equivalent to "All ravens are black" being true, then the existence of a green apple supports the original logical statement.  And this is paradoxical because, on the surface, a green apple should have nothing to do with whether ravens are black or not.

The linked wikipedia article goes on to discuss a number of different interpretations as to why the presence of a green apple could be considered evidence for "All ravens are black".  It even cites a Bayesian resolution to the paradox, summarized as following:

*According to this resolution, the conclusion appears paradoxical because we intuitively estimate the amount of evidence provided by the observation of a green apple to be zero, when it is in fact non-zero but extremely small.*

Essentially, that solution requires assuming that there are a fixed number of objects in the universe, N, of which R are ravens and B of which are black, and further requires assuming that the prior probability of r of those R ravens being black is uniform (0 <= r <= R).  In that scenario, seeing a green apple eliminates one of the N objects that could be a non-black raven, thus reducing the problem to (N-1) objects in the universe with R ravens.

There are numerous other solutions.  However, I think that they, and the paradox itself, is nonsensical.  

The problem as I see it is one of a binary fact: all ravens are black.  We may have some prior belief in that fact, or we may be completely agnostic.  But the presence of prior evidence doesn't seem to affect the paradox, which is one of evidence, not probability.  The issue is: what are the observations that we could make which would increase the likeliness that all ravens are black (or, equivalently, what are the observations hat we could make that would increase the likelihood that there exists a non-black raven).  

One obvious example would be observing a white raven.  That would immediately make the initial logical statement false.  But is that the only evidence that could decrease its likeliness?  That answer depends wholly on one's assumptions of the problem.  And I think that's the underlying point: the problem, as originally posed, only appears to be a paradox, but instead, it's ill defined.  Without a generative model of how ravens are created (either in reality or in any given toy example), then one cannot determine what is or is not evidence.

To illustrate the point, let's create an example model (similar to the Bayesian one).  Let's assume that we're going to generate R ravens and A apples.  When we create a raven, we flip a weighted coin.  With probability b, the raven we create is black, and with probability (1-b), the raven is white (b is most likely close to 1).  This fully defines the generative model of the problem: we can create as many universes that we want of R ravens and A apples and we can verify if all ravens are black or not in any given universe.

Let's pick one such universe and make an observation of an object.  Initially, we may have some prior probability on b (if your prior is that b=1, then you're SURE that all ravens are black.  More likely, it's some function with a narrow width near the upper boundary of 1 but with non-zero measure over b < 1.0).  

So, we observe an object, and it's an apple (a non black one, but I don't think it really matters).  How does our subjective belief in b change?

Using Bayes' formula, we get:

$ \text{probability(b | observed green apple)} = \frac{\text{probability (observed green apple | b)} * \text{prior(b)}} {\text{probability (observed green apple)}}$


- The probability of observing a green apple is the initial fraction of objects that are apples: A / (A + R).  This is fixed and doesn't depend on b.

- The probability of observing a green apple given some value of b is still A / (A + R), since b (the probability of a black raven) doesn't effect whether or not we pick out a green apple or not.

This implies: 

probability(b | observed green apple) = prior(b), implying that our knowledge about b doesn't change after observing the green apple.

This intuitively makes sense.  But it completely depends on the setup of the problem.  One could imagine versions of the problem where the green apple does alter our knowledge about ravens.  


For example, imagine again that the we made R ravens and A apples.  But, when we made a raven, we made it black with probability b = 2*x, and when we made an apple, we made it black with probability x.  In other words, x represents some relative amount of black colored objects in the given universe.  The important point here is that the color of apples is now related (via a hidden variable) to the color of ravens.  So, observations of apple colors can not indeed affect our knowledge of raven colors.  If we start by observing a green apple, we get:

probability (b = b' | observed green apple)

= probability (x = b'/2 | observed green apple) 

= probability (observed green apple | x=b'/2) * prior(x = b'/2) / probability (observed green apple (averaged over all values of x))

Here, the solution depends on the prior probability distribution of x, but there are priors that make the ratio of probability (b = b' | observed green apple) / prior(b') not equal to 1.

The underlying point, therefore, is that one needs to have a probabilistic model of the relationship between raves and apples in order to say whether observing a non-black apple provides evidence for "All ravens are black" or not.  The answer is, "it depends".  It's only a paradox because people may come in with different assumptions about that model and may therefore reach different conclusions.
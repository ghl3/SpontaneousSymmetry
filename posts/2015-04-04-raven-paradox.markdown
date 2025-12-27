---
author: george
date: 2015-04-04 11:20:54.134914
layout: post
slug: raven-paradox
title: Raven Paradox
id: 447
---


I came across a thought experiment known as the "<a href=http://en.wikipedia.org/wiki/Raven_paradox>Raven Paradox</a>" recently.

The paradox starts by considering the potentially true logical statement: "All ravens are black".  Clearly, encountering a raven that is not black would be evidence against the validity of that statement.  But is encountering a non-raven object that isn't black evidence against *supporting* the statement?  For example, if one encounters, say, a green apple (which is neither black nor a raven), is the existence of such an object evidence in support of the statement "All ravens are black"?

The paradox (as described in wikipedia) suggests that this indeed *is* evidence in favor of the statement, which is paradoxical because, on the surface, a green apple should have nothing to do with whether ravens are black or not.  But since "All ravens are black" is completely equivalent to "Anything that isn't black isn't a raven", encountering a non-black, non-raven object may be considered as positive evidence toward the statement.  The linked wikipedia article goes on to discuss a number of different interpretations as to why the presence of a green apple could be considered evidence for "All ravens are black".  It even cites a Bayesian resolution to the paradox, summarized as following:

*According to this resolution, the conclusion appears paradoxical because we intuitively estimate the amount of evidence provided by the observation of a green apple to be zero, when it is in fact non-zero but extremely small.*

Essentially, that solution requires assuming that there are a fixed number of objects in the universe, N, of which R are ravens and B are black. The bayesian "resolution" further requires assuming that the prior probability of r of those R ravens being black is uniform (0 <= r <= R).  In that scenario, seeing a green apple eliminates one of the N objects that could be a non-black raven, thus reducing the problem to (N-1) objects in the universe with R ravens.

There are numerous other solutions.  However, I think that they, and the paradox itself, are nonsensical.  

Most of the discussions about what constitutes evidence for "All ravens are black" miss the central points that evidence must be considered in relation to a model relating the evidence to the fact it is supporting or refuting. In order to determine what observations that we could make which would increase the likeliness that all ravens are black (or, equivalently, what are the observations hat we could make that would increase the likelihood that there exists a non-black raven), we need to understand the relationship between those observations and the blackness of ravens.  

One obvious example would be observing a white raven.  That would immediately make the initial logical statement false.  But is that the only evidence that could decrease its likeliness?  That answer depends wholly on one's assumptions of the problem.  And I think that's the underlying point: the problem, as originally posed, only appears to be a paradox, but instead, it's ill defined.  Without a generative model of how ravens are created (either in reality or in any given toy example), then one cannot determine what is or is not evidence.

To illustrate the point, let's create an example model (similar to the Bayesian one).  Let's assume that we are able to create a universe with R ravens and A apples.  When we create a raven, we flip a weighted coin.  With probability b, the raven we create is black, and with probability (1-b), the raven is white (b may or may not be close to 1).  This fully defines the generative model of the problem: we can create as many universes that we want of R ravens and A apples and we can verify if all ravens are black or not in any given universe via incremental observation of the objects in that universe.

Let's pick one such universe and make an observation of an object.  Initially, we may have some prior probability on b (if your prior is that b=1, then you're SURE that all ravens are black.  More likely, it's some function with a narrow width near the upper boundary of 1 but with non-zero measure over b < 1.0).  

Imagine we observe an object and it turns out to be an apple (a non-black one, but I don't think it really matters).  How does our subjective belief in b change?

Using Bayes' formula, we get:

$ \text{probability(b = 1 | observed green apple)} = \frac{\text{probability (observed green apple | b = 1)} * \text{prior(b = 1)}} {\text{probability (observed green apple)}}$


- The probability of observing a green apple is the initial fraction of objects that are apples: A / (A + R).  This is fixed and doesn't depend on b.

- The probability of observing a green apple given some value of b is still A / (A + R), since b (the probability of a black raven) doesn't effect whether or not we pick out a green apple or not.

This implies: 

probability(b = 1 | observed green apple) = prior(b = 1), or more generally that 
probability(b | observed green apple) = prior(b), implying that our knowledge about b doesn't change after observing the green apple.

This intuitively makes sense, but it's not a general fact.  Rather, it's a consequence of how we decided to generate ravens; it's a consequence of our specific model of ravens that we presented in the setup of the problem.  One could imagine versions of the problem where the green apple does alter our knowledge about ravens.  


For example, imagine again that the we made R ravens and A apples.  But, when we made a raven, we made it black with probability b = 2*x, and when we made an apple, we made it black with probability x.  In other words, x represents some relative amount of black colored objects in the given universe.  The important point here is that the color of apples is now related (via a hidden variable) to the color of ravens.  So, observations of apple colors can not indeed affect our knowledge of raven colors.  If we start by observing a green apple, we get:

$$
\begin{equation}
\begin{split} 
\text{probability} & \text{ (b = b' | observed green apple)} \\ 
& \\
& = \text{probability (x = b'/2 | observed green apple)}  \\
& \\
& = \frac{\text{probability (observed green apple | x=b'/2) * prior(x = b'/2)}} {\text{ probability (observed green apple (averaged over all values of x))}} \\ 
\end{split}  
\end{equation} 
$$


Here, the solution depends on the prior probability distribution of x, but there are priors that make the ratio of probability (b = b' | observed green apple) / prior(b') not equal to 1.

The underlying point, therefore, is that one needs to have a probabilistic model of the relationship between raves and apples in order to say whether observing a non-black apple provides evidence for "All ravens are black" or not.  The answer is, "it depends".  It's only a paradox because people may come in with different assumptions about that model and may therefore reach different conclusions.

So, to go back to the most general version of the paradox, I believe the answer lies in the fact that ones model of raven creation determines whether observation of other objects affects the validity of "All ravens are black" or not.  This moves the problem from an abstract logical paradox to an empirical question about the evolution of our natural universe.  In reality, it's not a question of pure logic, it's a question about the color of birds and the relationship between that color and the color of other objects encountered in nature.  And while some may see that as a more mundane question, I believe it to be a more accurate summary of the original paradox. 
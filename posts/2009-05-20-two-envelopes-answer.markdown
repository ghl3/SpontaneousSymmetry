---
author: ghl3
comments: true
date: 2009-05-20 00:07:00+00:00
layout: post
slug: two-envelopes-answer
title: 'Two Envelopes: Answer'
wordpress_id: 12
categories:
- Math
- Puzzles
---

I'll start off by addressing the comments.  
  
Just to reiterate, the paradox is the idea that for all possible values that we find in the envelope, switching is advantageous.  To Erik, this clearly makes no sense because there is nothing that distinguishes the envelopes.  This is different from a situation where we have a particular value, say $100, and are given the option of switching for either $200 or $50 with equal probability.  Clearly in that case switching is advantageous.  
  
To Mr. Zrake's argument, you have shown that having a strategy of always switching will not be advantageous.  This is different than the idea that once we've opened the envelope and seen a particular value, we always want to switch.  Let me explain with an example.  Imagine that I tell you in advance that the envelopes contain exactly $50 and $100 and you get one envelope with a 50/50 chance.  Clearly, in this case, a strategy of always switching is clearly going to have the same expectation value as a strategy of always staying, which is just the mean of the two envelopes.  However, if you open the envelope and see $50, you should always switch and if you see $100 you should always stay.  
  
The last example I think is a big hint toward the end of the paradox.  See, if we know in advance how the envelopes are filled, then our strategy should be clear.  Let's go back to the beginning.  We haven't discussed how the person decides how much money to put in every envelope.  The only constraint thus far is that one envelope should have twice the money that the other has.  When we open a particular envelope, we know that the other has either twice the money or half the money.  The key, however, is that there isn't a 50/50 chance of it either being half or double as one would naively expect.  The relative probability between half and double depends on how the envelopes are filled, ie it depends on the probability distribution that the filler uses to pick what amount of moeny goes into the envelopes.  
  
And here's the real key:  It is impossible to have a probability distribution where, for every x that we see in the envelope, there is a 50% of the other having half and a 50% of it having double.   
  
To be more concrete, let's say that the filler chooses to fill the envelope in the following way: he has some probability distribution p(x) that he uses to randomly fill one envelope.  He then fills the other envelope with double that amount, and flips a coin which determines whether he gives us the larger or the smaller envelope.  
  
So, if we open our envelope and see X dollars, it means that one of two things happened.  Either the "seeded" number was X and we got the smaller envelope, or the seeded number was X/2 and we got the higher number.  The expectation value of switching when we see X in our envelope is:  
  
EV(switching) = N * { p(X)*2X + p(X/2) * X/2}, where N is a normalization constant such that the probability adds up to 1.  
  
Clearly, this expecation value depends intimately on the probability distribution function p(X).  If we were to know explicitely this function going in, then we could determine the proper strategy by comparing the above expectation value to X.  If we DON'T know this function going in, which is the case presented in the original problem, then we CAN'T come up with the optimal strategy.  However, that doesn't mean that ALWAYS IS correct to switch, it just means that we can't determine the correct answer because we don't have enough information.

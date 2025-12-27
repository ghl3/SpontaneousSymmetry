---
author: ghl3
comments: true
date: 2009-09-24 21:48:51+00:00
layout: post
slug: aids-vaccine
title: Aids Vaccine
wordpress_id: 125
categories:
- General
- Math
---

For the first time ever, a vaccine has demonstrated the ability to reduce the rate of infection with the HIV virus.  This is, of course, great news.  It will get a lot of press and will lead to a new understanding of how to fight the spread of HIV.  Scientists admit that they are baffled by what the vaccine is actually doing, and it will talk some time to figure out why what they are doing is working.  I eagerly awate follow up studies.

But what really interests me here are the numbers.  According to [this article ](http://www.nytimes.com/aponline/2009/09/24/world/AP-MED-AIDS-Vaccine.html?pagewanted=1), the vaccine was able to reduce the rate of infection of HIV by 31%, and that this number is statistically significant.  But, if you actually look at the raw numbers, you may be surprised.  In the study, 74 people who received a placebo became infected.  51 people who received the vaccine became infected.  The difference is only 23 people.  How do we know that this is a meaningful number?  How do we know that the vaccine didn't just get lucky, and they happened to pick a group of people to study who happened to not get as HIV.  In other words, what does statistically significant mean here?

Let's take a closer look.  The study involved giving 8198 people a placebo, out of which 74 got HIV.  That is, .90% of the control group got HIV.  The group receiving the vaccine consisted of 8197, nearly the same size as the placebo group, and 51 of them got HIV.  That represents about .62%.

The 31% effectiveness that the article quotes is obtained by taking (74 - 51) / 74 = 31.1%.  Meaning, 31% less people got HIV when given the vaccine.  But, again, how can we judge how much luck in involved?

Well, we can gauge the effectiveness of the vaccine by doing the simplest possible statistical analysis.  I'm not sure that the researchers did a more detailed analysis then we're about to do, but doing so would require more intricate knowledge about infection rates and would use models of rates of infection spreads and complex things like that.  We don't have access to that information because we're not experts in the field.  But we can still get a good feel using the above numbers alone.

It's probably a good guess that infection by HIV follows a [Binomial Distribution](http://mathworld.wolfram.com/BinomialDistribution.html).  Meaning, for any given person, there is a certain probability of getting HIV and the probability of any person getting HIV is independent of other people getting HIV.  In the limit that we to a study on many, many people, the Binomial Distribution quickly becomes a Poisson distribution (having over 8000 people is certainly more than enough to use a Poisson approximation).

So, with a Poisson distribution in mind, we can approximate the standard deviation for getting HIV.  The nice thing about using a Poisson distribution is that there's an easy way to remember the standard deviation.  The Standard Deviation is simply the square root of the expected number of events.  So, if we have 8197 trials and we have a rate of .009 (or .9%), then we EXPECT to get about 74 HIV positive patients, and the standard deviation is about 8.6.  So, to put it simply, we expect 74 +- 4.3 people to get HIV  (the 4.3 is just 8.6/2 so the total "width" is 8.6).  In the trial, we actually got 51.  That's way less than 70, which is the lower bound for one-sigma error.

If we assume that the mean measured by the placebo is correct and the infection rate follows a binomial distribution, we get the following distribution for the number of infections out of the tested population:

![BinomailImage](/assets/uploads/2009/09/binomailimage.jpg)

The number of people infected from the group that took the vaccine was 51.  If you look for that number in the above graph, you can see that the measured number of infected of the population that took the vaccine is well outside of the center of the bell curve.  Thus, it makes us tend to believe that the vaccine is actually doing something.

This analysis is extremely simple.  A better analysis would consider the fact that we don't know the true mean infection rate, and so the number we obtain from the placebo group should also follow a binomial distribution centered around the true rate of infection (ie the rate when N goes to infinity).  But, even being purposely ignorant, we can convince ourselves that it's not crazy for these results to be significant.

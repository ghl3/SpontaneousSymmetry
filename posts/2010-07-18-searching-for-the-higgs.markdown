---
author: ghl3
comments: true
date: 2010-07-18 12:19:39+00:00
layout: post
slug: searching-for-the-higgs
title: Searching for the Higgs
wordpress_id: 279
categories:
- Particle Physics
- Physics
---

There was a rumor circling about recently that scientists working at the particle collider at Fermilab in Illinois are on the verge of announcing a discovery of the Higgs Boson.  To cut to the chase, they aren’t going to do any such thing, but it’s it’s a good platform to talk about particle discovery.

Here is the original blog entry that stirred up the rumors.  It’s actually quite informative as to how particle physicists go about summarizing their work:

[Blog](http://www.science20.com/quantum_diaries_survivor/rumors_about_light_higgs)

While outright discovery of the Higgs is extremely unlikely, such rumors may not be completely off base.  It's conceivable that Fermilab has a “1 or 2 sigma" deviation from background that could indicate the possibility of a Higgs. But, in order to claim discovery (by somewhat arbitrary standards), one must have what is called "5 sigma evidence." If they had this strong of a signal, new of it CERTAINLY would have leaked. Scientists aren't so great at keeping exciting secrets like that.

So, what is this business with sigmas?  Well, scientists are very strict when it comes to rejecting old theories in favor of new ones.  Particle physics deals with probabilistic events.  One is never certain that they’ve seen a Higgs boson, they only know that they’ve seen an event that looks like the Higgs.  If one amasses enough events that “look like the Higgs,” then one can claim, with a certain uncertainty, that the Higgs has been “discovered.”

For the discovery of a new particle, scientists have sent the standard of certainty to be "5 Sigma evidence," meaning that the probability of obtaining the same data and there NOT being a Higgs is about .00005% (For the statistically inclined, this is just the p-value of the background only hypothesis). This plot helps to illustrate the concept:


![](http://tevnphwg.fnal.gov/results/SM_Higgs_Fall_09/tevhcp09llr.gif)


Here’s how to read the plot.  Pick a value of the Higgs mass (the x-axis, in units of GeV).  For that value, the black dotted line is the expected value of some statistic (exactly what that statistic is isn’t all that important, but it’s something called the Log-Likelihood Ratio).  The red dotted line is the expected value if there were a Higgs boson.  The black line is the data that we obtain from experiment.  So, for a given Higgs mass on the x-axis, if the solid black line is close to the dotted black line, then most likely the Higgs DOES NOT exist at that mass.  However, if the solid black line is close to the red line, then the data is consistent with a Higgs boson of that mass.

In the above plot, the green and yellow areas are bands of 1 and 2 standard deviation fluctuations of the background.  So, it’s normal for the data to fall in the green region and a little bit into the yellow region.  If the solid black line were to go far outside of the yellow, then something interesting is happening (meaning, there is a significant difference from the non-Higgs “background” theory).


The whole thing is analogous to the following example: Imagine that you have a coin. Coins generally have a heads and tails side, but there is some possibility that this coin is a defect and has two heads sides.  You can't examine the coin to hand to find out if it is a defect, you can only flip the coin and gather evidence by seeing which side lands up. So, you flip it once and you get heads. Does this mean that it's a defective, all heads coin, or that it's a normal, fair coin? Well, you can't say, you don't have enough data. So, you flip it again, and you get another heads. So far, everything is consistent with the all-heads coin, but it's very easy for the normal, fair coin to have produced the same results (it does this 25% of the time). The game is to keep flipping until you get enough heads in a row so that you are convinced that the coin is defective. In science, this means looking for 5 sigma evidence. Translating that to this example, it means that we get enough heads in a row such that the probability of the fair coin getting that many heads in a row would be about .00005%. In this example, using the 5-sigma standard, we would need to see 21 heads in a row to be sure that we're dealing with the all-heads coin (if I've done my math properly). This is a pretty strict requirement, and most people, after seeing about 10 heads in a row, would be pretty sure that the coin was broken.

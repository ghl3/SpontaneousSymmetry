---
author: ghl3
comments: true
date: 2011-04-14 13:38:35+00:00
layout: post
slug: evidence-of-new-physics-at-fermilab
title: Evidence of new physics at Fermilab
wordpress_id: 398
---

The biggest recent news in particle physics came not from the LHC but rather from the Tevatron, the accelerator at FermiLab which, due to budget constraints, is set to be shut down at the end of this year.  The Tevatron has been aggressively perusing the Higgs Boson, trying to find that holy grail of particle physics before relinquishing the spotlight to the accelerator at CERN.  And while the Tevatron has managed put limits on the allowed values of the mass of the Higgs boson, it has thus far been unable to claim discovery.



However, the Tevatron may have stumbled upon some extremely exciting new physics that would demand new theories of fundamental particles.  The CDF experiment, one of the experiments of the Tevatron, published a paper recently showing a “bump” in the invariant mass spectrum of events involving W Bosons.  This feature is not present in Standard Model simulations and therefore could be a tell-tale sign of “new physics.”  On the other hand, it could simply turn out to be a feature of detector resolution.  So, let’s take some time to understand what exactly the CDF experiment saw and to think about how significant a discovery it is.



This “bump” was found in a search of what are called “diboson” events, which are events that involve two W bosons, two Z bosons, or and W and a Z boson.  (The term boson refers to a particle that carries a force, such as the W or Z, which mediate the weak force.  The photon too is a boson and it mediates the electro-magnetic force.  The gluon is the boson which mediates the strong force, and the Higgs is a yet-to-be-discovered boson which, in short, creates mass).



In the diboson events that were studied in this analysis, one of the bosons decays into a lepton (meaning an electron or it’s cousin the muon) and the other decays into two quarks.  These quarks eventually become jets, which are messy cones of particles that come from the effects of quantum-chromodynamics (QCD).  In addition, these events contain missing energy that comes from invisible neutrinos escaping the detector.  So, experimentalists collected these events from CDF and calculated the “invariant mass” of the two jets.  Since these jets came from one of the bosons (either the W or the Z), one would expect this mass to be close to the W or the Z mass, which are 80 and 91 GeV, respectively.  In practice, since these jets are so messy, the resolution of the detector isn’t fine enough to distinguish between those two masses, so one expects to see one giant mass peak between 80 and 90 GeV.  When experimentalists looked at these events, this is indeed what they saw:

![](/static/images/CDFMjjPlot.png)

The red in the plot above represent these diboson events that the experimentalists were looking for.  The different colored histograms are background, mostly coming from simulation.  The black dots with the small vertical bars are the data that was actually measured by the experiment.  So, if the sum of the colored blobs add up to the black data points, then everything is well-understood and agrees with standard model prediction.  And this is the case, for the most part.  One can clearly see that the black lines follow the red bump where simulation says it should be, which essentially means that experimentalists have found the diboson events they were looking for.  At the same time, there is a lot of background.  In this analysis, there is much more background than signal, moss of which comes from “W plus jets” events in green.


So, what’s all the excitement about?  The Diboson signal (red) indeed behaves as it should.  But there is another part of the plot that stands out.  If you look at the falling slope at around 140 GeV, you’ll see that the measured data (the black bars) are a bit higher than they should be (the data should match the sum of all the colors, including green and the little red on top).  For a few bins in a row, there are more events measured in the data than one would expect from the standard model simulation.  Many believe this excess of events is evidence for new physics at work, and perhaps is the calling-card of a new yet-undiscovered particle.

If you take the data and subtract everything but the red, you’ll end up with this plot:

![](/static/images/DijetResonanceSubtracted.png)

There is a first bump at around 90 GeV where we expect the standard diboson signal to be.  However, the excess around 140 GeV is clearer as a bump (the red and blue lines are fits to these shapes and have been included to guide the eye).


The immediate objection of many is that, looking at the original plot without the background subtraction, the excess of events seems very small.  Indeed it is, there is a lot of background from W+Jets, and this new signal is just a small bump on top of that giant hill.  And the bottom line is the following: if one doesn’t understand the hill extremely well, then one can’t really determine if the bump is real or not.  Is there a new physics signal, or is our simulation of the backgrounds just slightly wrong?  This, in essence, is the name of the game.  Particle physicists are mostly concerned with determining how well they understand their backgrounds and what type of statistical statements can be made using that understanding.

For example, this excess of events is seen in the distribution of the mass of jets in diboson events.  Therefore, in order to make a strong statement using this distribution, one must have a very good understanding of how well these jets have been measured.  Jets are very messy objects and involve a lot of particles moving in a large cone.  It is difficult to measure the energy of all these particles and to be sure that some energy isn't missed or over-counted.  Some have suggested that the bump seen merely comes from a misunderstanding of the energy of these jets.  One experimentalist working on the CMS collaboration demonstrated in a simple animation how this effect could work (taken from [Quantum Diaries Survivor](http://www.science20.com/quantum_diaries_survivor/new_massive_particle_some_kind_higgs-77857):

![](http://cmsdoc.cern.ch/~ttf/CDFDiJetScale/AnimatedDijet.gif )

In this (somewhat crude but very accessible) animation, the energy of the jets, and therefore their mass distribution, is varied.  One can see that when the energy is scaled upwards by up to 7%, the excess around 140 GeV seems to disappear (and this is especially noticeable when looking at the top plot showing the difference between signal and background).  While this is far from definitive, it suggests the types of studies that must be performed before this hint of new physics can be accepted or ruled out.  And while the validity of this claim is far from certain, it is very exciting for a particle physicist and is hopefully but a small taste of the plethora of new physics that will be discovered in the next decade by the LHC or the many other experiments around the world.

---
author: ghl3
comments: true
date: 2011-01-31 17:07:35+00:00
layout: post
slug: the-evolution-of-cars
title: The Evolution of Cars
wordpress_id: 352
---

Ever since I was a kid, I was interested in the concept of using evolution to program and solve problems.  I didn’t really know what it was called at the time or if it was even feasible, but I was fascinated with the idea of having a computer learn to program itself, to adapt, and evolve (this probably grew out of reading too many Michael Crichton novels).  This idea is the basis of a very real and quite useful set of programming techniques called “genetic algorithms.”

The goal of genetic programming is to have a computer program “evolve” by gradually adjusting its own parameters based on how well it preforms.  There are many different implementations of Genetic Programming, but this is typically done by creating many different versions of a program, all with different parameters, and seeing which version preforms the task best.  Those programs which preform the task best are combined together in some way to create a new or several new offspring programs (mimicking reproduction).  In addition, genetic algorithms often include some level of mutation in which aspects of a program randomly change. So, one starts out with a collection of initial programs and, by combing and mutating these programs, one creates a next “generation” of these programs.  Those that work best continue on, and those programs that fail aren’t recombined into a next generation.  It’s controlled Darwinism.

I came across a fun example of this concept:

[boxcar2d.com](http://www.boxcar2d.com/)

This site, before your eyes, uses genetic programming to create a simple version of a car that can travel along a bumpy path.  The program creates cars out of triangles, wheels, and axels, and sees which cars can drive the furthest.

[![](/static/uploads/2011/01/Early2-300x159.png)](/static/uploads/2011/01/Early2.png)

Those cars that make it the farthest are recombined into newer cars (with some additional mutations).  Those that outright fail are lost (they go extinct).  This simple game is a good demonstration of how structure and design can emerge spontaneously out of a simple set of rules.  Initially, most of the cars are odd shapes with wheels sticking out that may or may not even touch the ground.  Some simply fall and fail to even move.  Others may crawl a few feet if their wheel happens to be in the right position.

[![](/static/uploads/2011/01/Early1-300x159.png)](/static/uploads/2011/01/Early1.png)

Those that can move a bit breed with each other and form a new generation, which should be slightly better at driving.  This process continues as long as you’re willing to keep your browser open, and, as one would expect, with each generation the cars are able to drive further.

[![](/static/uploads/2011/01/Car5-300x146.png)](/static/uploads/2011/01/Car5.png)[![](/static/uploads/2011/01/Car7-300x172.png)](/static/uploads/2011/01/Car7.png)

In addition, they become more “car-like.”  They learn that having two wheels, one at either end, makes them more stable and helps them survive the bumpy road.  So, as time goes on, they tend toward the expected shape of a vehicle (remember, this happens with no input into the program as to what a car is or should look like).

[![](/static/uploads/2011/01/Car9-300x179.png)](/static/uploads/2011/01/Car9.png)

However, other features that one would not necessarily expect also emerge (at least, they did during my time as evolution’s third-party observer).  Because the program uses a somewhat realistic physics engine that determines how the cars bounce and rotate when traversing the track, the balance and weight distributions of the cars become important.  A common feature that I saw was the presence of an angular, forward-pointing weight on top of the car which, as far as I could tell, helped the vehicle stay horizontal when going over jumps.  If designing a car by hand, one may not have come up with this sort of structure.  But, because the car optimizes itself for a particular set of conditions, even without any external, intelligent design, it can seek out optimal solutions (as long as those solutions can be reached as the aggregate of small, local changes).

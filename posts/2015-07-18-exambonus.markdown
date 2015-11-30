---
author: George
date: 2015-07-18 17:55:10.607992
layout: post
slug: exambonus
title: Exam Bonus
id: 446
---

<img src="https://pbs.twimg.com/media/CI3RVzCWcAUMuoc.jpg"></img>

The question is designed to be a real-world example of "The Tragedy of the Commons" or "The Prisoner's Dilemma".  And I think it's an effective way of conveying the principals of those concepts.

But instead of diving deeply into the philosophy behind these concepts, I'd like to explore some of the potential strategies for optimizing one's grade on this specific exam.  Ultimately, the optimal strategy depends on one's assumptions about the other students in the class.  But exploring the relationship between those assumptions and the optimal strategy is an interesting exercise.

Let's first consider the case where you do not or are not able to collaborate with your fellow students.  In this case, your individual choice to take the 6 bonus points or not depends on one's estimate of how many other students made the same choice.  Taking the extra 6 points only matters if it's your choice that puts the class percentage over the 10% line.  So, if you believe that less than 10% have decided to take the 6 bonus points (or more than 10%, where you'll all lose anyway), you should take the 6 bonus points (moral frameworks aside).

A more interesting case is when we consider the scenario where we are able to collaborate with our fellow students.  There are two versions of this: explicit and implicit collaboration.  *Explicit collaboration* is the simpler case where all the students during the exam are allowed to communicate with one another.  In this case, the students should pick 10% of the class, either randomly or based on some merit, to receive the bonus points.  This case, too, isn't all that interesting mathematically.

The case of *implicit collaboration* is when we are able to collaborate among the fellow students to come up with a strategy that we will all follow for choosing to take the points or not, but that strategy can't involve communication during the exam (and I'll disallow the case where we simply choose the students to receive the bonus points before the exam).  This is the case that I'd like to dive into for the rest of this post.

Clearly, having the strategy of "everybody picks 6" will not work, as 100% of students will pick 6 and since 100% > 10%, no one will get bonus points.  The strategy of "everybody pick 2" is indeed a better strategy, but we can do better than that.  A better strategy is to have every student bring with them a random number generator that creates numbers between 0 and 1 uniformly.  This random number generator will determine whether or not they take the extra 6 bonus points.

In general, each student's response to this question can be modeled as a floating point variable between 0 or 1 where that variable describes that student's probability of taking the 6 bonus points.  For example, if every student in the class is greedy, then all of them will have a value of 1.0 (or close to 1.0).  And if every student is selfless, then they will all have a value close to 0.0.

One collaborative strategy is for each student to take the bonus with a random probability of 10% of the time (leveraging their random number generator).  This strategy is simple and seems to make intuitive sense.  This will lead to, on average, 10% of the class picking 6, and in that case where exactly 10% of the class picks six, 90% of the students will get 2 points and the lucky 10% will get 6 points.

However, because the strategy is driven by randomness, the perfect 90%/10% split will not always happen.  Often, by pure chance, more than 10% will take the bonus, and therefore the entire class will be unlucky and no one will get any points.  So, this strategy may give us a higher average number of bonus points than the "no one take the bonus" strategy, but also has a non-zero risk of total ruin.

For the purpose of this exercise, I'm going to assume that our goal is to maximize the average number of bonus points to all students.  But, for example, if you're a students who needs only 2 points to move from failure to passing, you'd be strongly in favor of a strategy that guarantees 2 points for every student, and you wouldn't care about maximizing the expectation of the number of points to all students

Given that we want to maximize the average number of bonus points to all students, we can come up with optimal strategies for various scenarios.  Let's assume that we have classrooms consisting of 1, 10, 20, 50, and 100, 500, and 1000 students taking the exam, and in each group, each student selects 6 bonus points with a probability of p.  We can empirically determine the expected number of points by running simulations of the final exam.

The code I've used to run these simulations can be found <a href="https://gist.github.com/ghl3/8e306f920ce08bd1f23e#file-exam_bonus-ipynb">here</a>:

Summarizing those results, here is what the average number of points looks like in each such scenario (averaged over 2000 experiments per test point):

<img src="https://gist.githubusercontent.com/ghl3/8e306f920ce08bd1f23e/raw/56837fdcb941f7d6c5197834e9bd41ca1054b848/experiment_distribution.png"></img>

The x-axis is the agreed probability with which each student picks the 6 bonus points over the 2 bonus points, and the y-axis is the expected number of bonus points per student that results from this strategy.  The various lines show the different class sizes.

For each class size, we can optimize the probability with which each student should pick 6 bonus points to maximize the average number of bonus points earned by the group (essentially finding the value of the x-axis that maximizes each curve):

<img src="https://gist.githubusercontent.com/ghl3/8e306f920ce08bd1f23e/raw/56837fdcb941f7d6c5197834e9bd41ca1054b848/optimal_probability.png"></img>


<table border="1" class="dataframe">  <thead>    <tr style="text-align: right;">      <th></th>      <th>expected_points</th>      <th>probability</th>    </tr>  </thead>  <tbody>    <tr>      <th>1 student</th>      <td>2.000000</td>      <td>0.000</td>    </tr>    <tr>      <th>10 students</th>      <td>2.037600</td>      <td>0.018</td>    </tr>    <tr>      <th>20 students</th>      <td>2.080000</td>      <td>0.024</td>    </tr>    <tr>      <th>50 students</th>      <td>2.135520</td>      <td>0.046</td>    </tr>    <tr>      <th>100 students</th>      <td>2.180340</td>      <td>0.050</td>    </tr>    <tr>      <th>500 students</th>      <td>2.268472</td>      <td>0.072</td>    </tr>    <tr>      <th>1000 students</th>      <td>2.300432</td>      <td>0.078</td>    </tr>  </tbody></table>




Essentially, this table tells us, if we have N students in our class and if all students coordinate to pick "6 points" with a fixed probability, what that probability should be to maximize the average number of bonus points each student will receive (and what that maximum number of points is).

If we have only 1 student, they should opt for 2 exam points every time (and get 6 exam points with probability 0). This makes sense because if they were to pick 6 points, the average number of points in the class would surely be above 10%, and therefore they'd receive 0 points. So, they max they can get is 2 points.

If we have a class of 20 students who are offered the same game, the coordinating students should opt for the 6 point bonus only 2.4% of the time. This is pretty rare. Essentially, it means that, on average, no students will even get the bonus (about half the time, 1 student will get it). In this example, the probability is low to ensure that the probability of 3 students getting the bonus remains low (which would be catastrophic). Since 20 students isn't very many, the probability of relatively large fluctuations in the number of students who end up getting 6 bonus points in our strategy is non-negligable.

When the number of students becomes larger (say, 500 students in a large lecture), we can afford to be much more aggressive in letting a higher percentage of students get the bonus. So, we are allowed to have students pick the 6 points at a rate greater than 7%, which is much more aggressive than we could with only 20 students. In effect, the law of large numbers is protecting us from calamity.

As a thought experiment, let's determine how our strategy evolves as the number of students in the class goes to infinity.  Our intuition tells us that, in such a limit, we should be able to get just below 10% of the students to take the bonus points, leading the expected number of points to be $(.1*6 +.9*2) = 2.4$.  Let's see if we can confirm that intuition.

When considering very large N, running toy simulations becomes expensive, so we'll instead consider the exact formula for the expected number of points given N students in a class and an agreement for each student to choice the 6 bonus points with probability p.  The number of students picking bonus points follows a standard binomial distribution, and therefore the expected number of points is given by

$$<points> = \sum_{n=0}^{\lfloor(N/10)} Binom(n|p, N)(6n - 2(N-n))$$

where $\lfloor$ is the floor function, ensuring that we only sum over values of n that are less than 10% of N.  For fixed N, we can numerically invert this to optimize p.  Following this strategy, we can see

<img src="https://gist.githubusercontent.com/ghl3/8e306f920ce08bd1f23e/raw/0c83fd264c26f91d76d68c3c5ef35332fa70a769/prob_and_points_by_N.png"></img>


<table border="1" class="dataframe">  <thead>    <tr style="text-align: right;">      <th></th>      <th>expected_points</th>      <th>probability</th>    </tr>  </thead>  <tbody>    <tr>      <th>1</th>      <td>1.999990</td>      <td>0.000005</td>    </tr>    <tr>      <th>5</th>      <td>1.999952</td>      <td>0.000005</td>    </tr>    <tr>      <th>10</th>      <td>2.034655</td>      <td>0.018183</td>    </tr>    <tr>      <th>50</th>      <td>2.123904</td>      <td>0.039783</td>    </tr>    <tr>      <th>100</th>      <td>2.171762</td>      <td>0.050223</td>    </tr>    <tr>      <th>500</th>      <td>2.268546</td>      <td>0.070979</td>    </tr>    <tr>      <th>1000</th>      <td>2.299600</td>      <td>0.077683</td>    </tr>    <tr>      <th>5000</th>      <td>2.348601</td>      <td>0.088398</td>    </tr>    <tr>      <th>10000</th>      <td>2.361969</td>      <td>0.091364</td>    </tr>    <tr>      <th>50000</th>      <td>2.381452</td>      <td>0.095737</td>    </tr>    <tr>      <th>100000</th>      <td>2.386464</td>      <td>0.096875</td>    </tr>    <tr>      <th>500000</th>      <td>2.393545</td>      <td>0.098497</td>    </tr>    <tr>      <th>750000</th>      <td>2.394652</td>      <td>0.098752</td>    </tr>    <tr>      <th>1000000</th>      <td>2.395322</td>      <td>0.098907</td>    </tr>  </tbody></table>


We do indeed see the optimal value of p approaching 10% and the maximum expected number of points approaching 2.4.  

We can back-up this intuition and numerical confirmation with an analysis of the binomial distribution.  We know that the binomial distribution, in the limit of large N and p not too close from the boundary, can be approximated as a gaussian:

$$Binom(n| p, N) \rightarrow Gauss(n, N*p, \sqrt{Np(1-p)})$$

With sufficiently large N, the width of the distribution of the fraction of students taking the exam bonus is given by $\sqrt{Np(1-p)}/N$, which is proportional to $\frac{1}{N}$.  This implies that we can make the gaussian as thin as we want (with sufficiently large N), no matter the value of p.  Therefore, we can construct a gaussian that is centered *just* below 10% of students value and is *sufficiently* thin to have *most* of its cumulative distribution below that 10% (so as to have vanishingly small cumulative probability above 10%).  


So, if you can get your fellow students to collaborate with you, it's possible to come up with a strategy that is both fair (treating all students equally) and optimal.  It's probably a better idea to just study hard, however.
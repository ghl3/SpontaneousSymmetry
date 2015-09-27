---
author: George
date: 2015-07-18 17:55:10.607992
layout: post
slug: exambonus
title: Exam Bonus
id: 446
---

Exam Bonus Points

"Here you have the opportunity to earn some extra credit on your final paper grade.  Select whether you want 2 points or 6 points added onto your final paper grade.  But there's a small catch:  if more than 10% of the class selects 6 points, then no one will get any points.  Your responses will be anonymous to the rest of the class, only I will see the responses."


The question is designed to be a real-world example of "The Tragedy of the Commons" or "The Prisoner's Dilemma".  And I think it's an effective way of conveying the principals of those concepts.

But instead of diving deeply into the philosophy behind these concepts, I'd like to explore some of the potential strategies for optimizing the this specific exam.  The optimal strategy depends on one's assumptions about the fellow students.  Exploring the relationship between those assumptions and the optimal strategy is an interesting exercise.

Let's first start with the most general set of assumptions that we can make.  Imagine that there are N students in the class.  Each student can be modeled as a floating point variable between 0 or 1 where that variable describes that student's probability of choosing the 6 points choice.  For example, if every student in the class is greedy, then all of them will have a value of 1.0 (or close to 1.0).  And if every student is selfless, then they will all have a value close to 0.0.

In our first attempt, let's try to determine the optimal strategy under the assumption that ALL students in the class will follow this strategy (but without explicit collaboration other than the strategy itself).  Clearly, having the strategy be "pick 6" will not work, as  100% of students will pick 6 and since 100% > 10%, no one will get bonus points.  The strategy of "everybody pick 2" is indeed a better strategy, but can we do better than that?

That strategy will lead to an average of 2 points per student, but let's see if we can find a strategy that will increase that average.  One example is to have every student bring with them a random number generator that creates numbers between 0 and 1 uniformly.  If their number is less than, say, 0.10, then they pick 6.  Otherwise, they pick 2.  This will lead to, on average, < 10% of the class picking 6, and in that case where exactly 10% of the class picks six, 90% of the students will get 2 points and the lucky 10% will get 6 points.

However, because the strategy is driven by randomness, the perfect 90%/10% split will not always happen.  Often, by pure chance, more than 10% of the students will get a RNG value < 0.10, and therefore the entire class will be unlucky and no one will get any points.  Let's calculate the actual expected value of this strategy:



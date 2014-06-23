---
author: ghl3
comments: true
date: 2009-12-10 22:59:19+00:00
layout: post
slug: combining-lists
title: Combining Lists
wordpress_id: 161
categories:
- General
---

As you may know, this year the Oscars have decided to nominate 10 different films for best picture.  In order to avoid a scenario where the best picture winner receives 10.1% of the vote, the Academy has asked the voters to submit an ordered list of the 10 best picture candidates.  They will then combine this large set of lists to choose a best picture winner.

There's no one best way to combine a set or ordered lists.  A popular way is to assign points to each position (for instance, out of a list of 10, a first place choice may be worth 10 points, second place 9, etc down to 10th place being worth 1 point).  One adds the points together to find an overall ordering.  Of course, in assigning this specific point structure, one has already made assumptions about how valuable each place is.  It assumes a sort of linear value function as a function of position.  Instead, one may place a large relative value to first places as compared to other positions.  As such, one's point distribution may be (13, 9, 8, 7...).

Anyway, the point is that at some point one has to make an arbitrary choice.  However, one can make that choice in a more subtle way than by assigning a vector of points, as described above.  The academy this year will combine their Oscar lists in the following, somewhat convoluted way:

_
“If no film has a majority, then the film ranked first on the fewest number of ballots will be eliminated. Its ballots will then be redistributed into the remaining piles, based on whichever film is ranked second on those ballots. If those second-place votes are enough to push one of the other nominees over the 50 percent threshold, the count ends. If not, the smallest of the nine remaining piles is likewise redistributed. Then the smallest of the eight piles, then the smallest of the seven…”_

In other words, they will use an iterative process of reverse elimination of films.  If no film has a majority (as in, more than half the vote), then the film with the least number of first places will be eliminated.  Each indivudual list will then be updated my removing that film and potentially moving up every other film.  So, if a person has the following list:

Film A
Film B
Film C
Film D
...

and film B is eliminated, then their new list will become

Film A
Film C
Film D
...

and the process continues.

By choosing to have the "value function" being the number of first place finishes, the mixing of the list is implicitly biased.  This bias is desired in this case since the overall purpose of the list is to find a first place winner, therefore first place positions on individual lists would be highly valued.  But one may want a different means of combining lists if one were interested in placing 2nd, 3rd, and the rest instead of only determining 1st.

I'm not sure why I found this interesting.  I'm going to think/go searching for non-points based methods of combining many lists and maybe I'll post a follow-up if I find any interesting.

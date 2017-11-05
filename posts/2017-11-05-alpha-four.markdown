---
author: 
date: 2017-11-05 13:06:42.968148
layout: post
slug: alpha-four
title: Alpha Four

id: 446
---

Last year, Google's DeepMind team (a team dedicated to machine learning and artificial intelligence research) released the results of a model called AlphaGo, which was trained to play the game Go.  Their model made headlines as it boasted a proficiency at the game past any human expert and then backed up that boast by handedly beating some of the top players in the game.  AlphaGo is a neural-network based 

Recently, DeepMind has released an update to the AlphaGo AI, dubbed AlphaGo Zero, which is impressive no only in its improvements over the original model's proficiency at Go, but in particular in the way that it achieved that proficiency.

The original AlphaGo was an AI based on neural network / deep learning techniques.  It was built by starting the data from many human-vs-human games of go, which it used to learn how to play the game.  Once it could play itself, early versions of AlphaGo played against each other, generating more data, and later versions of AlphaGo were trained on that additional data to bootstrap their learning.  A fascinating difference in how AlphaGo Zero was trained is that it was never shown human-vs-human games to start out.  Instead, it's knowledge of Go was generated initially by randomly playing against itself, learning from which side won which games, and playing more games using that newly-gained knowledge.  In this way, it was effectively able to build its knowledge of the game from scratch.  The proof that this can be done so effectively opens up the door for applications to many other games or problems where an existing corpus of data doesn't yet exist.  It shows that a well-guided neural network can become world class only by being told whether it has won a game or lost after playing it through to completion.

Inspired by this idea and to demonstrate it in a simple way, I applied this concept of learning by random plays to the much simpler game of ConnectFour.  Similar to Go, ConnectFour is a game played by placing tokens of one of two colors on a board.  In this case, the board is vertical (tokens can only be placed on top of other tokens) and winner is the player to first align four tokens of his color in a row.

The typical ConnectFour board has 7 columns and 6 rows, making it much smaller than a Go board.  This is a benefit for our purposes: It means that the space of moves will be smaller and therefore the game will be easier to learn.  AlphaGo consists of several distinct components that it learned during it's training cycle:

- A model to determine who is most likely to win based on the current state of the board
- A model to predict what move an advanced player is likely to make
- A novel "policy" algorithm that combined these two to determine the best next move to make

For our purposes, we simplified the approach and only generated the first first model, which takes in the current board and predicts the likely winner.  To build this model, we did the following:

- Programmed the mechanics of the game
- Randomly played many games where two computer players picked random moves and end the game when one of them won
- Recorded the state of the board after every move and, for each move, noted who eventually won the game (or whether there was a tie)
- Used the positions of the boards across all games as training features and used who eventually won as the target for each board position.  With this training data, build a model

Once we had a model to predict who is most likely to win based on the state of the board, we used it to generate a policy to determine the best move:

- Consider all possible moves
- For each move, calculate the probability of winning after you make the move
- Pick the move that leads to a board with the highest probability of winning

Using this somewhat simple, greedy approach, we generated many games where our generation-1 model played against itself.  To increase the diversity of board positions seen, we actually used a somewhat less greedy policy, where we picked the move proportional to the probability of winning it generated (but still allowing our AI to pick sub-optimal moves with some non-zero probability).  This generated additional training data that we mixed with our original random data and used to train a generation-2 model.  One could repeat this process until one achieves a model of sufficient proficiency.

To actually train a model that takes a board position and returns a win probability, we used somewhat-deep neural networks built with Tensorflow.  We experimented with many architectures, but ended up favoring one that leveraged both convolutional layers and standard fully-connected layers.  The logic behind using convolutional layers is to be able to look at small sub-sections of the board and look for specific patterns or possible moves that may lead to future success.  For example, if a 4x1 convolution sees 3 pieces of the current player in a row and an empty slot, it would be able to conclude with almost certainty that the current player will win (as it has a winning-move at hand).  Doing this as a convolution means that the network doesn't have to look at every possible combination of 4 consecutive spaces, but instead can create a single filter and apply it across the board.

The overall architecture included numerous convolution filters of this type (with different sizes and depths) as well as numerous fully connected layers.  These layers were eventually connected via a fully-connected layer and fed into a SoftMax to determine the probability of win, lose, or draw.




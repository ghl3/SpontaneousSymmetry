---
author: ghl3
comments: true
date: 2013-01-17 14:59:19+00:00
layout: post
slug: python-threads
title: Python Threads
wordpress_id: 445
---

Threading can be an extremely useful feature in computer programs.  Running multiple threads from within a program (process) can allow the program to run multiple computations nearly simultaneously (or exactly simultaneously on multiple core machines).

In python, however, the usefulness of threading can be limited.  The most popular implementation of the python language, CPython, is built with a Global Interpreter Lock, or GIL for short.  The GIL is an implementation detail that prevents two threads in a python process from executing simultaneously.  This unfortunate feature dramatically limits the effectiveness of using the built in threading library in python.  It means that python’s native threading isn’t suitable for running complex computational tasks in parallel: each thread will take turns waiting for other threads before continuing with computation.  (Python has a multiprocessing library that attempts to make up for this limitation by launching code in separate processes, as opposed to separate threads).

However, threading in python can still be beneficial.  Code that is Input/Output limited (as compared to CPU limited) can still be sped up when it is run in multiple threads.  One gains from the parallelism because threads can be processed while others are waiting for I/O (threads release the GIL when they would normally be blocking while waiting for I/O).  A good example of when threading can be advantageous is parallel downloads of multiple files.  For a really details look at how python deals with threads, see David Beazley's [slides]( http://www.dabeaz.com/python/GIL.pdf).

So, while threading isn’t perfect in python, there are a number of libraries and modules that make writing threaded programs pretty nice.  However, there are also a number of pitfalls that one should avoid.  Mostly so that I can remind myself how to write threaded programs, I’ve included an example of a working threaded script.  My goals for this program were as follows:

- Begin with a list of items to be processed



	
  * Process these items in parallel using multiple threads

	
  * I didn’t want to assign which thread processed which item, but rather I wanted it to be done based on when threads are done processing and ready for more data

	
  * Finally, I need to merge the outputs of each thread into a single list

	
  * I wanted to be able to handle errors and exceptions in as graceful of a way as I could manage

	
  * I wanted to avoid the dreaded “ctrl-C doesn’t work” that often accompanies threading in python.


Here’s what I learned in developing this code:

A great way to organize both multiple thread input and output is using a “[queue](http://docs.python.org/2/library/queue.html)”.  These are containers that are specially designed to be thread safe and come in a few varieties.  Multiple threads can read from them or write to them without worrying about runtime conditions leading to errors (of course, the order in which items are inserted or removed from the queue is undefined).  The type I chose to use was a “First In, First Out” (FIFO) queue, which is the Queue.Queue class.  One can “join” a queue, which means the main thread will wait at the join statement until the queue is empty.  For my purposes, I found this to be a bad way to use queues and that there are better ways to wait for queue’s to be emptied (see later discussion for details).



The easiest way to implement multiple threads is by subclassing (inheriting from) the [threading.Thread class](http://docs.python.org/2/library/threading.html#threading.Thread).  One needs implement the ‘run’ method of these classes to determine what the thread actually does.  The thread stops when the run method returns or throws an exception, so often one builds a loop in the run method.  One should be very careful about dealing with errors in the run methods so that shared resources can be properly handled if an exception is thrown.  Otherwise, one may end up in a “stuck” state where the main thread is waiting for a thread to complete a task that it never will (this is one reason why I don’t like joining on a queue: if the thread dies ungracefully, the queue may never be emptied and the main thread will block forever).

One could merge the outputs of all threads using a queue, similar to how the inputs are managed.  However, I found it was just as easy for each thread to store an internal list of output and then to loop over all threads and to merge their internal lists after all threads are done processing.  All this required was adding a member list to each thread and maintaining a list of all launched threads.

One minor difficulty was figuring out how to stop threads.  Threads don’t come with a “stop” method.  The philosophy is that threads shouldn’t be killed from the outside, but rather they should only be “asked” to stop and they should be allowed to clean themselves up before being killed.  So, the usual way to stop a thread is for the thread to periodically check some sort of resource during the event loop.  The resource can be set to a state which signals to the thread that it should terminate execution, and the thread should periodically check this resource from its run loop.  This resource could be a member of the thread itself or it could be a global variable that many threads have references to.

Finally, an issue that one encounters when using python’s threading library is having a program hang and having “ctrl-c” not kill the program.  When one executes a “ctrl-c”, it sends a signal to python’s main thread which normally triggers the throwing of a KeyboardInterrupt exception.  However, if the main thread is being blocked, for example by being in a join, it may never be able to throw the exception and exit the program.  This is why I prefer not to join on queues.  Instead, I prefer to use a while loop along with a short timeout to periodically check if a queue is empty.  This gives the main thread a change to receive any signals and exit on an exception.  However, one should also be sure to stop any running threads upon receiving such an exception to the entirety of the running process can exit gracefully.

The code itself can be found at the following gist on github: [https://gist.github.com/4556336](https://gist.github.com/4556336)

[gist id=4556336]

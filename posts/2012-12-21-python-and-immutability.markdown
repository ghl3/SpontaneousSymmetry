---
author: ghl3
comments: true
date: 2012-12-21 20:38:27+00:00
layout: post
slug: python-and-immutability
title: Python and Immutability
wordpress_id: 438
categories:
- Programming
- Technology
---

When I first starting learning Python, one of the first non-trivial ideas that I came across was the concept of immutability. I quickly became confused about the following issue, and I thought the resolution had to do with the concept of immutability. Here is a somewhat counter-intuitive snippet that every python programmer should be aware of:

def add_one(num):
num = num + 1

a = 5
add_one(a)
print a
>>> 5

The question is: why didn’t the function add 1 to the number ‘a’? We naively would have expected the print to have resulted in ‘6’. But, it seems that ‘a’ has not been changed. A person who programs in a language like C would simply say, “Well, clearly ‘a’ has been passed by value. Therefore, a local copy of ‘a’ was made within the function, and THAT is what was incremented, not the original ‘a’ itself”. In C and C++, one has the option to pass objects to functions either by value or by reference (I’m being general and sweeping the whole pointer issue under the rug).

But, that’s not really what’s happening here. ‘a’ isn’t being passed by value. We can clearly see this by modifying the function a bit:

def add_one(num):
print “In the function: “, id(num)
num = num + 1

a = 5
print “Before the function: “, id(a)
add_one(a)
print “After the function: “, id(a)
print a

>>> Before the function: 4298188648
>>> In the function: 4298188648
>>> After the function: 4298188648
>>> 5

As one can see, the id of the variable ‘a’ is constant both outside and within the function. So, python isn’t copying ‘a’ when it is passed to the function. This is good, because unnecessarily copying large objects should certainty be avoided. But, our first example indicates that it isn’t (exactly) passing it by reference, either. So, what is happening?

I have seen this issue resolved by invoking the concepts of mutability or immutability. In python, an immutable type is one that can’t be changed once it has been created. All other objects are mutable. Some people confuse this issue with the one that we’re facing with our increment operator. For example, see the explanation here:

[http://forums.udacity.com/cs101/questions/1012/python-and-pass-by-reference](http://forums.udacity.com/cs101/questions/1012/python-and-pass-by-reference)



_"You've got to watch it. It's not consistent. Literals are pass-by-value, as in Manmeet's example. I this case, the inc(n) does nothing to the value of n. However, other things are all pass by reference -- pretty much any class you write will have its objects passed around by reference. In Python, things which are immutable types are passed by value, and things which are mutable are passed by reference. So lists, while a built-in-type are pass-by-reference because they are a mutable type."_

Or here:
[http://bogdan.org.ua/2008/02/11/python-passing-by-value-vs-passing-by-reference.html](http://bogdan.org.ua/2008/02/11/python-passing-by-value-vs-passing-by-reference.html)
_"It is important to understand mutable and immutable objects. Some objects, like strings, tuples, and numbers, are immutable. Altering them inside a function/method will create a new instance and the original instance outside the function/method is not changed. Other objects, like lists and dictionaries are mutable, which means you can change the object in-place. Therefore, altering an object inside a function/method will also change the original object outside._
_ Immutable variables – such as integers [strings, numerics and tuples are immutables] – are passed by value. That is, if your function accepts some integer argument, you are safe assuming that your function won’t be able to modify your integer. Mutable variables – such as dictionaries and lists – are passed by reference, and so if your function accepts mutable argument, it may modify the contents of that mutable variable outside the scope of the function."_

These explanations are both confusing, confused, and simply wrong. But they were what I encountered when first trying to understand python. I became thrown off by the concept of mutability vs immutability and I thought that I had to be aware of it whenever passing things to functions, thinking that it would effect how functions worked. But, it’s easy to show that this is wrong. We can do the same experiment with a type that we know is mutable, namely a list:

def add_one(container):
container = container + [1]

a = [5]
add_one(a)
print a
>>> [5]

We see identical behavior for both mutable and immutable objects. The behavior we’re seeing can’t only be explained by immutabilty vs mutability (some details will, as we’ll talk about later, but they will turn out to be syntactic differences and not at the heart of the issue).

So, what does python do when passing an object to a function? It’s not pass-by-reference, and it’s not pass-by-value, and it’s not a hybrid depending on mutability. Really, python does something pretty simple and easy to understand when one has the right picture in one’s head. I’m not going to try force a label on the system, that seems to make it more confusing. Rather, I’ll simply draw what happens.

Some people say “everything in python is an object”. That’s not true, really. Most things are references to objects, or pointers to objects, or labels for objects, or variables representing objects or however you’d like to describe it. But, whatever you call it, the picture that one should have in their head is the following:

Label                                Object
--------                             ----------
A ---------------------> Object Float: 5
B ---------------------> Object List: [ 3, 4, 5]
C ---------------------------^

This is the result of the following snippet:

A = 5
B = [3, 4, 5]
C = B

When one declares a variable, two things are happening. Let’s look at the statement “B = [3, 4, 5]”. This says two things. 1) Go into python’s memory and create a list that contains 3, 4, and 5. 2) Create a variable (or label) called “B” and have it point to that object. The statement “C=B” doesn’t actually create anything in memory, it says, “Create a variable called C and have it point to whatever B points to”. Notice that C doesn’t point to B, it points to the object that B is pointing to. Variables can never point to one another, they only point to objects in memory.

Now, imagine that I do the following:
B = {“fish”: 7, “dog”: 8}
What does my picture look like now?

Label                                   Object
--------                                ----------
A ---------------------> Object Float: 5
Object List: [ 3, 4, 5]
C ---------------------------^
B ----------------------> Object Dict: {“fish”: 7, “dog”: 8}

In our magical python table, we told the variable (or label) to point to a new dictionary that we created. It’s clear from this picture that “C” is still pointing to the list that B was previously pointing to. This all makes sense if one reinterprets the “=” operator. In python, “=” is the assignment operator. It takes a label on the left and makes that lable point to an object on the right. One can’t assign an object to another object, objects live on the right side of our two-column list. One can only assign labels to objects. That’s why you can’t do:
>>> [3, 4, 5] = [3, 4, 5, 6]
But you can do:
>>> a = [3, 4, 5]
>>> a = [3, 4, 5, 6]

In python, calculations take place on the right side of expressions, and then the result is assigned to a variable on the left hand. If you think about this, the whole “lvalue” and “rvalue” issue becomes much simpler (that’s a whole other bag of worms that is also simpler than it is commonly made out to be).

Okay, with all this in mind, let’s go back to our original issue:

def add_one(num):
num = num + 1
a = 5
add_one(a)
print a
>>> 5

What happens in the function? When we do “add_one(a)”, python creates a new variable and has it point to the object that ‘a’ is pointing to. Let’s call that variable “num”, since that’s the variable that appears in the signature of the “add_one” function. So, at the beginning of the function, our table looks like this:

Label                            Object
--------                         ----------
a ---------------------> Object Float: 5
num ------------------------^

Simple. It isn’t really pass-by-reference, or pass-by-value. It’s really create-new-local-variable-that-points-to-the-same-object-in-memory. I guess that’s not quite as catchy. This is almost exactly the same as “pass-by-reference” but with the caveat that the equal operator can’t change objects, but instead it reassigns variables. So, when we do “num = num + 1”, we are really creating a new float object whose value is equal to the value of the float object that num points to plus one, and then we are assigning num to that object. Therefore, our table after this step looks like this

Label                               Object
--------                            ----------
a ----------------------> Object Float: 5
num ------------------> Object Float: 6

This is just a direct result of the fact that one can’t change the contents of an object using the assignment operator “=”. That only changes what variables point to. The object remains constant. One can only change the contents of objects using certain methods of that object. This is where the difference between immutable and mutability becomes clear: mutable objects have methods that can modify the object (meaning, it can change the underlying memory layout of the object) and immutable objects don’t. It has nothing to do with how objects are passed to functions, rather it involves the limitations of that objects ability to change itself.

In other words, a float in python is immutable because it doesn’t have a “set_val” method, or an “increment” method, or something like that. One could imagine a version of python where the following was possible:

a = 5
a.set_val(6)
print a
>>> 6
# NOT REAL !!!
a.increment()
print a
>>> 7

If this were the case, then one could do the following:

def add_one(num):
# NOT REAL !!!
num.increment()
a = 5
add_one(a)
print a
>>> 6

The difference is that the function is (hypothetically) using a method that changes the underlying object. This would make our table look like this

Before the increment:

Label                             Object
--------                          ----------
a ---------------------> Object Float: 5
num ------------------------^

After the increment:

Label                              Object
--------                           ----------
a ---------------------> Object Float: 6
num ------------------------^

See the difference? We didn’t use the assignment operator (or the re-assignment operator), so num remains assigned to the same object that a is assigned to. However, we went to the object itself, using a method, and asked it to change itself.

Of course, floats can’t really do this. But mutable objects can, such as lists. So, we CAN actually do the following:

def add_one(container):
container.append(1)
a = [5]
add_one(a)
print a
>>> [5, 1]

Before appending:

Label                              Object
--------                           ----------
a ---------------------> Object List: [5]
num ------------------------^

After appending:

Label                               Object
--------                            ----------
a ---------------------> Object List: [5, 1]
num ------------------------^

So, using a list’s “append” function can change the contents of the list. This has nothing to do with which variables are assigned to what objects, so both “a” and “num” get assigned to the same list. That list simply gets modified.

Appendix A:
One question that one may ask is “why are floats immutable”? Why don’t they have the hypothetical “set_val” or “increment” methods that I described? The answer is that all floats are objects and that assignments to a float (usually) make variables point to the same object:

a = 5
b = 5
print id(a), id(b)
>>> 4298188616 4298188616

Here, a and b point to the same underlying object in memory (this didn’t have to be the case, but it’s an optimization that makes python faster). Contrast this with how lists work:

a = [5]
b = [5]
>>> 4299804472 4299837520

The general python rule-of-thumb says that declaring objects will create new objects in memory, and we can see that this happens to lists. We want this, otherwise we wouldn’t be able to append to list a without effecting list b. We shouldn’t have to think, when declaring a list, if that list happens to be identical to another list and if that will change the behavior of our program. That would be a nightmare.

But, because floats can’t be changed, then it turns out that it makes no difference if all floats of the same value are represented by the same object. The same thing happens with strings. Notice that strings too are immutable (one can of course do operations on strings, but this always returns a new string, not a modified version of the original string). This is for speed as well, as declaring new objects can be slow.

Appendix B:
There ARE a few issues with python that make it somewhat complicated and that I haven’t addressed above. Two examples are the concepts of “global” variables and the concept of function “closures”. The issue with “globals” revolves around what happens when one assigns a variable in a function with the same name as one defined in the global scope. Is the global variable reassigned, or is a local variable created and assigned? This issue comes from the fact that there is no “var” keyword in python that determines when a variable is declared or when an existing variable is reassigned. This keyword wasn’t used for cleanliness, but I personally think the language would be more clear with such a variable (the presence of a “global” keyword is pretty ugly in my opinion).

Function closures describe a similar issue, but they’re a bit more complicated and can be more surprising. The issue describes the instances where one uses a non-local variable within the definition of a function. The ambiguity is what scope that function uses when it is called. Perhaps I’ll have more on this later...

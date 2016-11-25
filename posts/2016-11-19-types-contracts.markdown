---
author: 
date: 2016-11-19 14:45:51.172421
layout: post
slug: types-contracts
title: Types, Contracts, and Schemas
id: 446
---


The debate between statically typed vs dynamically typed programming languages is nearly as old as programming itself, but more modern techniques and technologies have dramatically shifted the underpinnings of these discussions.  New languages and tools have blurred the once-solid lines between these two camps.  While it's not clear that his has made the debate less fierce, it has certainly benefited the programmer, who now has many sophisticated ways to help ensure program correctness.


Traditionally, a language being statically typed implies:

- The language is compiled in a step that happens before execution, which converts all available source code into a runnable form (either machine code or byte code)
- The language's source code contains type information on every variable and function declaration
- This type information is used to ensure that functions and operators are only called with types that they are designed to receive
- The compiler ensures this type correctness by doing static analysis on the source code (and leveraging the type declarations)

While these properties define 

While the quintessential statically typed language satisfies all of these properties, the can each be implemented a la carte, allowing a new language to pick and choose how strongly it will enforce type safety or what tradeoffs it will make in that effort.  Let's look at some examples of this:


#### Compilation with Clojure

Clojure is a great example of a language that demonstrates the false dichotomy between statically typed and dynamically typed languages.  Clojure is a strongly-typed dynamic language.  The fact that Clojure is based on the JVM and has great interoperability with Java seems at odds with it's status as a dynamic language.  But the JVM offers a number of features that make it suitable for building dynamic languages, including the ability to compile and load classes at runtime, good support for reflection, and lack of strict type checking at the Virtual Machine level (which allows Clojure to cast to and from Object under the hood)<sup>1</sup>.

Clojure is evidence against a common misconception that only statically typed languages are compiled.  When a Clojure program is run, it's source code is compiled by generating Java classes and then compiling those classes into JVM byte-code (see <a href="http://blog.ndk.io/clojure-compilation.html">here</a> for a good discussion).  Clojure code can be compiled ahead-of-time (before executing the program) or when a new Clojure file is loaded.  During this phase, numerous validation checks are preformed to avoid certain classes of errors even before the dynamic code is executed.  So, in this sense, Clojure is both compiled and dynamic.


#### Python's Type Hints

A new feature of Python3 is the ability to write <a href="https://www.python.org/dev/peps/pep-0484/">optional type hints</a> when declaring functions.  These allow a programmer to declare the expected types that a function should take.  One of the most difficult parts of writing a dynamic language is remembering what types are valid inputs to a function.  Python, for example, supports "duck typing", which means that you are free to send any object to a function as an argument and it may-or-may-not work.  If it works, it means that the object has all the necessary variables or methods that the function uses.  But sending actual data into a function and seeing if it results in an error or not is a pretty indirect way of determining what a programmer should reasonably use as a function argument.  Python's type hints are a way to document the intention of how a function should be called.  For now, they don't have any effect on Python's runtime (though, they one can query these type descriptions, allowing programs to be written that do take advantage of these types).  And while doctags already exist as a way to document a function, these new type hints are more integrated with the function's declaration itself, making them easier to read and more likely to be kept up-to-date.


#### Clojure Schemas and Specs

Clojure, like Python, is a dynamic language which can make it difficult to understand or remember the data types that a function takes or emits.  To address this, the Clojure ecosystem has a number of solutions.  The most widely used of these is <a href="https://github.com/plumatic/schema">Plumatic Schema</a>, which was built <a href="https://github.com/prismatic">Prismatic</a>.  Similar to Python's new type hints, it allows programmers to decorate function definitions to show what types are allowed to be passed to a function and what type it returns.  However, Schema goes further and provides the ability to actually check that these type decorations are respected at run time.  When turned on, Schema will check the inputs and outputs to Clojure function calls and will throw an error if an invalid type is passed to the function or returned by the function. Common practice is to turn this on during testing, but it can be used in production as well.

Schema provides a way to enforce type correctness without using static analysis.  Because Schema's checks are only done at runtime, they can only catch type errors when the program is run (as opposed to methods based on static analysis, which can catch errors before programs are executed).  However, Schema's runtime checks also means that they can be much more powerful.  Plumatic Schemas can enforce a much richer constraints on data than typical type signatures.  A Schema constraint is a general predicate that can be any function of the input data and is therefor more general than simple type checks.  For example, instead of merely enforcing that an argument be a string, a Schema can check one or more regular expressions on that string to ensure that it's in a proper form.

Further, Schema supports "coercion", meaning that if a type doesn't match a schema, it can be transformed in a way to make it fit.  For example, a schema may require an upper-case String.  Normally, passing it a string with lower-case characters would cause this check to fail.  However, one can supplement the schema with logic that converts all strings to upper case before checking the schema.  This is a great way to be both lenient with the data that a function but strict with the data that the function processes.


#### Static Analysis and Linting

Most statically typed languages apply static analysis that does type checking during compilation.  But there is no real reason that type checks and compilation need to happen concurrently (other than the fact that it means the source code must be parsed only once for both steps).  There are, in fact, a number of static analysis programs for a number of languages that run as a stand-alone step.  An example is <a href="https://www.synopsys.com/software-integrity/products/static-code-analysis.html">Coverity</a>, which performs static analysis on C++ code, looking for bugs, memory issues, and other potential pitfalls.  These checks parse the source code directly (without running it) and apply a number of useful heuristics to find problems and suggest improvements, often going beyond a language's normal compilation checks.

Similarly, many dynamic languages offer these static checks, often called linting.  For python, a good example is <a href="https://pypi.python.org/pypi/pyflakes">PyFlakes</a> as well as <a href="https://pypi.python.org/pypi/flake8">flake8</a>, which adds style checking on top of PyFlake's linting.  Adding these tools to a Python development workflow is extremely valuable, as it can catch a large number of bugs which may take a long time to appear or diagnose in a running program.

<br>

These examples and many other demonstrate that the line between a statically typed language and a dynamically typed language is often a false one.  It is better to think of each language as having a set of tools and an ecosystem which allows for different types of correctness checks.  Each language or set of tools offers a unique balance of tradeoffs, and these should be considered as a whole when talking about the pros and cons of different language choices.


<br>
<br>
<sup>1</sup><i>Java's types are actually checked in two places: during compile time (when source code is converted into byte code) and during byte-code load time, where a system called the <a href="http://docs.oracle.com/javase/specs/jvms/se7/html/jvms-4.html#jvms-4.10">JVM Verifier</a> does static analysis on JVM byte code to ensure that it won't lead to invalid type usage (see <a href="http://www.informit.com/articles/article.aspx?p=1187967&seqNum=2">here</a> for more discussion).</i>
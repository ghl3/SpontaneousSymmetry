---
author: ghl3
comments: true
date: 2012-08-31 13:30:47+00:00
layout: post
slug: site-makeover
title: Site Makeover
wordpress_id: 425
---

Hi all,

After a (more than) brief hiatus, I've spend the last week or so giving my site a bit of a makeover.  I've changed the style of the site a bit, and I'm continuing to tweak it.  But, I've also made some significant changes to how the site is built "under the hood."

I first constructed my site as a learning process.  I was teaching myself html, and I thought the best way to learn was to get my hands dirty and put together a few web pages.  So, starting from scratch.  I fired up my text editor of choice, wrote a few lines of dead simple code, and opened my local .html file using chrome (or probably firefox at the time).  It was an amazing realization to be that websites were nothing more than text files that were rendered by a browser, and that the entire process could happen on a laptop that wasn't even connected to the internet.

Writing a few pages by hand, I quickly realized that it isn't enough to simply learn html.  It's an extremely limiting language, essentially because it's completely static.  There are no variables, no loops, and one can't even insert html code from other files.  These days, html isn't how you write a site, it's more like the output of writing a site, akin to how assembly is the output of writing a C code.  To really make a site, one has to learn css (which is also static and merely reduces the amount of html that one has to write) as well as some more dynamic web languages.  These include javascript for rendering on the client side (meaning, within your user's laptop) and, initially, it meant that I had to learn php to make the process of writing html simpler and more dynamic.

So, out of that, the initial form of my site grew as a series of directories, each containing a .php file that was rendered into html and including other central .php files that rendered objects that were common across my site, such as headers, footers, etc.  This is a common and somewhat powerful paradigm, in particular because of its simplicity.  For example, Wordpress, the software that I use for blogging, is written almost entirely in php on the server side, and it makes it portable and quite robust.

However, I quickly found that maintaining such a site became somewhat tedious.  I put together a decent framework whereby I didn't have to repeat code and each page only defined the content that it needed.  But I always felt that there had to be a better way.

Thanks to the recommendation of a colleague [Dan Foreman-Mackey](http://danfm.ca), I came across a website framework known as [Flask](http://flask.pocoo.org/), which allows one to write the server side dynamic aspects of a site in python.  Flask essentially merges a really nice html template engine, known as [Jinja](http://jinja.pocoo.org/), with some native python server tools, [werkzeug](http://werkzeug.pocoo.org/) in particular.  But Flask had me at "python," which is quickly becoming my favorite language, mostly for its simplicity and elegance.  Flask makes writing a multi-page website much easier, and because it uses python, it easily interfaces with the modules that I'm used to writing or using.

So, the site in its current form is written using Flask, as well as some fast-cgi and Apache magic when in production.  And the blogging part is still Wordpress, which I quite like.  And the source is, of course, hosted on [GitHub](https://github.com/ghl3/SpontaneousSymmetry).  I'm continuing to work to make the site more stable and faster, but the newer technology makes developing and maintaining the site much easier, or at least more fun.

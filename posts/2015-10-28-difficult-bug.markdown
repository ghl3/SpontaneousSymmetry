---
author: 
date: 2015-10-28 22:28:28.157512
layout: post
slug: difficult-bug
title: Difficult Bug
id: 446
---

I wanted to talk about a difficult bug that I recently encountered and squashed at work.


It started when an external API request started throwing errors.  Working from the East Coast and being the only engineer up at the time, I decided to dig in.  I noticed that note every request to that provider was failing, but a large fraction of them were.  Digging into our logs, I saw that the API calls were returning a 401 http code (unauthorized).  Looking at some of our monitoring graphs, I saw an interesting pattern that the errors were coming from certain instances of our production app, but API calls from other instances were completing successfully.  

I looked into our git history to see if any configuration had changed, for example moving to a new API endpoint or updating any passwords, ect.  But, the code in question and its configuration had been untouched for quite some time.  So, since there were no obvious changes on our end, I reached out to the technical support of the company that owned the API in question.  Thankfully, they were quite helpful and informed me that the issue was that our requests were coming from an IP address that wasn't whitelisted with them.  This was helpful, but also quite puzzling, as we hadn't made any changes on our end that should have led to this.

For some background on a relevant component of our architecture, the web services in question run on AWS.  In order to have the various instances appear to external APIs as coming from a consistent ip address (for the purposes of ip whitelists, for example), we send our outgoing http requests through an http proxy (using Squid).  

Knowing about the ip whitelist issue, the first thing I checked was whether this API request was configured to route through our proxies.  It indeed was, and had been configured to do so for a long time.  So, there were no changes to that configuration.  But, using nslookup, I found that the ip address that our app was making calls from resolved to an ec2 instance.  So, the evidence showed that we were not sending our API requests through our proxy.  This remained quite mysterious, because the API was clearly configured and had been configured to leverage our proxies for some time.

So, I started digging in.  I opened up a local instance of our app, connected it to a debugger, made a call to the testing version of the API, and started stepping through the code.  Our app is Java based, and leveraging IntelliJ to both step through the code and even to decompile dependencies and step through them as well was invaluable.

I first walked through the part of the code that sets the configurations to better understand how that happens.  I was immediately surprised to see how something as simple as setting a configuration property worked.  The API in question uses Apache Axis under the hood, which is a service that makes SOAP requests (yes, SOAP.  This got ugly).  
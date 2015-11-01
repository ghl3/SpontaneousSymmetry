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

I first walked through the part of the code that sets the configurations to better understand how that happens.  I was immediately surprised to see how something as simple as setting a configuration property worked.  The API in question uses Apache Axis under the hood, which is a service that makes SOAP requests (yes, SOAP.  This got ugly).  The configuration in property in question, the one that set the proxy settings, in Axis is actually stored as a global variable (gulp) stored in a ThreadLocal deep in the library.  It turned out that, in our current implementation of the API call, this property is set before making every API call (with the goal of ensuring that the goal goes through the proxies).  

In my debugging session, I wanted to follow where these settings were read and where they were used in the API call.  So, I put a break point inside the function that "gets" these proxy parameters and fired off an API request.  But I never ended reaching that break point: the call was made without asking for the proxy settings.  This was indeed curious and felt like it could be related to the root cause of the issue.  My hunch at this time was that somehow the proxy settings weren't getting properly configured, and seeing that these settings weren't getting called during an API request was a good since that I was on the right track.

During the process of digging in, I ended up disconnecting my debugger, restarting the JVM, and connecting it again.  And, to my surprise, when I stepped through another API call, I ended up jumping to the breakpoint where the proxy settings were read from the global Axis settings.  This was surprising, as I didn't find these settings queries during my first pass through, and was indicative of some sort of caching taking place on these proxy settings.

With that hypothesis in hand, I stepped through the entirety of the API call.  And, after jumping through interfaces and deep function calls, I eventually stumbled upon this <a href='http://www.jexamples.com/vSrc/4610/org.apache.axis.components.net.TransportClientPropertiesFactory?prodId=axis&lineNo=85&implExtId=290840&queryText=java.util.HashMap.get&qType=clsMeth'>code snippet</a>:

<pre>
 public static TransportClientProperties create(String protocol)
    {
        TransportClientProperties tcp =
            (TransportClientProperties)cache.get(protocol);
        
        if (tcp == null) {
            tcp = (TransportClientProperties)
                AxisProperties.newInstance(TransportClientProperties.class,
                                           (Class)defaults.get(protocol));

            if (tcp != null) {
                cache.put(protocol, tcp);
            }
        }
        
        return tcp;
    }
</pre>

A TransportClientProperties is a simple object that contains the proxy settings of a TCP connection.  The protocol that this function takes can be either "http" or "https".  The important part of this snippet is the fact that the transport client properties (tcp) is cached.  This means that a given protocol will ALWAYS use the same properties, and will use the properties that were present the first time this "create" function was called.  Note that the cache itself is filly global (not even a ThreatLocal):

<pre>
    private static HashMap cache = new HashMap();
    private static HashMap defaults = new HashMap();
</pre>


So, this suggests a strong possibility for what could be happening:
- We're setting the proxy settings when we make our API call
- But internally, those settings are not getting through on each call.  Instead, it's only going to a chache.
- If the cache does NOT contain the proxy settings we want, then API calls from that JVM never will

So, the only remaining question is: why are the Properties seemingly being cached with the incorrect proxy settings?  This could happen if something else is using the Axis library and making API calls, but NOT configuring them to go through the proxy.

Grepping around our code base, I eventually found the culprit: another service that used Apache Axis which was not configured to go through our proxies.  As it turns out, there was a race condition between this service and our original API: whichever one was called first would determine what the cached properties are and therefore whether all calls for the remainder of that JVM used the proxy or not.  This explains why we saw intermittent errors in these calls and why certain instances would always have failing calls and others (even running at the same time) would succeed.


This bug felt particularly nasty to me.  It's source was a poorly-designed cache deep in a SOAP library that arose depending on which of two code paths was executed first (something that was non-deterministic and based on user behavior).  But that make it particularly satisfying to diagnose and fix.

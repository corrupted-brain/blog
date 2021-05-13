---
layout: post
title: "Blind XSS on Google Internal System "
excerpt: "Blind cross-site scripting (XSS) refers to a type of code injection where an attacker inserts XSS payload in user input fields and..."
tags: [cross site script, xss, google xss]
---

[Blind cross-site scripting](https://www.netsparker.com/web-vulnerability-scanner/vulnerabilities/blind-cross-site-scripting/) (XSS) refers to a type of code injection where an attacker inserts XSS payload in user input fields and they are going to be stored somewhere and executes in an application that is not in control of an attacker. 

I ended up finding blind XSS in one of the Google's internal system (GUTS ticketing system). I used blind XSS payload from [xsshunter](https://xsshunter.com) and filled up randomly input fields on the form from Google supplier portal. The forms from the supplier portal must be tracked from GUTS, that's what I assume and my payload gets executed.  

#### What happened ?


I get a response in my xsshunter after a very long time and at the moment I was unknown which parameter I tested for.![Google reply](/images/posts/google_reply-1.png) I tried to read the [DOM](https://www.w3schools.com/js/js_htmldom.asp) so that we may know the possible parameter. Unfortunately, XSS hunter keeps loading and the browser gets
frozen. Only Referer and Cookies are known. I passed the information that I have to the Google team and they finally managed to know the actual cause and rewards me. ![Reward message](/images/posts/google_reward_xss.png)

I requested to disclose a vulnerable endpoint as seen above but ended up with the following message.![Reply](/images/posts/google_final_reply.png) As part of Google's Vulnerability Reward Program, the panel has decided to issue a reward of $5000 for this issue as it affects the sensitive application.

#### Giveaway ?
Always take a log where we tested for XSS. We don't know when our luck hits in bug bounty.

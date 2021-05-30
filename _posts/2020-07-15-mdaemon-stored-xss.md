---
layout: post
title: "Stored Cross Site Scripting on Mdaemon Webmail (20.0.0)"
excerpt: "XSS on Mdaemon webmail affecting versions < 20.0.0"
tags: [XSS, Mdaemon]
comments: true
---

Two different cross site scripting vulnerabilities were found on version below 20.0.1 and reported to Mdaemon team. As per the resposne from their side both issues were addressed on [latest version 20.0.1 released](http://files.altn.com/MDaemon/Release/relnotes_en.html) on 18th August 2020.

#### Case One:

E-mail attachment field is vulnerable to XSS. A attachemnt with XSS payload as a file name can be uploaded to trigger execution of code. To do tha follow steps below:

1. Rename a file and set it's name as <code><img src=x onerror=alert(1)>.jpg </code>
2. Go to New mail, select recipient and the select attachment. Code gets executed as right after upload so it becomes self XSS.
 ![XSS Popup1](/images/posts/mdaemon-xss-popup.png)
3. Let's send the mail to recipient and open from his/her side. Opening just a mail doesn't executes the code but when the victim clicks on forward button, XSS pop-up is shown.  
 ![XSS Popup 2](/images/posts/mdaemon-xss-popup-2.png)
 Like this a stored self XSS can also becomes perfect XSS for victim users. 


#### Case Two:

So the next vulnerable endpoint is Distribution list. A distribution list holds name and email address of persons. We can also refer it as a address book. Following steps can be followed to execute the vulnerability.
1. Go to contact section and distribution list menu. Create a new distribution list.
2. Contact name field is vulnerabile to XSS. Use the payload <code><img src=x onerror=alert(1)></code> 
![Mdaemon XSS](/images/posts/mdaemon-xss-distribution1.png)
3. We can see execution code and after saving it, each time we visits the distribution list section the XSS pop-up is seen.
![Mdaemon XSS](/images/posts/mdaemon-xss-distribution2.png)

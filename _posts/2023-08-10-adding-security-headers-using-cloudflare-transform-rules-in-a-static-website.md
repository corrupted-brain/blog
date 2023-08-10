Adding Security Headers Using Cloudflare Transform Rules in a Static Website

In today's digital age, security is a vital aspect of any website. One way to improve website security is to add security headers to your website. Security headers are a set of HTTP response headers that inform the browser how to behave when it comes to website security. 

In this blog, we will show you how to add security headers to your static website using Cloudflare transform rules. The transform Rules allow us to manage the URI path, query string, and HTTP headers of requests and responses. By Applying the HTTP response header modification rules we will set all required security headers to get an A+ score. Let’s check our website score before configuring the rules using [https://securityheaders.com](https://securityheaders.com/). 

![website HTPP headers](/images/posts/securityheader/header1.png)

We got an ‘F’ grade in website HTTP headers. 😀 The next approach would be fixing the headers and getting ‘A+’ grade. The main complexity here is the website [https://kailashbohara.com.np/](https://kailashbohara.com.np/)  is hosted using GitHub Pages and we have no control on the server to set HTTP headers as the server-level control is not available in GitHub. The next thing is we are using Jekyll on this website, if this has been made with PHP we can set headers directly in PHP code. Okay! let's fix this issue using Cloudflare transform rules. 

First, we need to confirm that we have enabled the “orange cloud” so that traffic flows through Cloudflare and we can implement various features on it. 

![Enable orange cloud in cloudflare](/images/posts/securityheader/header2.png)

The next step is to create a list of rules in Cloudflare Transform rules. From your Cloudflare dashboard, select the target website and then go to Rules>Transform Rules>modify Response Header. Then create a new rule checking All incoming requests and set the static response header as shown below. Here, we have implemented `X-Frame-Options: SAMEORIGIN`  header for preventing clickjacking attacks. 

![X-Frame-Options header](/images/posts/securityheader/header3.png)

In a similar way, set more security headers as shown below.

![HTTP headers list](/images/posts/securityheader/header4.png)

This  adds seven security headers to our website: 

```jsx
Content-Security-Policy: base-uri 'self'; default-src *; //sets rules for resources that can be loaded on a web page
Permissions-Policy: accelerometer=(), ambient-light-sensor=(), autoplay=(), battery=(), camera=(), cross-origin-isolated=(), display-capture=(), document-domain=(), encrypted-media=(), execution-while-not-rendered=(), execution-while-out-of-viewport=(), fullscreen=(), geolocation=(), gyroscope=(), keyboard-map=(), magnetometer=(), microphone=(), midi=(), navigation-override=(), payment=(), picture-in-picture=(), publickey-credentials-get=(), screen-wake-lock=(), sync-xhr=(), usb=(), web-share=(), xr-spatial-tracking=() //provides a mechanism to allow and deny the use of browser features in a document or within any iframe
Referrer-Policy: same-origin //controls how much referrer information should be included with requests
Strict-Transport-Security: max-age=31536000; includeSubDomains //informs browsers that the site should only be accessed using HTTPS
X-Frame-Options: SAMEORIGIN //indicate a browser not to render a page in a <frame>, <iframe>, <embed> or <object> tag
X-Permitted-Cross-Domain-Policies: none //limit which data external resources, such as Adobe Flash and PDF documents, can have access on the domain
X-XSS-Protection: 1; mode=block //stops pages from loading when they detect reflected cross-site scripting (XSS) attacks

```

After setting up these headers and turning on the transform rules, let’s check our score on [https://securityheaders.com/](https://securityheaders.com/) and we got A+ grade. 

![A grade in HTTP header](/images/posts/securityheader/header5.png)

That's it! By following these simple steps, we can add security headers to our static website using Cloudflare transform rules. This will help boost the security of any website (static/dynamic) protecting it from common security threats.

**Reference:** [https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers)

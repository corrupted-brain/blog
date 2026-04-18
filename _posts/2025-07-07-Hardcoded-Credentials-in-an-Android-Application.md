---
layout: post
title:  "Hardcoded Credentials in an Android Application Leading to Unauthorized API Access and PII Exposure"
excerpt: When your API keys ship with the APK, every user is one decompile away from being an attacker..
tags: [Hard Coded Secrets, MobSF, APKTools, API Security, Android Security, Android Pentesting]
---

**Description**

During the security assessments of an Android application, the Hardcoded secrets, including the `clientID` and `clientSecret`, were discovered in the application. These secrets were hardcoded directly in the application's code, making them easily accessible to anyone who decompiles or inspects the application package (APK). With these credentials, an attacker could authenticate against the application's backend APIs and retrieve sensitive data, including customers' Personally Identifiable Information (PII).

### Impact

It allows attackers to use the hardcoded `clientID` and `clientSecret` to authenticate themselves to backend APIs, leading to unauthorised access. 

By leveraging the hardcoded credentials, an attacker can:

- Authenticate to backend APIs without any user interaction or authorization flow.
- Extract PII such as names, email addresses, phone numbers, and physical addresses.
- Enumerate and dump data across multiple API endpoints.

A breach of this nature can result in regulatory fines, legal consequences, reputational damage, loss of customer trust, and potential fraud.

**Vulnerable Endpoint**

The credentials were found in the following decompiled classes:

com/[redacted]/app/BuildConfig.java
com/[redacted]/app/StidClientModule.java

**Steps to Reproduce**

1. Decompile the APK (e.g., using jadx or apktool). In this case, we used the MobSF tool.
2. Open the BuildConfig.java file. Multiple sensitive keys, tokens, and credentials are hardcoded in plaintext.

![image0.png](/images/posts/Android Hardcoded Secrets/hardcoded-secrets-0.png)

3. As we can see, multiple sensitive keys, tokens and credentials are hardcoded in a file. Then we followed the API call documentation, as shown below.

![image.png](/images/posts/Android Hardcoded Secrets/hardcoded-secrets-1.png)

4. Using the API documentation, construct a Basic Authorization header from the extracted clientID and clientSecret.

![image.png](/images/posts/Android Hardcoded Secrets/hardcoded-secrets-2.png)

5. Exchange the Basic Auth token for an access_token via the token endpoint.

![image.png](/images/posts/Android Hardcoded Secrets/hardcoded-secrets-3.png)

6. Using the access token, we fetched the existing sites for this particular client. 

![image.png](/images/posts/Android Hardcoded Secrets/hardcoded-secrets-4.png)

7. Then we made a GET request to fetch the Virtual card to the URL  `https://servername/api/GetVirtualCardListV2/?siteId=XXXX`. As the request was successful, we received thousands of records in the response, which contain PII such as email addresses, phone numbers, and other information.  

![image.png](/images/posts/Android Hardcoded Secrets/hardcoded-secrets-5.png)

**Lesson Learned**

- Never hardcode secrets in client-side code.
- Implement proper OAuth 2.0 flows where tokens are issued server-side and scoped appropriately.
- Apply rate limiting and anomaly detection on API endpoints to detect bulk data extraction.
- Conduct regular static analysis scans on mobile builds to catch hardcoded secrets before release.

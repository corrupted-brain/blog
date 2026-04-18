---
layout: post
title: "Hardcoded Credentials in an Android Application Leading to Unauthorized API Access and PII Exposure"
excerpt: "When your API keys ship with the APK, every user is one decompile away from being an attacker."
tags: [Hard Coded Secrets, MobSF, APKTools, API Security, Android Security, Android Pentesting]
---

## Description

During a security assessment of an Android application, hardcoded secrets — including the `clientID` and `clientSecret` — were discovered embedded directly in the application's source code. These credentials were trivially accessible to anyone who decompiles or inspects the APK. With these credentials, an attacker could authenticate against the application's backend APIs and retrieve sensitive data, including customers' Personally Identifiable Information (PII).

## Impact

By leveraging the hardcoded credentials, an attacker can:

- Authenticate to backend APIs without any user interaction or authorization flow.
- Extract PII such as names, email addresses, phone numbers, and physical addresses.
- Enumerate and dump data across multiple API endpoints.

A breach of this nature can result in regulatory fines, legal consequences, reputational damage, loss of customer trust, and potential fraud.

## Vulnerable Endpoints

The credentials were found in the following decompiled classes:

- `com/[redacted]/app/BuildConfig.java`
- `com/[redacted]/app/StidClientModule.java`

## Steps to Reproduce

1. Decompile the APK (e.g., using `jadx` or `apktool`). In this case, we used MobSF.

2. Open the `BuildConfig.java` file. Multiple sensitive keys, tokens, and credentials are hardcoded in plaintext.
   ![Hardcoded secrets in BuildConfig.java](/images/posts/Android-Hardcoded-Secrets/hardcoded-secrets-0.png)

3. Following the API documentation, we identified the authentication flow for the backend services.
   ![API documentation](/images/posts/Android-Hardcoded-Secrets/hardcoded-secrets-1.png)

4. Construct a Basic Authorization header from the extracted `clientID` and `clientSecret`.
   ![Basic Auth token generation](/images/posts/Android-Hardcoded-Secrets/hardcoded-secrets-2.png)

5. Exchange the Basic Auth token for an `access_token` via the token endpoint.
   ![Access token response](/images/posts/Android-Hardcoded-Secrets/hardcoded-secrets-3.png)

6. Using the access token, fetch the existing sites for this particular client.
   ![Sites enumeration](/images/posts/Android-Hardcoded-Secrets/hardcoded-secrets-4.png)

7. Make a GET request to `https://[redacted]/api/GetVirtualCardListV2/?siteId=[redacted]`. The response returned thousands of records containing PII (email addresses, phone numbers, and other personal data).
   ![PII data exposure](/images/posts/Android-Hardcoded-Secrets/hardcoded-secrets-5.png)

## Lessons Learned

- Never hardcode secrets in client-side code.
- Implement proper OAuth 2.0 flows where tokens are issued server-side and scoped appropriately.
- Apply rate limiting and anomaly detection on API endpoints to detect bulk data extraction.
- Conduct regular static analysis scans on mobile builds to catch hardcoded secrets before release.

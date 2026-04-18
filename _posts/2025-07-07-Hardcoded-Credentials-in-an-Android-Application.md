# Hardcoded Credentials in an Android Application Leading to Unauthorized API Access and PII Exposure

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

![image.png](Hardcoded%20Credentials%20in%20an%20Android%20Application%20Le/image.png)

1. As we can see, multiple sensitive keys, tokens and credentials are hardcoded in a file. Then we followed the documentation for the API calls as shown below.

![image.png](Hardcoded%20Credentials%20in%20an%20Android%20Application%20Le/image%201.png)

1. Using the API documentation, construct a Basic Authorization header from the extracted clientID and clientSecret.

![image.png](Hardcoded%20Credentials%20in%20an%20Android%20Application%20Le/image%202.png)

1. Exchange the Basic Auth token for an access_token via the token endpoint.

![image.png](Hardcoded%20Credentials%20in%20an%20Android%20Application%20Le/image%203.png)

1. Using the access token, we fetched the sites for this particular client. 

![image.png](Hardcoded%20Credentials%20in%20an%20Android%20Application%20Le/image%204.png)

1. Then we made a GET request to fetch the Virtual card to the URL  https://servername/api/GetVirtualCardListV2/?siteId=XXXX. As the request was a success, we got thousands of records in the response, which contain PII details such as email addresses, phone numbers, and other information.  

![image.png](Hardcoded%20Credentials%20in%20an%20Android%20Application%20Le/image%205.png)

**Lesson Learned**

Never hardcode secrets in client-side code.
Implement proper OAuth 2.0 flows where tokens are issued server-side and scoped appropriately.
Apply rate limiting and anomaly detection on API endpoints to detect bulk data extraction.
Conduct regular static analysis scans on mobile builds to catch hardcoded secrets before release.
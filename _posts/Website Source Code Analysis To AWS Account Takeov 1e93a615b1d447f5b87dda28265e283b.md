# Website Source Code Analysis To AWS Account Takeover

We are going to discuss a vulnerability that I found by checking the source code of a website, which escalated to gaining access to the AWS account of an organization.

During the security assessment of an organization, I began by browsing their corporate website to understand their business purpose and the solutions they provide. Since the corporate website only had static information and nothing more, I started scanning for subdomains using the [subfinder tool](https://github.com/projectdiscovery/subfinder).

![Screenshot 2024-04-30 at 23.25.15.png](Website%20Source%20Code%20Analysis%20To%20AWS%20Account%20Takeov%201e93a615b1d447f5b87dda28265e283b/Screenshot_2024-04-30_at_23.25.15.png)

I found only three subdomains using Subfinder and didn't bother to look for more because I was convinced with the result. Instead, I started looking into the admin subdomain, [admin.target.com](http://admin.target.com/).

To my surprise, when I visited [admin.target.com](http://admin.target.com/), I got a pop-up message from the Trufflehog browser extension.

![Screenshot 2024-04-30 at 23.34.19.png](Website%20Source%20Code%20Analysis%20To%20AWS%20Account%20Takeov%201e93a615b1d447f5b87dda28265e283b/Screenshot_2024-04-30_at_23.34.19.png)

If you don’t know about TruffleHog

> TruffleHog is a browser extension that helps find and detect API keys, credentials, and other sensitive information that may be accidentally exposed in JavaScript code on websites
> 

The Trufflehog pop-up gave me hope that the AWS Access key and AWS Secret key might exist. To confirm this, I browsed the mentioned JS file, i.e., [https://admin.example.com/main.js](https://admin.example.com/main.js), and searched for the keys. I also used the JavaScript beautifier tool to make the chunked JS code look organized, and the result looked like this:

![Screenshot 2024-05-01 at 00.27.22.png](Website%20Source%20Code%20Analysis%20To%20AWS%20Account%20Takeov%201e93a615b1d447f5b87dda28265e283b/Screenshot_2024-05-01_at_00.27.22.png)

In the image above, we found the AWS Access Key, Secret Key, Bucket and the upload path as well. Access and secret keys are very sensitive information. 

> In AWS Identity and Access Management (IAM), **Access Key** and **Secret Key** are credentials used to authenticate and authorize interactions with Amazon Web Services (AWS) APIs and services. Using these keys one can make requests to various AWS services.
> 

Now using the AWS CLI, we can configure the found keys and can request AWS. AWS CLI is a utility tool which allows users to manage AWS services directly from the command line. To do so, we need to [install AWS CLI first](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html). After the installation of AWS CLI, I configured it using the following command. 

```bash
aws configure
```

After this, I had to input the found access key and the secret key. Once I provided the required information, I attempted to list the available buckets in that particular AWS account using the following command:

```bash
aws s3 ls
```

Damn! Both the keys were valid and all the S3 buckets were listed as shown. 

![Screenshot 2024-05-01 at 00.49.57.png](Website%20Source%20Code%20Analysis%20To%20AWS%20Account%20Takeov%201e93a615b1d447f5b87dda28265e283b/Screenshot_2024-05-01_at_00.49.57.png)

I have masked the bucket names as they have misconfiguration in them and holds sensitive data. Checking the caller identity using the command It was found that the IAM user was specific for the S3 bucket.

```jsx
aws sts get-caller-identity
```

![Screenshot 2024-05-01 at 00.54.33.png](Website%20Source%20Code%20Analysis%20To%20AWS%20Account%20Takeov%201e93a615b1d447f5b87dda28265e283b/Screenshot_2024-05-01_at_00.54.33.png)

Then, I attempted to directly visit the S3 bucket URL, as there might be cases of object listing enabled in public buckets due to poorly configured bucket ACLs. The result was alarming: multiple documents and SQL backup files were there.

![Screenshot 2024-05-01 at 00.58.51.png](Website%20Source%20Code%20Analysis%20To%20AWS%20Account%20Takeov%201e93a615b1d447f5b87dda28265e283b/Screenshot_2024-05-01_at_00.58.51.png)

**Lessons Learned:**

- Avoid hardcoding secret keys or credentials in source code.
- Regularly rotate AWS access/secret keys for added security.
- Configure Bucket ACLs properly to prevent unauthorized object listings.
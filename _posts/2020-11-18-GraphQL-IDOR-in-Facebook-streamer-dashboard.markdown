---
layout: post
title: "GraphQL IDOR in Facebook streamer dashboard."
excerpt: "While viewing our stream dashboard data from creator studio, there is an endpoint from where we can see our dashboard status. There is parameter called profile_id which can be misused to access data of other pages by using facebook page_id."
tags: [facebook, bug-bounty, graphql, burpsuite]
image: docker.png
comments: true
---
#### Description:
While viewing our stream dashboard data from creator studio, there is an endpoint from where we can see our dashboard status. There is parameter called *profile_id* in GraphQl request which can be misused to access data of other pages by using facebook page_id.


#### Steps to Reproduce:
1. Start burpsuite and intercept the request.
2. Go to https://www.facebook.com/gaming/streamer and you will be redirected to creator studio.
3. We will forward all the intercepted request since it's difficult to spot the correct request which has vulnerable parameters in multiple requests.
4. Meanwhile we will use find feature in burpsuite. we'll search for *"GamesVideoStreamerDashboardProfileQuery".*
![graphql-request](/images/posts/graphql-request.png)
5. Once our search query matches we will forward that particular request to repeator and replace *profileID* with desired game steaming pageID to see their stream stats. The response of the above request looks like as shown below.
![graphql-response](/images/posts/graphql-response.png)
According to facebook only highlighted information i.e. *"l30_live_earnings"* and *"supporter_count"* are sensitive which should not be disclosed to a user which does not have any role in the page.

#### Conclusion:
After reviewing this issue, Facebook decided to award a bounty of $2000 and they fixed the issue by not displaying those information in the response to a users which does not have any role in page.
![facebook-reply](/images/posts/facebook-reply.png)

---
layout: post
title:  "How I bypassed PHP functions to read sensitive files on server"
excerpt: Bypassing file read restriction on an application to achieve Remote Code Execution.
tags: [CVE-2017-9841, PHP, RCE,]
---

During the penetration testing of a target, the [nuclei](https://github.com/projectdiscovery/nuclei) results show that the website of an organization is vulnerable to code execution vulnerability i.e [CVE-2017-9841](https://blog.ovhcloud.com/cve-2017-9841-what-is-it-and-how-do-we-protect-our-customers/). The CVE-2017-9841 vulnerability lets a user run PHP code on vulnerable websites remotely, by exploiting a breach in PHPUnit lets us run desirable PHP codes and read sensitive files.

After checking all the things, I verified the existence of vulnerability making the proper request in Burp suite, and confirmed by running of the PHP function,  ```getcwd()``` that returns the current working directory.![php getcwd() function](/images/posts/rce1.png)
Now there won't be any problem running system commands by using the ```shell_exec()``` function in PHP. This function executes user-supplied commands and returns output as a string. I did this by simply listing all the home directories/files of the current user.![](/images/posts/rce2.png) Finally, reading the config file was just easy as reading this post. ![](/images/posts/rce3.png) I stopped over here and thought of reporting this issue to the organization but because of the tight schedule of my daily life I was unable to report the issue for 4-5 days. After a few days I thought of reporting the issue but wanted to confirm whether the vulnerability still exists or not. **But to my surprise 😕 It wasn't working as before** 😂. ![](/images/posts/rce4.png)
As per my guess within 4-5 days, the administrator might have checked the logs or might be aware of the exploit that I tried and made fixation to it. Hence, the execution of ```shell_exec()``` function was forbidden. However, few other functions could still be executed except shell_exec(). From the image below I confirmed that the execution was forbidden by applying some filter in the phpinfo file.![](/images/posts/rce5.png) Along with shell_exec(), other functions like ```show_source()```, ```system()```,```shell_exec()```, ```exec()```,```popen()``` and  ```proc_open()``` which can be used to read/write files were also disabled.
After this I started looking for other possible ways to read the files again, and found we can use the [```glob()```](https://www.php.net/manual/en/function.glob.php) method to return an array of filenames and directories. I used following snippet of code locally and confirmed it returns the array of files and directories.
```php
<?php
print_r(glob("*"));
?>
```
Eventually, I was able to  list the files again as shown below, and now all that's left is to find a way to read those listed files.![](/images/posts/rce6.png)  At the end, I figured out that I had to combine multiple functions together to read files.
```php
<?php $a = '../../../../../../../public_html/application/config/database.php';
$b = explode(',',file_get_contents($a));
print_r($b); ?>
```
In the above code, 
* $a variable is used to set target file which we are going to read. The target file was found using *print_r(glob())* 
* In the $b variable, we used explode function to return array of strings. *file_get_contents()* reads contents of database.php from public_html/application/config/database.php and contents array is returned.
* Finally, printed contents of $b variable using *print_r()* or *var_dump()* can also be used. 
![](/images/posts/rce7.png) 
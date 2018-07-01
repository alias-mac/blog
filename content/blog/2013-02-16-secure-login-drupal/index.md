---
title: "Secure login in Drupal"
date: "2013-02-16"
tags: [Drupal, Security, HTTPS, SSL]
published: true
---

While it's ok to serve a blog or a web page in normal HTTP protocol, when you login into your CMS (or any other web application you might use) should be done using a more secure protocol (HTTPS).

[Drupal](https://drupal.org) is a great CMS (I'm never tired of writing this 🙂) and allows you to serve your pages in standard HTTP while forcing the login to be secure.

To enable this feature you just need to login into your Drupal instance and go to `Administration > Configuration > People > Secure login` or by url path `admin/config/people/securelogin`. You can read all the information in that page which is really detailed.

You might think that you would have to set this insecurely in the first place, but you are wrong. Before you force the login to be secure, you should confirm that you can access your website securely, so basically you should be already setting this using your browser with the https url.

Enjoy your secure "backend"!

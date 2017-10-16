---
title: "Painless Analytics"
date: "2013-03-22"
tags: [Analytics, Drupal]
published: true
---

One thing that people that buy domains and serve web pages often forget is to confirm that there is only one single domain pointing to their website. What I mean is, your customers or visitors might reach your page in either your parent domain or subdomain (often `www`).

Lets take this blog as an example: it can be reached by [http://blog.open-war.com/](http://blog.open-war.com/) or [http://open-war.com/](http://open-war.com/) because I configured the DNS to point to the same server on both main domain (open-war.com) as well the subdomain (blog.open-war.com).

If I have analytics turned on (like [Google Analytics](http://www.google.com/analytics/) or [AWStats](http://awstats.sourceforge.net)) I might have wrong reports about my visitors because I would be serving the same content on 2 different addresses.

Google Analytics provides ways of fixing those reports into a more accurate one, avoiding that problem for BI or the Marketing team, but this is cumbersome and the problem should be fixed by whoever maintains the website.

Again, [Drupal](https://drupal.org) is a great CMS that comes with a lot of information on the `.htaccess` file and all you need is right there:

```
  # If your site can be accessed both with and without the 'www.' prefix, you
  # can use one of the following settings to redirect users to your preferred
  # URL, either WITH or WITHOUT the 'www.' prefix. Choose ONLY one option:
  #
  # To redirect all users to access the site WITH the 'www.' prefix,
  # (http://example.com/... will be redirected to http://www.example.com/...)
  # uncomment the following:
  # RewriteCond %{HTTP_HOST} !^www\. [NC]
  # RewriteRule ^ http://www.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
  #
  # To redirect all users to access the site WITHOUT the 'www.' prefix,
  # (http://www.example.com/... will be redirected to http://example.com/...)
  # uncomment the following:
  # RewriteCond %{HTTP_HOST} ^www\.(.+)$ [NC]
  # RewriteRule ^ http://%1%{REQUEST_URI} [L,R=301]
```

So basically you need to choose if you want to serve your site using always `www.example.com` (or another subdomain) or if you want to serve only in the main domain (`example.com`).

In my case, I decided to serve my blog with the `blog.` prefix, because I might want to use `open-war.com` domain later (or `www.open-war.com`) to serve other website or other application, so I have mine set as:

```
  RewriteCond %{HTTP_HOST} !^blog\. [NC]
  RewriteRule ^ http://blog.%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

You can do this on any website (it isn't a "Drupal thing"), just confirm that you have `mod_rewrite` on your apache enabled. You can do it by running `apachectl -M | grep rewrite_module` in your terminal.

If you prefer, you can also use the domain provider to do that redirect for you ([Namecheap](http://www.namecheap.com) for example, allows that). The reason why I prefer doing it on the server side (using `.htaccess` rewrite rule), is just because I can change that behavior anytime on the server and that change applies on the next request made to the server, while doing it with the domain provider, normally takes a little bit longer to take effect. Also, using Drupal allows me to serve different contents based on domain, yet maintaining the same code base (no need to create another Drupal instance).

You should always simplify the work of others, you will get your reward when someone simplifies your work!

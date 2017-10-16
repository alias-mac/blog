---
title: "Creating a blog blazing fast using Drupal"
date: "2012-07-17"
tags: [Drupal, Domain, Blog, Deploy]
published: true
---

Maintaining a site or an application from a version control repository can help the code maintenance workflow. Therefore, I always use the Acquia Drupal git repository from:
```bash
git clone git://git.acquia.com/drupal/branches/7.x.git
```

Now lets install a Drupal using some [Drush](http://drupal.org/project/drush) commands:

```bash
drush site-install --db-url=mysql://<db_username>:<db_password>@<db_url>/<db_name> --account-name=<admin_user> --account-pass=<admin_password> --sites-subdir=default -y
drush en dblog syslog -y;
```

For obvious reasons I just kept the settings to myself and I encourage you to create an `<admin_user>` different from `admin` besides a strong password. Also, avoid using this user on a regular basis.

Furthermore, make sure you create a `<db_password>` using something strong like:

```bash
echo `env LC_CTYPE=C tr -dc "a-zA-Z0-9-_\$\?" < /dev/urandom | head -c 8`'
```

Now that I have a website created, I just need a domain... [Namecheap](http://www.namecheap.com/) is the way to go!

Since I'm an Open Source addicted (besides an Apple one :)) and decided to have a blog to share more information of the things I explore on a daily basis, I decided the name open-war.com (keeping my information Open and my name Guerra = War)


Now lets deploy it.

I have a [QNAP](http://www.qnap.com) so I'll use it for now and think about hosting later on.

There are a few things you should do when using your PC, server or anything you have at home. First, make sure your database only replies to local requests, or at least to requests for IPs that you are absolutely sure you can rely on. That will keep you a little safer from outsiders to try and attack your database directly. Since this post isn't about securing your website or Drupal installation, I'll go further on this matter later.

Nevertheless, there are also concerns you should have when deploying your application/website on shared hosting. I'll cover that on another blog post.

Now I need some content on my blog, nothing better than to document what I just did.

Log into your new website and there will be a "Add new content" link on the first page. Click it and then create an Article.

Give it a title, create some tags on it, fill the body and there you go!

There are more things to do, but they will come later :)

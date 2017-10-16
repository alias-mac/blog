---
title: "Use disqus on your Drupal website"
date: "2012-08-28"
tags: [Drupal, Disqus, Drush]
published: true
---

As you can see I'm using [DISQUS](http://disqus.com) to moderate and allow comments on this blog.

This allows a much easier management of all the comments made on your website, due to several facts:

- faster page loading (without comments) since the comments will be loaded later outside from your platform;
- you can export the comments from [DISQUS](http://disqus.com) and import them on the new platform where you want now your comments (so its reversible);
- it's quite simpler to use, since if someone is already using it on another blog or other websites, they are familiar how it works (not a new different way to comment);
- the visitor won't need to login only on your blog or website just to comment, he/she/it can use the [DISQUS](http://disqus.com) login that is already integrated with several other platforms (like Google, Facebook and Twitter);
- it has several features that are being upgraded and created that your website can take advantage without a need to upgrade the comments module or other developments;
- email notifications for and from new comments;
- comments moderation of several sites at once in your [DISQUS](http://disqus.com) account.

There are other pros and cons on using [DISQUS](http://disqus.com). You can search on [Google](https://google.com) to see if it's a good move for you.

Start by creating an account on the [DISQUS](http://disqus.com) webpage.

Then [download](http://drupal.org/project/disqus) the module for your [Drupal](http://drupal.org) installation, or you can use [Drush](http://drupal.org/project/drush) if you prefer.

Then go to the Disqus configuration `admin/config/services/disqus` and define the settings based on the information that are given on your new Disqus account.

## SSL

If you serve your website or blog in both HTTP and HTTPS, like me, you might need to [patch](http://drupal.org/node/969202) your Disqus module to allow an "always https mode". This will prevent browsers from getting security warnings for that content being loaded or not loading the information at all.

Keep in mind that this SSL change might take sometime (weeks) to be available, so it's good to decide if you need SSL support right on the first place, and using the HTTPS on the first place even if you don't serve your website with SSL, won't hurt at all.

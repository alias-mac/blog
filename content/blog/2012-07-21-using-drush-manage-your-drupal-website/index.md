---
title: "Using Drush to manage your Drupal website"
date: "2012-07-21"
tags: [Drupal, Drush]
published: true
---

One of the tools I love the most to mange [Drupal](http://drupal.org/) websites is [Drush](http://drupal.org/project/drush/), simply because I like using command line tools and mostly when opening the web site and click on several buttons to clear the cache gives me a hard time.

The installation is very simple, you just have to follow the documentation. I recommend you to install it using the [PEAR](http://pear.php.net) channel, because updates will be simpler. Also, if you don't have pear installed and are thinking: "Why do I need PEAR anyway?", I would say: "Sooner or later you'll need PHPUnit...". [PEAR](http://pear.php.net) will help you keep things updated and simply organized, trust me.

If you're like me, you'll need only to run these:

```bash
pear channel-discover pear.drush.org
pear install drush/drush
```

If you're that kind of guy that stays away from the command line, than this app isn't for you. Anyway, developers using this tool will beat you in speed and productivity, since it helps you deploy, building, develop and manage a [Drupal](http://drupal.org/) website more easily.

---
title: "Xdebug on MAMP"
date: "2012-10-05"
tags: [MAMP, Xdebug]
published: true
---

To enable [Xdebug](http://xdebug.org) on [MAMP](http://www.mamp.info/) is a very simple task.

You just need to see what is the `php.ini` file you are using:

```bash
$ php -i | grep ini
```

And you will see a line like:

```
Loaded Configuration File => /Applications/MAMP/bin/php/php5.4.4/conf/php.ini
```

So, now you edit that file (with your favorite editor) and at the very end you will see the `[xdebug]` group where the like of the `zend_extension` is commented. If you don't find it on the file, you can just create a new one with this:

```
[xdebug]
zend_extension="/Applications/MAMP/bin/php/php5.4.4/lib/php/extensions/no-debug-non-zts-20100525/xdebug.so"
xdebug.default_enable=0
xdebug.remote_enable=1
xdebug.remote_handler=dbgp
xdebug.remote_host=localhost
xdebug.remote_port=9000
xdebug.remote_autostart=1
```

If you have a different php version or [MAMP](http://www.mamp.info/) version, please replace the `zend_extension` directive with the right one or if it's already there, you only need to uncomment it.

That's all folks!

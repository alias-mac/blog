---
title: "PHPUnit with MAMP 2.0 "
date: "2012-07-24"
tags: [PHP, PHPUnit, MAMP]
published: true
---

If you are using [MAMP](http://www.mamp.info) and want to use [PHPUnit](http://www.phpunit.de) with the [MAMP](http://www.mamp.info) 2.0's [Pear](http://pear.php.net), you'll have to do some neat stuff.

For me it's easier to use `pear` command instead `/Applications/MAMP/bin/php/php5.3.14/bin/pear`, so in order to do so, I just add the following line to the `~/.bash_profile` file:

```bash
# MAMP pear, php, phpunit, etc. of version php 5.3.x
PATH=/Applications/MAMP/bin/php/php5.3.14/bin:$PATH
```

Next thing is to check if `pear` is well configured, so just run `pear upgrade` on your favorite terminal program.

Some people are getting the following error:

```
Notice: unserialize(): Error at offset 276 of 1133 bytes in Config.php on line 1050
ERROR: The default config file is not a valid config file or is corrupted.
```

If you get this error as well, just delete the `pear.conf` file located at `/Applications/MAMP/bin/php/php5.3.14/conf/pear.conf`, and rerun the `pear upgrade` command.

I didn't get this problem because I already had the `~/.pearrc` file (I suppose).

You should now see something like (truncated the output for space):

```
downloading PEAR-1.9.4.tgz ...
Starting to download PEAR-1.9.4.tgz (296,332 bytes)
...
downloading Archive_Tar-1.3.10.tgz ...
Starting to download Archive_Tar-1.3.10.tgz (17,995 bytes)
...
downloading Console_Getopt-1.3.1.tgz ...
Starting to download Console_Getopt-1.3.1.tgz (4,471 bytes)
...
upgrade ok: channel://pear.php.net/Archive_Tar-1.3.10
upgrade ok: channel://pear.php.net/Console_Getopt-1.3.1
upgrade ok: channel://pear.php.net/PEAR-1.9.4
...
```

So now lets go down to business. Add the following channels:

```bash
$ pear config-set auto_discover 1
```

Then install the `phpunit` package:

```bash
$ pear install pear.phpunit.de/PHPUnit
```

If you get install ok on phpunit and it's dependencies, you should now be able to do `phpunit --version` and see the following output:

```
PHPUnit 3.6.12 by Sebastian Bergmann.
```

You can now start testing your projects with it. I'll make a post about configuring phpunit on you projects ASAP.

Thats all folks :)

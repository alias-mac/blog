---
title: "MAMP with XHProf"
date: "2012-10-06"
tags: [MAMP, XHProf, PHP]
published: true
---

[MAMP](http://www.mamp.info) doesn't come with [XHProf](http://pecl.php.net/package/xhprof) support by default and sometimes we need more than just a simple debug tool with [Xdebug](/xdebug-mamp).

Just for the record, I'm posting this in the current version of [MAMP](http://www.mamp.info), that is 2.1.1 and in the Mountain Lion OSX 10.8.1 version. I'm not sure if it works the same way on other versions, but you can leave a comment about it 🙂

So, how can we enable it and make it work?

## Requirements

First of all you'll need [Xcode](https://developer.apple.com/xcode/) and [Command Line Tools](https://developer.apple.com/downloads/index.action). Download and install them.

Then you'll need the php 5.4.4 source files used on the options available (we are aiming for php 5.4.4!). You can download them on [php.net website](http://www.php.net/releases/).

Unzip it to the `/Applications/MAMP/bin/php/php5.4.4/include/php/` folder (create the folders if they don't exist).

Now grab a XHProf from [GitHub](https://github.com/facebook/xhprof) or [pecl](http://pecl.php.net/package/xhprof) and extract it. Move the files to where you want to use it. I normally set it to be aside the php folder extracted above so I can have several XHProf instances for each PHP version I use:

```bash
mv ~/Downloads/xhprof-0.9.2/xhprof-0.9.2 /Applications/MAMP/bin/php/php5.4.4/include/xhprof
```

Let's get ready for build 🙂

## Building our xhprof.so

Now we are ready to start compiling the php module. Go to the `/Applications/MAMP/bin/php/php5.4.4/include/php/` folder created previously on the terminal and run:

```bash
./configure
```

Now go to your XHProf folder and run:

```bash
cd extension/
phpize
./configure
make
make install
```

This should get you the module on the right path of the MAMP library on `/Applications/MAMP/bin/php/php5.4.4/lib/php/extensions/no-debug-non-zts-20090626/`. You only need to enable the module on your `php.ini` file.

Check where is your php.ini by typing:

```bash
php -i | grep php.ini
```

Edit it and append at the end the following settings:

```
[xhprof]
extension=xhprof.so
```

After restarting your Apache on MAMP, confirm that you can see the `xhprof` group information with CPU count and version (in my case 0.9.2) on your `phpinfo`.

## Configure your XHProf

You can now read the rest of the information that the pecl package brings on how to use it and configure the ouput folder. I normaly set mine to `/tmp/` because it's cleared more regulary (see `/etc/defaults/periodic.conf`).

```
[xhprof]
extension=xhprof.so
xhprof.output_dir="/tmp/xhprof"
```

Make sure that the output directory you set exists:

```bash
mkdir -p /tmp/xhprof
```

## Testing your XHProf settings

You can now use the `examples/sample.php` file that comes with the pecl package.

```bash
cd examples
php sample.php
```

This will output the file into your `xhprof.output_dir` settings defined on the `php.ini` file.

You can now use several tools to check the output like:

* XHProf_html
* [XHGui](https://github.com/preinheimer/xhprof)
* [XHProf.io](http://xhprof.io)

For the purposes of this post, lets use the one that comes with xhprof pecl package. Start by making a symbolic link to your default html pages (I use `~/Sites`, you might use the default htdocs on MAMP):

```bash
ln -s /Applications/MAMP/bin/php/php5.4.4/include/xhprof/xhprof_html/ ~/Sites/xhprof
```

No open the url of `xhprof_html` with the run especified by the output file. In my case I ran:

```bash
open http://localhost/xhprof/index.php?run=50b3c637482b1&source=xhprof_foo
```

Because my file was `50b3c637482b1.xhprof_foo`.

Feel free to test this output with [XHGui](https://github.com/preinheimer/xhprof) or [XHProf.io](http://xhprof.io) also.

I think I didn't forget anything, but please feel free to comment if I missed any step.

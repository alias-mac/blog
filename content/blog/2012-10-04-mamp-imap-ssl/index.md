---
title: "MAMP with imap ssl"
date: "2012-10-04"
tags: [MAMP, IMAP, SSL]
published: true
---

Unfortunately [MAMP](http://www.mamp.info) doesn't come with imap ssl support by default and [GMail](http://gmail.com) needs it when you are connecting through imap.

Just for the record, I'm posting this in the current version of [MAMP](http://www.mamp.info), that is 2.1.1 and in the Mountain Lion OSX 10.8.1 version. I'm not sure if it works the same way on other versions, but you can leave a comment about it :)

You can check if your `phpinfo` has `SSL Support enabled` on the `imap` group.

## Requirements
So, how can we enable it and make it work?

First of all you'll need [Xcode](https://developer.apple.com/xcode/) and [Command Line Tools](https://developer.apple.com/downloads/index.action). Download and install them.

Then you'll need the [MAMP Server components and libraries](http://www.mamp.info/en/downloads/index.html) and the php source files, since the MAMP Server components and libraries doesn't bring the php 5.4.4 used on the options available (we are aiming for php 5.4.4!). You can download them on [php.net website](http://www.php.net/releases/).

Unzip it to the `/Applications/MAMP/bin/php/php5.4.4/include/php/` folder (create the folders if they don't exist).

If you don't have `autoconf` on your machine then you use the one supplied on the MAMP Server components and libraries.
Start by unzipping the `autoconf-2.68.tar.gz` file and go to terminal on that folder and run:

```bash
./configure
make
make install
```

Now that we have all the files and binaries needed, let's build the `imap-2007e` lib files needed to compile the new `imap.so` module.

Start by unzipping the imap-2007e.tar.Z from the MAMP Server components and libraries and go to the terminal on that folder and run:

```bash
make osx EXTRACFLAGS="-arch i386 -arch x86_64 -g -Os -pipe -no-cpp-precomp"
```

This will create the `c-client/*.h`, `c-client/*.c`, `c-client/c-client.a` files needed in your local library. Let's copy them:

```bash
sudo mkdir -p /usr/local/include
sudo cp c-client/*.h /usr/local/include/
sudo mkdir /usr/local/lib
sudo cp c-client/*.c /usr/local/lib/
sudo cp c-client/c-client.a /usr/local/lib/libc-client.a
```

## Building our imap.so

Now we are ready to start compiling the php module. Go to the `/Applications/MAMP/bin/php/php5.4.4/include/php/` folder created previously on the terminal and run:

```bash
./configure
cd ext/imap
phpize
./configure --with-imap=/usr/local/imap-2007 --with-kerberos --with-imap-ssl=/usr/
make
```

Now, if everything went as expected, you can copy the new imap.so to the MAMP library:

```bash
cp modules/imap.so /Applications/MAMP/bin/php/php5.4.4/lib/php/extensions/no-debug-non-zts-20100525/
```

After restarting your Apache on MAMP, confirm that you can see the `SSL Support` set as `enabled` in `imap` group on your `phpinfo`.

I think I didn't forget anything, but feel free to comment if I missed any step.

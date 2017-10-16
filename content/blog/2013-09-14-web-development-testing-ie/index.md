---
title: "Web development testing on IE"
date: "2013-09-14"
tags: [IE, OS X, Testing]
published: true
---

One of the things every web developer needs to do (sooner or later) is to test his website/webapp in some IE flavor. This is a pain for any Mac, Linux or even Windows user.

For Windows users there are some friendly tools to emulate several IEs, but I've seen that not always work as expected...

Anyway, my favorite way (on Mac OS X) is to use [ievms github project](https://github.com/xdissent/ievms) which allow you to download the version you need and start testing it.

The [README](https://github.com/xdissent/ievms/blob/master/README.md) has all the information you need, but just to save you a click or two, start by downloading and installing [VirtualBox](http://virtualbox.org/).

While you do that, start downloading the stacks you need, based on your requirements.

All versions of IE:

```bash
curl -s https://raw.github.com/xdissent/ievms/master/ievms.sh | bash
```

A specific version, e.g. IE8:

```bash
curl -s https://raw.github.com/xdissent/ievms/master/ievms.sh | IEVMS_VERSIONS="8" bash
```

If you prefer to pass a list of the versions you want, e.g. I normally use IE9 and IE10 for webapps, you can do it with:

```bash
curl -s https://raw.github.com/xdissent/ievms/master/ievms.sh | IEVMS_VERSIONS="9 10" bash
```

If you don't want to blow up your bandwidth you can also limit it by passing an options like:

```bash
curl -s https://raw.github.com/xdissent/ievms/master/ievms.sh | env CURL_OPTS="--limit-rate 50k" bash
```

Run the VM after the download is complete. The default Windows admin password is `Password1`, it’s also the password hint within the VM should you forget it.

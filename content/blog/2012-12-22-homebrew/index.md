---
title: "Homebrew"
date: "2012-12-22"
tags: [Homebrew, macOS]
published: true
---

I've been using [Homebrew](http://brew.sh) for quite some time now and damn, I
wish the first package managers I tried (like
[MacPorts](http://www.macports.org) or [Fink](http://fink.thetis.ig42.org))
where as awesome as this.

The 3 amazing things about Homebrew are:

- simple - just see how to install it... can it be simpler?
- clean - doesn't spread files outside its folder and uses symbolic links to
  keep them on the correct location for other apps/packages
- extensible - allows you to create your own formulas to install your own
  Homebrew packages

I'm able to include this on my regular workflow and simplify a clean/regular
install or keep my stuff up to date with it.

The only cons I see is, you need to have
[Xcode](https://developer.apple.com/xcode/) installed, **but** since I need it
on daily basis (to test Web apps on iOS simulator, do some
[Objective-C](http://en.wikipedia.org/wiki/Objective-C) coding and even use the
gcc version to build some PHP extensions or just play with C) I don't see it as
a problem.

Keep in mind that you should install Command Line Tools for Xcode to have a
better Homebrew experience.

Just navigate to
[https://developer.apple.com/downloads/](https://developer.apple.com/downloads/)
and select the correct Command Line Tools for your OS X version.

Now you can enjoy your system with updated git (`brew install git`) and a lot of
other cool packages with a simple `brew update && brew upgrade` command.

If you want to make sure that you are using your brew package instead of the one
shipped with OS X, confirm that you have `PATH=/usr/local/bin:$PATH` on your
`~/.bash_profile` file.

Enjoy your life!

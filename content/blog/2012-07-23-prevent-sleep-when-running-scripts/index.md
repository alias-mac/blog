---
title: "Prevent sleep when running scripts"
date: "2012-07-23"
tags: [macOS]
published: true
---

Sometimes we need to execute commands that take some time to execute and
normally you have your mac set up to sleep earlier than those scripts need to
finish. Personally I don't like to mess with the sleep settings if what I need
is temporary (just until the script is over). You can use
[Caffeine](http://lightheadsw.com/caffeine/) to do that, but I don't like to
have several programs running and the need to install one more app just to make
simple things. Furthermore, I need something to go back to normal (the sleep
settings I had before) after the script is done.

So after some investigation, I found the `pmset` command really useful and the
precise tool for my temporary scripts. In this case I use commands like:

```bash
pmset noidle & <command I need to run while preventing from sleep> ; killall pmset
```

Also, if I want to prevent sleep on a shell script that I'm coding, I find it
better to use something like:

```bash
# prevent sleep (background running)
pmset noidle &
# save the process ID of pmset command
PMSETPID=$!

# now make everything you need here

# kill the pmset command running on background
kill $MPSETPID
```

Now I can go away from my Mac and it will run the command without interruptions
and after it will save energy, like it normally does.

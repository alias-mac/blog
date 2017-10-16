---
title: "Rsync continuously until it's done"
date: "2013-06-23"
tags: [Rsync, Linux]
published: true
---

My concept of Done isn't only applied on Scrum, but into my programming as well :)

While syncing my data to do an offsite backup, I often run into connection issues (mostly due to IP changes - since I'm using a dyndns service, because it's free [as in beer](http://en.wikipedia.org/wiki/Free_as_in_free_beer#.22Free_beer.22_vs_.22free_speech.22_distinction)).

I ran into solutions like [this one](http://superuser.com/questions/302842/resume-rsync-over-ssh-after-broken-connection), but it doesn't solve the problem of program halt (like `ctrl+c` or even using a kill command). Even worse, sometimes the connection is so bad that you get an "unknown" error and will have a weird state.

That said, I ended with this script to keep my stuff in sync continuously until it's really done (or expires on retries - and then it sends me an email so I can take a look at).

```bash
#!/bin/bash

# Trap interruptions to exit without looping
trap 'echo "Stopped."; exit;' SIGINT SIGTERM

MAX=10

i=0
while :
do
    i = $(( $i + 1 ))
    rsync -ahvzP $@
    if [ "$?" = "0" ] ; then

        if [ $i -gt $MAX ] ; then
            echo "Hit maximum number of retries, giving up." | mail -s "Rsync failure" -a "From: Super Rsync <root>" root
        fi

        break
    fi
    echo "Failure. Retrying..."
    sleep 180
done

echo "Done"
```

I've been running it for some time now, and looks like it does the job really well.

Let me know if it works for you too!

---
title: "Installing basic network tools in QNAP"
date: "2013-05-19"
tags: [QNAP, NAS, Network, Tools]
published: true
---

Like I said on my [first post](/creating-blog-blazing-fast-using-drupal), I have a [QNAP](http://www.qnap.com/) which currently is just serving as a remote (aka offsite) backup server from my main one ([Debian](http://www.debian.org) based).

I was needing to check the IP addresses of some of my local network gadgets, more specifically the Airport Express IP address. So I just logged in into my NAS, using SSH, and fired the `arp -a` command and I got a `-sh: arp: command not found` reply. Not happy.

Gladly you can install these basic tools with `ipkg` and so I did: `ipkg install net-tools`. You will get all the basic network tools, and imho really important tools, if you don't have already:

```
update-alternatives: Linking //opt/bin/hostname to /opt/bin/net-tools-hostname
update-alternatives: Linking //opt/bin/ifconfig to /opt/bin/net-tools-ifconfig
update-alternatives: Linking //opt/bin/netstat to /opt/bin/net-tools-netstat
update-alternatives: Linking //opt/sbin/arp to /opt/sbin/net-tools-arp
update-alternatives: Linking //opt/sbin/route to /opt/sbin/net-tools-route
```

So now I was able to get all the needed information, and I hope you can get it too!
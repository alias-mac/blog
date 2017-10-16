---
title: "Network issues"
date: "2013-12-14"
tags: [Network, OS X]
published: true
---

I've always had problems with VPNs with OS X. What I'm going to explain next, it might be something that happens on other systems too, but I never had them.

I'm using Network Connect from Juniper Networks and I normally don't turn my mac off when I go anywhere. I always put it in sleep mode (close the lid) and move on... that gives me the extra productivity I need (and always look for).

Probably due to that, sometimes I can't access some websites (like [GitHub](https://github.com), or have audio issues with [GoToMeeting](http://www.gotomeeting.com/) (like I can connect to the meeting, but can't connect audio).
There was a day that this happened twice and I was really pissed, so like always, I decided to investigate why it would do that.

Started by checking my network connections with `netstat -rn` and the output gave something like:

```
Internet:
Destination        Gateway            Flags        Refs      Use   Netif Expire
0&0x68             73.73.73.73.3.0.0.0.0.0.a.0.8.ff.ff.ff.0.0.0.68.80.0.5.14.4.0.3f.2c.5.0.6.1.3.0.0.0.0.0.0.0.1.8.1.0.0.0.0.0.4.0.0.0.7f.ff.ff.ff.0.0.0.0.dc.5.0.0.0.0.0.0.5c.c2.59.53.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.4.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.10.2.0 USc             6        0     en0
127                127.0.0.1          UCS             0        0     lo0
127.0.0.1          127.0.0.1          UH             38    21056     lo0
```

This basically means that the destination is completely screwed, and I know that it only happens when I use the VPN... If you turn off the wifi or the network you are using and plug it again, it doesn't solve the issue and it is really hard to do a "reset" on the network.

I found a solution that, for now, has always worked for me:
1. go to your `Network` (inside `System Preferences`);
2. click on the network that you were using when you connected to the VPN (normally I'm using wifi);
3. click on `Advanced` button and select `TCP/IP` tab;
4. choose `Off` on the `Configure IPv4` setting;
5. click `Ok` and then `Apply`.

Good, now repeat the steps 3 to 5 selecting `Using DHCP` (or the setting you had before).
Confirm now what is the output of your `netstat -rn` command. It should be something like:

```
Internet:
Destination        Gateway            Flags        Refs      Use   Netif Expire
default            <router_ip>        UGSc           xx        0     en1
```

I hope this will help you and avoid a restart :)

Feel free to drop a comment if you still see issues or fixed in a different way.
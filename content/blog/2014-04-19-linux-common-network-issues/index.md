---
title: "Linux common network issues"
date: "2014-04-19"
tags: [Linux, SELinux, CentOS, Red Hat]
published: true
---

One of the problems that I run into several times (and keep forgetting and
search for it online) is the lack of connectivity on clean installs of
[CentOS](https://www.centos.org/) (and [Red Hat](https://www.redhat.com/)
systems).

Either the box isn't able to reach box (like `MySQL`) in the same network or
simply you can't make any internet requests from that box.

I spend time trying to look for issues in `iptables`, network connectivity
(like switches, routers, cables), proxies, etc., when normally the issue (99%
of the times for me) is simply misconfiguration of `SELinux` module (probably
because I use [Debian](https://www.debian.org/) more often...).

If you are like me, check the
[`SELinux` configs](https://wiki.centos.org/TipsAndTricks/SelinuxBooleans)
first before you waste time looking for issues elsewhere:
```bash
getsebool -a | grep httpd
```

If you get the following in the output:
```
httpd_can_network_connect --> off
```

The solution is simple:
```bash
setsebool -P httpd_can_network_connect on
```

This will allow HTTPD scripts and modules to connect to the network.

In case that doesn't work for you, edit `/etc/selinux/config` file and locate
the line that says `SELINUX=enforcing` and change it to `SELINUX=disabled`. You
will need to reboot, but it will solve your problem.

If you are like me, check that before you waste time looking for issues
elsewhere (easy to check that, then to spend too much time for other issues).

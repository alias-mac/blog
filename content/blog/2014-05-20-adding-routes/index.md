---
title: "Adding routes in OS X or Linux"
date: "2014-05-20"
tags: [Linux, macOS]
published: true
---

Adding a route manually can be necessary sometimes. When on Linux, I know the
command by heart:

```bash
# ip addresses just for example
sudo route add -net 10.67.0.0/16 gw 192.168.120.254
```

On the OS X the command is similar, but a bit different 🙂

Just as a note to myself and anyone else interested:

```bash
sudo route -n add -net 10.67.0.0/16 192.168.120.254
```

This sets up a route to the `10.67.0.0/16` net through gateway
`192.168.120.254`.

To see an overview of current routes use:

```bash
netstat -nr
```

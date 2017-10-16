---
title: "Accessing AirPort Extreme remotely"
date: "2013-05-19"
tags: [Airport Extreme, Airport Express, SSH, Tunnel, Config]
published: true
---

I'm not really paranoid about security, but I try to keep my stuff as safe as possible, therefore I disabled the option "Allow setup over WAN" in my [AirPort Extreme](http://www.apple.com/airport-extreme/) and [Express](http://www.apple.com/airport-express/) that I have in [Portugal](http://wikitravel.org/en/Portugal).

I was "far far away" from home and wasn't getting home so soon, but I needed to do a firmware update (I know that isn't recommended if remote, since something could go wrong and I would loose my "home connection") and change a few parameters for my QNAP access.

After doing several searches on [Google](https://www.google.com), all I got was "you can't do it". Dam... there's got to be a way!

Since I have my [QNAP](http://www.qnap.com/) I thought, no problem, I can connect to my VPN and pretend that I'm at home. The problem with this is that my OpenVPN server is running at `10.8.0.0/24` pool and, as far as I know, QNAP isn't able to map the internal network with your VPN one, because there is no NAT loopback on their VPN to LAN IP NAT configuration. Probably I could just install the `ipkg` version and set it the way I need to, but I didn't want to mess with my OpenVPN settings, since I was remote and probably could break my access to it.

So I thought, why can't I just do a SSH tunnel instead?

Sounds like a plan. So, what do I need? Just the ports that AirPort Utility on OS X use to connect to AirPort Extreme and Express devices. A quick search sent me to [this nice page](http://support.apple.com/kb/TS1629) that contains the list of TCP and UDP ports used by Apple software products. And there it was, the magic number: `5009`.

Cool, now what? Now comes the easy part. On my local machine I just need to open a SSH tunnel:

```bash
$ ssh -L 5009:<router_ip>:5009 <remote_server_ip>
```

Just replace the `<router_ip>` with the ip of your router and the `<remote_server_ip>` with the ip of your server that allows SSH connections. With that running, you can now open your AirPort Utility and navigate to `File -> Configure Other...` (or use the `cmd + shift + o` key shortcut) and use `127.0.0.1` as the IP of the router and set your password (it might take a while if your connection is bad).

To find what is the `router_ip` or your AirPort Extreme or Express, you can use the `arp -a` command. In case you have a QNAP, you can [follow these instructions](/installing-basic-network-tools-qnap).

Now you can configure your AirPort Extreme more securely!

---
title: "Route server to private SVN"
date: "2013-08-11"
tags: [SVN, Linux, LAMP]
published: true
---

When developing for several customers, I have to circumvent a lot of issues around networking. The thing that most annoys me is when the SVN server is inaccessible from the server (for whatever reason).

Since I'm always working with tight deadlines, I don't have time to waste asking access on those routes, so I normally make use of the great SSH tunnel feature.

I assume that you are working on LAMP here and, therefore, won't explain how to do it on a Windows machine/server.

So, from your favorite terminal just type:

```bash
$ ssh <user>@<your_server> -R <server_port_to_use>:<svn_server>:<svn_port>
```

This will basically trigger a remote port forwarding from `<server_port_to_use>` to your `<svn_server>:<svn_port>`.

So, replacing those variables you would get something like:

```bash
$ ssh root@10.0.0.1 -R 3456:open-war.com:443
```

And now you could checkout your SVN repository (assuming that you have SVN client on the server, of course) using the `localhost:3456`.

```bash
svn co https://localhost:3456/svnroot/open-war.com/trunk /var/www/
```

It is also possible to do "double routing" if you have a jump machine in the middle to access to your server. You just need to open another/same port on that server when connecting to the jump server.

**Attention:** Bear in mind that default apache rules allow your `.svn` files to be read from the server, so anyone could actually see your code. It is extremely important to use rules to block, ignore or redirect the access to those files.

I normally use a set of rules like:

```
<Directory / >
    # other settings

    #.svn & .git directories must be avoided!
    RedirectMatch 404 /\.svn(/|$)
    RedirectMatch 404 /\.git(/|$)
</Directory>
```

On git though, I would advise you to also checkout the repository on a parent folder, that isn't accessible from the document root. This is probably something that I should cover in next posts.

With great power comes great responsibility!

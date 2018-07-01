---
title: "Email redirect to one user's account"
date: "2012-08-27"
tags: [Development, Postfix, macOS, Unix]
published: true
---

If
[There are times when you wish your development stack could send some emails](/email-relay-configuration-your-mac-os-x),
there are times when you don't want them to be sent to the address that was
meant to, but rather to yourself. This is crucial on a very volatile
environments, where you have several applications and you are always changing
from one project to another, and you might forget to change those email
addresses that were brought from production! :(

Lets start by creating the `/etc/postfix/virtual-regexp` file with the following
content:

```
/.+@.+/ youremail@goes.here
```

This will let you say that all the emails (in this case) will be sent to the
`youremail@goes.here` account.

Build the previous file with:

```bash
postmap /etc/postfix/virtual-regexp
```

Add the following lines to the `/etc/postfix/main.cf` file (presuming you don't
have virtual_alias_maps set already):

```
virtual_alias_maps = regexp:/etc/postfix/virtual-regexp
```

Good to go. Now test it with something like:

```bash
echo 'Email will be arrested at youremail@goes.here! :)' | mail -s 'Got it!' <test@example.com>
```

---
title: "Develop locally with https"
date: "2013-01-26"
tags: [OS X, HTTPS, SSL, Apache]
published: true
---

On [last post](/finally-mamp-free) I explained how to make your OS X use [Homebrew](/homebrew).

Now I will explain how you can make your develop machine to reply to HTTPS requests so that you can test some use case that you might have with a secure application.

## Apache

OS X is prepared to serve pages in the 443 if you activate it. Although, I want to do my customizations (like use my `~/Sites/` folder be the default document root), therefore I setup my own `<my_username>-ssl.conf` file in `/etc/apache2/users/` folder. I prefer this approach, because it's easier to track my changes that might need to be applied to other laptop or changed later.

I created the file by duplicating the bundled one that lives at `/private/etc/apache2/extra/httpd-ssl.conf` and then I customized it by changing the `DocumentRoot` (to point to the folder I normally use - `/Users/<my_username>/Sites/`) and to point to the certificate files path (using `/private/etc/apache2/` because they are just self-signed certificates that I can regenerate any time, but feel free to point them somewhere you prefer).

So how can you generate these certificates?

Open your favorite terminal and start by going to the path where you want to store the certificates. Like I said before, I chose `/private/etc/apache2/` and therefore I need to prefix all my commands with `sudo`.

Step 1: Generate a private key

```bash
$ sudo openssl genrsa -des3 -out server.key 2048
```

Step 2: Generate a CSR (Certificate Signing Request)

```bash
$ sudo openssl req -new -key server.key -out server.csr
```

Fill up the prompted pieces of information like `Country Name`, `State or Province Name`, etc.

Step 3: Remove Passphrase from Key

A side-effect of the pass-phrased private key is that Apache will ask for the password each time the web server is started. For a development machine this is painful, and although `mod_ssl` includes the ability to use an external program in place of the built-in pass-phrase dialog, this is a development environment and not worth the setup.

It is possible to remove the password from the key, but if the private key is no longer encrypted, it is important that this file only be readable by the root user.

If your system is compromised and a someone obtains your unencrypted private key, the corresponding certificate will need to be revoked. Anyway, use the following command to remove the pass-phrase from the key:

```bash
$ sudo cp server.key server.key.org
$ sudo openssl rsa -in server.key.org -out server.key
```

And make sure your private key at least is readable only by the root user:

```bash
$ sudo chmod 600 server.key*
```

Step 4: Generating a Self-Signed Certificate

To generate a temporary certificate which is good for 365 days, issue the following command:

```bash
$ sudo openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt
```

Now depending if you where deploying the keys directly on `/etc/apache2/` or not, you might need to copy or link the Private Key and Certificate to `/etc/apache2/`.

Now confirm that your `<my_username>-ssl.conf` file has both lines uncommented:

```
SSLCertificateFile "/private/etc/apache2/server.crt"
SSLCertificateKeyFile "/private/etc/apache2/server.key"
```

Since the `<my_username>-ssl.conf` file is already on `/etc/apache2/users/` folder, it will read it automatically and you don't need to force the include. Nevertheless, if you run into issues due to that, make sure you have the following line at the end of your `/etc/apache2/users/<my_username>.conf` file:

```
# Activate SSL
Include /private/etc/apache2/users/<my_username>-ssl.conf
```

Restart your apache `sudo apachectl restart` and navigate to [https://localhost/index.html](https://localhost/index.html), or any other file that you have on your document root (on previous post we used [http://localhost/info.php](http://localhost/info.php)), using your favorite Web browser and you should get your page loaded correctly (after you accept the warning about the untrusted security certificate).

Feel free to drop a comment if you run into issues.

Enjoy your MAMP stack with SSL!

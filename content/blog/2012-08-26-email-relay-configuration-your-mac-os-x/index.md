---
title: "Email relay configuration on your Mac OS X"
date: "2012-08-26"
tags: [Development, Postfix, OS X, Unix]
published: true
---

There are times when you wish your development stack could send some emails. Well, there is an easy way to do that on the Mac OS X (this was tested from the SL, Lion and Mountain Lion, but it should work in other versions, as also with Unix-like systems that, of course, have [Postfix](http://www.postfix.org) installed).

Start by adding these settings to your `/etc/postfix/main.cf` file:

```
relayhost = [smtp.example.com]:587
smtp_sasl_auth_enable = yes
smtp_sasl_password_maps = hash:/etc/postfix/sasl_passwd
smtp_sasl_security_options =
smtp_sasl_local_domain = yourdomain.com
broken_sasl_auth_clients = yes
smtpd_pw_server_security_options = noanonymous
smtp_use_tls=yes
smtp_tls_security_level=encrypt
tls_random_source=dev:/dev/urandom
```

I normally set this settings at the end of the file so I don't have to search it when I need to make a change. Also, I normally wrap it with something like `# me@mymachine` comment, so it's easy to search for whatever configurations I made on the original file. This doesn't mean you don't need to backup your settings file, it only means that it will be easier than to make `diff main.cf main-backup.cf` or whatever.

If you use a gmail account, you can replace the line:

```
relayhost = [smtp.example.com]:587
```

with:

```
relayhost = smtp.gmail.com:587
```

and if you're using your development machine just replace:

```
smtp_sasl_local_domain = yourdomain.com
```

with:

```
smtp_sasl_local_domain = localhost
```

or remove it, since it isn't necessary for localhost.

If your relaying mail server needs authentication, the next step you'll need to do is to create the file `/etc/postfix/sasl_passwd` and add the following lines:

```
[smtp.example.com]:587 username:password
```

So, for the gmail account it goes something like:
```
smtp.gmail.com:587 username@gmail.com:password
```

Don't forget to replace **username** with your actual username and **password** with your password! 🙂

Now you need to create the `/etc/postfix/sasl_passwd.db` file from the `/etc/postfix/sasl_passwd` one, and keep them safe:

```bash
sudo postmap hash:/etc/postfix/sasl_passwd
sudo chown root:wheel /etc/postfix/sasl_passwd /etc/postfix/sasl_passwd.db
sudo chmod 600 /etc/postfix/sasl_passwd /etc/postfix/sasl_passwd.db
```

There you go, all set. You should now be ready to send out some emails. Try it by sending an email from the terminal using:

```bash
echo 'Email is now working! :)' | mail -s 'Test Email' <your-email@goes.here>
```

If something goes wrong, you can monitor the log file at `/var/log/mail.log` in order to see what is happening, and use the `mailq` program to see the state of the mail queue.

If you have the 2-step verification on your google account, then you'll have to generate an application-specific password (I think you should know where is it).

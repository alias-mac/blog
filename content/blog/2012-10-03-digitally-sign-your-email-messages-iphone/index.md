---
title: "Digitally sign your email messages on iPhone"
date: "2012-10-03"
tags: [OS X, Certificates, Digital Signing, iPhone]
published: true
---

You can read why you should digital sign your email messages [here](/digitally-sign-your-email-messages-mailapp).

I assume that you already create your certificate, if not, you can read about it [here](/digitally-sign-your-email-messages-mailapp).

If you send an email from your iPhone to your computer (or anyone), you'll see that isn't digital signed. This is because your iPhone isn't configured to use SMIME.

Start by going to `Settings > Mail, Contacts, Calendars` and choose the email account you want to use the digital signing. Click `Account` and scroll down until you find S/MIME. Turn it on and notice that you now have more 2 options: `Sign` and `Encrypt`. If you choose the `Sign` option you'll see that you don't have your certificate there yet.

So lets start by exporting 2 files you'll need:

- your certificate only
- your private key with the certificate (choose the 2 files together) on the Keychain Access app (if you use OS X) and when exporting, please provide a strong password.

You can send an email to yourself with the 2 files and then delete it or if you are a security maniac open your browser and point to your "local network special encrypted and need to login web app" or whatever makes you feel more secure 🙂

If you used the easy way, open the email you just sent to your self and open the files attached, click install and fill the password you used to export. If you have passcode enabled on you iPhone, you'll have to unlock after click install and only after you'll be prompted for the private key password.

If you export only the certificate (.crt file) or the private key, you'll not be able create a correct profile on the iPhone. You'll have to see 2 profiles for each email account.

Now you can go to your email settings and enable the `Sign` and `Encrypt` options and select the correct certificate.

Now make a test by sending an email to yourself or a friend to check if everything is working fine. You'll see 2 icons (one for digital signed and another for encrypted) when you are using both options.

Tip: If you have already one email setup with encryption, you can use that one to send the other keys and certificates for the other accounts encrypted.

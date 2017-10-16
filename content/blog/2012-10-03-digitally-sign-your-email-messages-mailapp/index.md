---
title: "Digitally sign your email messages on Mail.app"
date: "2012-10-03"
tags: [OS X, Certificates, Digital Signing]
published: true
---

So, why would you want to digital signing your email messages?

I believe it is good to prove that the email sent (and that the other person receives) is really from you and not from someone else pretending to be you. This is specially important when the content of the message is an action to be made. Therefore, digital signing will help the receiver to decide if he/she can trust the content of your email execute that action.

No lets, cut the crap and go down to business.

First you'll need a certificate, preferably from a certificate authority (some of them issue free certificates while others offer paid-for ones). I'm using a [StartSSL](https://www.startssl.com) but there are others like [Comodo](https://secure.comodo.com/products/frontpage?area=SecureEmailCertificate).

After you obtain the certificate you'll need to install it (double click on it) and it will go to your Keychain Access. If you are like me and have several emails (work, personal and others), you should rename it so you can remove it later if needed. I normally make it like `<email> SMIME`.

Now restart your Mail.app and try to send a new email with the account you digital signed. You'll see a new icon on the toolbar near the From and Signature.

You should now backup your private and public key from this digital signed certificate, specially the private key!

Hint: if the person you are emailing to is also digital signing the messages you can exchange encrypted emails. That's very useful as well.

You can also digitally sign your emails on your iPhone by following [this](/digitally-sign-your-email-messages-iphone).

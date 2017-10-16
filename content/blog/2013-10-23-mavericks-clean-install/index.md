---
title: "Mavericks Clean install"
date: "2013-10-23"
tags: [OS X]
published: true
---

The new Mac OS X came out and I was already waiting for it. It has a lot of things that I "need" daily, and therefore I went for a free update (thanks Apple!).

You can see a list of things that are [new in Mavericks](https://help.apple.com/osx-mavericks/whats-new) to understand why I think it's the best thing (after I switch to Mac, around February 2006 - when [Apple made the transition to Intel processors](http://en.wikipedia.org/wiki/Apple's_transition_to_Intel_processors)).

## Backup

I don't think I need to explain this... Backup your stuff.

And meanwhile create a [bootable usb](http://arstechnica.com/apple/2013/10/how-to-make-your-own-bootable-os-x-10-9-mavericks-usb-install-drive/).

## Create bootable USB

You can use a simple method by just downloading the cool app...

## Prepare for clean install

Once you have all backed up properly and you have your USB stick ready with Mavericks, you can restart your mac and right after the normal "boot shime" press and keep pressed the `alt` (aka option) key until the boot options show up.

Select the `OS X 10.9 Install Disk - 10.9` and basically a recovery mode screen shows up.
Click on `Disk Utility` from the list and format it by clicking on `Erase` tab + `Erase...` button. It should be fast. Once it finishes, close the `Disk Utility` and select the Install option to do the clean install.

Follow the next steps based on the screen instructions and you should be ready to go in less than 1 hour.

## After install

Call me paranoid, but I don't like to give both my encrypted passwords and the key that decrypt them... Therefore I was almost giving up on syncing my passwords using iCloud, **but** luckily there is a way of sync your passwords without having to provide your private key to Apple.

Basically I did some digging and if you read the [iCloud Keychain FAQ](http://support.apple.com/kb/HT5813?viewlocale=en_US&locale=en_US):

> **Can I set up iCloud Keychain so my data isn't backed up in the cloud?**
>
>Yes. When setting up iCloud Keychain, you can skip the step for creating an iCloud Security Code. Your keychain data will then be stored only locally on the device, and it will update only across your approved devices.
>
> Important: If you choose to not create an iCloud Security Code, Apple will not be able to recover your iCloud Keychain.

Meaning that you can use the best of both worlds!

So I did that and now you should be able to install all your purchased apps from `App Store` and be ready for full production in less than 1 hour :)

## Troubleshooting

I had a few issues after a few days running Mavericks. I began having a lot of resources being sucked by systemstats process. I [reset the SMC and PRAM](https://discussions.apple.com/docs/DOC-3604) and it looks like it's solved.

After a few more hours I realized that the problem came from the Energy tab in the Activity Monitor. Every time I navigate to it the systemstats fire up. For now, I'm just avoiding it :)

Follow [this thread](https://devforums.apple.com/message/827251#827251) to know more about it.

Good luck!
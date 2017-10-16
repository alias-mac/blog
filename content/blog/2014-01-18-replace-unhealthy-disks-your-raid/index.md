---
title: "Replace unhealthy disks in your RAID"
date: "2014-01-18"
tags: [Linux, RAID]
published: true
---

I've been a happy user of [OpenMediaVault](http://www.openmediavault.org) which is basically a nice UI for my storage solution build on top of Debian.

I recently had some disks complaining about bad sectors, and since I don't like having unhealthy disks on my [RAID 5](https://en.wikipedia.org/wiki/Standard_RAID_levels), I decided to swap them.

First thing is to identify which disk is failing.
I normally receive an email with that information, since I run S.M.A.R.T. reports every week (short test) and every month (long tests).

You get the information of the device failing with something like:
```
A SparesMissing event had been detected on md device /dev/md1.
```
Now you can use that information to go to `Physical Disks` inside of `Storage` and get that Serial Number of the disk (in the table).

Time to open your server. If you have hot swappable disks you don't need to turn your system off, if you don't, then turn your system off first.
Find the disk with that Serial Number that you saw on the list, unplug it and plug the new one. Boot your system if it was turned off.

The system will now detect the removed disk and a new one. Add that new disk to the RAID array and let it rebuild that disk, using the information from the other disks.
You should get information about how much time it is taking. I also get emails of the status every few hours.

When all is finished, you can now remove the other disk as a spare. Open the `/etc/mdadm/mdadm.conf` file, find the line that begins with `ARRAY /dev/md1` (or whatever is the name of your raid) and remove the line immediately following which states `spares=1`. Then restart the mdadm service with `# service mdadm restart`.

If you did a `mdadm --examine --scan` to retrieve the array definitions while the md1 array was still rebuilding, one partition was seen as spare at that moment.


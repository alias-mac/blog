---
title: "iTerm2"
date: "2012-11-24"
tags: [iTerm, OS X, Terminal]
published: true
---

If you are like me and enjoy being in the command line all the time (and you are running a Mac), you will certainly enjoy using [iTerm2](http://www.iterm2.com).

You can squeeze all that extra productivity from it, so easily!

First, it uses a great split mechanism that the regular Terminal (bundled with OS X) makes it read only. Second, it allows you to create any complex split of windows and you can use one single window to drag-and-drop to another screen. Basically it's the Mac's [SSHerminator](http://www.ubuntugeek.com/tag/install-ssherminator-ubuntu).

If you combine iTerm2 with [BetterTouchTool](http://www.boastr.net) you will be the fastest guy in CLI among your colleagues.

## Tune it

### Key Shortcuts
One of the issues I have when I install iTerm2 out of the box is the word navigation with the keyboard. The `option + left` or `option + right` keys don't work like on other apps. Plus I use the `option + delete` to delete the whole word all the time on any application (like `ctrl + w` in terminal).

How can we fix this?

For `option + left` and `option + right` keys you just need to open the profile preferences (or use the `cmd + i` shortcut), go to the Keyboard tab, hit the `+` sign at the bottom (or search for the key combination if already in use), and hit `option + right` in the keyboard shortcut box. Then select `Send Escape Sequence` from the action box and type `f` in the box below it. Now just do the same for `option + left` and the `b` key instead of `f`.

The `option + delete` needs to be done using `Send Hex Codes` and by writing `0x1b 0x7f` on last box.

The awesome thing is that you can test it with the preferences window still open, because your changes apply automatically. Confirm that all works before closing the profile preferences window.

### Use last tab's directory

In `General tab` of the profile preference you can select `Reuse previous tab's directory` to save you from jumping around on folders, specially if you want to open a new window on the current folder that you are already in. This is great when you want to do parallel stuff on the same folder and you just want to do a quick split or open a new tab to trigger something at the same time in the same place.

### Window arrangement

I normally use a split set for my development, as well as a few tabs for folders that I'm always doing changes (like my [dotfiles](https://github.com/alias-mac/dotfiles) folder).

You can have iTerm2 starting up with your window arrangement by default. Just setup everything like you want to and then click on `Save window arrangement` inside `Window` menu (or `cmd + shift + s`) and make sure you have the `Open saved window arrangement` setting active on Preferences' `General tab`.

If you come from the linux world, you will love iTerm2.

Enjoy your extra CLI productivity!

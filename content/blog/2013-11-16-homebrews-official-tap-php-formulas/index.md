---
title: "Homebrew's official tap for PHP formulas"
date: "2013-11-16"
tags: [OS X, Homebrew, brew]
published: true
---

On my [previous post](/finally-mamp-free) I was using the homebrew-php repo that was pointing to [https://github.com/josegonzalez/homebrew-php](https://github.com/josegonzalez/homebrew-php).

Now there is an [official repo](https://github.com/Homebrew/homebrew-php) for these PHP formulas and for those who want to move to it (instead of keep pointing to the alias/redirect), you should do the following:

```bash
$ brew untap josegonzalez/php
$ brew tap homebrew/php
```

You should get the a `Tapped <number> formula` reply (`<number>` is the number of formulas taped that normally matches with the `untap` command made before it.
If you get something like: `Warning: Could not tap homebrew/homebrew-php/... over josegonzalez/homebrew-php/...`, then it is probably because you weren't able to `untap` correctly. Please run `untap` on both repos and `tap` the `homebrew/php` again. That should solve it.

Good luck!

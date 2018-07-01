---
title: "Git tricks"
date: "2014-06-26"
tags: [Git, Grep, Linux, macOS, Productivity]
published: true
---

I normally collaborate with multiple people using git and their forks within the
same repository.

I recently started using a nice feature from [Git](https://git-scm.com/) that
allows to fetch several remotes of a give team, allowing me to fetch the remotes
that I care about, checkout their branch, collaborate and move on.

```bash
# sets the default remotes that I want to fetch when working on my branches
git config remotes.default 'origin upstream'
# sets the group of remotes that I want to fetch as a team
git config remotes.team1 'user1 user2 user3 user4'
git config remotes.team2 'user5 user6 user7 user8'
```

You can also add the same user that might be in 2 different teams in case you
want their fork to be updated when fetching the forks of that team.

There are other nice features in git that I use as a daily basis like
`git grep`.\
But one that I use more often that I would think I'd need, is searching the entire
history for code:

```bash
git rev-list --all | xargs git grep <expression>
```

This is specially useful to look for previous code that was removed by a commit.

You can even use it in an easier way by doing:

```bash
git grep <regexp> $(git rev-list --all)
```

I find this more useful, because I normally reuse the previous
`git grep <expression>` command (since I was searching for something already)
and just append the extra part to search for it in the entire history.

If your code base is really big (like most of the repositories I work with), it
will be useful to limit the search to some folder (that you know it didn't
change to another folder, or that was in that folder when it was added, changed
or deleted).

```bash
git grep <regexp> $(git rev-list --all -- some/folder) -- some/folder
```

The reason for passing the path in both commands is because `rev-list` will
return the revisions list where all the changes to lib/util happened, thus
you'll also want to pass to the same folder to `grep` so that it will only
search inside `some/folder`.

Here are some other useful ways of searching your source:

Search working tree for text matching regular expression regexp:

```bash
git grep <regexp>
```

Search working tree for lines of text matching regular expression `regexp1`
and/or `regexp2`:

```bash
# notice that `--or` is optional (since it is the default)
git grep -e <regexp1> [--or] -e <regexp2>
git grep -e <regexp1> --and -e <regexp2>
```

Search working tree for files that have lines of text matching regular
expression `regexp1` and lines of text matching regular expression `regexp2`:

```bash
git grep -l --all-match -e <regexp1> -e <regexp2>
```

Search for changed lines of text matching pattern:

```bash
git diff --unified=0 | grep <pattern>
```

Search all revisions between `rev1` and `rev2` for text matching regular
expression regexp. Useful to search for a change between 2 versions:

```bash
git grep <regexp> $(git rev-list <rev1>..<rev2>)
```

Search for removed code or text:

```bash
git log -S'removed text'
```

If you need something like above, but based on a regular expression you can use
`-G` but it will match differences with added/removed lines that match:

```bash
git log -G<regex>
```

You can find other helpful alias in
[my dotfiles](https://github.com/alias-mac/dotfiles/blob/master/git/gitconfig.symlink.example).

I hope you find these feature as neat as I do! 🎉

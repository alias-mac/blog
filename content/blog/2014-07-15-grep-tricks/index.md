---
title: "Grep tricks"
date: "2014-07-15"
tags: [Grep, Linux, macOS, Productivity]
published: true
---

After some surprise from some folks in the office about my
[previous blog post](/git-tricks), I decided to make another post around `grep`
only.

Search for the given string in a given file or list of files or files that match
a certain pattern:

```bash
grep "string to search for" file1
grep "string to search for" file1 file2
grep "string to search for" file*pattern
```

You can apply the same commands above while doing case insensitive search using
`-i`, like:

```bash
grep -i "case insensitive string to search for" file1
grep -i "case insensitive string to search for" file1 file2
grep -i "case insensitive string to search for" file*pattern
```

Another useful flag to pass is the full word matching `-w`:

```
grep -w "is" file1
```

This won't match things like `this` in the file. Instead if will match only the
`is` word, like spaces around it, commas and other punctuation like `is,` or
`is.` or even `'is'`.

You can also use regular expressions:

```bash
grep <regex> file1
```

Displaying lines before (`-B`) or after (`-A`) or around (`-C`) the match:

```bash
grep -A 5 "string" file1 # 5 lines before
grep -B 3 "string" file1 # 3 lines after
grep -C 2 "string" file1 # 2 lines before and after (total 5 lines)
```

I would also suggest to set `GREP_OPTIONS` in your bash settings to highlight
the matches by default, like I do in
[my dotfiles](https://github.com/alias-mac/dotfiles/blob/master/bash/aliases.bash).
It makes it a lot easier to scan through the results. You can also customize the
colors to your liking using the
[`GREP_COLORS`](https://www.gnu.org/software/grep/manual/html_node/Environment-Variables.html)
environment variable.

I might do another post about `find` command if there are requests for it.

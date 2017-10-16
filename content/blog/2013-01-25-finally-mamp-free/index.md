---
title: "Finally MAMP Free"
date: "2013-01-25"
tags: [MAMP, OS X, Apache, MySQL, PHP, MariaDB]
published: true
---

What I don't like much about [MAMP](http://www.mamp.info) is both the clear separation of the normal and PRO version. Don't get me wrong, you can speed a lot of your "LAMP" setup on a Mac with using MAMP, but for me having to reinstall [xhprof](http://blog.open-war.com/mamp-xhprof), [imap ssl](http://blog.open-war.com/mamp-imap-ssl) and activate [xdebug](http://blog.open-war.com/xdebug-mamp) almost every time I update to latest MAMP (or every time I do a clean install on my Mac) it's painful.

I like to [automate my workflow](https://github.com/alias-mac/dotfiles) as much as possible and therefore I decided that I needed to take the next step on that.

I already use [Homebrew](/homebrew) so I thought it would be easy and clean to just use the best package manager for OS X to setup my MAMP stack (not the MAMP application!).

In this post I'm assuming that you already use Homebrew as well or at least you have it installed. If not, just use [this tutorial](/homebrew) to do it.

## MySQL

Homebrew makes the [MySQL](http://www.mysql.com) install like in Debian, Ubuntu or any Linux with an awesome package manager.

You can install it by just typing `brew install mysql` on your favorite terminal. Then to start it any time you just need to type `mysql.server start`.

## MariaDB FTW

If you prefer to use [MariaDB](https://mariadb.com), like I do, you can also do it easily by typing `brew install mariadb` instead.

Basically everything else is much the same, since [MariaDB is a fork of MySQL](http://en.wikipedia.org/wiki/MariaDB).

If you have some problems with incompatibilities on your Web apps, check their [Knowledge Base](https://mariadb.com/kb/en/MariaDB/).

## Apache

OS X already comes with Apache installed, so I normally use it with my stuff. I just need to tune it for my local development.

How do I do that?

Simply by adding a `<my_username>.conf` file (check for case sensitivity name based on your login name) into `/etc/apache2/users/` folder.

Mine looks more or less like:

```
# Load homebrew php module
LoadModule php5_module /usr/local/lib/libphp5.so

# Use my user since this is my dev machine and save me from chmod/chown problem
User <my_username>
Group staff

ServerAdmin <my_email@open-war.com>

DocumentRoot "/Users/<my_username>/Sites/"

<Directory "/Users/<my_username>/Sites/">
    Options Indexes FollowSymLinks MultiViews
    AllowOverride All
    Order allow,deny
    Allow from all
</Directory>
```

As you can see my `php5_module` isn't pointing to `libexec/apache2/libphp5.so` like the default `/etc/apache2/httpd.conf` is (commented by default). This is because I like to be free to choose my PHP version and to make use of Homebrew to install other things like [XHProf](http://pecl.php.net/package/xhprof) or [PCNTL](http://php.net/manual/en/book.pcntl.php) on my php version. Please read the next section about how to setup different php versions that aren't bundled with OS X.

If you want to use the PHP version bundled with OS X, feel free to change that line to `libexec/apache2/libphp5.so`.

Depending on what version of PHP you chose you might already check if all is going well by navigating to [http://localhost/](http://localhost/) on your favorite Web browser. If it doesn't find it confirm that apache is running `sudo apachectl start`.

## PHP

OS X already comes with a bundled PHP version, but I like to be able to switch between versions (5.3, 5.4 and 5.5).
Thus, I use a [php version of Homebrew](https://github.com/josegonzalez/homebrew-php). Feel free to skip this step if you want to use the bundled version of Mac.

The `README.md` file of [homebrew-php](https://github.com/josegonzalez/homebrew-php) is really well detailed, and I don't think you need to follow my next steps, but just for simplicity, here is how I did it:

- Confirm that you are running Homebrew with the latest `Command Line Tools`. Check [this](/homebrew) if you need to know how to set it up;
- Confirm that Homebrew is ready for action using the `brew doctor` command;
- Confirm that you are up to date :) `brew update && brew upgrade`;
- Setup the homebrew/dupes tap which has dependencies we need `brew tap homebrew/dupes`;
- Run `brew tap josegonzalez/homebrew-php` to get all the needed formulas for our php;
- Install the php version you need `brew install php54` or `php53`;

If you are like me and like to do php switch, link your libphp into `/usr/local/lib/libphp5.so` or the path that you want to use on your apache configuration.

I did ``sudo ln -sf `brew list php53 | grep libphp` /usr/local/lib/libphp5.so``.

To confirm that PHP is correctly installed and that you are using the correct version on your apache, create a file (e.g. `info.php`) inside your doc root folder (in my case `~/Sites/`) with the content:

```php
<?php
phpinfo();
```

Navigate to [http://localhost/info.php](http://localhost/info.php) using your favorite Web browser and you should get all the information about the PHP version that you are using.

**Warning:** Keep in mind that this is just a development friendly setup and for that, don't use these settings on a production environment, since it could open some security holes (like running apache as your user is dangerous). I normally have my servers running Debian or CentOS (linux flavor) and use a workflow to deploy code/apps into production without compromising security (with much more restricted rules) and keep performance at its best.

Feel free to drop a comment if you run into issues.

Enjoy your Mac without MAMP!

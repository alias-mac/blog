---
title: "Securing Drupal"
date: "2013-09-29"
tags: [Drupal, Security]
published: true
---

## Security procedures

There are several things you should do to make your Drupal website more secure, besides making regular updates based on the information provided in [http://drupal.org/security](http://drupal.org/security).

When deploying to a production server, make sure you have the following rules defined on your `.htaccess` file.

```
# Protect some abilities from prying eyes.
<filesmatch>
  Order deny,allow
  deny from all
  Allow from 127.0.0.1
</filesmatch>
```

This will block the access to some Drupal abilities to world wide web users.

Also, read the `INSTALL.txt` file where it says:

```
7. Revoke documentation file permissions (optional).
```

This will recomend you to make your documentation files non-readable. If you are asking yourself why isn't this blocked by an `.htaccess` rule or simply removed, there is a [long discussion](http://drupal.org/node/79018) about it and the final conclusion is defined on this [comment](http://drupal.org/node/79018#comment-718831).

Therefore, after deployment it's recomended to run the following on the servers:

```bash
$ ls *.txt | grep -v robots.txt | xargs chmod a+r
```

This will not make other `.txt` files on contrib or other modules unreadable. If you want to achieve that, you can use the same rule above with a few changes to find all textual files. Keep in mind, though, that if there are any `.txt` files inside any of the `sites/*/files` directory, they must be left readable, or else you won't be able to download it or have other undesirable consequences.

## During development

There are several things you should keep in mind while developing on a Drupal website. One of the most important is to make regular updates during development, so that you can test your modules and features with the latest version of Drupal core and any contrib modules (that you are using). This will also make it easier to make updates after production if required, simply because there isn't too many legacy code to review in case of a security related update is needed.

### File types

Drupal 7 doesn't have one central place to define file upload types that are allowed on your site. Instead, each content type file field can have it's own types defined. You want to be particularly leery of binary formats (.exe, .vbs, etc.) but also be careful about formats that could have embedded binaries (office documents with Flash embedded in them for instance). Be especially careful of files that could be rendered by the web server (such as `.php`, `.phtml`, `.php3` or even `.html` files). Also consider that Internet Explorer does not handle MIME types in the same way as Mozilla Firefox or other browsers do. For instance, Internet Explorer handles `.txt` files with HTML content as HTML content, and this can lead to Stored Cross Site Scripting (XSS) wich is the most dangerous type of Cross Site Scripting.

### Modules

Validate your custom modules and site construction using the following modules:

- [http://drupal.org/project/security_review](http://drupal.org/project/security_review)
- [http://drupal.org/project/coder](http://drupal.org/project/coder)
- [http://drupal.org/project/secure_code_review](http://drupal.org/project/secure_code_review) (not tested)

They will avoid many of the easy-to-make mistakes that render your site insecure.

Try to avoid pre-release or dev contrib modules since security group doesn't support them (see [http://drupal.org/node/475848](http://drupal.org/node/475848)). It's important to understand the risk of not having security support for these releases.

Try to keep only the modules that are really required active. Disable modules like  `ctools_ajax_sample` or others that bring no required functionality to the final user and daily basis usage.

### Roles

Create a role for a manager of the website with all the permissions needed to make the daily management so that the admin user isn't used unless it's realy needed.

Be wary of any permission listed at [http://drupal.org/security-advisory-policy](http://drupal.org/security-advisory-policy):

- Administer filters
- Administer users
- Administer permissions
- Administer content types
- Administer site configuration
- Administer views
- Translate interface

Guard those permissions jealously. It's worth considering creating a third group between "Authenticated user" and "Administrator" and limiting these permissions to just "Administrator" roles.

### Production deployment checklist

- UID 1 account name isn't the default "admin"
- UID 1 account has a good and strong password
- Drupal logs are active
  - dblog - if you need to do check for errors/warnings during the monitoring and controlling stage of the project
  - syslog - so that if your the website was compromised an attacker wouldn't be able to delete the logs simply by manipulating the database
- Adjust logging capacity so that errors aren't displayed to the screen
- Be wary of any permission listed at [http://drupal.org/security-advisory-policy](http://drupal.org/security-advisory-policy) (yes again...)
- Confirm that unneeded modules are disabled, e.g.:
  - views_ui
  - rules_admin
  - field_ui
  - devel
  - devel_generate
  - contextual
  - diff
- Root account isn't being used to access the database
- Don't allow the web server to write to any files or directories that aren't necessary (normally only `sites/*/files/` should be writable by the web server)

### Other security information

For more information about other security issues follow the [OWASP articles](https://www.owasp.org/) and the [top ten issues](https://www.owasp.org/index.php/OWASP_Top_Ten_Cheat_Sheet).

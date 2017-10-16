---
title: "Validation on vardefs"
date: "2013-07-13"
tags: [SugarCRM]
published: true
---

While working with [SugarCRM](http://www.sugarcrm.com), I noticed that a lot of developers tend to do validations using JS and Logic Hooks while they could just use a more cool feature that exists probably since 5.x.

It just needs a few tweaks on `vardefs.php` file. Imagine that you have a integer field defined in vardefs and you want to make sure that the user only inputs data within the `110` and `65535` range. You could just add this to the vardef:

```php
$dictionary['<Module>']['fields']['my_field'] = array(
    // name and other properties for this field
    'type' => 'int',
    'validation' => array(
        'type' => 'range',
        'min' => '110',
        'max' => '65535',
    ),
    // rest of the vardef info
);
```

This can also be done to change current vardef fields that already exist on a certain module.

```php
$dictionary['<ExistingModule>']['fields']['existing_field']['validation'] = array(
    'type' => 'range',
    'min' => '110',
    'max' => '65535',
);
```

So, what other validations we can use? There is the `range` (normally applied to numbers) and the `isbefore` (normally applied to dates). Then you can have a `callback` which allows you to define a function to validate, but I usually use it for both custom validation and JS listener to update another field or make a custom request to the server.

The `isbefore` validation normally needs another field to compare to:

```php
$dictionary['<Module>']['fields']['my_field'] = array(
    // name and other properties for this field
    'type' => 'date', // or datetimecombo
    'validation' => array (
        'type' => 'isbefore',
        'compareto' => 'end_date',
        'blank' => true, // this will allow blanks or not
    ),
    // rest of the vardef info
);
```

Let me know if you find more of this stuff useful and I'll start posting more of it!

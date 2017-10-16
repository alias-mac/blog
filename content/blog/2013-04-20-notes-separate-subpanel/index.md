---
title: "Notes as separate subpanel"
date: "2013-04-20"
tags: [SugarCRM, SugarCRM 6.x]
published: true
---

A while ago, I was asked to do a quick favor on a customer's [SugarCRM](http://www.sugarcrm.com) 6.x instance to separate the Notes sub panel entry into their own sub panel (normally it's shown in History sub panel).

Basically the request was to make a separate Notes panel that would have the description field shown in full, so that they could just see everything on Accounts' Detail views (normally that information is shown on a popup triggered by the "View Summary" button).

I wrote a quick package back then, but here is how you can do it:

Start by creating a file in `custom/modules/Notes/metadata/` folder. I'm calling it `FullDescription.php` and this is what was set (based on their request):

```php
$subpanel_layout = array(
    'top_buttons' => array(
        array('widget_class' => 'SubPanelTopCreateNoteButton'),
        array('widget_class' => 'SubPanelTopArchiveEmailButton'),
        array('widget_class' => 'SubPanelTopSummaryButton'),
    ),
    'where' => '',
    'list_fields' => array(
        'object_image' => array(
            'vname' => 'LBL_OBJECT_IMAGE',
            'widget_class' => 'SubPanelIcon',
            'width' => '2%',
            'image2' => 'attachment',
            'image2_url_field' => array(
                'id_field' => 'id',
                'filename_field' => 'filename',
            ),
        ),
        'created_by' => array(
            'vname' => 'LBL_CREATED_BY',
            'width' => '10%',
        ),
        'date_entered' => array(
            'vname' => 'LBL_DATE_ENTERED',
            'width' => '10%',
        ),
        'description' => array(
            'vname' => 'LBL_DESCRIPTION',
            'widget_class' => 'SubPanelDetailViewLink',
            'width' => '80%',
        ),
        'edit_button' => array(
            'vname' => 'LBL_EDIT_BUTTON',
            'widget_class' => 'SubPanelEditButton',
            'module' => 'Notes',
            'width' => '5%',
        ),
        'remove_button' => array(
            'vname' => 'LBL_REMOVE',
            'widget_class' => 'SubPanelRemoveButton',
            'width' => '2%',
        ),
        'file_url' => array(
            'usage' => 'query_only'
        ),
        'filename' => array(
            'usage' => 'query_only'
        ),
    ),
);
```

On a side note, and since we are talking about metadata files, please **don't** add the security code block on the top:

```php
if (!defined('sugarEntry') || !sugarEntry) {
    die('Not A Valid Entry Point');
}
```

This is useless, because the file doesn't produce output and if someone accesses the file directly (e.g.: [http://mysugar.com/custom/modules/Notes/metadata/FullDescription.php](http://mysugar.com/custom/modules/Notes/metadata/FullDescription.php)) will just have an empty white page. Meaning, no security risk at all.

Also, try to follow the PSR-2 coding styles and [don't close the php tag on files containing only PHP code](https://github.com/php-fig/fig-standards/blob/master/accepted/PSR-2-coding-style-guide.md#22-files).

When in doubt about best practices, please read or search [http://www.phptherightway.com](http://www.phptherightway.com).

Ok, side note aside, how can you tell Accounts to use the new Notes sub panel list definition and remove the Notes from the History sub panel?

Write a file in `custom/Extension/modules/Accounts/Ext/Layoutdefs/`, I'm calling it `Notes.php`, since I normally keep a meaningfull structure to easily find customizations, with the content:

```php
<?php

// remove Notes from history panel
unset($layout_defs['Accounts']['subpanel_setup']['history']['collection_list']['notes']);

// remove the "View Summary" button
$layout_defs['Accounts']['subpanel_setup']['history']['top_buttons'] = array(
    array('widget_class' => 'SubPanelTopArchiveEmailButton'),
);

// new sub panel pointing to the new list view fields
$layout_defs['Accounts']['subpanel_setup']['notes'] = array(
    'order' => 5,
    'module' => 'Notes',
    'override_subpanel_name' => 'FullDescription',
    'subpanel_name' => 'ForHistory',
    'sort_order' => 'desc',
    'sort_by' => 'date_created',
    'title_key' => 'LBL_NOTES_SUBPANEL_TITLE',
    'get_subpanel_data' => 'notes',
    'top_buttons' => array(
        array('widget_class' => 'SubPanelTopButtonQuickCreate'),
        array('widget_class' => 'SubPanelTopSummaryButton'),
    ),
);
```

Now we are just missing the label for this new sub panel (see the new untranslated label `LBL_NOTES_SUBPANEL_TITLE`). In order to do that, just create a `en_us.Notes.php` file in `custom/Extension/modules/Accounts/Ext/Language/`, since in this case I'm only supporting English US for this customization (just add more `*.Notes.php` files for the language packs you are supporting), with the content:

```php
<?php

$mod_strings['LBL_NOTES_SUBPANEL_TITLE'] = 'Notes';
```

When all the files are in place, run `Quick Repair and Rebuild` from the `Administration > Repair` page.

You'll now see any Account detail view with the new Notes sub panel on the top, and the History sub panel without the related Notes records.

If you want to apply the same behavior on other modules, you only need to replicate the `custom/Extension/modules/Accounts/Ext/*` shown above, and modify it to the Module you want to change (e.g.: simply replace Accounts for Contacts). Don't forget to always hit `Quick Repair and Rebuild` to see your changes being applied.

For more information about the Layoutdefs, please see the [Sugar Developer Documentation](http://support.sugarcrm.com/02_Documentation/04_Sugar_Developer/Sugar_Developer_Guide_6.5/04_Extension_Framework/Extensions/Layoutdefs).

Finally, you can after [create a package](http://support.sugarcrm.com/04_Find_Answers/03_Developers/Module_Loader/Introduction_to_the_Manifest_File) with this code if needed to be uploaded to a production environment using the Module Loader.

Enjoy your new customization!

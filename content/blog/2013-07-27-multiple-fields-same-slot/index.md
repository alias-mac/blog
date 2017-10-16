---
title: "Multiple fields on same slot"
date: "2013-07-27"
tags: [SugarCRM, SugarCRM 6.x]
published: true
---

When using [SugarCRM](http://www.sugarcrm.com), some clients might ask to agregate several fields on just one slot on detail views or edit views, because the fields are related or just because they make sense together.

While Studio doesn't provide you with that option, you can do it easily by changing the metadata files for both detail and edit views. Lets see how:

```php
$viewdefs['<Module>']['<EditView|DetailView>'] = array(
    'panels' => array(
        'lbl_my_panel' => array(
            // 1 slot
            array (
                'name' => 'my_slot_field',
                'comment' => 'This is one slot with multiple fields',
                'label' => 'LBL_MY_FIELD',
                'fields' => array(
                    // list of fields that are part of the slot
                    array(
                        'name' => 'first_field',
                    ),
                    array(
                        'name' => 'second_field',
                    ),
                ),
            ),
        ),
    ),
);
```

So a common use case is something like SLA on a contract, where you have an integer (amount) and a unit (hours, days, etc.). So that would look something like:

```php
$viewdefs['<Module>']['<EditView|DetailView>'] = array(
    'panels' => array(
        'lbl_contract_info' => array(
            array (
                'name' => 'sla',
                'comment' => 'Contract SLA',
                'label' => 'LBL_SLA',
                'displayParams' => array(
                    'required' => false,
                ),
                'fields' => array(
                    array(
                        'name' => 'sla',
                        // a few UI adjustments
                        'displayParams' => array (
                            'size' => 5,
                            'maxlength' => 5,
                        ),
                    ),
                    array(
                        // enum (aka dropdown) field
                        'name' => 'sla_unit',
                    ),
                ),
            ),
        ),
    ),
);
```

Now make good use of it!

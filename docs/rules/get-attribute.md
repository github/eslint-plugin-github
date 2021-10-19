# Get Attribute

## Rule Details

As HTML attributes are case insensitive, prefer using lowercase.

👎 Examples of **incorrect** code for this rule:

```js
el.getAttribute('autoComplete')
el.getAttribute('dataFoo')
```

👍 Examples of **correct** code for this rule:

```js
el.getAttribute('autocomplete')
el.getAttribute('data-foo')
```

## When Not To Use It

TODO

## Version

4.3.2

# Get Attribute

## Rule Details

As HTML attributes are case insensitive, prefer using lowercase.

👎 Examples of **incorrect** code for this rule:

```js
el.getAttribute('autoComplete')
```

```js
el.getAttribute('dataFoo')
```

👍 Examples of **correct** code for this rule:

```js
el.getAttribute('autocomplete')
```

```js
el.getAttribute('data-foo')
```

## Version

4.3.2

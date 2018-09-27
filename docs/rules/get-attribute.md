# getAttribute

As HTML attributes are case insensitive, prefer using lowercase.

```js
// bad
el.getAttribute('autoComplete')
el.getAttribute('dataFoo')

// good
el.getAttribute('autocomplete')
el.getAttribute('data-foo')
```

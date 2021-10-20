# No D None

## Rule Details

Ideally JavaScript behaviors should not rely on Primer CSS when the `hidden` property can be used.

👎 Examples of **incorrect** code for this rule:

```js
div.classList.add('d-none')
```

👍 Examples of **correct** code for this rule:

```js
div.hidden = false
```

## Version

4.3.2

# No InnerText

## Rule Details

👎 Examples of **incorrect** code for this rule:

```js
const el = document.createElement('div')
el.innerText = 'foo'
```

👍 Examples of **correct** code for this rule:

```js
const el = document.createElement('div')
el.textContent = 'foo'
```

## Version

4.3.2

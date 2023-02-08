# Disallow `Element.prototype.innerText` in favor of `Element.prototype.textContent` (`github/no-innerText`)

💼 This rule is enabled in the 🔍 `browser` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

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

# github/get-attribute

📝 Disallow wrong usage of attribute names.

💼 This rule is enabled in the 🔍 `browser` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

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

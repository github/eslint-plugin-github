# Enforce usage of `Element.prototype.getAttribute` instead of `Element.prototype.datalist` (`github/no-dataset`)

💼 This rule is enabled in the 🔍 `browser` config.

<!-- end auto-generated rule header -->

## Rule Details

Due to [camel-case transformations](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#Name_conversion), using dataset is not easily greppable. Instead, use `el.getAttribute('data-what-ever')`.

👎 Examples of **incorrect** code for this rule:

```js
el.dataset.coolThing
```

👍 Examples of **correct** code for this rule:

```js
el.getAttribute('data-cool-thing')
```

## Version

4.3.2

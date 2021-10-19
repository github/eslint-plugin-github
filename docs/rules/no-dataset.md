# No Dataset

## Rule Details

Due to [camel-case transformations](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset#Name_conversion), using dataset is not easily greppable. Instead, use `el.getAttribute('data-what-ever')`.

👎 Examples of **incorrect** code for this rule:

```js

```

👍 Examples of **correct** code for this rule:

```js

```

## When Not To Use It

TODO

## Version

4.3.2

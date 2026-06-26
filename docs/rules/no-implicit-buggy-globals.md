# github/no-implicit-buggy-globals

📝 Disallow implicit global variables.

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule Details

👎 Examples of **incorrect** code for this rule:

```js
var foo = 1
```

👍 Examples of **correct** code for this rule:

```js
;(function () {
  const foo = 1
})()
```

## Version

4.3.2

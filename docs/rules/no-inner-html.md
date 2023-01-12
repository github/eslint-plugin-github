# Disallow `Element.prototype.innerHTML` in favor of `Element.prototype.textContent` (`github/no-inner-html`)

💼 This rule is enabled in the 🔍 `browser` config.

<!-- end auto-generated rule header -->

## Rule Details

Using `innerHTML` poses a potential security risk. Prefer using `textContent` to set text to an element.

[Related security notification](https://github.com/github/paste-markdown/security/advisories/GHSA-gpfj-4j6g-c4w9)

It may be reasonable to disable this rule in testing setups that use known, trusted input and carry little security risk.

👎 Examples of **incorrect** code for this rule:

```js
function setContent(element, content) {
  element.innerHTML = content
}
```

👍 Examples of **correct** code for this rule:

```js
function setContent(element, content) {
  element.textContent = content
}
```

## Version

4.3.2

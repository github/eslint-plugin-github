# No Inner HTML

## Rule Details

Using `innerHTML` poses a potential security risk. Prefer using `textContent` to set text to an element.

https://github.com/github/paste-markdown/security/advisories/GHSA-gpfj-4j6g-c4w9

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

## When Not To Use It

TODO

## Version

4.3.2

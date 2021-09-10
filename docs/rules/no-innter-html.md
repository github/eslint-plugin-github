# No `innerHTML`

Using `innerHTML` poses a potential security risk. Prefer using `textContent` so set text to an element.

```js
// bad
function setContent(element, content) {
  element.innerHTML = content
}

// good
function setContent(element, content) {
  element.textContent = content
}
```

## See Also

https://github.com/github/paste-markdown/security/advisories/GHSA-gpfj-4j6g-c4w9

# No `innerHTML`

Using `innerHTML` poses a potential security risk. It should only be used when clearing content.

```js
// bad
function setContent(element, content) {
  element.innerHTML = content
}

// good
function clearContent(element) {
  element.innerHTML = ''
}
```

## See Also

https://github.com/github/paste-markdown/security/advisories/GHSA-gpfj-4j6g-c4w9

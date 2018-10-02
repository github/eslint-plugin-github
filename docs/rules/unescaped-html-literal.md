# Avoid unescaped HTML string literals

Constructing raw HTML with string literals is error prone and may lead to security issues.

Instead use [`lit-html`](https://github.com/Polymer/lit-html)'s `html` tagged template literal to safely construct HTML literal strings. Alternatively, you can use document builder APIs like `document.createElement`.

```js
// bad
const title = `<h1>Hello ${name}!</h1>`

// good
const title = html`<h1>Hello ${name}!</h1>`

// also good
const title = document.createElement('h1')
title.textContent = `Hello ${name}!`
```

## See Also

https://github.com/Polymer/lit-html

# Unescaped HTML Literal

## Rule Details

Constructing raw HTML with string literals is error prone and may lead to security issues.

Instead use [`lit-html`](https://github.com/Polymer/lit-html)'s `html` tagged template literal to safely construct HTML literal strings. Alternatively, you can use document builder APIs like `document.createElement`.

👎 Examples of **incorrect** code for this rule:

```js
const title = `<h1>Hello ${name}!</h1>`
```

👍 Examples of **correct** code for this rule:

```js
// good
const title = html`<h1>Hello ${name}!</h1>`
```

```js
// also good
const title = document.createElement('h1')
title.textContent = `Hello ${name}!`
```

## When Not To Use It

TODO

## Version

4.3.2

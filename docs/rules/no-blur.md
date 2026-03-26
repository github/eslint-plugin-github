# github/no-blur

📝 Disallow usage of `Element.prototype.blur()`.

💼 This rule is enabled in the 🔍 `browser` config.

<!-- end auto-generated rule header -->

Do not use `element.blur()`. Blurring an element causes the focus position to be reset causing accessibility issues when using keyboard or voice navigation. Instead, restore focus by calling `element.focus()` on a prior element.

## Rule Details

- [Use of `blur()` is discouraged by WHATWG HTML spec](https://html.spec.whatwg.org/multipage/interaction.html#dom-blur)

👎 Examples of **incorrect** code for this rule:

```js
menu.addEventListener('close', () => {
  input.blur()
})
```

👍 Examples of **correct** code for this rule:

```js
menu.addEventListener('open', () => {
  const previouslyFocusedElement = document.activeElement

  input.focus()

  menu.addEventListener('close', () => {
    previouslyFocusedElement.focus()
  })
})
```

## Version

4.3.2

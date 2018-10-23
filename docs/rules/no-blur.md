# No `element.blur()`

Do not use `element.blur()`. Blurring an element causes the focus position to be reset causing accessibility issues when using keyboard or voice navigation. Instead, restore focus by calling `element.focus()` on a prior element.

```js
// bad
menu.addEventListener('close', () => {
  input.blur()
})

// good
menu.addEventListener('open', () => {
  const previouslyFocusedElement = document.activeElement

  input.focus()

  menu.addEventListener('close', () => {
    previouslyFocusedElement.focus()
  })
})
```

## See Also

- [Use of `blur()` is discouraged by WHATWG HTML spec](https://html.spec.whatwg.org/multipage/interaction.html#dom-blur)

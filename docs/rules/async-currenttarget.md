# `event.currentTarget` in an async function

Accessing `event.currentTarget` inside an `async function()` will likely be `null` as `currentTarget` is mutated as the event is propagated.

```js
// bad
document.addEventListener('click', async function(event) {
  // event.currentTarget will be an HTMLElement
  const url = event.currentTarget.getAttribute('data-url')
  const data = await fetch(url)

  // But now, event.currentTarget will be null
  const text = event.currentTarget.getAttribute('data-text')
  // ...
})
```

1.  A `click` event is dispatched
2.  The handler is invoked once with the expected `currentTarget`
3.  An `await` defers the execution
4.  The event dispatch continues, `event.currentTarget` is modified to point to the current target of another event handler and nulled out at the end of the dispatch
5.  The async function resumes
6.  `event.currentTarget` is now `null`

## Solutions

If you're using `async`, you'll need to synchronously create a reference to `currentTarget` before any async activity.

```js
// good
document.addEventListener('click', function(event) {
  const currentTarget = event.currentTarget
  const url = currentTarget.getAttribute('data-url')

  // call async IIFE
  ;(async function() {
    const data = await fetch(url)

    const text = currentTarget.getAttribute('data-text')
    // ...
  })()
})
```

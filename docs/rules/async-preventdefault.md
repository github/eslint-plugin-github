# Disallow `event.preventDefault` calls inside of async functions (`github/async-preventdefault`)

💼 This rule is enabled in the 🔍 `browser` config.

<!-- end auto-generated rule header -->

Using `event.preventDefault()` inside an `async function()` won't likely work as you'd expect because synchronous nature of event dispatch.

## Rule Details

1.  A `click` event is dispatched
2.  This handler is scheduled but not ran immediately because its marked async.
3.  The event dispatch completes and nothing has called `preventDefault()` _yet_ and the default click behavior occurs.
4.  The async function is scheduled and runs.
5.  Calling `preventDefault()` is now a no-op as the synchronous event dispatch has already completed.

If you're using `async`, you likely need to wait on a promise in the event handler. In this case you can split the event handler in two parts, one synchronous and asynchronous.

👎 Examples of **incorrect** code for this rule:

```js
document.addEventListener('click', async function (event) {
  const data = await fetch()

  event.preventDefault()
})
```

👍 Examples of **correct** code for this rule:

```js
document.addEventListener('click', function (event) {
  // preventDefault in a regular function
  event.preventDefault()

  // call async helper function
  loadData(event.target)
})

async function loadData(el) {
  const data = await fetch()
  // ...
}
```

This could also be done with an async IIFE.

```js
document.addEventListener('click', function (event) {
  // preventDefault in a regular function
  event.preventDefault()

  // call async IIFE
  ;(async function () {
    const data = await fetch()
    // ...
  })()
})
```

## Version

4.3.2

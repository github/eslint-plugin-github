# `event.preventDefault()` in an async function

Using `event.preventDefault()` inside an `async function()` won't likely work as you'd expect because synchronous nature of event dispatch.

```js
// bad
document.addEventListener('click', async function(event) {
  event.preventDefault()

  const data = await fetch()
  // ...
})
```

1. A `click` event is dispatched
2. This handler is scheduled but not ran immediately because its marked async.
3. The event dispatch completes and nothing has called `preventDefault()` _yet_ and the default click behavior occurs.
4. The async function is scheduled and runs.
5. Calling `preventDefault()` is now a no-op as the synchronous event dispatch has already completed.

## Solutions

If you're using `async`, you likely need to wait on a promise in the event handler. In this case you can split the event handler in two parts, one synchronous and asynchronous.

```js
// good
document.addEventListener('click', function(event) {
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
// good
document.addEventListener('click', function(event) {
  // preventDefault in a regular function
  event.preventDefault()(
    // call async IIFE
    async function() {
      const data = await fetch()
      // ...
    }
  )()
})
```

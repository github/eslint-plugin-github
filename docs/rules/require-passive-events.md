# Require Passive Events

This rule enforces adding `passive: true` to high frequency event listeners (`touchstart`, `touchmove`, `wheel`, `mousewheel`).

## Rule Details

Adding these events listeners can block the main thread as it waits to find out if the callbacks call `preventDefault`. This can cause large amounts UI lag, which will be noticeable for users.

Adding `passive: true` informs the browser that this event will not be calling `preventDefault` and as such is safe to asynchronously dispatch, freeing up the main thread for lag-free operation.

See also: https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners

👎 Examples of **incorrect** code for this rule:

```js
// bad
window.addEventListener('touchstart', () => {
  /* ... */
})
```

👍 Examples of **correct** code for this rule:

```js
// good
window.addEventListener(
  'touchstart',
  () => {
    /* ... */
  },
  {passive: true}
)
```

## Version

4.3.2

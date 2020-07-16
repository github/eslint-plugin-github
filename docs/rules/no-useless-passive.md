# No Useless Passive

This rule disallows setting `passive: true` for events on which it will have no effect.

Events where `passive: true` has an effect are: `touchstart`, `touchmove`, `wheel`, and `mousewheel`.

```js
// bad (passive has no effect here)
window.addEventListener('scroll', () => { /* ... */ }, { passive: true })

// good
window.addEventListener('scroll', () => { /* ... */ })
```

## Why? 

Adding `passive: true` informs the browser that this event will not be calling `preventDefault` and as such is safe to asynchronously dispatch, freeing up the main thread for lag-free operation. However many events are not cancel-able and as such setting `passive: true` will have no effect on the browser.

It is safe to leave the option set, but this may have a negative effect on code authors, as they might believe setting `passive: true` has a positive effect on their operations, leading to a false-confidence in code with `passive: true`. As such, removing the option where it has no effect demonstrates to the code author that this code will need to avoid expensive operations as this might have a detrimental affect on UI performance.

## See Also

https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Improving_scrolling_performance_with_passive_listeners

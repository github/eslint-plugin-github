# Prever Observers

Some events, such as `scroll` and `resize` have traditionally caused performance issues on web pages, as they are high frequency events, firing many times per second as the user interacts with the page viewport.

## Scroll vs IntersectionObserver

Typically `scroll` events are used to determine if an element is intersecting a viewport, which can result in expensive operations such as layout calculations, which has a detrimental affect on UI performance. Recent developments in web standards have introduced the `IntersectionObserver`, which is a more performant mechanism for determining if an element is intersecting the viewport.

```js
// bad, expensive, error-prone code to determine if the element is in the viewport;
window.addEventListener('scroll', () => {
  const isIntersecting = checkIfElementIntersects(element.getBoundingClientRect(), window.innerHeight, document.clientHeight)
  element.classList.toggle('intersecting', isIntersecting)
})

// good - more performant and less error-prone
const observer = new IntersectionObserver(entries => {
  for(const {target, isIntersecting} of entries) {
    target.classList.toggle(target, isIntersecting)
  }
})
observer.observe(element)
```

## Resize vs ResizeObserver

Similarly, `resize` events are typically used to determine if the viewport is smaller or larger than a certain size, similar to CSS media break points. Similar to the `IntersectionObserver` the `ResizeObserver` also exists as a more performant mechanism for observing changes to the viewport size.

```js
// bad, low-performing code to determine if the element is less than 500px large
window.addEventListener('resize', () => {
  element.classList.toggle('size-small', element.getBoundingClientRect().width < 500)
})

// good - more performant, only fires when the actual elements change size
const observer = new ResizeObserver(entries => {
  for(const {target, contentRect} of entries) {
    target.classList.toggle('size-small', contentRect.width < 500)
  }
})
observer.observe(element)
```

## See Also

https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
https://developer.mozilla.org/en-US/docs/Web/API/Resize_Observer_API

# Array.forEach

Prefer `for...of` statement instead of `Array.forEach`.

``` js
// bad
els.forEach(el => {
  el
})

// good
for (const el of els) {
  el
}
```

## See Also

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

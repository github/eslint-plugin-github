# No `Promise.then`

Yes, you should use promises, but prefer `async`/`await` syntax instead of `Promise.then()` callback chaining.

```js
// bad
function getProcessedData(url) {
  return downloadData(url)
    .catch(e => {
      return downloadFallbackData(url)
    })
    .then(v => {
      return processDataInWorker(v)
    })
}

// good
async function getProcessedData(url) {
  let v
  try {
    v = await downloadData(url)
  } catch (e) {
    v = await downloadFallbackData(url)
  }
  return processDataInWorker(v)
}
```

## See Also

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

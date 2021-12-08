# No Then

## Rule Details

Yes, you should use promises, but prefer `async`/`await` syntax instead of `Promise.then()` callback chaining.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

👎 Examples of **incorrect** code for this rule:

```js
function getProcessedData(url) {
  return downloadData(url).catch(e => {
    console.log('Error occurred!', e)
  })
}
```

👍 Examples of **correct** code for this rule:

```js
async function getProcessedData(url) {
  let v
  try {
    v = await downloadData(url)
  } catch (e) {
    console.log('Error occurred!', e)
    return
  }
  return v
}
```

## Version

4.3.2

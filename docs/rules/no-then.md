# github/no-then

📝 Enforce using `async/await` syntax over Promises.

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

## Rule Details

Yes, you should use promises, but prefer `async`/`await` syntax instead of `Promise.then()` callback chaining.

https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function

👎 Examples of **incorrect** code for this rule:

```js
function countData(url) {
  return downloadData(url).then(data => {
    return data.length
  })
}
```

```js
function getProcessedData(url) {
  return downloadData(url).catch(e => {
    console.log('Error occurred!', e)
    return null;
  })
}
```

👍 Examples of **correct** code for this rule:

```js
async function countProcessedData(url) {
  const data = await downloadData(url);
  return data.length
}
```

```js
async function getProcessedData(url) {
  try {
    return await downloadData(url)
  } catch (e) {
    console.log('Error occurred!', e);
    return null;
  }
}
```

## Version

4.3.2

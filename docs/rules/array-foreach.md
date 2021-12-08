# Array Foreach

Prefer `for...of` statement instead of `Array.forEach`.

## Rule Details

Here's a summary of why `forEach` is disallowed, and why we prefer `for...of` for almost any use-case of `forEach`:

- Allowing `forEach` encourages **layering of "bad practices"**, such as using `Array.from()` (which is less performant than using `for...of`).
- When more requirements are added on, `forEach` typically gets **chained** with other methods like `filter` or `map`, causing multiple iterations over the same Array. Encouraging `for` loops discourages chaining and encourages single-iteration logic (e.g. using a `continue` instead of `filter`).
- `for` loops are considered "more readable" and have **clearer intent**.
- `for...of` loops offer the **most flexibility** for iteration (especially vs `Array.from`).

Typically developers will reach for a `forEach` when they want to iterate over a set of items. However not all "iterables" have access to Array methods. So a developer might convert their iterable to an Array by using `Array.from(iter).forEach()`. This code has introduced performance problems, where a `for...of` loop would be more performant.

`forEach` does not do anything special with the Array - it does not create a new array or does not aid in encapsulation (except for introducing a new lexical scope within the callback, which isn't a benefit considering we use `let`/`const`). We don't disallow `map`/`filter`/`reduce` because they have a tangible effect - they create a new array - which would take _more_ code and be _less_ readable to do with a `for...of` loop, the exception being as more requirements are added, and we start chaining array methods together...

Often when using a method like `forEach` - when coming back to add new code, let's say to filter certain elements from the Array before operating on them, a developer is implicitly encouraged to use Array's method chaining to achieve this result. For example if we wanted to filter out bad apples from an Array of Apples, if the code already uses `forEach`, then its a simple addition to add `filter()`:

```diff
 apples
+  .filter(apple => !apple.bad)
    .forEach(polishApple)
```

The problem we now have is that we're iterating multiple times over the items in a collection. Using `forEach` to begin with is what encouraged the chaining, if this were a `for` loop then the equivalent behavior would be to use 2 `for` loops, which a developer is far less likely to write, so the `for` loop instead encourages an imperative style `continue`, keeping within a single set of iterations:

```diff
 for(const apple of apples) {
+   if (apple.bad) continue
   polishApple(apple)
 }
```

Changing isn't always necessarily bad. Chaining can advertise a series of transformations that are independent from one another, and therefore aid readability. Additionally, sometimes the "goto-style" behavior of `continue` in for loops can hamper readability. For small Arrays, performance is not going to be of concern, but caution should be applied where there is a potentially unbounded Array (such as iterating over a fetched users list) as performance can easily become a bottleneck when unchecked.

The `forEach` method passes more than just the current item it is iterating over. The signature of the `forEach` callback method is `(cur: T, i: Number, all: []T) => void` and it can _additionally_ override the `receiver` (`this` value), meaning that often the _intent_ of what the callback does is hidden. To put this another way, there is _no way_ to know what the following code operates on without reading the implementation: `forEach(polishApple)`.

The `for` loop avoids this issue. Calls are explicit within the `for` loop, as they are not passed around. For example:

```js
for (const apple of apples) {
  polishApple(apple)
}
```

We know this code can only possibly mutate `apple`, as the return value is discarded, there is no `receiver` (`this` value) as `.call()` is not used, and it cannot operate on the whole array of `apples` because it is not passed as an argument. In this respect, we can establish what the intent of `polishApple(apple)` is far more than `forEach(polishApple)`. It is too easy for `forEach` to obscure the intent.

While `forEach` provides a set of arguments to the callback, it is still overall _less flexible_ than a `for` loop. A `for` loop can conditionally call the callback, can pass additional arguments to the callback (which would otherwise need to be hoisted or curried), can opt to change the `receiver` (`this` value) or not pass any `receiver` at all. This extra flexibility is the reason we almost always prefer to use `for` loops over any of the Array iteration methods.

A good example of how `for` loops provide flexibility, where `forEach` constrains it, is to see how an iteration would be refactored to handle async work. Consider the following...

```js
apples.forEach(polishApple)
// vs...
for (const apple of apples) {
  polishApple(apple)
}
```

If `polishApple` needed to do some serial async work, then we'd need to refactor the iteration steps to accommodate for this async work, by `await`ing each call to `polishApple`. We cannot simply pass an `async` function to `forEach`, as it does not understand async functions, instead we'd have to turn the `forEach` into a `reduce` and combine that with a `Promise` returning function. For example:

```diff
- apples.forEach(polishApple)
+ await apples.reduce((cur, next) => cur.then(() => polishApple(next)), Promise.resolve())
```

Compare this to the `for` loop, which has a much simpler path to refactoring:

```diff
 for (const apple of apples) {
-  polishApple(apple)
+  await polishApple(apple)
 }
```

See also https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of

👎 Examples of **incorrect** code for this rule:

```js
els.forEach(el => {
  el
})
```

👍 Examples of **correct** code for this rule:

```js
for (const el of els) {
  el
}
```

## Version

4.3.2

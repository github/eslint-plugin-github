# Edge 15-17 Destructuring Bug

There's an interesting bug within Edge 15-17 where if you use _object destructuring_ with _default assignments_ _only_ on the _second_ argument of an _arrow function_, then you'll get a SyntaxError. In other words:

   - `({a}) => a` ✔️ passes
   - `({a}, {b}) => a + b` ✔️ passes
   - `({a = 1}, {b}) => a + b` ✔️ passes
   - `({a = 1}, {b = 1}) => a + b`  ✔️ passes
   - `(a, {b}) => a + b`  ✔️ passes
   - `(a, {b = 1}) => a + b` ❌ SyntaxError
   - `([a], {b=1}) => a + b` ❌ SyntaxError
   - `([a=1], {b=1}) => a + b` ❌ SyntaxError
   - `(a, {b=1} = {}) => a + b` ✔️ passes
   - `function (a, {b = 1}) { return a + b }`  ✔️ passes
    
A faily exhaustive set of rules to trigger this error:

 - It has to be an arrow function, anonymous `function`s work fine.
 - If the first argument is object destructuring with defaults, it fixes the error.
 - Subsequent arguments must use defaults, if you're just destructuring without defaults it works fine.
 
## What is the Fix?

The most straight forward fix is to stop using destructuring with defaults on your second parameter. There are several options to avoid this, going from most straightforward to least straightforward:

 - Use an anonymous function expression, instead of an arrow function. Change `(a, { b = 1 }) => {}` to `function(a, { b = 1}) {}`
 - Ensure to assign the destructuring expression to an object: change `(a, { b = 1 }) => {}` to `(a, { b = 1 } = {}) => {}`
 - Destructure in the function body: change `(a, { b = 1 }) => {}` to `(a, o) => { let {b = 1} = o }`
 - Default the arguments in the function body: change `(a, { b = 1 }) => {}` to `(a, { b }) => { b = b || 1 }`
 - If you can, destructure the first argument and use defaults. I'm not going to add an example because this fix will hugely depend on your code - only do this if you're confident enough to do so.


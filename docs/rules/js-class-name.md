# JS Class Name

JavaScript should only query and handle events for `js-` prefixed class names.

## Rule Details

The key benefit is that these symbols can be easily searched for.

Looking at HTML, you can find the implementation of any event handler targeting the element. And from any JS file, you can find all the templates using the event handler.

Since its easy for humans to cross reference usage sites and implementation, so can machines. Linters can scan the code base for unused JS event handlers or markup that is still referencing an nonexistent behavior.

In order to trust this system, all `js-` class names MUST be statically written as string literals. This means no dynamically constructed strings by interpolation. For the same reason, `obj.send("can_#{sym}?")` makes you feel bad deep down inside, so should `querySelector("js-" + sym)`.

Typically dynamically constructed `js-` classes are often mixing static symbols and user data together. Like `"js-org-#{org.login}"`. In this case, separating into a `data-` attribute would be a better solution.

```html
<div class="js-org-update" data-org-name="<%= org.login %>"></div>
```

Allows you to select elements by `js-org-update` and still filter by the `data-org-name` attribute if you need to. Both `js-org-update` and `data-org-name` are clearly static symbols that are easy to search for.

`js-` classes must start with `js-` (obviously) and only contain lowercase letters and numbers separated by `-`s. The ESLint [`github/js-class-name`](https://github.com/github/eslint-plugin-github/blob/master/lib/rules/js-class-name.js) rule enforces this style.

[@defunkt's original proposal from 2010](https://web.archive.org/web/20180902223055/http://ozmm.org/posts/slightly_obtrusive_javascript.html).

👎 Examples of **incorrect** code for this rule:

```js
const el = document.querySelector('.js-Foo')
```

👍 Examples of **correct** code for this rule:

```js
const el = document.querySelector('.js-foo')
```

## Version

4.3.2

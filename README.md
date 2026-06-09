# eslint-plugin-github

## Installation

```sh
npm install --save-dev eslint eslint-plugin-github
```

`eslint-plugin-github` supports ESLint 9 and 10.

## Setup

### Legacy Configuration (`.eslintrc`)

Legacy `.eslintrc` configuration is supported with ESLint 9. ESLint 10 removes `.eslintrc` support, so use flat config when upgrading to ESLint 10.

Add `github` to your list of plugins in your ESLint config.

JSON ESLint config example:

```json
{
  "plugins": ["github"]
}
```

Extend the configs you wish to use.

JSON ESLint config example:

```json
{
  "extends": ["plugin:github/recommended"]
}
```

If you extend `plugin:github/react` from a legacy `.eslintrc` config, install the legacy JSX accessibility plugin alongside this package:

```sh
npm install --save-dev eslint-plugin-jsx-a11y
```

### Flat Configuration (`eslint-config.js`)

Import the `eslint-plugin-github`, and extend any of the configurations using `getFlatConfigs()` as needed like so:

```js
import github from 'eslint-plugin-github'

export default [
  github.getFlatConfigs().browser,
  github.getFlatConfigs().recommended,
  github.getFlatConfigs().react,
  ...github.getFlatConfigs().typescript,
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ignores: ['eslint.config.mjs'],
    rules: {
      'github/array-foreach': 'error',
      'github/async-preventdefault': 'warn',
      'github/no-then': 'error',
      'github/no-blur': 'error',
    },
  },
]
```

> [!NOTE]
> If you configured the `filenames/match-regex` rule, please note we have adapted the match regex rule into `eslint-plugin-github` as the original `eslint-filenames-plugin` is no longer maintained and needed a flat config support update. 
> 
> Please update the name to `github/filenames-match-regex`, and note, the default rule is kebab case or camelCase with one hump. For custom configuration, such as matching for camelCase regex, here's an example:
>
> `'github/filenames-match-regex': ['error', '^([a-z0-9]+)([A-Z][a-z0-9]+)*$'],`

The available configs are:

- `internal`
  - Rules useful for github applications.
- `browser`
  - Useful rules when shipping your app to the browser.
- `react`
  - Recommended rules for React applications.
- `recommended`
  - Recommended rules for every application.
- `typescript`
  - Useful rules when writing TypeScript.

### Component mapping (Experimental)

_Note: This is experimental and subject to change._

The `react` config includes rules which target specific HTML elements. You may provide a mapping of custom components to an HTML element in your `eslintrc` configuration to increase linter coverage.

By default, these eslint rules will check the "as" prop for underlying element changes. If your repo uses a different prop name for polymorphic components provide the prop name in your `eslintrc` configuration under `polymorphicPropName`.

```json
{
  "settings": {
    "github": {
      "polymorphicPropName": "asChild",
      "components": {
        "Box": "p",
        "Link": "a"
      }
    }
  }
}
```

This config will be interpreted in the following way:

- All `<Box>` elements will be treated as a `p` element type.
- `<Link>` without a defined `as` prop will be treated as a `a`.
- `<Link as='button'>` will be treated as a `button` element type.

### Rules

<!-- begin auto-generated rules list -->

💼 Configurations enabled in.\
🔍 Set in the `browser` configuration.\
🔐 Set in the `internal` configuration.\
⚛️ Set in the `react` configuration.\
✅ Set in the `recommended` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
❌ Deprecated.

| Name                                                                                                     | Description                                                                                                              | 💼 | 🔧 | ❌  |
| :------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------- | :- | :- | :- |
| [a11y-aria-label-is-well-formatted](docs/rules/a11y-aria-label-is-well-formatted.md)                     | enforce [aria-label] text to be formatted as you would visual text.                                                      | ⚛️ |    |    |
| [a11y-no-generic-link-text](docs/rules/a11y-no-generic-link-text.md)                                     | disallow generic link text                                                                                               |    |    | ❌  |
| [a11y-no-title-attribute](docs/rules/a11y-no-title-attribute.md)                                         | disallow using the title attribute                                                                                       | ⚛️ |    |    |
| [a11y-no-visually-hidden-interactive-element](docs/rules/a11y-no-visually-hidden-interactive-element.md) | enforce that interactive elements are not visually hidden                                                                | ⚛️ |    |    |
| [a11y-role-supports-aria-props](docs/rules/a11y-role-supports-aria-props.md)                             | enforce that elements with explicit or implicit roles defined contain only `aria-*` properties supported by that `role`. | ⚛️ |    |    |
| [a11y-svg-has-accessible-name](docs/rules/a11y-svg-has-accessible-name.md)                               | require SVGs to have an accessible name                                                                                  | ⚛️ |    |    |
| [array-foreach](docs/rules/array-foreach.md)                                                             | enforce `for..of` loops over `Array.forEach`                                                                             | ✅  |    |    |
| [async-currenttarget](docs/rules/async-currenttarget.md)                                                 | disallow `event.currentTarget` calls inside of async functions                                                           | 🔍 |    |    |
| [async-preventdefault](docs/rules/async-preventdefault.md)                                               | disallow `event.preventDefault` calls inside of async functions                                                          | 🔍 |    |    |
| [authenticity-token](docs/rules/authenticity-token.md)                                                   | disallow usage of CSRF tokens in JavaScript                                                                              | 🔐 |    |    |
| [filenames-match-regex](docs/rules/filenames-match-regex.md)                                             | require filenames to match a regex naming convention                                                                     | ✅  |    |    |
| [get-attribute](docs/rules/get-attribute.md)                                                             | disallow wrong usage of attribute names                                                                                  | 🔍 | 🔧 |    |
| [js-class-name](docs/rules/js-class-name.md)                                                             | enforce a naming convention for js- prefixed classes                                                                     | 🔐 |    |    |
| [no-blur](docs/rules/no-blur.md)                                                                         | disallow usage of `Element.prototype.blur()`                                                                             | 🔍 |    |    |
| [no-d-none](docs/rules/no-d-none.md)                                                                     | disallow usage the `d-none` CSS class                                                                                    | 🔐 |    |    |
| [no-dataset](docs/rules/no-dataset.md)                                                                   | enforce usage of `Element.prototype.getAttribute` instead of `Element.prototype.datalist`                                | 🔍 |    |    |
| [no-dynamic-script-tag](docs/rules/no-dynamic-script-tag.md)                                             | disallow creating dynamic script tags                                                                                    | ✅  |    |    |
| [no-implicit-buggy-globals](docs/rules/no-implicit-buggy-globals.md)                                     | disallow implicit global variables                                                                                       | ✅  |    |    |
| [no-inner-html](docs/rules/no-inner-html.md)                                                             | disallow `Element.prototype.innerHTML` in favor of `Element.prototype.textContent`                                       | 🔍 |    |    |
| [no-innerText](docs/rules/no-innerText.md)                                                               | disallow `Element.prototype.innerText` in favor of `Element.prototype.textContent`                                       | 🔍 | 🔧 |    |
| [no-then](docs/rules/no-then.md)                                                                         | enforce using `async/await` syntax over Promises                                                                         | ✅  |    |    |
| [no-useless-passive](docs/rules/no-useless-passive.md)                                                   | disallow marking a event handler as passive when it has no effect                                                        | 🔍 | 🔧 |    |
| [prefer-observers](docs/rules/prefer-observers.md)                                                       | disallow poorly performing event listeners                                                                               | 🔍 |    |    |
| [require-passive-events](docs/rules/require-passive-events.md)                                           | enforce marking high frequency event handlers as passive                                                                 | 🔍 |    |    |
| [unescaped-html-literal](docs/rules/unescaped-html-literal.md)                                           | disallow unescaped HTML literals                                                                                         | 🔍 |    |    |

<!-- end auto-generated rules list -->

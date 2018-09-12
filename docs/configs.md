# Configs

This ESLint plugin comes with a few configuration presets. After installing the package, the recommended set of rules can be enabled with:

**.eslintrc.json**

```json
{
  "extends": ["plugin:github/recommended"]
}
```

When setting up a new project, it's recommended that you use the initialization to generate a customized ESLint config for the project.

```sh
$ node_modules/.bin/eslint-github-init
```

## Available Configs

### `plugin:github/recommended`

A base layer of configuration recommended for any JS project. The [Prettier](https://prettier.io/) formatter is used to format code.

### `plugin:github/es6`

Recommended rules when using Babel to transpile features from ES2015+.

### `plugin:github/flow`

Recommended rules for projects using the [Flow type checker](https://flow.org/).

### `plugin:github/react`

Recommended rules for projects using [React](https://reactjs.org/).

### `plugin:github/relay`

Recommended rules for projects using [Relay](http://facebook.github.io/relay/) (and React).

### `plugin:github/app`

Recommended rules when writing a browser application.

### `plugin:github/node`

Recommended rules when writing a node application.

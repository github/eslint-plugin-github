# Package Requirements

A set of criteria used to evaluate packages used by [GitHub](https://github.com).

* MUST be published on [npm registery](https://www.npmjs.com).
* SHOULD be also available on [GitHub](https://github.com) with tagged releases.
* MUST provide an [OSI](https://opensource.org/licenses) license file and declare in `package.json` `"license"` field.
* SHOULD be available under an MIT license.
* MUST be installable via [npm](https://www.npmjs.com/package/npm) or [yarn](https://www.npmjs.com/package/yarn) toolchain.

## Browser specific requirements

Additional criteria for packages that are used at runtime rather than at build time.

* MUST provide a `package.json` `"main"` pointing to an ES5 browser compatible source file using the UMD format.
* SHOULD provide a `package.json` `"jsnext"` point to an ES6 browser compatible source file using ES6 exports.
* `"main"` and `"jsnext"` source files MUST not `require()` node specific dependencies.
* MUST only declares `package.json` `"dependencies"` that are used at runtime in a browser. Nonessential build packages are declared under `"devDependencies"`.
* MUST not depend on [jQuery](https://jquery.com).
* MUST not declare specific polyfills in `package.json` `"dependencies"`. However, they MAY implicitly depend on polyfills already present in the environment. 
* MUST not set or leak any global variables or monkey patch other object prototypes (with the exception of polyfills).
* Polyfill libraries MUST have an associated [Working Draft](https://www.w3.org/2004/02/Process-20040205/tr.html#first-wd) specification published by a standards body. Polyfills based on Editor's Draft are too early to implement and depend on.
* SHOULD provide [Flow](https://flowtype.org) type definitions.

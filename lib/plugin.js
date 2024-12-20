const {name, version} = require('../package.json')

module.exports = {
  meta: {name, version},
  rules: {
    'a11y-no-visually-hidden-interactive-element': require('./rules/a11y-no-visually-hidden-interactive-element'),
    'a11y-no-generic-link-text': require('./rules/a11y-no-generic-link-text'),
    'a11y-no-title-attribute': require('./rules/a11y-no-title-attribute'),
    'a11y-aria-label-is-well-formatted': require('./rules/a11y-aria-label-is-well-formatted'),
    'a11y-role-supports-aria-props': require('./rules/a11y-role-supports-aria-props'),
    'a11y-svg-has-accessible-name': require('./rules/a11y-svg-has-accessible-name'),
    'array-foreach': require('./rules/array-foreach'),
    'async-currenttarget': require('./rules/async-currenttarget'),
    'async-preventdefault': require('./rules/async-preventdefault'),
    'authenticity-token': require('./rules/authenticity-token'),
    'filenames-match-regex': require('./rules/filenames-match-regex'),
    'get-attribute': require('./rules/get-attribute'),
    'js-class-name': require('./rules/js-class-name'),
    'no-blur': require('./rules/no-blur'),
    'no-d-none': require('./rules/no-d-none'),
    'no-dataset': require('./rules/no-dataset'),
    'no-implicit-buggy-globals': require('./rules/no-implicit-buggy-globals'),
    'no-inner-html': require('./rules/no-inner-html'),
    'no-innerText': require('./rules/no-innerText'),
    'no-dynamic-script-tag': require('./rules/no-dynamic-script-tag'),
    'no-then': require('./rules/no-then'),
    'no-useless-passive': require('./rules/no-useless-passive'),
    'prefer-observers': require('./rules/prefer-observers'),
    'require-passive-events': require('./rules/require-passive-events'),
    'unescaped-html-literal': require('./rules/unescaped-html-literal'),
  },
}

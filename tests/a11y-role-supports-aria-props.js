// @ts-check

// Tests in this file were adapted from https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/main/__tests__/src/rules/role-supports-aria-props-test.js, which was authored by Ethan Cohen and is distributed under the MIT license as follows:
//
// The MIT License (MIT) Copyright (c) 2016 Ethan Cohen
//
// Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

const rule = require('../lib/rules/a11y-role-supports-aria-props')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
})

function getErrorMessage(attribute, role) {
  return `The attribute ${attribute} is not supported by the role ${role}.`
}

ruleTester.run('a11y-role-supports-aria-props', rule, {
  valid: [
    {code: '<Foo bar />'},
    {code: '<div />'},
    {code: '<div id="main" />'},
    {code: '<div role />'},
    {code: '<div role="presentation" {...props} />'},
    {code: '<Foo.Bar baz={true} />'},
    {code: '<Foo as="a" href={url} aria-label={`Issue #${title}`} />'},
    {code: '<Link href="#" aria-checked />'},
    // Don't try to evaluate expression
    {code: '<Box aria-labelledby="some-id" role={role} />'},
    {code: '<Box aria-labelledby="some-id" as={isNavigationOpen ? "div" : "nav"} />'},
    // IMPLICIT ROLE TESTS
    // A TESTS - implicit role is `link`
    {code: '<a href="#" aria-expanded />'},
    {code: '<a href="#" aria-atomic />'},
    {code: '<a href="#" aria-busy />'},
    {code: '<a href="#" aria-controls />'},
    {code: '<a href="#" aria-current />'},
    {code: '<a href="#" aria-describedby />'},
    {code: '<a href="#" aria-disabled />'},
    {code: '<a href="#" aria-dropeffect />'},
    {code: '<a href="#" aria-flowto />'},
    {code: '<a href="#" aria-haspopup />'},
    {code: '<a href="#" aria-grabbed />'},
    {code: '<a href="#" aria-hidden />'},
    {code: '<a href="#" aria-label />'},
    {code: '<a href="#" aria-labelledby />'},
    {code: '<a href="#" aria-live />'},
    {code: '<a href="#" aria-owns />'},
    {code: '<a href="#" aria-relevant />'},

    // AREA TESTS - implicit role is `link`
    {code: '<area href="#" aria-expanded />'},
    {code: '<area href="#" aria-atomic />'},
    {code: '<area href="#" aria-busy />'},
    {code: '<area href="#" aria-controls />'},
    {code: '<area href="#" aria-describedby />'},
    {code: '<area href="#" aria-disabled />'},
    {code: '<area href="#" aria-dropeffect />'},
    {code: '<area href="#" aria-flowto />'},
    {code: '<area href="#" aria-grabbed />'},
    {code: '<area href="#" aria-haspopup />'},
    {code: '<area href="#" aria-hidden />'},
    {code: '<area href="#" aria-label />'},
    {code: '<area href="#" aria-labelledby />'},
    {code: '<area href="#" aria-live />'},
    {code: '<area href="#" aria-owns />'},
    {code: '<area href="#" aria-relevant />'},

    // this will have role of `img`
    {code: '<img alt="foobar" aria-busy />'},

    // MENU TESTS - implicit role is `toolbar` when `type="toolbar"`
    {code: '<menu type="toolbar" aria-activedescendant />'},
    {code: '<menu type="toolbar" aria-atomic />'},
    {code: '<menu type="toolbar" aria-busy />'},
    {code: '<menu type="toolbar" aria-controls />'},
    {code: '<menu type="toolbar" aria-describedby />'},
    {code: '<menu type="toolbar" aria-disabled />'},
    {code: '<menu type="toolbar" aria-dropeffect />'},
    {code: '<menu type="toolbar" aria-flowto />'},
    {code: '<menu type="toolbar" aria-grabbed />'},
    {code: '<menu type="toolbar" aria-hidden />'},
    {code: '<menu type="toolbar" aria-label />'},
    {code: '<menu type="toolbar" aria-labelledby />'},
    {code: '<menu type="toolbar" aria-live />'},
    {code: '<menu type="toolbar" aria-owns />'},
    {code: '<menu type="toolbar" aria-relevant />'},

    // MENUITEM TESTS
    // when `type="command`, the implicit role is `menuitem`
    {code: '<menuitem type="command" aria-atomic />'},
    {code: '<menuitem type="command" aria-busy />'},
    {code: '<menuitem type="command" aria-controls />'},
    {code: '<menuitem type="command" aria-describedby />'},
    {code: '<menuitem type="command" aria-disabled />'},
    {code: '<menuitem type="command" aria-dropeffect />'},
    {code: '<menuitem type="command" aria-flowto />'},
    {code: '<menuitem type="command" aria-grabbed />'},
    {code: '<menuitem type="command" aria-haspopup />'},
    {code: '<menuitem type="command" aria-hidden />'},
    {code: '<menuitem type="command" aria-label />'},
    {code: '<menuitem type="command" aria-labelledby />'},
    {code: '<menuitem type="command" aria-live />'},
    {code: '<menuitem type="command" aria-owns />'},
    {code: '<menuitem type="command" aria-relevant />'},
    // when `type="checkbox`, the implicit role is `menuitemcheckbox`
    {code: '<menuitem type="checkbox" aria-checked />'},
    {code: '<menuitem type="checkbox" aria-atomic />'},
    {code: '<menuitem type="checkbox" aria-busy />'},
    {code: '<menuitem type="checkbox" aria-controls />'},
    {code: '<menuitem type="checkbox" aria-describedby />'},
    {code: '<menuitem type="checkbox" aria-disabled />'},
    {code: '<menuitem type="checkbox" aria-dropeffect />'},
    {code: '<menuitem type="checkbox" aria-flowto />'},
    {code: '<menuitem type="checkbox" aria-grabbed />'},
    {code: '<menuitem type="checkbox" aria-haspopup />'},
    {code: '<menuitem type="checkbox" aria-hidden />'},
    {code: '<menuitem type="checkbox" aria-invalid />'},
    {code: '<menuitem type="checkbox" aria-label />'},
    {code: '<menuitem type="checkbox" aria-labelledby />'},
    {code: '<menuitem type="checkbox" aria-live />'},
    {code: '<menuitem type="checkbox" aria-owns />'},
    {code: '<menuitem type="checkbox" aria-relevant />'},
    // when `type="radio`, the implicit role is `menuitemradio`
    {code: '<menuitem type="radio" aria-checked />'},
    {code: '<menuitem type="radio" aria-atomic />'},
    {code: '<menuitem type="radio" aria-busy />'},
    {code: '<menuitem type="radio" aria-controls />'},
    {code: '<menuitem type="radio" aria-describedby />'},
    {code: '<menuitem type="radio" aria-disabled />'},
    {code: '<menuitem type="radio" aria-dropeffect />'},
    {code: '<menuitem type="radio" aria-flowto />'},
    {code: '<menuitem type="radio" aria-grabbed />'},
    {code: '<menuitem type="radio" aria-haspopup />'},
    {code: '<menuitem type="radio" aria-hidden />'},
    {code: '<menuitem type="radio" aria-invalid />'},
    {code: '<menuitem type="radio" aria-label />'},
    {code: '<menuitem type="radio" aria-labelledby />'},
    {code: '<menuitem type="radio" aria-live />'},
    {code: '<menuitem type="radio" aria-owns />'},
    {code: '<menuitem type="radio" aria-relevant />'},
    {code: '<menuitem type="radio" aria-posinset />'},
    {code: '<menuitem type="radio" aria-setsize />'},

    // these will have global
    {code: '<menuitem aria-checked />'},
    {code: '<menuitem type="foo" aria-checked />'},

    // INPUT TESTS
    // when `type="button"`, the implicit role is `button`
    {code: '<input type="button" aria-expanded />'},
    {code: '<input type="button" aria-pressed />'},
    {code: '<input type="button" aria-atomic />'},
    {code: '<input type="button" aria-busy />'},
    {code: '<input type="button" aria-controls />'},
    {code: '<input type="button" aria-describedby />'},
    {code: '<input type="button" aria-disabled />'},
    {code: '<input type="button" aria-dropeffect />'},
    {code: '<input type="button" aria-flowto />'},
    {code: '<input type="button" aria-grabbed />'},
    {code: '<input type="button" aria-haspopup />'},
    {code: '<input type="button" aria-hidden />'},
    {code: '<input type="button" aria-label />'},
    {code: '<input type="button" aria-labelledby />'},
    {code: '<input type="button" aria-live />'},
    {code: '<input type="button" aria-owns />'},
    {code: '<input type="button" aria-relevant />'},
    // when `type="image"`, the implicit role is `button`
    {code: '<input type="image" aria-expanded />'},
    {code: '<input type="image" aria-pressed />'},
    {code: '<input type="image" aria-atomic />'},
    {code: '<input type="image" aria-busy />'},
    {code: '<input type="image" aria-controls />'},
    {code: '<input type="image" aria-describedby />'},
    {code: '<input type="image" aria-disabled />'},
    {code: '<input type="image" aria-dropeffect />'},
    {code: '<input type="image" aria-flowto />'},
    {code: '<input type="image" aria-grabbed />'},
    {code: '<input type="image" aria-haspopup />'},
    {code: '<input type="image" aria-hidden />'},
    {code: '<input type="image" aria-label />'},
    {code: '<input type="image" aria-labelledby />'},
    {code: '<input type="image" aria-live />'},
    {code: '<input type="image" aria-owns />'},
    {code: '<input type="image" aria-relevant />'},
    // when `type="reset"`, the implicit role is `button`
    {code: '<input type="reset" aria-expanded />'},
    {code: '<input type="reset" aria-pressed />'},
    {code: '<input type="reset" aria-atomic />'},
    {code: '<input type="reset" aria-busy />'},
    {code: '<input type="reset" aria-controls />'},
    {code: '<input type="reset" aria-describedby />'},
    {code: '<input type="reset" aria-disabled />'},
    {code: '<input type="reset" aria-dropeffect />'},
    {code: '<input type="reset" aria-flowto />'},
    {code: '<input type="reset" aria-grabbed />'},
    {code: '<input type="reset" aria-haspopup />'},
    {code: '<input type="reset" aria-hidden />'},
    {code: '<input type="reset" aria-label />'},
    {code: '<input type="reset" aria-labelledby />'},
    {code: '<input type="reset" aria-live />'},
    {code: '<input type="reset" aria-owns />'},
    {code: '<input type="reset" aria-relevant />'},
    // when `type="submit"`, the implicit role is `button`
    {code: '<input type="submit" aria-expanded />'},
    {code: '<input type="submit" aria-pressed />'},
    {code: '<input type="submit" aria-atomic />'},
    {code: '<input type="submit" aria-busy />'},
    {code: '<input type="submit" aria-controls />'},
    {code: '<input type="submit" aria-describedby />'},
    {code: '<input type="submit" aria-disabled />'},
    {code: '<input type="submit" aria-dropeffect />'},
    {code: '<input type="submit" aria-flowto />'},
    {code: '<input type="submit" aria-grabbed />'},
    {code: '<input type="submit" aria-haspopup />'},
    {code: '<input type="submit" aria-hidden />'},
    {code: '<input type="submit" aria-label />'},
    {code: '<input type="submit" aria-labelledby />'},
    {code: '<input type="submit" aria-live />'},
    {code: '<input type="submit" aria-owns />'},
    {code: '<input type="submit" aria-relevant />'},
    // when `type="checkbox"`, the implicit role is `checkbox`
    {code: '<input type="checkbox" aria-atomic />'},
    {code: '<input type="checkbox" aria-busy />'},
    {code: '<input type="checkbox" aria-checked />'},
    {code: '<input type="checkbox" aria-controls />'},
    {code: '<input type="checkbox" aria-describedby />'},
    {code: '<input type="checkbox" aria-disabled />'},
    {code: '<input type="checkbox" aria-dropeffect />'},
    {code: '<input type="checkbox" aria-flowto />'},
    {code: '<input type="checkbox" aria-grabbed />'},
    {code: '<input type="checkbox" aria-hidden />'},
    {code: '<input type="checkbox" aria-invalid />'},
    {code: '<input type="checkbox" aria-label />'},
    {code: '<input type="checkbox" aria-labelledby />'},
    {code: '<input type="checkbox" aria-live />'},
    {code: '<input type="checkbox" aria-owns />'},
    {code: '<input type="checkbox" aria-relevant />'},
    // when `type="radio"`, the implicit role is `radio`
    {code: '<input type="radio" aria-atomic />'},
    {code: '<input type="radio" aria-busy />'},
    {code: '<input type="radio" aria-checked />'},
    {code: '<input type="radio" aria-controls />'},
    {code: '<input type="radio" aria-describedby />'},
    {code: '<input type="radio" aria-disabled />'},
    {code: '<input type="radio" aria-dropeffect />'},
    {code: '<input type="radio" aria-flowto />'},
    {code: '<input type="radio" aria-grabbed />'},
    {code: '<input type="radio" aria-hidden />'},
    {code: '<input type="radio" aria-label />'},
    {code: '<input type="radio" aria-labelledby />'},
    {code: '<input type="radio" aria-live />'},
    {code: '<input type="radio" aria-owns />'},
    {code: '<input type="radio" aria-relevant />'},
    {code: '<input type="radio" aria-posinset />'},
    {code: '<input type="radio" aria-setsize />'},
    // when `type="range"`, the implicit role is `slider`
    {code: '<input type="range" aria-valuemax />'},
    {code: '<input type="range" aria-valuemin />'},
    {code: '<input type="range" aria-valuenow />'},
    {code: '<input type="range" aria-orientation />'},
    {code: '<input type="range" aria-atomic />'},
    {code: '<input type="range" aria-busy />'},
    {code: '<input type="range" aria-controls />'},
    {code: '<input type="range" aria-describedby />'},
    {code: '<input type="range" aria-disabled />'},
    {code: '<input type="range" aria-dropeffect />'},
    {code: '<input type="range" aria-flowto />'},
    {code: '<input type="range" aria-grabbed />'},
    {code: '<input type="range" aria-haspopup />'},
    {code: '<input type="range" aria-hidden />'},
    {code: '<input type="range" aria-invalid />'},
    {code: '<input type="range" aria-label />'},
    {code: '<input type="range" aria-labelledby />'},
    {code: '<input type="range" aria-live />'},
    {code: '<input type="range" aria-owns />'},
    {code: '<input type="range" aria-relevant />'},
    {code: '<input type="range" aria-valuetext />'},

    // these will have role of `textbox`,
    {code: '<input type="email" aria-disabled />'},
    {code: '<input type="password" aria-disabled />'},
    {code: '<input type="search" aria-disabled />'},
    {code: '<input type="tel" aria-disabled />'},
    {code: '<input type="url" aria-disabled />'},
    {code: '<input aria-disabled />'},

    // Allow null/undefined values regardless of role
    {code: '<h2 role="presentation" aria-level={null} />'},
    {code: '<h2 role="presentation" aria-level={undefined} />'},

    // OTHER TESTS
    {code: '<button aria-pressed />'},
    {code: '<form aria-hidden />'},
    {code: '<h1 aria-hidden />'},
    {code: '<h2 aria-hidden />'},
    {code: '<h3 aria-hidden />'},
    {code: '<h4 aria-hidden />'},
    {code: '<h5 aria-hidden />'},
    {code: '<h6 aria-hidden />'},
    {code: '<hr aria-hidden />'},
    {code: '<li aria-current />'},
    {code: '<meter aria-atomic />'},
    {code: '<option aria-atomic />'},
    {code: '<progress aria-atomic />'},
    {code: '<textarea aria-hidden />'},
    {code: '<select aria-expanded />'},
    {code: '<datalist aria-expanded />'},
    {code: '<div role="heading" aria-level />'},
    {code: '<div role="heading" aria-level="1" />'},
    {code: '<link href="#" aria-expanded />'}, // link maps to nothing
  ],

  invalid: [
    // implicit basic checks
    {
      code: '<area aria-checked />',
      errors: [getErrorMessage('aria-checked', 'generic')],
    },
    {
      code: '<a aria-checked />',
      errors: [getErrorMessage('aria-checked', 'generic')],
    },
    {
      code: '<a href="#" aria-checked />',
      errors: [getErrorMessage('aria-checked', 'link')],
    },
    {
      code: '<area href="#" aria-checked />',
      errors: [getErrorMessage('aria-checked', 'link')],
    },
    {
      code: '<img alt="foobar" aria-checked />',
      errors: [getErrorMessage('aria-checked', 'img')],
    },
    {
      code: '<menu type="toolbar" aria-checked />',
      errors: [getErrorMessage('aria-checked', 'toolbar')],
    },
    {
      code: '<aside aria-checked />',
      errors: [getErrorMessage('aria-checked', 'complementary')],
    },
    {
      code: '<ul aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'list')],
    },
    {
      code: '<details aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'group')],
    },
    {
      code: '<dialog aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'dialog')],
    },
    {
      code: '<aside aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'complementary')],
    },
    {
      code: '<article aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'article')],
    },
    {
      code: '<body aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'generic')],
    },
    {
      code: '<li aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'listitem')],
    },
    {
      code: '<nav aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'navigation')],
    },
    {
      code: '<ol aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'list')],
    },
    {
      code: '<output aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'status')],
    },
    {
      code: '<section aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'generic')],
    },
    {
      code: '<section aria-label="something" aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'region')],
    },
    {
      code: '<tbody aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'rowgroup')],
    },
    {
      code: '<tfoot aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'rowgroup')],
    },
    {
      code: '<thead aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'rowgroup')],
    },
    {
      code: '<input type="radio" aria-invalid />',
      errors: [getErrorMessage('aria-invalid', 'radio')],
    },
    {
      code: '<input type="radio" aria-selected />',
      errors: [getErrorMessage('aria-selected', 'radio')],
    },
    {
      code: '<input type="radio" aria-haspopup />',
      errors: [getErrorMessage('aria-haspopup', 'radio')],
    },
    {
      code: '<input type="checkbox" aria-haspopup />',
      errors: [getErrorMessage('aria-haspopup', 'checkbox')],
    },
    {
      code: '<input type="reset" aria-invalid />',
      errors: [getErrorMessage('aria-invalid', 'button')],
    },
    {
      code: '<input type="submit" aria-invalid />',
      errors: [getErrorMessage('aria-invalid', 'button')],
    },
    {
      code: '<input type="image" aria-invalid />',
      errors: [getErrorMessage('aria-invalid', 'button')],
    },
    {
      code: '<input type="button" aria-invalid />',
      errors: [getErrorMessage('aria-invalid', 'button')],
    },
    {
      code: '<menuitem type="command" aria-invalid />',
      errors: [getErrorMessage('aria-invalid', 'menuitem')],
    },
    {
      code: '<menuitem type="radio" aria-selected />',
      errors: [getErrorMessage('aria-selected', 'menuitemradio')],
    },
    {
      code: '<menu type="toolbar" aria-haspopup />',
      errors: [getErrorMessage('aria-haspopup', 'toolbar')],
    },
    {
      code: '<menu type="toolbar" aria-invalid />',
      errors: [getErrorMessage('aria-invalid', 'toolbar')],
    },
    {
      code: '<menu type="toolbar" aria-expanded />',
      errors: [getErrorMessage('aria-expanded', 'toolbar')],
    },
    {
      code: '<area href="#" aria-invalid />',
      errors: [getErrorMessage('aria-invalid', 'link')],
    },
    {
      code: '<a href="#" aria-invalid />',
      errors: [getErrorMessage('aria-invalid', 'link')],
    },
    {
      code: '<span aria-label />',
      errors: [getErrorMessage('aria-label', 'generic')],
    },
    {
      code: '<span aria-labelledby />',
      errors: [getErrorMessage('aria-labelledby', 'generic')],
    },
    {
      code: '<div aria-labelledby />',
      errors: [getErrorMessage('aria-labelledby', 'generic')],
    },
    // Determines role from literal `as` prop.
    {
      code: '<Box as="span" aria-labelledby />',
      errors: [getErrorMessage('aria-labelledby', 'generic')],
    },
    {
      code: '<p role="generic" aria-label />',
      errors: [getErrorMessage('aria-label', 'generic')],
    },
  ],
})

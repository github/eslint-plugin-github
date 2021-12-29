const rule = require('../lib/rules/js-class-name')
const RuleTester = require('eslint').RuleTester

const ruleTester = new RuleTester()

ruleTester.run('js-class-name', rule, {
  valid: [
    {code: "document.querySelector('body')"},
    {code: "document.querySelector('#js-foo')"},
    {code: "document.querySelector('.js-foo')"},
    {code: "document.querySelector('.js-foo > .js-bar')"},
    {code: 'document.querySelector(".js-foo")'},
    {code: "document.querySelector('.js-foo ' + ' > .js-bar')"},
    {code: "document.querySelector('.js-foo ' + ' > ' + '.js-bar')"},
    {
      code: 'document.querySelector(`.js-foo`)',
      parserOptions: {ecmaVersion: 6}
    },
    {code: "'random textjs-XXX'"}
  ],
  invalid: [
    {
      code: "document.querySelector('.js-Foo')",
      errors: [
        {
          message: 'js- class names should be lowercase and only contain dashes.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "document.querySelector('#js-Foo')",
      errors: [
        {
          message: 'js- class names should be lowercase and only contain dashes.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "document.querySelector('.js-foo > .js-Bar')",
      errors: [
        {
          message: 'js- class names should be lowercase and only contain dashes.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "document.querySelector('.js-' + foo)",
      errors: [
        {
          message: 'js- class names should be lowercase and only contain dashes.',
          type: 'Literal'
        },
        {
          message: 'js- class names should be statically defined.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "document.querySelector('.js-foo-' + foo)",
      errors: [
        {
          message: 'js- class names should be lowercase and only contain dashes.',
          type: 'Literal'
        },
        {
          message: 'js- class names should be statically defined.',
          type: 'Literal'
        }
      ]
    },
    {
      code: "document.querySelector('.js-foo' + idx)",
      errors: [
        {
          message: 'js- class names should be statically defined.',
          type: 'Literal'
        }
      ]
    },
    {
      code: 'document.querySelector(`.js-${foo}`)',
      parserOptions: {ecmaVersion: 6},
      errors: [
        {
          message: 'js- class names should be lowercase and only contain dashes.',
          type: 'TemplateElement'
        },
        {
          message: 'js- class names should be statically defined.',
          type: 'TemplateElement'
        }
      ]
    },
    {
      code: 'document.querySelector(`.js-foo-${foo}`)',
      parserOptions: {ecmaVersion: 6},
      errors: [
        {
          message: 'js- class names should be lowercase and only contain dashes.',
          type: 'TemplateElement'
        },
        {
          message: 'js- class names should be statically defined.',
          type: 'TemplateElement'
        }
      ]
    },
    {
      code: 'document.querySelector(`.js-foo${idx}`)',
      parserOptions: {ecmaVersion: 6},
      errors: [
        {
          message: 'js- class names should be statically defined.',
          type: 'TemplateElement'
        }
      ]
    }
  ]
})

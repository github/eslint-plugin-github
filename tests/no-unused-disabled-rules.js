var rule = require('../lib/rules/no-unused-disabled-rules')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester({
  rules: {
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-multi-spaces': 'error'
  }
})

ruleTester.run("no-unused-disabled-rules", rule, {
  valid: [
    { code: "foo();" },
    { code: "foo('foo');" },

    { code: "/* eslint quotes:0 */\nfoo();" },

    { code: "foo() // eslint-disable-line" },
    { code: "// eslint-disable-next-line\nfoo()" },
    { code: "/* eslint-disable */\nfoo()" },

    { code: "foo(\"foo\"); // eslint-disable-line" },
    { code: "// eslint-disable-next-line\nfoo(\"foo\");" },
    { code: "/* eslint-disable */\nfoo(\"foo\");" },

    { code: "foo(\"foo\") // eslint-disable-line" },
    { code: "// eslint-disable-next-line\nfoo(\"foo\")" },
    { code: "/* eslint-disable */\nfoo(\"foo\")" },

    { code: "foo() // eslint-disable-line semi" },
    { code: "// eslint-disable-next-line semi\nfoo()" },
    { code: "/* eslint-disable semi */\nfoo()" },

    { code: "foo(\"foo\"); // eslint-disable-line quotes" },
    { code: "// eslint-disable-next-line quotes\nfoo(\"foo\");" },
    { code: "/* eslint-disable quotes */\nfoo(\"foo\");" },

    { code: "var foo   =   42; // eslint-disable-line " },
    { code: "// eslint-disable-next-line no-multi-spaces\nvar foo   =   42;" },
    { code: "/* eslint-disable no-multi-spaces */\nvar foo   =   42;" },

    { code: "foo(\"foo\") // eslint-disable-line quotes, semi" },
    { code: "// eslint-disable-next-line quotes, semi\nfoo(\"foo\")" },
    { code: "/* eslint-disable quotes, semi */\nfoo(\"foo\")" },

    { code: "foo(\"foo\") // eslint-disable-line semi, quotes" },
    { code: "// eslint-disable-next-line semi, quotes\nfoo(\"foo\")" },
    { code: "/* eslint-disable semi, quotes */\nfoo(\"foo\")" }
  ],
  invalid: [
    {
      code: "foo(); // eslint-disable-line semi",
      errors: [
        {
          message: "Disabled 'semi' rule, but didn't report anything.",
          type: "Line"
        }
      ]
    },
    {
      code: "// eslint-disable-next-line semi\nfoo();",
      errors: [
        {
          message: "Disabled 'semi' rule, but didn't report anything.",
          type: "Line"
        }
      ]
    },
    {
      code: "foo('bar'); // eslint-disable-line quotes",
      errors: [
        {
          message: "Disabled 'quotes' rule, but didn't report anything.",
          type: "Line"
        }
      ]
    },
    {
      code: "foo('bar'); // eslint-disable-line semi",
      errors: [
        {
          message: "Disabled 'semi' rule, but didn't report anything.",
          type: "Line"
        }
      ]
    },
    {
      code: "foo('bar'); // eslint-disable-line quotes, semi",
      errors: [
        {
          message: "Disabled 'quotes' rule, but didn't report anything.",
          type: "Line"
        },
        {
          message: "Disabled 'semi' rule, but didn't report anything.",
          type: "Line"
        }
      ]
    },
    {
      code: "var foo = 42; // eslint-disable-line no-multi-spaces",
      errors: [
        {
          message: "Disabled 'no-multi-spaces' rule, but didn't report anything.",
          type: "Line"
        }
      ]
    }
  ]
})

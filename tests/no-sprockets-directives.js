var rule = require('../lib/rules/no-sprockets-directives')
var RuleTester = require('eslint').RuleTester

var ruleTester = new RuleTester();

ruleTester.run("sprockets-directives", rule, {
  valid: [
    { code: "// foo" },
    { code: "/* foo */" },
    { code: "// foo\n// bar" },
    { code: "/* foo\n bar */" },
    { code: "// require foo" },
    { code: "// require foo" }
  ],
  invalid: [
    {
      code: "//= require foo",
      errors: [
        {
          message: "Sprockets directive found, use ES import instead.",
          type: "Line"
        }
      ]
    },
    {
      code: "/*\n *= require foo\n */",
      errors: [
        {
          message: "Sprockets directive found, use ES import instead.",
          type: "Block"
        }
      ]
    },
    {
      code: "// Foo\n//= require foo",
      errors: [
        {
          message: "Sprockets directive found, use ES import instead.",
          type: "Line"
        }
      ]
    },
    {
      code: "// =require foo",
      errors: [
        {
          message: "Sprockets directive found, use ES import instead.",
          type: "Line"
        }
      ]
    },
    {
      code: "//=require foo",
      errors: [
        {
          message: "Sprockets directive found, use ES import instead.",
          type: "Line"
        }
      ]
    },
    {
      code: "//= require_tree foo",
      errors: [
        {
          message: "Sprockets directive found, use ES import instead.",
          type: "Line"
        }
      ]
    },
    {
      code: "//= require_directory foo",
      errors: [
        {
          message: "Sprockets directive found, use ES import instead.",
          type: "Line"
        }
      ]
    },
    {
      code: "//= require_self",
      errors: [
        {
          message: "Sprockets directive found, use ES import instead.",
          type: "Line"
        }
      ]
    },
    {
      code: "//= stub foo",
      errors: [
        {
          message: "Sprockets directive found, use ES import instead.",
          type: "Line"
        }
      ]
    }
  ]
});

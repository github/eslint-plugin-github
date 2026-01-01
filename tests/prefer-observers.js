import rule from '../lib/rules/prefer-observers.js'
import {RuleTester} from 'eslint'

const ruleTester = new RuleTester()

ruleTester.run('prefer-observers', rule, {
  valid: [
    {
      code: 'document.addEventListener("touchstart", function(event) {})',
    },
    // window.resize is valid for viewport detection
    {
      code: 'window.addEventListener("resize", function(event) {})',
    },
    // window.orientationchange is valid for viewport detection
    {
      code: 'window.addEventListener("orientationchange", function(event) {})',
    },
    // window.scroll is also valid - window events are for viewport-level detection
    {
      code: 'window.addEventListener("scroll", function(event) {})',
    },
    // ResizeObserver on regular elements is valid
    {
      code: 'const observer = new ResizeObserver(() => {}); observer.observe(someElement)',
    },
    {
      code: 'const observer = new ResizeObserver(() => {}); const el = document.querySelector(".item"); observer.observe(el)',
    },
    // IntersectionObserver on document root is valid (not flagged by this rule)
    {
      code: 'const intersectionObserver = new IntersectionObserver(() => {}); intersectionObserver.observe(document.documentElement)',
    },
    // MutationObserver on document root is valid (not flagged by this rule)
    {
      code: 'const mutationObserver = new MutationObserver(() => {}); mutationObserver.observe(document.documentElement)',
    },
    // Generic "observer" name with IntersectionObserver should not be flagged
    {
      code: 'const observer = new IntersectionObserver(() => {}); observer.observe(document.documentElement)',
    },
    // Generic "observer" name with MutationObserver should not be flagged
    {
      code: 'const observer = new MutationObserver(() => {}); observer.observe(document.documentElement)',
    },
  ],
  invalid: [
    {
      code: 'document.addEventListener("scroll", function(event) {})',
      errors: [
        {
          message: 'Avoid using "scroll" event listener. Consider using IntersectionObserver instead',
          type: 'CallExpression',
        },
      ],
    },
    {
      code: 'document.addEventListener("resize", function(event) {})',
      errors: [
        {
          message: 'Avoid using "resize" event listener. Consider using ResizeObserver instead',
          type: 'CallExpression',
        },
      ],
    },
    // element.resize should be flagged
    {
      code: 'element.addEventListener("resize", function(event) {})',
      errors: [
        {
          message: 'Avoid using "resize" event listener. Consider using ResizeObserver instead',
          type: 'CallExpression',
        },
      ],
    },
    // ResizeObserver on document.documentElement should be flagged
    {
      code: 'const observer = new ResizeObserver(() => {}); observer.observe(document.documentElement)',
      errors: [
        {
          message:
            'Avoid using ResizeObserver on document root elements. Consider using window.addEventListener("resize", ...) combined with window.addEventListener("orientationchange", ...) for viewport detection instead',
          type: 'CallExpression',
        },
      ],
    },
    // ResizeObserver on document.body should be flagged
    {
      code: 'const observer = new ResizeObserver(() => {}); observer.observe(document.body)',
      errors: [
        {
          message:
            'Avoid using ResizeObserver on document root elements. Consider using window.addEventListener("resize", ...) combined with window.addEventListener("orientationchange", ...) for viewport detection instead',
          type: 'CallExpression',
        },
      ],
    },
    // Inline ResizeObserver with document.documentElement should be flagged
    {
      code: 'new ResizeObserver(() => {}).observe(document.documentElement)',
      errors: [
        {
          message:
            'Avoid using ResizeObserver on document root elements. Consider using window.addEventListener("resize", ...) combined with window.addEventListener("orientationchange", ...) for viewport detection instead',
          type: 'CallExpression',
        },
      ],
    },
    // Variable tracking: document.documentElement assigned to variable
    {
      code: 'const el = document.documentElement; observer.observe(el)',
      errors: [
        {
          message:
            'Avoid using ResizeObserver on document root elements. Consider using window.addEventListener("resize", ...) combined with window.addEventListener("orientationchange", ...) for viewport detection instead',
          type: 'CallExpression',
        },
      ],
    },
    // Variable tracking: document.body assigned to variable
    {
      code: 'const root = document.body; observer.observe(root)',
      errors: [
        {
          message:
            'Avoid using ResizeObserver on document root elements. Consider using window.addEventListener("resize", ...) combined with window.addEventListener("orientationchange", ...) for viewport detection instead',
          type: 'CallExpression',
        },
      ],
    },
  ],
})

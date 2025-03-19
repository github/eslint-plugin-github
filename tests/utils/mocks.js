export function mockJSXAttribute(prop, propValue) {
  return {
    type: 'JSXAttribute',
    name: {
      type: 'JSXIdentifier',
      name: prop,
    },
    value: {
      type: 'Literal',
      value: propValue,
    },
  }
}

/* Mocks conditional expression
  e.g. <Box as={isNavigationOpen ? 'generic' : 'navigation'} /> can be by calling
  mockJSXConditionalAttribute('as', 'isNavigationOpen', 'generic', 'navigation')
*/
export function mockJSXConditionalAttribute(prop, expression, consequentValue, alternateValue) {
  return {
    type: 'JSXAttribute',
    name: {
      type: 'JSXIdentifier',
      name: prop,
    },
    value: {
      type: 'JSXExpressionContainer',
      value: prop,
      expression: {
        type: 'ConditionalExpression',
        test: {
          type: expression,
        },
        consequent: {
          type: 'Literal',
          value: consequentValue,
        },
        alternate: {
          type: 'Literal',
          value: alternateValue,
        },
      },
    },
  }
}

export function mockJSXOpeningElement(tagName, attributes = []) {
  return {
    type: 'JSXOpeningElement',
    name: {
      type: 'JSXIdentifier',
      name: tagName,
    },
    attributes,
  }
}

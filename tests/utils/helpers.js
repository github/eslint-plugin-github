function mockJSXAttribute(prop, propValue) {
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

function mockJSXOpeningElement(tagName, attributes = []) {
  return {
    type: 'JSXOpeningElement',
    name: {
      type: 'JSXIdentifier',
      name: tagName,
    },
    attributes,
  }
}

module.exports = {mockJSXAttribute, mockJSXOpeningElement}

const {elementType, getProp, getPropValue} = require('jsx-ast-utils')

function getElementType(context, node) {
  const {settings} = context
  const rawElement = elementType(node)
  if (!settings) return rawElement

  const componentMap = settings['github']?.components
  if (!componentMap) return rawElement
  const component = componentMap[rawElement]
  if (!component) return rawElement
  let element = component.default ? component.default : rawElement

  if (component.props) {
    const props = Object.entries(component.props)
    for (const [key, value] of props) {
      const propMap = value
      const propValue = getPropValue(getProp(node.attributes, key))
      const mapValue = propMap[propValue]

      if (mapValue) {
        element = mapValue
      }
    }
  }
  return element
}

module.exports = {getElementType}

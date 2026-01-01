import url from '../url.js'

const observerMap = {
  scroll: 'IntersectionObserver',
  resize: 'ResizeObserver',
}

/**
 * Checks if a node refers to the window object
 */
function isWindowObject(node) {
  return node.type === 'Identifier' && node.name === 'window'
}

/**
 * Checks if a node refers to document.documentElement or document.body
 */
function isDocumentRoot(node) {
  if (node.type === 'MemberExpression') {
    if (
      node.object.type === 'Identifier' &&
      node.object.name === 'document' &&
      node.property.type === 'Identifier' &&
      (node.property.name === 'documentElement' || node.property.name === 'body')
    ) {
      return true
    }
  }
  return false
}

export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'disallow poorly performing event listeners',
      url: url(import.meta.url),
      recommended: false,
    },
    schema: [],
    messages: {
      avoid: 'Avoid using "{{name}}" event listener. Consider using {{observer}} instead',
      avoidResizeObserverOnRoot:
        'Avoid using ResizeObserver on document root elements. Consider using window.addEventListener("resize", ...) combined with window.addEventListener("orientationchange", ...) for viewport detection instead',
    },
  },

  create(context) {
    // Track variables that reference document.documentElement or document.body
    const documentRootVariables = new Map()

    return {
      // Track variable declarations that assign document.documentElement or document.body
      VariableDeclarator(node) {
        if (node.init && isDocumentRoot(node.init) && node.id.type === 'Identifier') {
          documentRootVariables.set(node.id.name, node.init)
        }
      },

      // Check addEventListener calls
      ['CallExpression[callee.property.name="addEventListener"]'](node) {
        const [name] = node.arguments
        if (name.type !== 'Literal') return
        if (!(name.value in observerMap)) return

        // Allow window.addEventListener("resize", ...) and window.addEventListener("orientationchange", ...)
        if (node.callee.object && isWindowObject(node.callee.object)) {
          if (name.value === 'resize') return
        }

        context.report({
          node,
          messageId: 'avoid',
          data: {name: name.value, observer: observerMap[name.value]},
        })
      },

      // Check ResizeObserver.observe() calls
      ['CallExpression[callee.property.name="observe"]'](node) {
        // Check if this is a ResizeObserver instance
        const callee = node.callee
        if (!callee.object) return

        // Get the first argument (the element being observed)
        const [observedElement] = node.arguments
        if (!observedElement) return

        // Check if observing document.documentElement or document.body directly
        if (isDocumentRoot(observedElement)) {
          context.report({
            node,
            messageId: 'avoidResizeObserverOnRoot',
          })
          return
        }

        // Check if observing a variable that was assigned document.documentElement or document.body
        if (observedElement.type === 'Identifier' && documentRootVariables.has(observedElement.name)) {
          context.report({
            node,
            messageId: 'avoidResizeObserverOnRoot',
          })
        }
      },
    }
  },
}

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

/**
 * Checks if a node is likely a ResizeObserver instance
 * Checks for patterns like:
 * - new ResizeObserver(...).observe(...)
 * - resizeObserverVariable.observe(...)
 * - observer.observe(...) when not explicitly another observer type
 * This is a heuristic approach since we can't always determine the exact type
 */
function isLikelyResizeObserver(node) {
  // Check for new ResizeObserver(...).observe(...) pattern
  if (node.type === 'NewExpression' && node.callee.type === 'Identifier' && node.callee.name === 'ResizeObserver') {
    return true
  }

  // Check for variable names that suggest ResizeObserver
  if (node.type === 'Identifier') {
    const name = node.name.toLowerCase()

    // Exclude other observer types explicitly
    if (
      name.includes('intersection') ||
      name.includes('mutation') ||
      name.includes('performance') ||
      name.includes('reportingobserver')
    ) {
      return false
    }

    // Match explicit ResizeObserver patterns
    if (name.includes('resizeobserver')) {
      return true
    }

    // Match generic "observer" variable name (common pattern but may have false positives)
    // This is intentionally broad to catch common cases where developers use generic names
    if (name === 'observer') {
      return true
    }

    // Match names containing both "resize" and "obs" (e.g., resizeObs, resize_obs)
    if (name.includes('resize') && name.includes('obs')) {
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
    // Track variables that are explicitly IntersectionObserver or MutationObserver instances
    const nonResizeObserverVariables = new Set()

    return {
      // Track variable declarations that assign document.documentElement or document.body
      VariableDeclarator(node) {
        if (node.init && isDocumentRoot(node.init) && node.id.type === 'Identifier') {
          documentRootVariables.set(node.id.name, node.init)
        }

        // Track IntersectionObserver and MutationObserver declarations to avoid false positives
        if (
          node.id.type === 'Identifier' &&
          node.init &&
          node.init.type === 'NewExpression' &&
          node.init.callee.type === 'Identifier' &&
          (node.init.callee.name === 'IntersectionObserver' ||
            node.init.callee.name === 'MutationObserver' ||
            node.init.callee.name === 'PerformanceObserver' ||
            node.init.callee.name === 'ReportingObserver')
        ) {
          nonResizeObserverVariables.add(node.id.name)
        }
      },

      // Check addEventListener calls
      ['CallExpression[callee.property.name="addEventListener"]']: function (node) {
        const [name] = node.arguments
        if (name.type !== 'Literal') return
        if (!(name.value in observerMap)) return

        // Allow window events for viewport-level detection
        // This prevents flagging window.resize and window.scroll which are appropriate for viewport detection
        if (node.callee.object && isWindowObject(node.callee.object)) {
          return
        }

        context.report({
          node,
          messageId: 'avoid',
          data: {name: name.value, observer: observerMap[name.value]},
        })
      },

      // Check ResizeObserver.observe() calls on document root elements
      ['CallExpression[callee.property.name="observe"]']: function (node) {
        const callee = node.callee
        if (!callee.object) return

        // Exclude variables that are explicitly other observer types
        if (callee.object.type === 'Identifier' && nonResizeObserverVariables.has(callee.object.name)) {
          return
        }

        // Only check if this appears to be a ResizeObserver
        // This prevents false positives for IntersectionObserver, MutationObserver, etc.
        if (!isLikelyResizeObserver(callee.object)) return

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

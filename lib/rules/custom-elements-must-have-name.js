module.exports = function(context) {
  const messageNoGetter = 'Custom elements need to implement `static get name()`'
  const messageMultipleStatements = '`static get name()` should only return string'
  const messageNotMatching = '`static get name()` should return the name of the class'

  return {
    ClassDeclaration(node) {
      const hasSuperClass = node.superClass
      const superClassIsElement = hasSuperClass && node.superClass.name.endsWith('Element')

      if (!hasSuperClass || !superClassIsElement) return

      let getter
      for (const method of node.body.body) {
        if (method.type !== 'MethodDefinition') continue
        if (!method.static) continue
        if (method.kind !== 'get') continue
        if (method.key.name !== 'name') continue
        getter = method
        break
      }

      if (!getter) {
        return context.report({
          node,
          message: messageNoGetter,
          meta: {
            fixable: 'code'
          },
          fix(fixer) {
            if (node.body.body.length) {
              return fixer.insertTextBefore(node.body.body[0], `static get name() { return '${node.id.name}'} `)
            }
            return fixer.replaceText(
              node,
              `class ${node.id.name} extends ${node.superClass.name} { static get name() { return '${node.id.name}' } }`
            )
          }
        })
      }

      if (getter.value.body.body.length !== 1 || getter.value.body.body[0].type !== 'ReturnStatement') {
        return context.report({
          node: getter.value.body.body[0],
          message: messageMultipleStatements,
          meta: {
            fixable: 'code'
          },
          fix(fixer) {
            return getter.value.body.body.map((statement, i) => {
              if (i === 0) return fixer.replaceText(getter.value.body.body[0], `return '${node.id.name}'`)
              return fixer.remove(statement)
            })
          }
        })
      }

      const returnStatement = getter.value.body.body[0]

      if (returnStatement.argument.type !== 'Literal' || returnStatement.argument.value !== node.id.name) {
        return context.report({
          node: returnStatement,
          message: messageNotMatching,
          meta: {
            fixable: 'code'
          },
          fix(fixer) {
            return fixer.replaceText(returnStatement, `return '${node.id.name}'`)
          }
        })
      }
    }
  }
}

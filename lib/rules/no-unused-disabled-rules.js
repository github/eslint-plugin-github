module.exports = function(context) {
  const reported = new Set()
  const disableReporting = new Map()

  function handleComment(comment) {
    var value = comment.value.trim()
    var match = /^(eslint(-\w+){0,3})(\s|$)/.exec(value)

    if (match) {
      value = value.substring(match.index + match[1].length)

      var lineno = null
      if (match[1] === 'eslint-disable') {
        lineno = '*'
      } else if (match[1] === 'eslint-disable-line') {
        lineno = comment.loc.start.line
      } else if (match[1] === 'eslint-disable-next-line') {
        lineno = comment.loc.start.line + 1
      }

      const ruleIds = parseListConfig(value)
      if (ruleIds.size === 0) {
        disableReporting.set(`${lineno}:*`, {comment})
      } else {
        ruleIds.forEach(function(ruleId) {
          disableReporting.set(`${lineno}:${ruleId}`, {ruleId, comment})
        })
      }
    }
  }

  return {
    "LineComment": handleComment,
    "BlockComment": handleComment,
    "Program": function() {
      const report = context.eslint.report
      context.eslint.report = function() {
        const ruleId = arguments[0]
        const location = arguments[3]

        if (ruleId !== 'no-unused-disabled-rules') {
          reported.add(`*:*`)
          reported.add(`*:${ruleId}`)
          reported.add(`${location.line}:${ruleId}`)
          reported.add(`${location.line}:*`)
        }

        return report.apply(this, arguments)
      }

    },
    "Program:exit": function(program) {
      disableReporting.forEach(function(value, key) {
        if (!reported.has(key)) {
          if (value.ruleId) {
            context.report(value.comment, `Disabled '${value.ruleId}' rule, but didn't report anything.`)
          } else {
            context.report(program, `Disabled all rules, but didn't report anything.`)
          }
        }
      })
    }
  }
}

function parseListConfig(string) {
  var items = new Set()

  // Collapse whitespace around ,
  string = string.replace(/\s*,\s*/g, ",")

  string.split(/,+/).forEach(function(name) {
    name = name.trim()
    if (name) {
      items.add(name)
    }
  })

  return items
}

module.exports.schema = []

const objectMap = new Map([
  ['github', ['test1']],
  ['mona', ['test2']],
])
const values = []
const keys = []

for (const [key, value] of objectMap) {
  values.push(value)
  keys.push(key)
}

export {keys, values}

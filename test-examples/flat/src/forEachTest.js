const testing = [
  [{name: 'github'}, ['test1']],
  [{name: 'mona'}, ['test2']],
]
const objectMap = new ObjectMap(testing)
const values = []
const keys = []

objectMap.forEach((value, key) => {
  values.push(value)
  keys.push(key)
})
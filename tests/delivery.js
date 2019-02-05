const assert = require('assert')
const { deliver } = require('../src/deliver.js')

const tests = {
  1: [['>', 2], ['^>v<', 4], ['^v^v^v^v^v', 2]],
  2: [['>v', 3], ['^>v<', 3], ['^v^v^v^v^v', 11]]
}

// TODO: make parallel
Object.keys(tests).forEach(people => {
  tests[people].forEach(([directions, expectedHouses]) => {
    const { houses, delivered } = deliver(directions, Number(people))
    try {
      assert.strictEqual(delivered, expectedHouses)
      console.log(`✓ ${delivered} houses with ${people} pople following '${directions}'`)
    } catch (e) {
      console.log(`✘ ${delivered} houses (expected ${expectedHouses}) with ${people} people following '${directions}'`)
      console.dir({ houses })
    }
  })
})

console.log(`tests passed!`)

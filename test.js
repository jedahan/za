const assert = require('assert')
const { deliver } = require('./za.js')

const tests = {
  1: [['>', 2], ['^>v<', 4], ['^v^v^v^v^v', 2]],
  2: [['>v', 3], ['^>v<', 3], ['^v^v^v^v^v', 11]]
}

// TODO: make parallel
Object.keys(tests).forEach(deliveryPeople => {
  tests[deliveryPeople].forEach(([directions, expectedHouses]) => {
    const { houses, delivered } = deliver(directions, Number(deliveryPeople))
    try {
      assert.strictEqual(delivered, expectedHouses)
      console.log(`✓ ${delivered} houses with ${deliveryPeople} deliveryPeople following '${directions}'`)
    } catch (e) {
      console.log(`✘ ${delivered} houses (expected ${expectedHouses}) with ${deliveryPeople} deliveryPeople following '${directions}'`)
      console.dir({houses})
    }
  })
})

console.log(`tests passed!`)

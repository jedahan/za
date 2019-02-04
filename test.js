const assert = require('assert')
const { deliver } = require('./za.js')

const tests = {
  1: [['>', 2], ['^>v<', 4], ['^v^v^v^v^v', 2]],
  2: [['>', 3], ['^>v<', 3], ['^v^v^v^v^v', 11]]
}

// TODO: make parallel
Object.keys(tests).forEach(deliveryPeople => {
  tests[deliveryPeople].forEach(([directions, expectedHouses]) => {
    const { houses } = deliver(directions)
    assert.strictEqual(houses, expectedHouses)
  })
})

console.log(`tests passed!`)

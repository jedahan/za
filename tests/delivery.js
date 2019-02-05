const { deliver } = require('../src/deliver.js')
const { strictEqual } = require(`assert`)
const { test, run, exit } = require('spooning');

const tests = [
  {input: { people: 1, directions: '>'}, output: { delivered: 2}},
  {input: { people: 1, directions: '^>v<'}, output: {delivered: 4}},
  {input: { people: 1, directions: '^v^v^v^v^v'}, output: {delivered: 2}},
  {input: { people: 2, directions: '>v'}, output: { delivered: 3}},
  {input: { people: 2, directions: '^>v<'}, output: {delivered: 3}},
  {input: { people: 2, directions: '^v^v^v^v^v'}, output: {delivered: 11}},
  {input: { people: 1, directions: '^v^v^v^v^v'}, output: {delivered: 11}, fail: true},
]

for (let testCase of tests) {
  const { people, directions } = testCase.input
  const { delivered: expectedDelivered } = testCase.output

  const description = testCase.fail
    ? `not ${expectedDelivered} houses with ${people} people following '${directions}'`
    : `${expectedDelivered} houses with ${people} people following '${directions}'`
  test(description, cb => {
    const { delivered } = deliver(directions, people)
    if (testCase.fail) {
      try { strictEqual(delivered, expectedDelivered) }
      catch (e) { cb(null) }
    } else {
      cb(strictEqual(delivered, expectedDelivered))
    }
  })
}

run(exit)

const { LocationsVisitedReducer, TakeTurnsDispatcher, DeliveryPerson } = require('../src/deliver.js')
const { deepStrictEqual } = require(`assert`)
const { test } = require('spooning')

const tests = [
  { input: { people: 1, directions: '>' }, expectedOutput: { locationsVisited: 2 } },
  { input: { people: 1, directions: '^>v<' }, expectedOutput: { locationsVisited: 4 } },
  { input: { people: 1, directions: '^v^v^v^v^v' }, expectedOutput: { locationsVisited: 2 } },
  { input: { people: 2, directions: '>v' }, expectedOutput: { locationsVisited: 3 } },
  { input: { people: 2, directions: '^>v<' }, expectedOutput: { locationsVisited: 3 } },
  { input: { people: 2, directions: '^v^v^v^v^v' }, expectedOutput: { locationsVisited: 11 } },
  { input: { people: 1, directions: '^v^v^v^v^v' }, expectedOutput: { locationsVisited: 11 }, fail: true },
]

for (let testCase of tests) {
  const { people, directions } = testCase.input
  const { expectedOutput } = testCase

  const description = testCase.fail
    ? `not ${expectedOutput.locationsVisited} houses with ${people} people following '${directions}'`
    : `${expectedOutput.locationsVisited} houses with ${people} people following '${directions}'`

  test(description, cb => {
    const deliveryPeople = Array.from(Array(people), () => new DeliveryPerson())
    const dispatcher = new TakeTurnsDispatcher(deliveryPeople)
    dispatcher.dispatch(directions)
    const locationsVisitedReducer = new LocationsVisitedReducer(deliveryPeople)
    const output = locationsVisitedReducer.summarize()

    if (testCase.fail) {
      try { deepStrictEqual(output, expectedOutput) }
      catch (e) { cb(e.code === 'ERR_ASSERTION' ? null : e) }
    } else {
      cb(deepStrictEqual(output, expectedOutput))
    }
  })
}

const { deliver } = require('./za.js')

const { argv, exit } = require('process')

const validateArguments = async () => {
  if (argv.length < 3 || (argv.length === 3 && argv[2] === 'help')) {
    const help= `
Usage
  $ node cli [deliveryPeople] <directions>

Where deliveryPeople is an integer and directions are a string

See how many houses got a pizza with a single delivery person

  $ node cli '^v^v'

Same thing, but with more complex input

  $ node cli <<< input.txt

What if we had 2 delivery people?

  $ node cli 2 <<< input.txt
`
    console.log(help)
    exit(0)
  }
  return { arguments: argv }
}

const parseOptions = async ({arguments}) => {
  let [_node, _cli, deliveryPeopleString, directions] = arguments
  let deliveryPeople = Number(deliveryPeopleString)

  if (isNaN(deliveryPeople)) {
    directions = deliveryPeopleString
    deliveryPeople = 1
  }

  if (deliveryPeople !== Math.floor(deliveryPeople)) {
    console.error(`deliveryPeople must be an integer, found ${deliveryPeople}`)
    exit(-1)
  }

  console.error({directions, deliveryPeople})
  return {directions, deliveryPeople}
}

const getHouses = async ({directions, deliveryPeople}) => {
  return deliver(directions, deliveryPeople)
}

// debug to stderr, plain to stdout
const output = async ({delivered}) => {
  console.error({delivered})
  console.log(delivered)
}

validateArguments()
  .then(parseOptions)
  .then(getHouses)
  .then(output)

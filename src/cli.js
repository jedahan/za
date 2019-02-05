const { deliver } = require('./deliver.js')

const { exit, stdin, stderr } = require('process')
const arg = require('@zeit/arg')

const debug = data => {
  stderr.write(`🍕 `)
  console.error(data)
}

const error = (message, code=-1) => {
  stderr.write(`✘ `)
  console.error(message)
  exit(code)
}


const readStdin = async () => {
  debug(`Please enter some directions (<^v>)`)
  return new Promise((resolve, reject) => {
    stdin.setEncoding('utf8')

    let input = ''
    const accept = () => resolve(input.trim())

    stdin.on('readable', () => {
      let chunk
      while ((chunk = process.stdin.read()) !== null) {
        input += chunk
        if (input.includes('\n')) return accept()
      }
    })
    stdin.on('end', accept)
  })
}

const validateArguments = async () => {
  const args = arg({
    '--help': Boolean,
    '--people': Number,
    '--directions': String,
    '-h': '--help',
    '-p': '--people',
    '-d': '--directions',
  })

  if (args[`--help`]) {
    const help = `  Help

  za tracks the number of homes who get tasty pizza

  za defaults to 1 person and stdin for directions

    $ za [--people number] [--directions string]

  See how many houses got a pizza with a single delivery person

    $ npm run za -- --directions '^v^v'

  Same thing, but with more complex input

    $ npm run za -- <data/input.txt

  What if we had 2 delivery people?

    $ npm run za -- --people 2 <data/input.txt
`
    console.log(help)
    exit(0)
  }

  const people = args[`--people`]
  if (people && people !== Math.floor(people)) {
    error(`people must be an integer, found ${people}`)
  }
  if (!people) args.people = 1

  const directions = args[`--directions`] ? args[`--directions`] : await readStdin()

  debug({ people, directions })
  return { people, directions }
}

const getHouses = async ({ directions, people }) => {
  return deliver(directions, people)
}

// debug to stderr, plain to stdout
const output = async ({ delivered }) => {
  debug({ delivered })
  console.log(delivered)
}

validateArguments()
  .then(getHouses)
  .then(output)

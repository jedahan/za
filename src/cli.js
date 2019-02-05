const { deliver } = require('./deliver.js')

const { argv, exit, stdin, stderr } = require('process')

const debug = data => {
  stderr.write(`🍕 `)
  console.error(data)
}

const readStdin = () => {
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
  if (argv.length % 2) {
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

  // Try and get people from argv, default to 1
  let people = argv.indexOf(`--people`) + 1 ? Number(argv[argv.indexOf(`--people`) + 1]) : 1
  if (isNaN(people)) people = 1
  if (people !== Math.floor(people)) {
    console.error(`people must be an integer, found ${people}`)
    exit(-1)
  }

  let directions = argv.indexOf(`--directions`) + 1 ? argv[argv.indexOf(`--directions`) + 1] : null
  if (directions === null) directions = await readStdin()

  debug({ directions, people })
  return { directions, people }
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

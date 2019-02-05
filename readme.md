# za.js

How many houses get some tasty za?

Zero dependencies, but requires nodejs and recommends npm

Dispatch some directions

    node src/cli --directions '^v^v'
    # 2

With two delivery people, using npm

    npm run za -- --people 2 '^v^v'
    # 3

Run the tests

    npm test


## ux

    npm run za -- --help

    Help

    za tracks the number of homes who get tasty pizza

    za defaults to 1 person and stdin for directions

      $ npm run za -- [--people number] [--directions string]

    See how many houses got a pizza with a single delivery person

      $ npm run za -- --directions '^v^v'

    Same thing, but with more complex input

      $ npm run za -- <data/input.txt

    What if we had 2 delivery people?

      $ npm run za -- --people 2 <data/input.txt

## design

I decided to see how far I can get with no libraries, just plain node.js (v11.7.0).
This is partly a response to the whole event-stream kerfluffle, but mostly seeing how far regular js ergonomics have gotten.
The three places I would want to use libraries for, before this would be ready for production are in in argument parsing, reading stdin, and running tests.

We slightly abuse `JSON.stringify` to do 'value equality' on locations. See issue #1 for details.

The commandline [src/cli.js](./src/cli.js) accepts stdin for directions, uses stderr for debugging information, and stdout for piping the answer to other scripts. Make sure to use `--silent` if you are using `npm run`, for example `npm run --silent za -- '^v^v'| toilet -f mono12`

<p align="center">
    <img src="https://jedahan.github.io/za/cli.svg">
</p>

[src/deliver.js](./src/deliver.js) the main delivery algorithm

[tests/delivery.js](./tests/delivery.js) runs tests found in the challenge readme

# answers

With the given input.txt, I got 2565 homes with 1 delivery person and 2639 homes with 2 delivery people. This can be checked with `npm run homework`

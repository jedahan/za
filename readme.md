# za.js

How many houses get some tasty za?

Note: for a slightly more minimal version, check out the [zero-dependencies branch].

# requirements

Tested on node v11.7.0. Make sure to install dependencies

    npm install

Then run the tests

    npm test

## ux

    $ npm run za -- --help

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

We slightly abuse `JSON.stringify` to do 'value equality' on locations. See issue #1 for details.

The commandline [src/cli.js](./src/cli.js) accepts stdin for directions, uses stderr for debugging information, and stdout for piping the answer to other scripts. Make sure to use `--silent` if you are using `npm run`, for example `npm run --silent za -- '^v^v'| toilet -f mono12`

<p align="center">
    <img src="https://jedahan.github.io/za/cli.svg">
</p>

[src/deliver.js](./src/deliver.js) the main delivery algorithm

[tests/delivery.js](./tests/delivery.js) runs tests found in the challenge readme

# answers

With the given input.txt, I got 2565 homes with 1 delivery person and 2639 homes with 2 delivery people. This can be checked with `npm run homework`

[zero-dependencies branch]: https://github.com/jedahan/za

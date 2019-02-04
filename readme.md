# za.js

How many houses get some tasty za?

Dispatch some directions

    node cli '^v^v'
    # 2

With two delivery people

    node cli 2 '^v^v'
    # 3

Run the tests

    node test
    # tests pass!

## design

The commandline [cli.js][] outputs debugging information to stderr and the raw output to stdout, so you can use it in other scripts, for example:

<p align="center">
    <img src="./cli.svg">
</p>

[za.js](./za.js) houses houses the main delivery algorithm

[test.js](./test.js) runs tests found in the challenge readme

## todo

* run tests in parallel
* investigate removing stringification of positions
* rename cli => za and za => lib
* move todos to issues
* package.json for nicer scripts (`npm run` `npm test`)

# Ethereum tools

A set of helper functions for ethereum dapps.

## Installation

You can either add it as a Meteor package with `$ meteor add ethereum:tools`, 
or add simply link to the `ethtools.js` in you HTML.

## Usage

### EthTools.fromWei

    EthTools.fromWei(wei, unit)

Takes a number of wei and converts it to any other ethereum unit.
You can also pass a HEX of a decimal as the `wei` parameter.

Possible units are:

    - kwei/ada
    - mwei/babbage
    - gwei/shannon
    - szabo
    - finney
    - ether
    - kether/grand/einstein
    - mether
    - gether
    - tether

Example:

```js
var finney = EthTools.fromWei(1000000000000, 'finney');
// finney = 0.001
```

### EthTools.toWei

    EthTools.toWei(number, unit)

Takes a number of a unit and converts it to wei.
You can also pass a HEX of a decimal as the `number` parameter.

Possible units are:

    - kwei/ada
    - mwei/babbage
    - gwei/shannon
    - szabo
    - finney
    - ether
    - kether/grand/einstein
    - mether
    - gether
    - tether

Example:

```js
var wei = EthTools.toWei(1000000000000, 'finney');
// wei = 0.001
```

### EthTools.isAddress

    EthTools.isAddress(address)

Checks if the given string is a valid ethereum HEX address.

Example:

```js
EthTools.isAddress('0x9b22a80d5c7b3374a05b446081f97d0a34079e7f');
// returns true

EthTools.isAddress('9b22a80d5c7b3374a05b446081f97d0a34079e7f');
// returns true

EthTools.isAddress('0x9b22a80d5c7b3374a05b');
// returns false
```
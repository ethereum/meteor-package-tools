# Ethereum tools

A set of helper functions for ethereum dapps.


## Installation

You can either add it as a Meteor package using `$ meteor add ethereum:tools`, 
or add link to the `ethtools.js` in your HTML.

Additionally this package exposes the following packages, when used as a meteor package:

- [frozeman:storage](https://atmospherejs.com/frozeman/storage), which gives you the `LocalStore.set()/.get()` functions (used for `dapp_formatBalance`).


## Usage

### EthTools.formatNumber

    EthTools.formatNumber(number, format)

Fomats any number using `numeral.js`


Example:

```js
var finney = EthTools.formatNumber(2000, '0,0.00');
// finney = '2,000.00'
```

### EthTools.formatBalance

    EthTools.formatBalance(number, format, unit)

formats a number of wei into any other ethereum unit and adds the unit on the end.

Default is unit `ether`.

Additionally this function in reactive when setting the unit using `LocalStore.set('dapp_etherUnit', 'finney')` 
and will rerun any reactive function where its used in.

```js
var amount = EthTools.formatBalance(112345676543212345, '0,0.0[00]', 'finney');
// amount = "112.346 finney"
``
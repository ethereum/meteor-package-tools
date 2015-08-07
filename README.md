# Ethereum tools

A set of helper functions for ethereum dapps.

See here for a [demo of the template helpers](http://localhost:4000/#tools).

## Installation

You can either add it as a Meteor package using:

    $ Meteor add ethereum:tools

or add link to the `ethtools.js` in your HTML.


## Usage

This package provides formating and converting functionality.

When using this package as a Meteor package it will call regularly the [kraken.com public API](https://api.kraken.com/0/public/Ticker?pair=XETHZEUR,XXBTZUSD) to retrive price information for ether.
When used as a Meteor package, the following units are possible for some methods:

    - `btc`
    - `usd`
    - `eur`
    - `cad`
    - `gbp`
    - `jpy`
    - And all ether units ('ether', 'finney', 'wei', etc)

**Note** As non-meteor package you can only use the ether units.

***

### EthTools.ticker

    EthTools.ticker.findOne(unit)

**Note** This is only available when used as a Meteor package.

It gives you the latest price for ether based on the [kraken.com public API](https://api.kraken.com/0/public/Ticker?pair=XETHZEUR,XXBTZUSD).
`EthToole.ticker` is a reactive collection, so when used in a reactive function it will re-run this function when the price is updated.

The ticker will be updated every 30 seconds.

**Methods**

Its a normal Meteor collection

- `findOne(unit)` - returns an object with the price of the unit
- `find().fetch()` - returns all available price ticker units

**Returns**

- `Object`
```js
{
    _id: 'btc',
    price: '0.02000'
}
```

**Example**
```js
var usd = EthTools.ticker.findOne('usd')

if(usd)
    console.log(usd.price) // "2.0000"
```

***

### EthTools.setLocale

    EthTools.setLocale(locale)

Set the locale to display numbers differently in other countries.
This functions lets `EthTools.formatBalance()` and `EthTools.formatNumber()` reactivly re-run, to show the new format.

**Parameters**

- `locale` (`String`) - the locale to set

**Returns**

`String` - the set locale e.g. `en`

**Example**

```js
EthTools.setLocale('de');
EthTools.formatNumber(2000, '0,0.00');
// 2 000,00
```

***

### EthTools.setUnit

    EthTools.setUnit(unit)

**Note** This is only available when used as a Meteor package.

Reactivly sets a unit used as default unit, when no unit is passed to other EthTools methods.
And also persists it in localstorage so its the same when you reload you app.

Default is unit `ether`.

**Parameters**

- `unit` (`String`) - the unit to set, see [Usage](#usage) for more

**Returns**

`Boolean` - TRUE if the unit is an allowed unit and could be set

**Example**

```js
EthTools.setUnit('btc');

Tracker.autorun(function(){
    var amount = EthTools.formatBalance('23000000000000000000', '0,0.0[00] unit');
    // amount = "0.287 btc"
});
```

***

### EthTools.getUnit

    EthTools.getUnit()

**Note** This is only available when used as a Meteor package.

Reactivly gets the current set default unit, used byt other EthTools methods when no unit was passed.
And also persists it in localstorage so its the same when you reload you app.

Default is unit `ether`.


**Parameters**

none

**Returns**

`String` - the current default unit.

**Example**

```js
EthTools.setUnit('btc');

Tracker.autorun(function(){
    var unit = EthTools.getUnit();
    // unit === 'btc'
});

```

***

### EthTools.formatNumber

    EthTools.formatNumber(number, format)

Fomats any number using [numeral.js](http://numeraljs.com).

**Parameters**

- `number` (`String|Number`) - the number to format
- `format` (`String`) - the format see [numeral.js](http://numeraljs.com) for examples

**Returns**

`String` - the formated number.

**Example**

```js
var finney = EthTools.formatNumber(2000, '0,0.00');
// finney = '2,000.00'
```
***

#### Format number template helper

**Usage**

```html
{{dapp_formatNumber "1000000133" "0,0.00[0000]"}}
```

***

### EthTools.formatBalance

    EthTools.formatBalance(wei, format, unit)

Formats a number of wei into any other ethereum unit and other currencies (see [Usage](#usage)).

Default is unit `ether`.

The `format` property follows the [numeral.js](http://numeraljs.com) formatting.
Additionally you can add `" unit"` or `" UNIT"` (for uppercase) to display the unit after the number.

Additionally this function uses the reactive `EthTools.getUnit()` variable, when no `unit` was given.
You can then reactivly change the unit using `EthTools.setUnit('finney')`

**Parameters**

- `wei` (`String|Number`) - the amount of wei to convert and format
- `format` (`String`) - the format see [numeral.js](http://numeraljs.com) for examples
- `unit` (`String`) - (optional) the unit to convert the given wei amount to, if not given it will use `EthTools.getUnit()`

**Returns**

`String` - the formated balance.

**Example**

```js
var amount = EthTools.formatBalance(112345676543212345, '0,0.0[00] unit', 'finney');
// amount = "112.346 finney"
```

***

#### Format balances template helper

![format balances](https://raw.githubusercontent.com/ethereum/meteor-package-elements/master/screenshots/formatBalance.png)

**Usage**

```html
{{dapp_formatBalance "1000000133" "0,0.00[0000]" "ether"}}
```

If you leave the last value it will use `EthTools.getUnit()`, as reactive localstorage variable.

```html
{{dapp_formatBalance "1000000133" "0,0.00"}}
```

Use then `EthTools.setUnit(finney')` to change the unit and displayed balances.

***

### EthTools.toWei

    EthTools.toWei(number, unit)

Formats an amount of any supported unit (see [Usage](#usage)) into wei.

Default is unit `ether`.

Additionally this function uses the reactive `EthTools.getUnit()` variable, when no `unit` was given.
You can then reactivly change the unit using `EthTools.setUnit('finney')`

**Parameters**

- `number` (`String|Number`) - the number of a unit, see [Usage](#usage) for more
- `unit` (`String`) - the unit of the given number

**Returns**

`String` - the number in wei.

**Example**

```js
var wei = EthTools.toWei(23, 'btc');
// wei = "80000000000000000000"
```

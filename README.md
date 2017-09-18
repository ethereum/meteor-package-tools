# Ethereum tools

> This package is an alternative of https://github.com/ethereum/meteor-package-tools for node and the browser. The API is therefore as close as possible.

Formatting and value conversion for ethereum currencies.

## Installation

    $ npm install --save ethtools

## Usage

### formatBalance (or `formatWei`)

Format a number of wei to another ether unit.

- `number` : (`String|Number|BN`) - the number of wei to format
- `format` : (`String`) - the format see [numeral.js](http://numeraljs.com) for more examples (`0,0.[00000000] $` by default)
- `unit` : (`String`) - any ethereum units see [ethjs-unit](https://github.com/ethjs/ethjs-unit#supported-units) supported units (`ether` by default)
- `options` : (`Object`) - a list of options. Currently supported options are:
  - `etherSymbol` : (`String`) - if unit is `ether` will use this symbol for the unit instead (Ξ by default)
  - `locale` : (`String`) - a custom locale (*en* by default)

```
import { formatBalance } from 'ethtools';

formatBalance('1000000000000000000');
// => 1.0 Ξ
```

### formatNumber

Format a number using [numeral.js](http://numeraljs.com) formats.
> this function is used internally by `formatBalance`

- `number` (`String|Number|BN`) - the number to format
- `format` (`String`) - the format see [numeral.js](http://numeraljs.com) for more examples

| Number    | Format       | String     |
|-----------|--------------|------------|
| 1000.234  | '$0,0.00'    | Ξ1,000.23  |
| 1000.2    | '0,0[.]00 $' | 1,000.20 Ξ |
| 1001      | '$ 0,0[.]00' | Ξ 1,001    |
| -1000.234 | '($0,0)'     | (Ξ1,000)   |
| -1000.234 | '$0.00'      | -Ξ1000.23  |
| 1230974   | '($ 0.00 a)' | Ξ 1.23 m   |
`
- `unit` (`String`) - any custom unit/currencies, will replace the `$` sign
- `options` : (`Object`) - a list of options. Currently supported options are:
  - `etherSymbol` : (`String`) - if unit is `ether` will use this symbol for the unit instead (Ξ by default)
  - `locale` : (`String`) - a custom locale (*en* by default)

#### Example
```
import { formatNumber } from 'ethtools';

formatNumber('1000000000000000000', '0,0.0[00]');
// => 1,000,000,000,000,000,000.0
```

### toWei

> A proxy method to `toWei` method of [ethjs-unit](https://github.com/ethjs/ethjs-unit)

### fetchPrices

Promise-based helper to fetch current ether price information via [cryptocompare.com public API](https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=BTC,USD,EUR);

#### Example
```
import { fetchPrices } from 'ethtools';

fetchPrices().then(({response, json }) => console.log(json));
// { BTC: 0.07353, USD: 297.5, EUR: 250.78 }
```

## Tests

Simply clone the repo, npm install, and run npm test.

## Links

- https://github.com/ethjs/ethjs-unit
- http://numeraljs.com
- https://github.com/indutny/bn.js
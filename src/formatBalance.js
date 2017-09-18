import EthjsUnit from 'ethjs-unit';
import BN from 'bn.js';
import numberToBN from 'number-to-bn';
import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
import isFinite from 'lodash.isfinite';
import supportedCurrencies from './supportedCurrencies';
import formatNumber from './formatNumber';

// load a format
numeral.register('format', 'percentage', {
  regexps: {
    format: /(unit)/i,
    unformat: /(%)/
  },
  format: function(value, format, roundingFunction) {
    var space = numeral._.includes(format, ' %') ? ' ' : '',
      output;

    value = value * 100;

    // check for space before %
    format = format.replace(/\s?\%/, '');

    output = numeral._.numberToFormat(value, format, roundingFunction);

    if (numeral._.includes(output, ')')) {
      output = output.split('');

      output.splice(-1, 0, space + '%');

      output = output.join('');
    } else {
      output = output + space + '%';
    }

    return output;
  },
  unformat: function(string) {
    return numeral._.stringToNumber(string) * 0.01;
  }
});

// use your custom format
numeral().format('0%');

/**
 * Formats a number of wei to a balance.
 *
 * `formatBalance(myNumber, "0,0.0[0000] unit")`
 *
 * @param {String} number
 * @param {String} number
 * @param {String} format       the format string
 * @param {String} unit
 * @param {String} price
 * @return {String} The formatted number
 */
export default (number, format = '0,0.[00000000]', unit, price) => {
    number = numberToBN(number);

    if (typeof price !== 'undefined' && supportedCurrencies(unit)) {
      price = numberToBN(price);

      // convert first to ether
      number = EthjsUnit.fromWei(number, 'ether');

      // then times the currency
      number = number.times(price)
    } else {
      number = EthjsUnit.fromWei(number, unit.toLowerCase());
    }

    const isUppercase = format.indexOf('UNIT') !== -1;

    const cleanedFormat = format.replace(/ *unit */i, '').replace(/ +/, '');
    format = format.replace(cleanedFormat, '__format__');

    if (format.toLowerCase().indexOf('unit') !== -1) {
        return format
            .replace('__format__', formatNumber(number, cleanedFormat))
            .replace(/unit/i, isUppercase ? unit.toUpperCase() : unit);
    }

    return formatNumber(number, cleanedFormat);
};

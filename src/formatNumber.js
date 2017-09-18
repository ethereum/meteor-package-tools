/* eslint-disable no-useless-escape */
import BN from 'bn.js';
import numberToBN from 'number-to-bn';
import numeral from 'numeral';
import isString from 'lodash.isstring';
import isObject from 'lodash.isobject';
import isFinite from 'lodash.isfinite';
import { DEFAULT_LOCALE } from './constants';

/**
 * Formats a given number.
 *
 * `formatNumber(10000, "0.0[000]")`
 *
 * @param {Number|String|BN} number the number to format.
 * @param {String} format the format string e.g. "0,0.0[000]" see http://numeraljs.com for more.
 * @param {String} locale Sets the locale to display numbers in different formats.
 * @return {String} The formated time.
 */
export default (number, format, locale = DEFAULT_LOCALE) => {
  number = numberToBN(number);
  numeral.locale(locale);

  return numeral(number.toString(10)).format(format);
};

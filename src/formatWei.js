import { DEFAULT_OPTIONS } from './constants';
import formatNumber from './formatNumber';
import EthjsUnit from 'ethjs-unit';

/**
 * Format a number of wei to another ethereum unit.
 *
 * @param {String|Number|BN} number the number of wei to format
 * @param {String} format see http://numeraljs.com for examples
 * @param {String} unit any ethereum units see https://github.com/ethjs/ethjs-unit#supported-units for supported units
 * @param {Object} options
 *  {String} etherSymbol if unit is `ether` will use this symbol for the unit instead (Ξ by default)
 *  {String} locale a custom local (*en* by default)
 */
export default (number, format = '0,0.[00000000] $', unit = 'ether', options = DEFAULT_OPTIONS) => {
    options = { ...DEFAULT_OPTIONS, ...options };

    return formatNumber(EthjsUnit.fromWei(number, unit.toLowerCase()), format, unit, options);
};

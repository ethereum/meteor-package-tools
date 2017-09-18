import { DEFAULT_LOCALE, DEFAULT_OPTIONS } from './constants';
import BN from 'bn.js';
import numeral from 'numeral';

/**
 * Format a number.
 *
 * | number    | format       | string     |
 * |-----------|--------------|------------|
 * | 1000.234  | '$0,0.00'    | Ξ1,000.23  |
 * | 1000.2    | '0,0[.]00 $' | 1,000.20 Ξ |
 * | 1001      | '$ 0,0[.]00' | Ξ 1,001    |
 * | -1000.234 | '($0,0)'     | (Ξ1,000)   |
 * | -1000.234 | '$0.00'      | -Ξ1000.23  |
 * | 1230974   | '($ 0.00 a)' | Ξ 1.23 m   |
 *
 * @param {String|Number|BN} number
 * @param {String} format the format see http://numeraljs.com for examples
 * @param {String} unit any custom unit/currencies, will replace the `$` sign
 * @param {Object} options
 *  {String} etherSymbol if unit is `ether` will use this symbol for the unit instead (Ξ by default)
 *  {String} locale a custom local (*en* by default)
 */
export default (number, format, unit = 'ether', options = DEFAULT_OPTIONS) => {
    let { locale, etherSymbol } = { ...DEFAULT_OPTIONS, ...options };

    if (number instanceof BN) {
        number = number.toString(10);
    }

    try {
        numeral.localeData(locale);
    } catch (e) {
        // eslint-disable-next-line no-console
        console.warn(
            `Couldn't find locale '${locale}', if implemented in 'numeral-js', you need to load it manually: require('numeral/locales/${locale}');`
        );
        locale = DEFAULT_LOCALE;
    }

    const localeData = numeral.localeData(locale);
    localeData.currency = {
        ...localeData.currency,
        symbol: unit.toLowerCase() === 'ether' ? etherSymbol : unit,
    };
    numeral.locale(locale);

    return numeral(number).format(format);
};

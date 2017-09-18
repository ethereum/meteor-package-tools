import { SUPPORTED_CURRENCIES } from './constants';

/**
 * Check for supported currencies.
 *
 * @param {String } unit
 * @return {String}
 */
export default unit => SUPPORTED_CURRENCIES.indexOf(unit);

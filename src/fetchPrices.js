import fetch from 'isomorphic-fetch';
import { CRYPTOCOMPARE_CURRENCIES } from './constants';

export default (
    { currencies = CRYPTOCOMPARE_CURRENCIES, extraParams = '' } = {
        currencies: CRYPTOCOMPARE_CURRENCIES,
    }
) => {
    let url = 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=' + currencies.join(',');
    if (extraParams) {
        url += '&extraParams=' + extraParams;
    }

    return fetch(url).then(response => {
        if (response.ok) {
            return response.json().then(json => ({ json, response }));
        }

        throw new Error(
            'Can not connect to https://mini-api.cryptocompare.com to get price data, please check your internet connection.',
            response.status
        );
    });
};

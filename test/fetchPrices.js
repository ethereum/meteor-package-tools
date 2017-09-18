import { expect } from 'chai';
import fetchPrices from '../src/fetchPrices';
import { CRYPTOCOMPARE_CURRENCIES } from '../src/constants';

describe('fetchPrices', () => {
    it('resolves and return the prices of the currencies', async () => {
        const result = await fetchPrices();
        expect(result.response.ok);
        expect(result.json).to.be.an('object');
        CRYPTOCOMPARE_CURRENCIES.map(currency => expect(result.json).to.have.property(currency));
    });
});

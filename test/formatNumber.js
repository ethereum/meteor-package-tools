import { expect } from 'chai';
import formatNumber from '../src/formatNumber';

describe('formatNumber', () => {
    it('format number to specified format', () => {
        expect(formatNumber('1000000000000000000', '0,0.0[00]')).to.equal(
            '1,000,000,000,000,000,000.0'
        );
        expect(formatNumber('11234565.4565432', '0,0.0[00]')).to.equal('11,234,565.457');
    });
});

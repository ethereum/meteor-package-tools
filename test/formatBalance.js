import { expect } from 'chai';
import formatBalance from '../src/formatBalance';
import { ETHER_DEFAULT_SYMBOL } from '../src/constants';

describe('formatBalance', () => {
    it('format balance to specified format', () => {
        expect(formatBalance('1000000000000000000', '0,0.0[00] $')).to.equal(
            `1.0 ${ETHER_DEFAULT_SYMBOL}`
        );
        expect(formatBalance('1000000000000000000', '0,0.0[00] $', 'finney')).to.equal(
            '1,000.0 finney'
        );
        expect(formatBalance('100000000000000000', '0,0.0[00] $', 'FINNEY')).to.equal(
            '100.0 FINNEY'
        );
        expect(formatBalance('1000000000000000000', '0,0.0[00] $', 'gwei')).to.equal(
            '1,000,000,000.0 gwei'
        );
        expect(formatBalance('112345676543212345', '0,0.0[00] $', 'GWEI')).to.equal(
            '112,345,676.543 GWEI'
        );
        expect(formatBalance('112345676543212345', '0,0.0[0000]', 'gwei')).to.equal(
            '112,345,676.54321'
        );
    });
});

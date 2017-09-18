import { expect } from 'chai';
import formatBalance from '../src/formatBalance';

describe('formatBalance', () => {
    it('format balance to specified format', () => {
        expect(formatBalance('1000000000000000000', '0,0.0[00] unit', 'ether')).to.equal(
            '1.0 ether'
        );
        expect(formatBalance('1000000000000000000', '0,0.0[00] unit', 'finney')).to.equal(
            '1,000.0 finney'
        );
        expect(formatBalance('100000000000000000', '0,0.0[00] UNIT', 'finney')).to.equal(
            '100.0 FINNEY'
        );
        expect(formatBalance('1000000000000000000', '0,0.0[00] unit', 'gwei')).to.equal(
            '1,000,000,000.0 gwei'
        );
        expect(formatBalance('112345676543212345', '0,0.0[00] UNIT', 'gwei')).to.equal(
            '112,345,676.543 GWEI'
        );
        expect(formatBalance('112345676543212345', '0,0.0[0000]', 'gwei')).to.equal(
            '112,345,676.54321'
        );

        // set BTC price
        let btcPrice = '0.01230';

        expect(() => formatBalance('2000000000000000000', '0,0.0[00]', 'btc', btcPrice)).to.throw(

        );
        expect(() => formatBalance('2000000000000000000', '0,0.0[00] unit', 'btc', btcPrice)).to.throw(

        );
        expect(() => formatBalance('2000000000000000000', '0,0.0[00]unit', 'btc', btcPrice)).to.throw(
        );

        btcPrice = '0.1';

        expect(() =>
        formatBalance('1000000000000000000', '0,0.0000000000000000000', 'btc', btcPrice)
        ).to.throw();

        // set EUR price
        let eurPrice = '3.12344';

        expect(() =>
        formatBalance('1200000000000000012', '0,0.0000000000000000000', 'eur', eurPrice)
        ).to.throw();
        expect(() => formatBalance('2000000000000000000', '0,0.0[00]', 'eur', eurPrice)).to.throw(

        );
        expect(() => formatBalance('2000000000000000000', '0,0.0[00] UNIT', 'eur', eurPrice)).to.throw(

        );
        expect(() => formatBalance('2000000000000000000', '0,0.0[0000]UNIT', 'eur', eurPrice)).to.throw(

        );

        eurPrice = '1.00000';

        expect(() =>
        formatBalance('1000000000000000000', '0,0.0000000000000000000', 'eur', eurPrice)
        ).to.throw();
    });
});

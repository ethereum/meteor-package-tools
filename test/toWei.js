import { expect } from 'chai';
import BN from 'bn.js';
import toWei from '../src/toWei';

const btcPrice = '0.01230';

expect(() => toWei(0.025, 'btc', btcPrice)).to.throw();
expect(() => toWei(0.02554351, 'btc', btcPrice)).to.throw();

const eurPrice = '3.12344';

expect(() => toWei(6.247, 'eur', eurPrice)).to.throw();
expect(() => toWei(6.24688, 'eur', eurPrice)).to.throw();
expect(() => toWei('3.7481279999999999042', 'eur', eurPrice)).to.throw();



Tinytest.add('EthTools.fromWei', function (test) {
    test.equal(EthTools.fromWei(1000000000000000000, 'wei'), 1000000000000000000);
    test.equal(EthTools.fromWei(1000000000000000000, 'kwei'), 1000000000000000);
    test.equal(EthTools.fromWei(1000000000000000000, 'mwei'), 1000000000000);
    test.equal(EthTools.fromWei(1000000000000000000, 'gwei'), 1000000000);
    test.equal(EthTools.fromWei(1000000000000000000, 'szabo'), 1000000);
    test.equal(EthTools.fromWei(1000000000000000000, 'finney'), 1000);
    test.equal(EthTools.fromWei(1000000000000000000, 'ether'), 1);
    test.equal(EthTools.fromWei(1000000000000000000, 'kether'), 0.001);
    test.equal(EthTools.fromWei(1000000000000000000, 'grand'), 0.001);
    test.equal(EthTools.fromWei(1000000000000000000, 'mether'), 0.000001);
    test.equal(EthTools.fromWei(1000000000000000000, 'gether'), 0.000000001);
    test.equal(EthTools.fromWei(1000000000000000000, 'tether'), 0.000000000001);
});


Tinytest.add('EthTools.isAddress', function (test) {
    test.equal(EthTools.isAddress('9827e85c63d11f58a8f761c5949e9d8d51114f82'), true);
    test.equal(EthTools.isAddress('0x9827e85c63d11f58a8f761c5949e9d8d51114f82'), true);
    test.equal(EthTools.isAddress('0x9827e85c63d11f58a8f761c5949e9d8d51114f82s'), false);
    test.equal(EthTools.isAddress('9827e85c63d11f58a8f761c5949e9d8d51114f82s'), false);
});
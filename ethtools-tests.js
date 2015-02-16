

Tinytest.add('EthTools.fromWei', function (test) {
    test.equal(EthTools.fromWei(1000000000000000000, 'wei'),    1000000000000000000);
    test.equal(EthTools.fromWei(1000000000000000000, 'kwei'),   1000000000000000);
    test.equal(EthTools.fromWei(1000000000000000000, 'mwei'),   1000000000000);
    test.equal(EthTools.fromWei(1000000000000000000, 'gwei'),   1000000000);
    test.equal(EthTools.fromWei(1000000000000000000, 'szabo'),  1000000);
    test.equal(EthTools.fromWei(1000000000000000000, 'finney'), 1000);
    test.equal(EthTools.fromWei(1000000000000000000, 'ether'),  1);
    test.equal(EthTools.fromWei(1000000000000000000, 'kether'), 0.001);
    test.equal(EthTools.fromWei(1000000000000000000, 'grand'),  0.001);
    test.equal(EthTools.fromWei(1000000000000000000, 'mether'), 0.000001);
    test.equal(EthTools.fromWei(1000000000000000000, 'gether'), 0.000000001);
    test.equal(EthTools.fromWei(1000000000000000000, 'tether'), 0.000000000001);
});

Tinytest.add('EthTools.toWei', function (test) {
    test.equal(EthTools.toWei(1, 'wei'),    1);
    test.equal(EthTools.toWei(1, 'kwei'),   1000);
    test.equal(EthTools.toWei(1, 'mwei'),   1000000);
    test.equal(EthTools.toWei(1, 'gwei'),   1000000000);
    test.equal(EthTools.toWei(1, 'szabo'),  1000000000000);
    test.equal(EthTools.toWei(1, 'finney'), 1000000000000000);
    test.equal(EthTools.toWei(1, 'ether'),  1000000000000000000);
    test.equal(EthTools.toWei(1, 'kether'), 1000000000000000000000);
    test.equal(EthTools.toWei(1, 'grand'),  1000000000000000000000);
    test.equal(EthTools.toWei(1, 'mether'), 1000000000000000000000000);
    test.equal(EthTools.toWei(1, 'gether'), 1000000000000000000000000000);
    test.equal(EthTools.toWei(1, 'tether'), 1000000000000000000000000000000);
});


Tinytest.add('EthTools.isAddress', function (test) {
    test.equal(EthTools.isAddress('9827e85c63d11f58a8f761c5949e9d8d51114f82'), true);
    test.equal(EthTools.isAddress('0x9827e85c63d11f58a8f761c5949e9d8d51114f82'), true);
    test.equal(EthTools.isAddress('0x9827e85c63d11f58a8f761c5949e9d8d51114f82s'), false);
    test.equal(EthTools.isAddress('9827e85c63d11f58a8f761c5949e9d8d51114f82s'), false);
});
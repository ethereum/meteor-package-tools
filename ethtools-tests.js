

Tinytest.add('EthTools.formatNumber', function (test) {
    test.equal(EthTools.formatNumber(1000000000000000000, '0,0.0[00]'),  "1,000,000,000,000,000,000.0");
    test.equal(EthTools.formatNumber(11234565.4565432, '0,0.0[00]'),  "11,234,565.457");
});

Tinytest.add('EthTools.formatBalance', function (test) {
    // default to ether
    test.equal(EthTools.formatBalance(1000000000000000000, '0,0.0[00]'), "1.0 ether");

    test.equal(EthTools.formatBalance(1000000000000000000, '0,0.0[00]', 'finney'), "1,000.0 finney");

    test.equal(EthTools.formatBalance(112345676543212345, '0,0.0[00]', 'finney'), "112.346 finney");
});
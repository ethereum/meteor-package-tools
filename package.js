Package.describe({
  name: 'ethereum:tools',
  summary: 'Helper functions for dapps',
  version: '0.0.8',
  git: 'http://github.com/ethereum/meteor-package-tools'
});

Package.onUse(function(api) {
  api.versionsFrom('1.0');

  api.use('ethereum:web3@0.9.0', 'client');
  api.use('numeral:numeral@1.5.3', 'client');
  api.use('frozeman:storage@0.1.8', 'client');
  api.imply('frozeman:storage@0.1.8', 'client');

  api.export(['EthTools', 'web3'], ['client', 'server']); // we need to expose web3.js, so that the app, can re-use this one, instead of having two instances

  api.addFiles('ethtools.js', 'client');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('ethereum:tools');
  api.addFiles('ethtools-tests.js', 'client');
});


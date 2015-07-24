'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('apps:aws-signer');
  debug('start');

  var app = require('./server/routes')(options, imports);

  debug('register aws-signer');
  register(null, {
    awsSigner: app
  });
};

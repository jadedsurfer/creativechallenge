'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('apps:auth');
  debug('start');

  var app = require('./server/routes')(options, imports);

  debug('register auth');
  register(null, {
    www: app
  });
};

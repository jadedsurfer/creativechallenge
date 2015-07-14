'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('apps:www');
  debug('start');

  var app = require('./server/routes')(options, imports);

  debug('register www');
  register(null, {
    www: app
  });
};

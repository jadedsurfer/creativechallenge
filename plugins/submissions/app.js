'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('apps:submissions');
  debug('start');

  var app = require('./server/routes')(options, imports);

  debug('register submissions');
  register(null, {
    submissions: app
  });
};

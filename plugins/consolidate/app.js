'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('apps:consolidate');
  debug('start');

  debug('register consolidate');
  register(null, {
    consolidate: require('consolidate')
  });
};

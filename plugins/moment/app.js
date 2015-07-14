'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('apps:moment');
  debug('start');

  debug('register moment');
  register(null, {
    moment: require('moment')
  });
};

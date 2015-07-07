'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('math');
  debug('debug message');
  register(null, {math: {
    add: function (a,b) { return a + b; },
    subtract: function (a, b) { return a - b; },
    multiply: function (a, b) { return a * b; },
    divide: function (a, b) { return a / b; }
  }});
};

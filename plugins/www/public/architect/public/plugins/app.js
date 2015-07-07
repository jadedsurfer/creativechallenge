/* global document */

'use strict';

    module.exports = function(options, imports, register) {
      var p = document.createElement('p');
      p.textContent = '1 + 4 = ' + imports.math.add(1, 4);
      document.body.appendChild(p);
      register();
    };

'use strict';

module.exports = function(options, imports) {
  var debug = imports.debug('www:auth');

  var path = require('path');

  var app = imports.server;
  var router = imports.Router();
  var view = require('consolidate');

  function getPath(file){
    return path.join(__dirname, '../../', file);
  }

  debug('configure routes');

  router.get('/', function (req, res, next) {

    view.jade(getPath('views/pages/index.jade'), {user:
      req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  debug('.use router');
  app.use('/', router);

  debug('serve static files from public dir');
  var pathToStatic = path.join(__dirname, '../../', 'public');
  app.middleware('files', app.loopback.static(pathToStatic));

  return router;
};

'use strict';

module.exports = function(options, imports) {
  var debug = imports.debug('apps:www');

  var path = require('path');

  var app = imports.server;
  var router = imports.Router();
  var staticMW = imports.staticMiddleware;
  var view = imports.consolidate;
  var moment = imports.moment;
  var models = imports.models;

  function getPath(file){
    return path.join(__dirname, '../', file);
  }

  debug('configure routes');

  router.get('/', function (req, res, next) {

    res.redirect('/index.html');

  });

  debug('.use router');
  app.use('/', router);

  debug('serve static files from public dir');
  var pathToStatic = path.join(__dirname, '../../', 'public');
  app.middleware('files', staticMW(pathToStatic));

  return router;
};

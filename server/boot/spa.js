'use strict';
/**
 * Mounts a single page application on route /spa
 * @namespace server/boot/spa
 * @param {Object} server - The loopback (express) application on which the
 * route will be mounted
 * @exports mountApps
 */
module.exports = function mountApps(server) {

  var router = server.loopback.Router();
  var staticMiddleware = server.loopback.static;
  var options = server.get('spa');

  server.use('/', setUpRouter(router, staticMiddleware, options));

};

/**
 * Sets up paths for single page application
 * @param {Object} router - express router
 * @param {function} staticMiddleware - middleware to handle requests to files
 * @requires path
 * @requires browserify
 * @requires brfs
 * @returns router
 */
function setUpRouter(router, staticMiddleware, options){
  var path = require('path');
  var browserify = require('browserify-middleware');
  var brfs = require('brfs');

  // Mount points
  var mountIndexHtmlToRoute = options.mountIndexHtmlToRoute || '/index';
  var mountBuildJsToRoute = options.mountBuildJsToRoute || '/js/build.js';

  // File paths
  var relativePathToEntryHtml = options.relativePathToEntryHtml ||
    '../../client/index.html';
  var relativePathToEntryJs = options.relativePathToEntryJs ||
    '../../client/app/js/app.js';

  var staticRoot = options.staticRoot || '/client/';


  router.get(mountIndexHtmlToRoute, function(req, res){
    res.sendFile(path.join(__dirname, relativePathToEntryHtml));
  });

  router.get(mountBuildJsToRoute, browserify(
    path.join(__dirname, relativePathToEntryJs),
    {
      transform: [ brfs ]
    }
  ));

  router.use('/', staticMiddleware(staticRoot));

  return router;
}





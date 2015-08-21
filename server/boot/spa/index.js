/**
 * Sets up paths for single page application
 * @param {Object} router - express router
 * @param {function} staticMiddleware - middleware to handle requests to files
 * @param {Object} configuredOptions - options used to override defaults
 * @returns router
 */
function setUpSpa(router, staticMiddleware, configuredOptions){

  var options = resolvePaths(setUpOptions(configuredOptions));

  return setUpRouter(router, staticMiddleware, options);

}

/**
 * Sets up options for the single page application by merging configured options
 * with default options
 * @param {Object} configuredOptions - options used to override defaults
 * @returns options
 */
function setUpOptions(configuredOptions){
  var options = {};

  // Mount points
  options.mountIndexHtmlToRoute = configuredOptions.mountIndexHtmlToRoute ||
    '/index';
  options.mountBuildJsToRoute = configuredOptions.mountBuildJsToRoute ||
    '/js/build.js';

  // File paths
  options.relativePathToEntryHtml = configuredOptions.relativePathToEntryHtml ||
    '../../client/index.html';
  options.relativePathToEntryJs = configuredOptions.relativePathToEntryJs ||
    '../../client/app/js/app.js';

  options.staticRoot = configuredOptions.staticRoot || '/client/';

  return options;
}

/**
 * Converts relative path options to full path options
 * @param {Object} options - options including relativePathToEntryHtml
 * and relativePathToEntryJs
 * @requires path
 * @returns options
 */
function resolvePaths(relativeOptions){
  var path = require('path');
  var options = relativeOptions;

  options.pathToEntryHtml = path.join(
    __dirname, '../', relativeOptions.relativePathToEntryHtml);

  options.pathToEntryJs = path.join(
    __dirname, '../', relativeOptions.relativePathToEntryJs);

  return options;
}

/**
 * Sets up paths for single page application
 * @param {Object} router - express router
 * @param {function} staticMiddleware - middleware to handle requests to files
 * @param {Object} options - options required to set up routes
 * @returns router
 */
function setUpRouter(router, staticMiddleware, options){
  router.get(
    options.mountIndexHtmlToRoute,
    exports.serveHtml(options.pathToEntryHtml)
  );

  router.get(
    options.mountBuildJsToRoute,
    exports.serveHtml(options.pathToEntryJs)
    //exports.serveBrowserified(options.pathToEntryJs)
  );

  router.use('/', staticMiddleware(options.staticRoot));

  return router;
}

/**
 * Controller for html entry point for SPA
 * @param {string} path - path of the file to send
 * @returns function
 */
function serveHtml(path){
  return function(req, res){
    res.sendFile(path);
  };
}

/**
 * Controller for js entry point for SPA
 * @param {string} path - path of app js entry point
 * @requires browserify
 * @requires brfs
 * @returns function
 */
function serveBrowserified(path){
  var browserify = require('browserify-middleware');
  var brfs = require('brfs');
  return browserify(
    path,
    {
      transform: [ brfs ]
    }
  );
}


exports.setUpSpa = setUpSpa;

exports.setUpOptions = setUpOptions;

exports.resolvePaths = resolvePaths;

exports.setUpRouter = setUpRouter;

exports.serveHtml = serveHtml;

exports.serveBrowserified = serveBrowserified;





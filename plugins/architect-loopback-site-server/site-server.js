'use strict';
var assetmanager = require('terraform-connect');

module.exports = function(options, imports, register){
  var debug = imports.debug('site-server');
  debug('start');

  var server = imports.server;
  var siteServer = {};


  // @publicDir root directory for static content
  siteServer.serveStaticFrom = function(publicDir){

    if (publicDir) {
      debug('add static directory for', publicDir);
      server.middleware('files', server.loopback.static(publicDir));
    }

  };

  siteServer.mountStatic = function(mountPoint, publicDir){

    if (publicDir) {
      debug('mount static directory', publicDir, 'to', mountPoint);
      server.middleware('files', mountPoint, server.loopback.static(publicDir));
    }

  };

  // @rootDir root directory for Harp to serve dynamic content
  siteServer.serveDynamicFrom = function(rootDir){

    if (rootDir) {
      debug('add dynamic directory for', rootDir);
      server.middleware('files', assetmanagerErrorHandler);
      server.middleware('files', server.loopback.static(rootDir));
      server.middleware('files', assetmanager.pipeline({root: rootDir}));
    }
  };

  siteServer.mountDynamic = function(mountPoint, rootDir){

    if (rootDir) {
      debug('mount dynamic directory for', rootDir, 'to', mountPoint);
      server.middleware('files', mountPoint, assetmanagerErrorHandler);
      server.middleware('files', mountPoint, server.loopback.static(rootDir));
      server.middleware('files', mountPoint,
        assetmanager.pipeline({root: rootDir}));
    }
  };

  function assetmanagerErrorHandler(req, res, next){
    req.app.logger = {};
    req.app.logger.error = debug.error;
    next();
  }

  debug('register siteServer');
  register(null, {
    siteServer: siteServer
  });

};

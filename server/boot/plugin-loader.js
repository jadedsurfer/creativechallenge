'use strict';

module.exports = function loadApps(server, cb) {

  var path = require('path');
  var architect = require('architect');

  // Fill in plugin information from package.json
  var projectRoot = path.join(__dirname, '../../');
  var plugins = architect.resolveConfig(server.settings.plugins, projectRoot);
  var registeredServices = [];

  // Inject server so it is available to the plugins
  var api = {
    server: server,
    Router: server.loopback.Router,
    models: server.models,
    datasources: server.datasources,
    cookieParserMiddleware: server.loopback.cookieParser,
    sessionMiddleware: server.loopback.session,
    staticMiddleware: server.loopback.static
  };
  plugins.push({
    consumes: [],
    provides: [
      'server',
      'Router',
      'models',
      'datasources',
      'cookieParserMiddleware',
      'sessionMiddleware',
      'staticMiddleware'
    ],
    setup: function(options, imports, register) {
      register(null, api);
    }
  });

  // Load the plugins
  var system = architect.createApp(plugins);

  // Handle when a new service is registered
  system.on('service', function(service){
    //console.log(service);
    registeredServices.push(service);
  });

  // Handle any errors
  system.on('error', function(err){
    if (err) {
      console.error('problem adding plugins to app');
      console.log('successfully registered these plugins: %O',
        registeredServices );
      //console.error(err);
      return cb(err);
    }
  });

  // Handle when the plugins are completely ready
  system.on('ready', function(sys){
//    console.log(sys);
//    console.log(sys.services.server.loopback().middleware);
    process.nextTick(function(){
      console.log('successfully registered these plugins',
        registeredServices );
    });
    server._plugins = sys;
    return cb(null, sys);
  });

};

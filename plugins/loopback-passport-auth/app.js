'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('apps:auth');
  debug('start');

  var server = imports.server;
  var models = imports.models;
  var providers = options.providers;


  var path = require('path');

  // Passport configurators..
  var loopbackPassport = require('loopback-component-passport');
  var PassportConfigurator = loopbackPassport.PassportConfigurator;
  var passportConfigurator = new PassportConfigurator(server);

  var flash= require('express-flash');

  // attempt to build the providers/passport config
  var config = {};
  try {
    debug('get providers');
    if (process.env.NODE_ENV === 'development'){
      config = require(providers.development);
      debug('got providers for dev');
    } else {
      config = require(providers.production);
      debug('got providers for prod');
    }
  } catch (err) {
    debug.error(err);
    process.exit(1); // fatal
  }

  debug('use accessToken model for auth middleware');
  server.middleware('auth', server.loopback.token({
    model: models.AccessToken
  }));

  debug('init passport configuration');
  passportConfigurator.init();

  debug('use flash middleware');
  server.use(flash());

  debug('set up models for passport configuration');
  passportConfigurator.setupModels({
    userModel: models.User,
    userIdentityModel: models.UserIdentity,
    userCredentialModel: models.UserCredential
  });

  for (var provider in config) {
    var providerConfig = config[provider];
    providerConfig.session = providerConfig.session !== false;
    passportConfigurator.configureProvider(provider, providerConfig);
  }

  var app = require('./server/routes')(options, imports);

  debug('register auth');
  register(null, {
    auth: app
  });
};

'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('apps:auth');
  debug('start');

  var server = imports.server;

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
      config = require('../../server/providers.development.json');
      debug('got providers for dev');
    } else {
      config = require('../../server/providers.json');
      debug('got providers for prod');
    }
  } catch (err) {
    debug.error(err);
    process.exit(1); // fatal
  }

  debug('use accessToken model for auth middleware');
  server.middleware('auth', server.loopback.token({
    model: server.models.accessToken
  }));

  debug('init passport configuration');
  passportConfigurator.init();

  debug('use flash middleware');
  server.use(flash());

  debug('set up models for passport configuration');
  passportConfigurator.setupModels({
    userModel: server.models.User,
    userIdentityModel: server.models.userIdentity,
    userCredentialModel: server.models.userCredential
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

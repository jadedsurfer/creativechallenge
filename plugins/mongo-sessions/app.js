'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('apps:mongo-sessions');
  debug('start');

  var server = imports.server;
  var sessionMW = imports.sessionMiddleware;
  var cookieParserMW = imports.cookieParserMiddleware;
  var datasources = imports.datasources;

  var sessionOptions = options.sessionOptions;

  debug('set up mongodb store');
  var MongoStore = require('connect-mongo')(sessionMW);

  debug('use cookieParser before session middleware');
  server.middleware('session:before', cookieParserMW(
    options.cookieSecret || process.env.cookieSecret
  ));

  debug('create store');
  var storeOptions = datasources[options.datasource].settings;
  storeOptions.db = storeOptions.url;
  var store = new MongoStore(storeOptions);


  debug('use session middleware');
  if (!sessionOptions.secret) {
    sessionOptions.secret = process.env.sessionSecret;
  }

  sessionOptions.store = store;

  server.middleware('session', sessionMW(sessionOptions));

  debug('register nothing');
  register(null);
};

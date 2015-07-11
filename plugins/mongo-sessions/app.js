'use strict';

module.exports = function(options, imports, register) {
  var debug = imports.debug('apps:mongo-sessions');
  debug('start');

  var server = imports.server;

  var MongoStore = require('connect-mongo')(server.loopback.session);

  debug('use cookieParser before session middleware');
  server.middleware('session:before', server.loopback.cookieParser(
    process.env.cookieSecret
  ));

  debug('use loopback session for session middleware');
  var storeOptions = server.datasources[options.datasource].settings;
  storeOptions.db = storeOptions.url;
  var store = new MongoStore(storeOptions);
  server.middleware('session', server.loopback.session({
    secret: process.env.sessionSecret,
    saveUninitialized: true,
    resave: true,
    store: store
  }));

  debug('register nothing');
  register(null);
};

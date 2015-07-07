module.exports = function finishAuthConfig(app, passportConfigurator){

  var loopback = require('loopback');

  // Passport configurators..
  var loopbackPassport = require('loopback-component-passport');
  var PassportConfigurator = loopbackPassport.PassportConfigurator;
  var passportConfigurator = new PassportConfigurator(app);

  var flash= require('express-flash');

  // attempt to build the providers/passport config
  var config = {};
  try {
    config = require('../providers.json');
  } catch (err) {
    console.trace(err);
    process.exit(1); // fatal
  }

  app.middleware('auth', loopback.token({
    model: app.models.accessToken
  }));

  app.middleware('session:before', loopback.cookieParser(
    process.env.cookieSecret
  ));
  app.middleware('session', loopback.session({
    secret: process.env.sessionSecret,
    saveUninitialized: true,
    resave: true
  }));
  passportConfigurator.init();

  app.use(flash());

  passportConfigurator.setupModels({
    userModel: app.models.user,
    userIdentityModel: app.models.userIdentity,
    userCredentialModel: app.models.userCredential
  });
  for (var s in config) {
    var c = config[s];
    c.session = c.session !== false;
    passportConfigurator.configureProvider(s, c);
  }
  var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;


};




'use strict';

module.exports = function(options, imports) {
  var debug = imports.debug('apps:auth');

  var path = require('path');
  var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
  var view = require('consolidate');

  var app = imports.server;
  var router = imports.Router();
  var models = imports.models;

  function getPath(file){
    return path.join(__dirname, file);
  }

  debug('configure routes');

  app.get('/auth/current', function(req, res, next) {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      return res.status(200).json({});
    }
    //poor man's copy
    var ret = JSON.parse(JSON.stringify(req.user));
    delete ret.password;
    res.status(200).json(ret);
  });

  router.get('/auth/account', ensureLoggedIn('/login'),
    function(req, res, next){
      res.redirect(options.accountRedirect);
      //var engine = options.loginProfiles.engine;
      //var filePath = options.loginProfiles.path;
      //view[engine](getPath(filePath), {
      //  user: req.user,
      //  url: req.url
      //}, function(err, html){
      //  if (err) throw err;
      //  res.send(html);
      //});
  });

  router.get('/link/account', ensureLoggedIn('/login'),
    function(req, res, next){
      var engine = options.linkedAccounts.engine;
      var filePath = options.linkedAccounts.path;
      view[engine](getPath(filePath), {
      user: req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.get('/local', function (req, res, next){
    var engine = options.local.engine;
    var filePath = options.local.path;
    view[engine](getPath(filePath), {
      user: req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.get('/signup', function (req, res, next){
    var engine = options.signup.engine;
    var filePath = options.signup.path;
    view[engine](getPath(filePath), {
      user: req.user,
      url: req.url,
      messages: {}
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.post('/signup', function (req, res, next) {

    debug('use User model for signup');
    var User = models.User;

    debug('prepare user record from info in req body');
    var newUser = {};
    newUser.email = req.body.email.toLowerCase();
    newUser.username = req.body.username.trim();
    newUser.password = req.body.password;

    debug('create user');
    User.create(newUser, function (err, user) {
      if (err) {
        debug.error('%O', err);
        req.flash('error', err.message);
        return res.redirect('back');
      } else {
        // Passport exposes a login() function on req (also aliased as logIn())
        // that can be used to establish a login session. This function is
        // primarily used when users sign up, during which req.login() can
        // be invoked to log in the newly registered user.
        debug('login user');
        req.login(user, function (err) {
          if (err) {
            debug.error('%O', err);
            req.flash('error', err.message);
            return res.redirect('back');
          }
          return res.redirect('/auth/account');
        });
      }
    });
  });

  router.get('/login', function (req, res, next){
    var engine = options.login.engine;
    var filePath = options.login.path;
    view[engine](getPath(filePath), {
      user: req.user,
      url: req.url,
      messages: {}
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.get('/link', function (req, res, next){
    var engine = options.link.engine;
    var filePath = options.link.path;
    view[engine](getPath(filePath), {
      user: req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.get('/auth/logout', function (req, res, next) {
    req.logout();
    res.redirect(options.logoutRedirect);
  });


  debug('.use router');
  app.use('/', router);

  return router;
};

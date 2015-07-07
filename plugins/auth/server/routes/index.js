'use strict';

module.exports = function(options, imports) {
  var debug = imports.debug('apps:auth');

  var path = require('path');
  var ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;

  var app = imports.server;
  var router = imports.Router();
  var siteServer = imports.siteServer;
  var browserify = imports.browserify;
  var view = require('consolidate');

  function getPath(file){
    return path.join(__dirname, '../../', file);
  }

  debug('configure routes');

  //// simple route attached to router
  //router.get('/auth/fromrouter', function(req, res){
  //  res.send('hello from attached router');
  //});
  //
  //// example of how to use architect on client
  //router.get('/architect', function(req, res){
  //  res.sendFile(path.join(__dirname, '../../', 'public/architect/index.html'));
  //});
  //
  //// servers browserified version of javascript
  //router.get('/architect/build.js',
  //    browserify(
  //      path.join(__dirname, '../../', 'public/architect/public/server.js'),
  //      {
  //        cache: true,
  //        precompile: true
  //      }
  //    )
  //);

  router.get('/', function (req, res, next) {

    view.jade(getPath('views/pages/index.jade'), {user:
      req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.get('/auth/account', ensureLoggedIn('/login'), function(req, res, next){
    view.jade('views/pages/loginProfiles.jade', {
      user: req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.get('/link/account', ensureLoggedIn('/login'), function(req, res, next){
    view.jade('views/pages/linkedAccounts.jade', {
      user: req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.get('/local', function (req, res, next){
    view.jade('views/pages/local.jade', {
      user: req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.get('/signup', function (req, res, next){
    view.jade('views/pages/signup.jade', {
      user: req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.post('/signup', function (req, res, next) {

    var User = app.models.user;

    var newUser = {};
    newUser.email = req.body.email.toLowerCase();
    newUser.username = req.body.username.trim();
    newUser.password = req.body.password;

    User.create(newUser, function (err, user) {
      if (err) {
        req.flash('error', err.message);
        return res.redirect('back');
      } else {
        // Passport exposes a login() function on req (also aliased as logIn())
        // that can be used to establish a login session. This function is
        // primarily used when users sign up, during which req.login() can
        // be invoked to log in the newly registered user.
        req.login(user, function (err) {
          if (err) {
            req.flash('error', err.message);
            return res.redirect('back');
          }
          return res.redirect('/auth/account');
        });
      }
    });
  });

  router.get('/login', function (req, res, next){
    view.jade('views/pages/login.jade', {
      user: req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.get('/link', function (req, res, next){
    view.jade('views/pages/link.jade', {
      user: req.user,
      url: req.url
    }, function(err, html){
      if (err) throw err;
      res.send(html);
    });
  });

  router.get('/auth/logout', function (req, res, next) {
    req.logout();
    res.redirect('/');
  });


  debug('.use router');
  app.use('/', router);

  //app.get('/direct', function(req, res){
  //  res.send('this route was attached directly to the app');
  //});

  debug('serve dynamic content from dynamic');
  var pathToDynamic = path.join(__dirname, '../../', 'dynamic');
  siteServer.mountDynamic('/dynamic', pathToDynamic);

  return router;
};

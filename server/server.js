var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function appStart() {
  // start the web server
  return app.listen(function appListen() {
    app.emit('started');
    console.log('Web server listening at: %s:%s',
      app.get('host'), app.get('port'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function startApp(err, sys){

  if (err) {
    console.error(err);
    process.exit(1);
  }

  app.start();

});




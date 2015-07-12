var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function appStart() {
  // start the web server
  console.log('start');
  return app.listen(function appListen() {
    app.emit('started');
    console.log('Web server listening at: %s', app.get('url'));
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
console.log('boot');
boot(app, __dirname, function startApp(err, sys){
  console.log('boot callback');
  console.log(err);
  if (sys) {
    console.log('got sys');
  }
// start the server if `$ node server.js`
  if (require.main === module) {
    console.log('detected server');
    app.start();
  }
});

app.start();




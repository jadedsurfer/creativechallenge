//var loopback = require('loopback');
//var boot = require('loopback-boot');
////var finishAuthConfig = require('./post-boot/auth');
//
//var app = module.exports = loopback();
//
//app.start = function appStart() {
//  // start the web server
//  return app.listen(function appListen() {
//    app.emit('started');
//    console.log('Web server listening at: %s', app.get('url'));
//  });
//};
//
//// Bootstrap the application, configure models, datasources and middleware.
//// Sub-apps like REST API are mounted via boot scripts.
//boot(app, __dirname, function startApp(err, sys){
//
//// start the server if `$ node server.js`
//  if (require.main === module) {
//    //finishAuthConfig(app);
//    app.start();
//  }
//});

var http = require('http');
var port = process.env.PORT || 1337;
http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World\n');
}).listen(port);



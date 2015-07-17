'use strict';

/**
 * Mounts a single page application on a configurable route
 * @namespace server/boot/spa
 * @param {Object} server - The loopback (express) application on which the
 * route will be mounted
 * @exports mountSPA
 */
module.exports = function mountSPA(server) {

  var setUpRouter = require('./spa/index').setUpRouter;

  var router = server.loopback.Router();
  var staticMiddleware = server.loopback.static;
  var options = server.get('spa');

  server.use('/', setUpRouter(router, staticMiddleware, options));

};


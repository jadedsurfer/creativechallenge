/* global module, require */
// require the config file
// this will make all of the code available
var config = require('./build.config');
var architect = require('architect');

module.exports = architect.resolveConfig(
    config,
    __dirname,
    function(err, config){
  'use strict';
  return architect.createApp(config, function(err, app){
    if (err) {
      console.error(err);
      return err;
    } else {
      return app;
    }
  });
  });



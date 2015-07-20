/*
global angular
*/

var dashController = require('./dash.controller');

var dashModule = angular.module('dashModule', [])

  .controller('DashCtrl',dashController);

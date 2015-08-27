/*
global angular
*/

var dashController = require('./dash.controller');
dashController.$inject = ['$scope'];

var dashModule = angular.module('dashModule', [])

  .controller('DashCtrl',dashController);

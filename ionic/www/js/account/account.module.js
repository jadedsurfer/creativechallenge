/*
global angular
*/

var accountController = require('./account.controller');

var accountModule = angular.module('accountModule', [
  'authModule',
  'ngCookies',
  'lbServices'
])

.controller('AccountCtrl', accountController);

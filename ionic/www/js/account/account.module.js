/*
global angular
*/

var accountController = require('./account.controller');

var accountModule = angular.module('accountModule', [
  'currentUserModule'
])

.controller('AccountCtrl', accountController);

/*
global angular
*/

var accountController = require('./account.controller');
accountController.$inject = ['$scope', 'CurrentUser'];

var accountModule = angular.module('accountModule', [
  'currentUserModule'
])

.controller('AccountCtrl', accountController);

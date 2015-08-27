/*
global angular
*/

var authService = require('./auth.service');
//authService.$inject = ;

var authModule = angular.module('authModule', [
  'lbServices',
  'ngCookies'
])

.factory('AppAuth', ['$cookies', 'User', 'LoopBackAuth', '$http', authService]);

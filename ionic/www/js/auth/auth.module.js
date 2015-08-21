/*
global angular
*/

var authService = require('./auth.service');

var authModule = angular.module('authModule', [
  'lbServices',
  'ngCookies'
])

.factory('AppAuth', authService);

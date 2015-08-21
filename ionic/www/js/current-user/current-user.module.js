/*
global angular
*/

var currentUserService = require('./current-user.service');

var currentUserModule = angular.module('currentUserModule', [
  'authModule'
  ])

.factory('CurrentUser', currentUserService);

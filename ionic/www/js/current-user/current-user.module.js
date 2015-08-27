/*
global angular
*/

var currentUserService = require('./current-user.service');
//currentUserService.$inject = ;

var currentUserModule = angular.module('currentUserModule', [
  'authModule'
  ])

.factory('CurrentUser', [
    'AppAuth',
    currentUserService
]);

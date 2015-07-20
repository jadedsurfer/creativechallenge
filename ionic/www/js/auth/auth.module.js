/*
global angular
*/

var authService = require('./auth.service');

var authModule = angular.module('authModule', ['lbServices'])

.factory('AppAuth', authService);

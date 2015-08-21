/*
global angular
*/

var submissionsController = require('./submissions.controller');

var submissionModule = angular.module('submissionModule', [
  'lbServices',
  'currentUserModule'
])

.controller('SubmissionsCtrl', submissionsController);

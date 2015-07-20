/*
global angular
*/

var submissionsController = require('./submissions.controller');
var submissionController = require('./submission.controller');

var submissionModule = angular.module('submissionModule', [
  'lbServices',
  'authModule'
])

.controller('SubmissionsCtrl', submissionsController)

.controller('SubmissionDetailCtrl', submissionController);

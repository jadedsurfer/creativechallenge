/*
global angular
*/

var submissionsController = require('./submissions.controller');
submissionsController.$inject = [
  '$scope',
  '$stateParams',
  'Submission',
  'CurrentUser'
];

var submissionModule = angular.module('submissionModule', [
  'lbServices',
  'currentUserModule'
])

.controller('SubmissionsCtrl', submissionsController);

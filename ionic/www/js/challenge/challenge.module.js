/*
global angular
*/

var challengeService = require('./challenge.service');
var challengesController = require('./challenges.controller');
var challengeController = require('./challenge.controller');

//challengeService.$inject = ;
//challengesController.$inject = ;
//challengeController.$inject = ;

var challengeModule = angular.module('challengeModule', [
  'lbServices',
  'currentUserModule'
])

.factory('ChallengeService', [
    'Challenge',
    challengeService
  ])

.controller('ChallengesCtrl', [
    '$scope',
    '$stateParams',
    'ChallengeService',
    'Submission',
    'CurrentUser',
    challengesController
  ])

.controller('ChallengeCtrl', [
    '$scope',
    '$stateParams',
    'ChallengeService',
    'Submission',
    'CurrentUser',
    challengeController
  ]);

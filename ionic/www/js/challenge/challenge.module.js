/*
global angular
*/

var challengeService = require('./challenge.service');
var challengesController = require('./challenges.controller');
var challengeController = require('./challenge.controller');

var challengeModule = angular.module('challengeModule', [
  'lbServices',
  'currentUserModule'
])

.factory('ChallengeService', challengeService)

.controller('ChallengesCtrl', challengesController)

.controller('ChallengeCtrl', challengeController);

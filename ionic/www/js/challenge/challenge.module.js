/*
global angular
*/

var challengeService = require('./challenge.service');
var challengesController = require('./challenges.controller');
var challengeController = require('./challenge.controller');

var challengeModule = angular.module('challengeModule', ['lbServices'])

.factory('ActiveChallenge', challengeService)

.controller('ChallengesCtrl', challengesController)

.controller('ChallengeCtrl', challengeController);

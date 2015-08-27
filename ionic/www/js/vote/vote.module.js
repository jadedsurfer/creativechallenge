/*
global angular
*/

var votesController = require('./votes.controller');
var voteController = require('./vote.controller');
votesController.$inject = [
  '$scope',
  '$stateParams',
  'ChallengeService',
  'CurrentUser'
];
voteController.$inject = [
  '$scope',
  '$stateParams',
  'Submission',
  'Vote'
];

var voteModule = angular.module('voteModule', [
  'lbServices',
  'currentUserModule',
  'challengeModule'
])

.controller('VotesCtrl', votesController)

.controller('VoteDetailCtrl', voteController);

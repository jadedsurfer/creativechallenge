/*
global angular
*/

var votesController = require('./votes.controller');
var voteController = require('./vote.controller');

var voteModule = angular.module('voteModule', [
  'lbServices',
  'currentUserModule',
  'challengeModule'
])

.controller('VotesCtrl', votesController)

.controller('VoteDetailCtrl', voteController);

/*
global challengeModule
*/

challengeModule.controller('ChallengesCtrl', function($scope, Challenge){
  $scope.challenges = Challenge.query();
});

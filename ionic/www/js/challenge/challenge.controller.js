module.exports = function($scope, $stateParams, ActiveChallenge) {
    if ($stateParams.challengeId) {

      $scope.challenge =
        ActiveChallenge.getChallengeById($stateParams.challengeId,
          function(challenge){
          $scope.challenge = challenge;
        });

    } else {

       ActiveChallenge.getActiveChallenge(function(challenge){
        $scope.challenge = challenge;
      });

    }

};

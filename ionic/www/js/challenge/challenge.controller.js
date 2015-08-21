module.exports = function(
  $scope, $stateParams, ChallengeService, Submission, CurrentUser) {
    if ($stateParams.challengeId) {

      $scope.challenge =
        ChallengeService.getChallengeById($stateParams.challengeId,
          function(challenge){
          $scope.challenge = challenge;
        });

    } else {

      ChallengeService.getActiveChallenge(function(challenge){
        $scope.challenge = challenge;
      });

    }

  CurrentUser.get(function(currentUser) {
      $scope.currentUser =  currentUser;
  });

  $scope.$on('fileUploaded', function(event, file){
    if ($scope.currentUser.profile.id !== null){
      Submission.create({
        userId: $scope.currentUser.profile.id,
        url: file.file.path_,
        challengeId: $scope.challenge.id,
        submitter: $scope.currentUser.profile.email
      }).$promise
        .then(function(submission){
          console.log(submission);
        });
    }
  });

};

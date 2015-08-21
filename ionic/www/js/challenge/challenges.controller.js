/*
global window
 */
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
      $scope.activeChallenge = challenge;
    });

    ChallengeService.getPastChallenges(function(challenges){
      $scope.challenges = challenges;
    });

  }

  CurrentUser.get(function(currentUser) {
      $scope.currentUser =  currentUser;
  });

  $scope.loginGoogle = function() {
    window.location = '/auth/google';
  };

  $scope.loginFacebook = function() {
    window.location = '/auth/facebook';
  };

  $scope.logout = function() {
    CurrentUser.logout();
  };

  $scope.$on('fileUploaded', function(event, file){
    if ($scope.currentUser.signedIn){
      Submission.create({
        userId: $scope.currentUser.profile.id,
        url: file.file.path_,
        challengeId: $scope.activeChallenge.id,
        submitter: $scope.currentUser.profile.email
      }).$promise
        .then(function(submission){
          console.log(submission);
        });
    }
  });

};

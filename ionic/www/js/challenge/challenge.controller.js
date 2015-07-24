module.exports = function(
  $scope, $stateParams, ActiveChallenge, Submission, AppAuth) {
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

  AppAuth.ensureHasCurrentUser(function(user) {
    if (user && user.email && user.id) {
      $scope.currentUser =  user;
    } else {
      $scope.currentUser = {anonymous: true, id: null};
    }
  });

  $scope.$on('fileUploaded', function(event, file){
    if ($scope.currentUser.id !== null){
      Submission.create({
        userId: $scope.currentUser.id,
        url: file.file.path_,
        challengeId: $scope.challenge.id,
        submitter: $scope.currentUser.email
      }).$promise
        .then(function(submission){
          console.log(submission);
        });
    }
  });

};

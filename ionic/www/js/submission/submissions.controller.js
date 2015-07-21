module.exports = function($scope, $stateParams, Submission, User, AppAuth){

  var challengeId = $stateParams.id;

  AppAuth.ensureHasCurrentUser(function(user) {
    if (user && user.email && user.id) {
      $scope.currentUser =  user;
      if (user.profiles[1].profile.photos[0]) {
        $scope.userPhotoUrl =
          user.profiles[1].profile.photos[0].value;
      } else {
        $scope.userPhotoUrl = '';
      }
    } else {
      $scope.currentUser = {anonymous: true, id: null};
      $scope.hideVoting = true;
    }
  });

  Submission.find({ filter: {
    where: {challengeId: challengeId},
    include: ['votes', 'challenge']
  }}).$promise
    .then(function(submissions){
      //console.log(submissions);
      $scope.challenge = submissions[0].challenge;
      $scope.submissions = submissions;
  }, function(err){
    console.log(err);
  });
};

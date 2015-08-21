module.exports = function($scope, $stateParams, Submission, CurrentUser){

  var challengeId = $stateParams.id;
  $scope.challengeTitle = $stateParams.challengeTitle || 'Submissions';

  CurrentUser.get(function(currentUser) {
    $scope.currentUser = currentUser;
  });

  Submission.find({ filter: {
    where: {challengeId: challengeId},
    include: ['votes', 'challenge']
  }}).$promise
    .then(function(submissions){
      if (submissions.length === 0) {
        $scope.submissions = submissions;
      } else {
        $scope.submissions = submissions;
      }
      $scope.submissionsCount = submissions.length;

  }, function(err){
    console.log(err);
  });
};

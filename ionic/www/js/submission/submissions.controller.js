/*
global submissionModule
*/

submissionModule.controller('SubmissionsCtrl',
  function($scope, $stateParams, Submission, User, AppAuth){

    var challengeId = $stateParams.id;

    if (AppAuth.currentUser) {
      $scope.userPhotoUrl =
        AppAuth.currentUser.profiles[1].profile.photos[0].value;
    }


    Submission.find({ filter: {
      where: {challengeId: challengeId},
      include: ['votes', 'challenge']
    }}).$promise
      .then(function(submissions){
        console.log(submissions);
        $scope.challenge = submissions[0].challenge;
        $scope.submissions = submissions;
    });
});

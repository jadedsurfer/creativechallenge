/*
global submissionModule
*/

submissionModule.controller('SubmissionsCtrl',
  function($scope, $stateParams, Submission, User){

    var challengeId = $stateParams.id;

    console.log(User.isAuthenticated());

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

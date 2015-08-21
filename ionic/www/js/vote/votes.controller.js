module.exports = function(
  $scope,
  $stateParams,
  ChallengeService,
  CurrentUser
){

  var challengeId = $stateParams.id;

  if (challengeId){
    ChallengeService.getChallengeWithSubmissions(challengeId,
      function(challenge){
        $scope.challenge = challenge;
        if (challenge.state === 'active' || challenge.state === 'voting'){
          $scope.votingOpen = true;
        } else {
          $scope.votingOpen = false;
        }
        $scope.submissions = challenge.submissions;
        $scope.submissionsCount = challenge.submissions.length;
      });
  } else {
    ChallengeService.getActiveChallenge(
      function(challenge){
        $scope.challenge = challenge;
        $scope.votingOpen = true;
        $scope.submissions = challenge.submissions;
        $scope.submissionsCount = challenge.submissions.length;
      });
    //Challenge.findOne({
    //  filter: {
    //    where: {state: 'active'},
    //    include: {
    //      relation: 'submissions',
    //      scope: {
    //        include: ['votes']
    //      }
    //    }
    //  }
    //}).$promise
    //  .then(function(activeChallenge){
    //    $scope.challenge = activeChallenge;
    //    $scope.votingOpen = true;
    //    $scope.submissions = activeChallenge.submissions;
    //    $scope.submissionsCount = activeChallenge.submissions.length;
    //  }, function(err){
    //    console.log(err);
    //  });
  }

  CurrentUser.get(function(currentUser){
    $scope.currentUser = currentUser;
  });
};

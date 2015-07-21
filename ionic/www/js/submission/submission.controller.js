module.exports = function($scope, $stateParams, Submission, AppAuth, Vote) {
    //$scope.submission = Submission.get({id: $stateParams.submissionId});

  $scope.hideVoting = ($scope.$parent.currentUser.id !== null) ? false : true;

  $scope.addVote = function(){
    Vote.create({
      userId: $scope.$parent.currentUser.id,
      submissionId: $scope.submission.id
    }).$promise
      .then(function(data){
        $scope.submission.votes.push(data);
        $scope.hideVoting=true;
      }, function(err){
        console.log(err);
      });
  };

  var i = 0;
  var votes = $scope.submission.votes;

  for(i; i < votes.length; i++){
    var currentVote = votes[i];
    var currentUser = $scope.$parent.currentUser;
    if (currentVote.userId === currentUser.id) {
      $scope.hideVoting = true;
      break;
    }
  }


};


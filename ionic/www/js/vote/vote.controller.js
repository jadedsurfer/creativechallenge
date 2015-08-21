module.exports = function($scope, $stateParams, Submission, Vote) {

  $scope.canVote = $scope.$parent.currentUser.canVote;
  $scope.signedIn = $scope.$parent.currentUser.signedIn;
  $scope.votingOpen = $scope.$parent.votingOpen;


  $scope.addVote = function(){
    Vote.create({
      userId: $scope.$parent.currentUser.profile.id,
      submissionId: $scope.submission.id
    }).$promise
      .then(function(data){
        if (!Array.isArray($scope.submission.votes)) {
          $scope.submission.votes = [];
        }
        $scope.submission.votes.push(data);
        $scope.canVote=false;
      }, function(err){
        console.log(err);
      });
  };

  var i = 0;
  var votes = $scope.submission.votes;

  try {
    for(i; i < votes.length; i++){
      var currentVote = votes[i];
      var currentUser = $scope.$parent.currentUser;
      if (currentVote.userId === currentUser.profile.id) {
        $scope.canVote = false;
        break;
      }
    }
  } catch (err){

  }
};


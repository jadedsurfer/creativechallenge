module.exports = function($scope, $stateParams, Challenge) {
    if ($stateParams.challengeId) {
      $scope.challenge = Challenge.get({id: $stateParams.challengeId});
    } else {
      var activeChallenges = Challenge.query({state: 'active'}, function(data){
        console.log(data);
        $scope.challenge = data[0];
      });
    }
};

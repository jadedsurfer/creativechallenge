module.exports = function($scope, Challenge){
  $scope.challenges = Challenge.query();
};

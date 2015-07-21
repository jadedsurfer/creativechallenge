module.exports = function($scope, Challenge){
  Challenge.find().$promise
    .then(function(challenges){
      $scope.challenges = challenges;
    });
};

/*
global accountModule
 */

accountModule.controller('AccountCtrl', function($scope, User) {
  $scope.settings = {
    enableFriends: true
  };
  User.login()
});

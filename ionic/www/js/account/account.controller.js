/*
global window
 */

module.exports = function($scope, CurrentUser) {

    CurrentUser.get(function(currentUser) {
      $scope.currentUser = currentUser;
    });

  $scope.loginGoogle = function() {
    window.location = '/auth/google';
  };

  $scope.loginFacebook = function() {
    window.location = '/auth/facebook';
  };

    $scope.logout = function() {
      CurrentUser.logout();
    };

};


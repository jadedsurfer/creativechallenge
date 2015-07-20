/*
global window
 */

module.exports = function($scope, User, AppAuth, $cookies, LoopBackAuth) {
    $scope.settings = {
      enableFriends: true
    };

    AppAuth.ensureHasCurrentUser(function(user) {
      $scope.currentUser = (user && user.email) ? user : {anonymous: true};
    });

    $scope.loginGoogle = function() {
      window.location = '/auth/google';
    };

    $scope.loginFacebook = function() {
      window.location = '/auth/facebook';
    };

    $scope.logout = function() {
      AppAuth.logout();
    };

};


/*
global window
 */

module.exports = function(AppAuth) {
    return {
      get: function(cb){
        AppAuth.ensureHasCurrentUser(function(user){
          var currentUser = {};
          if (user && user.email && user.id) {
            currentUser.profile =  user;
            currentUser.canUpload = true;
            currentUser.canVote = true;
            currentUser.signedIn = true;
          } else {
            currentUser.profile = {anonymous: true, id: null};
            currentUser.canUpload = false;
            currentUser.canVote = false;
            currentUser.signedIn = false;
          }
          cb(currentUser);
        });
      },
      logout: function(){
        AppAuth.logout();
      }
  };
};

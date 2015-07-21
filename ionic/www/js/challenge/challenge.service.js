module.exports = function(Challenge) {

  return {
    getActiveChallenge: function(cb) {
      Challenge.findOne({
        filter: {
          where: {state: 'active'}
        }
      }).$promise
        .then(cb);
    },
    getChallengeById: function(id, cb) {
      Challenge.findById(
        id
      ).$promise
        .then(cb);
    }
  };
};

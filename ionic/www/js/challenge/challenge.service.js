module.exports = function(Challenge) {

  return {
    getActiveChallenge: function(cb) {
      Challenge.findOne({
        filter: {
          where: {state: 'active'},
          include: {submissions: 'votes'}
        }
      }).$promise
        .then(cb);
    },
    getChallengeById: function(id, cb) {
      Challenge.findById(
        id
      ).$promise
        .then(cb);
    },
    getPastChallenges: function(cb){
      Challenge.find({
        filter: {
          where: {
            'or': [
              {state: 'complete'},
              {state: 'voting'}
            ]
          }
        }
      }).$promise
        .then(cb);
    },
    getChallengeWithSubmissions: function(challengeId, cb){
      Challenge.findOne({
        filter: {
          where: {id: challengeId},
          include: {submissions: 'votes'}
        }
      }).$promise
        .then(cb);
    }
  };
};

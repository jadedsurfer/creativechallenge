module.exports = function(Challenge) {

  var moment = require('moment');

  Challenge.definition.properties.created.default = Date.now;

  Challenge.afterRemote('find', function(ctx, challenges, next){
    challenges.forEach(function(challenge){
      challenge.formattedSubmissionDueDate =
        moment(challenge.submissionDueDate).format('MMMM D, YYYY');
    });
    next();
  });

  Challenge.afterRemote('findById', function(ctx, challenge, next){
    challenge.formattedSubmissionDueDate =
      moment(challenge.submissionDueDate).format('MMMM D, YYYY');
    next();
  });

  Challenge.afterRemote('findOne', function(ctx, challenge, next){
    challenge.formattedSubmissionDueDate =
      moment(challenge.submissionDueDate).format('MMMM D, YYYY');
    next();
  });

};

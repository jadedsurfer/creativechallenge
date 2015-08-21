module.exports = function(Challenge) {

  var moment = require('moment');
  var AWS = require('aws-sdk');
  var s3 = new AWS.S3();
  var params = {
    Bucket: 'creative-challenge-photos',
    Key: ''
  };

  function assignUrl(submission){
    return function(err, url){
      submission.url = url;
      console.log(submission.url);
      return submission;
    };
  }

  function processSubmissions(challenge){
    var jsonChallenge = challenge.toJSON();
      for(var i = 0; i < jsonChallenge.submissions.length; i++){
        var currentSubmission = jsonChallenge.submissions[i];
        params.Key = currentSubmission.url;
        s3.getSignedUrl('getObject', params, assignUrl(currentSubmission));
      }
      console.log(jsonChallenge);
      return jsonChallenge;
  }



  Challenge.definition.properties.created.default = Date.now;

  Challenge.afterRemote('find', function(ctx, challenges, next){
    challenges.forEach(function(challenge){
      try {
        challenge.formattedSubmissionDueDate =
          moment(challenge.submissionDueDate).format('MMMM D, YYYY');
      } catch (err) {
        console.error(err);
      }
    });
    next();
  });

  Challenge.afterRemote('findById', function(ctx, challenge, next){
    try {
      challenge.formattedSubmissionDueDate =
        moment(challenge.submissionDueDate).format('MMMM D, YYYY');
      if (Array.isArray(challenge.submissions())){
        ctx.result = processSubmissions(challenge);
      }

    } catch (err) {
      console.error(err);
    }
    next();
  });

  Challenge.afterRemote('findOne', function(ctx, challenge, next){
    try {
      challenge.formattedSubmissionDueDate =
        moment(challenge.submissionDueDate).format('MMMM D, YYYY');
      if (Array.isArray(challenge.submissions())){
        ctx.result = processSubmissions(challenge);
      }
    } catch (err){
      console.error(err);
    }
    next();
  });

};

module.exports = function(Submission) {

  var AWS = require('aws-sdk');
  var s3 = new AWS.S3();
  var params = {
    Bucket: 'creative-challenge-photos',
    Key: ''
  };


  Submission.definition.properties.created.default = Date.now;

  Submission.afterRemote('find', function(ctx, submissions, next){
    submissions.forEach(function(submission){
      params.Key = submission.url;
      s3.getSignedUrl('getObject', params,
        function (err, url) {
          submission.url = url;
      });
    });
    next();
  });

  Submission.afterRemote('findById', function(ctx, submission, next){
    params.Key = submission.url;
    s3.getSignedUrl('getObject', params,
      function (err, url) {
        submission.url = url;
      });
    next();
  });

  Submission.afterRemote('findOne', function(ctx, submission, next){
    params.Key = submission.url;
    s3.getSignedUrl('getObject', params,
      function (err, url) {
        submission.url = url;
      });
    next();
  });

};

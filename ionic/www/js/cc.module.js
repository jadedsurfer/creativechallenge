/*
global angular, window
*/

// Loopback models
var lbServices = require('./common/lb.services');

var ccModule = angular.module('cc', [
  'ionic',
  'accountModule',
  'challengeModule',
  'chatModule',
  'dashModule',
  's3UploadModule',
  'submissionModule'
])

.run(require('./cc.run'))

.config(require('./cc.config'));

require('./auth/auth.module');
require('./account/account.module');

require('./chat/chat.module');
require('./dash/dash.module');

window.evaporateOptions = {
  signerUrl: '/signer',
  aws_key:   'AKIAIHV6J3E366XVFHQQ',
  bucket:    'creative-challenge-photos',
  logging:   true,
  region: 'us-west-1',
  cloudfront: false,
  aws_url: 'https://s3-us-west-1.amazonaws.com'
};

window.Evaporate = require('../lib/evaporatejs');
require('./s3upload/s3upload.module');
require('../lib/angular-evaporate/lib/angular-evaporate');

require('./challenge/challenge.module');
require('./submission/submission.module');






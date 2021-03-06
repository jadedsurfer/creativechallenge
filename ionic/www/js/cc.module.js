/*
global angular, window
*/

// Loopback models
var lbServices = require('./common/lb.services');
var ccRun = require('./cc.run');
var ccConfig = require('./cc.config');

var ccModule = angular.module('cc', [
  'ionic',
  'accountModule',
  'challengeModule',
  's3UploadModule',
  'submissionModule',
  'voteModule',
  'currentUserModule'
])

.run(['$ionicPlatform', ccRun])

.config(['$stateProvider', '$urlRouterProvider', ccConfig]);


require('./auth/auth.module');
require('./current-user/current-user.module');
require('./account/account.module');

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
require('./vote/vote.module');







/*
global angular
*/

// Loopback models
var lbServices = require('./common/lb.services');

var ccModule = angular.module('cc', [
  'ionic',
  'accountModule',
  'challengeModule',
  'chatModule',
  'dashModule',
  'submissionModule'
])

.run(require('./cc.run'))

.config(require('./cc.config'));

require('./auth/auth.module');
require('./account/account.module');
require('./challenge/challenge.module');
require('./chat/chat.module');
require('./dash/dash.module');
require('./submission/submission.module');






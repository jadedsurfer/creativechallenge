module.exports = function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'js/common/tabs.html'
    })

    // Each tab has its own nav history stack:

    .state('tab.challenge', {
      url: '/challenges',
      views: {
        'tab-challenge': {
          templateUrl: 'js/challenge/tab-challenge.html',
          controller: 'ChallengesCtrl'
        }
      }
    })

    .state('tab.submissions', {
      url: '/challenges/:id/submissions',
      views: {
        'tab-challenge': {
          templateUrl: 'js/vote/tab-vote.html',
          controller: 'VotesCtrl'
        }
      }
    })

    .state('tab.vote', {
      url: '/activechallenge/submissions',
      views: {
        'tab-vote': {
          templateUrl: 'js/vote/tab-vote.html',
          controller: 'VotesCtrl'
        }
      }
    })

    .state('tab.account', {
      url: '/account',
      views: {
        'tab-account': {
          templateUrl: 'js/account/tab-account.html',
          controller: 'AccountCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/challenges');

};

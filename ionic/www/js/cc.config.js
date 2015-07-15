/*
global ccModule
*/

ccModule.config(function($stateProvider, $urlRouterProvider) {

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

    .state('tab.dash', {
      url: '/dash',
      views: {
        'tab-dash': {
          templateUrl: 'js/dash/tab-dash.html',
          controller: 'DashCtrl'
        }
      }
    })

    .state('tab.challenge', {
      url: '/challenge',
      views: {
        'tab-challenge': {
          templateUrl: 'js/challenge/tab-challenge.html',
          controller: 'ChallengeCtrl'
        }
      }
    })

    .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'js/chat/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:chatId',
      views: {
        'tab-chats': {
          templateUrl: 'js/chat/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

    .state('tab.submissions', {
      url: '/challenges/:id/submissions',
      views: {
        'tab-submissions': {
          templateUrl: 'js/submission/tab-submissions.html',
          controller: 'SubmissionsCtrl'
        }
      }
    })
    .state('tab.submission-detail', {
      url: '/submissions/:submissionId',
      views: {
        'tab-submissions': {
          templateUrl: 'js/submission/submission-detail.html',
          controller: 'SubmissionDetailCtrl'
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
  $urlRouterProvider.otherwise('/tab/dash');

});

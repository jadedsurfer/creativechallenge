/*
global challengeModule
 */

challengeModule.factory('Challenge', function($resource) {
  return $resource('/api/challenges/:id');
});

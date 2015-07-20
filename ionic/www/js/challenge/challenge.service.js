module.exports = function($resource) {
  return $resource('/api/challenges/:id');
};

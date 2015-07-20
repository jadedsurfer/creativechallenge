module.exports = function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
};

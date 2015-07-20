/*
global angular
*/

var chatService = require('./chat.service');
var chatsController = require('./chats.controller');
var chatController = require('./chat.controller');

var chatModule = angular.module('chatModule', [])

.factory('Chats',chatService)

.controller('ChatsCtrl',chatsController)

.controller('ChatDetailCtrl',chatController);

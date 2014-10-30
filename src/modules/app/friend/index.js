'use strict';

module.exports =
  angular.module('friend', [])
    .config(require('./states'))
    .run(require('./run'))
    .factory('FriendFactory', require('./service/friend.factory'))
    .service('FriendService', require('./service/friend.service'))
    .controller('FriendsCtrl', require('./friends/friends.controller'))
    .directive('friends', require('./friends/friends.directive'))
    .directive('friendButton', require('./friends/friendsButton.directive'))
    .directive('friendToggle', require('./friends/friendsToggle.directive'));

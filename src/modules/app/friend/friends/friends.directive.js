'use strict';

var friendsBlockDirective = function() {
  return {
    restrict: 'E',
    controller: 'FriendsCtrl',
    controllerAs: 'friendsCtrl',
    templateUrl: 'app/friend/friends/friends.html',
    replace: true
  };
};

module.exports = friendsBlockDirective;

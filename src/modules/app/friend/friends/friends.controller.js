'use strict';

var dependencies = [ 'FriendService' ],
    friendsCtrl = function(FriendService) {

      var _self = this;

      // its an async call but the initialData has the smartness to resolve so it could
      // be written just as return FriendListService.getFriendList();
      // but i think is better to be more verbose and do all the function to be clear
      // that we are using an async function
      FriendService.getFriendList().then(function(friends) {
          _self.friends = friends;
      });

  };

module.exports = dependencies.concat(friendsCtrl);

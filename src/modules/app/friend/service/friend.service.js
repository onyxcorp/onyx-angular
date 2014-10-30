'use strict';

var dependencies = [ '$log', '$q', '$resource', 'HelperService', 'StorageService', 'PlayerService', 'FriendFactory' ],
    FriendService = function($log, $q, $resource, HelperService, StorageService, PlayerService, FriendFactory) {

      // @todo must do this shit again, looking all buggy and shit
      var _self,
          _promisses,
          _players    = [],
          _friends    = [],
          _friendPlayerList = [],
          _getFriends,
          _FriendsAPI,
          FriendsResource;

      this.init  = function() {

          _self       = this;
          _promisses  = [];
          _friends    = {
              current : {},
              items   : []
          };

          // wait for playerId
          _getFriends = PlayerService.getPlayerId().then(function(_playerId) {

              // wait for a complete player list
              // @todo this seems redundant since the complete player list should be available once we got playerId..
              return PlayerService.getPlayers().then(function(_players) {

                  FriendsResource = $resource('resources/friends.json');
                  _FriendsAPI = new FriendsResource();

                  return _FriendsAPI.$get().then(function(data){

                      var _friendListIds;

                      _friendListIds = HelperService.findWhereInArray(data.friends, { playerId : _playerId }, true);

                      if(_friendListIds.length) {
                          angular.forEach(_players, function(value, key){
                              // set the friends data now (name, comission, etc)
                              if(HelperService.inArray(_friendListIds[0].friends, value.id)) {
                                  this.push(new FriendFactory(value.id, value.name, value.comission));
                              }
                          }, _friendPlayerList);
                      } else {
                          $log.info('Friend init no friend list ids found');
                      }
                  });
              });
          });

          // usefull when we want to use $q.all()
          _promisses.push(_getFriends);
      };

      /**
       * Auxiliary function to check if the friend service is loaded (async)
       * @returns {*|Promise}
       */
      this.isFriendServiceLoaded = function() {
          return $q.all(_promisses).then(function() {
              return true;
          });
      };

      this.addFriend = function(data) {
          // instance of a new friend object
      };

      this.removeFriendById = function(friendId) {
          // remove the instance of a friend object
      };

      this.setFriendById = function(friendId) {
          return _getFriends.then(function() {
            _friends.current = HelperService.setById(friendId, _friends.items);
            return _friends.current;
          });
      };

      this.getFriendById = function(friendId) {
          return _self.setFriendById(friendId).then(function(friend) {
              return friend;
          });
      };

      this.getFriendList = function() {
          return _getFriends.then(function() {
              return _friendPlayerList;
          });
      };
  };

module.exports = dependencies.concat(FriendService);


'use strict';

var dependencies = ['$log', '$q', '$resource', 'HelperService', 'AuthService'],
    PlayerService = function($log, $q, $resource, HelperService, AuthService) {

      /**
       *
       *
       * Private Scope
       *
       *
       */
      var _self,
          _promisses,
          _playerId,
          _players = [],
          _player = [],
          _getPlayers,
          _PlayersAPI,
          PlayerResource;

      /**
       *
       *
       * Public Scope
       *
       *
       */
      this.init = function () {

        _self = this;
        _promisses = [];
        _playerId = AuthService.getUserId();

        PlayerResource = $resource('resources/players.json');
        _PlayersAPI = new PlayerResource();

        _getPlayers = _PlayersAPI.$get().then(function (data) {
          var _tempPlayer;
          angular.copy(data.players, _players);
          _tempPlayer = HelperService.findWhereInArray(_players, {id: _playerId}, true);
          if (_tempPlayer.length) {
            _player = _tempPlayer[0];
          }
        });

        // usefull when we want to use the $q.all() method
        _promisses.push(_getPlayers);
      };

      /**
       * Auxiliary function to check if the player service was loaded (async)
       * @returns {*|Promise}
       */
      this.isPlayerServiceLoaded = function () {
        return $q.all(_promisses).then(function () {
          return true;
        });
      };

      this.getPlayers = function () {
        return _getPlayers.then(function () {
          return _players;
        });
      };

      /**
       * Return the profile data from the current player
       * @returns {*}
       */
      this.getPlayer = function () {
        return _getPlayers.then(function () {
          return _player;
        });
      };

      /**
       * Return the current player id
       * @returns {*}
       */
      this.getPlayerId = function () {
        return _self.getPlayer().then(function (playerData) {
          return playerData.id;
        });
      };
    };

module.exports = dependencies.concat(PlayerService);


'use strict';

var dependencies = [ '$log', '$q', '$resource', 'HelperService', 'PlayerService' ],
    BadgeService = function($log, $q, $resource, HelperService, PlayerService) {

      var _self,
        _promisses,
        _badges,
        _getBadges,
        _BadgesAPI,
        BadgesResource;

      this.init = function () {

        _self = this;
        _promisses = [];
        _badges = {
          current: {},
          all: [],
          won: []
        };

        /** we must wait for the player data to load before initializing the badge service **/
        _getBadges = PlayerService.getPlayerId().then(function (_playerId) {

          BadgesResource = $resource('resources/badges.json');
          _BadgesAPI = new BadgesResource();

          //var _playerBadges   = PlayerService.getPlayerBadges();

          return _BadgesAPI.$get().then(function (data) {

            angular.forEach(data.badge_player, function (value, key) {
              if (value.player_id === _playerId) {
                this.push(value.badge_id);
              }
            }, _badges.won);

            // now we must change the status of the badge based on the current ones the player already won
            angular.forEach(data.badges, function (value, key) {
              if (HelperService.inArray(_badges.won, value.id)) {
                value.won = 1;
              }
              this.push(value);
            }, _badges.all);
          });
        });

        // usefull when we want to use $q.all()
        _promisses.push(_getBadges);
      };

      /**
       * Auxiliary function to check if the badge service loaded (async)
       * @returns {*|Promise}
       */
      this.isBadgeServiceLoaded = function () {
        return $q.all(_promisses).then(function (data) {
          return true;
        });
      };

      this.getBadges = function () {
        return _getBadges.then(function (data) {
          return _badges;
        });
      };

      /**
       * Set a badge by it's id, its a simple object because the badge doesn't have any functionality, so we don't
       * need a factory for it
       *
       * @param badgeId
       */
      this.setBadgeById = function (badgeId) {
        _getBadges.then(function () {
          _badges.current = HelperService.setById(badgeId, _badges.items);
          return _badges.current;
        });
      };

      this.getBadgeById = function (badgeId) {
        return this.setBadgeById(badgeId).then(function (_badge) {
          return _badge;
        });
      };
    };

module.exports = dependencies.concat(BadgeService);

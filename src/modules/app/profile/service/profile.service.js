
'use strict';

var dependencies = [ '$log', '$q', '$resource', 'HelperService', 'PlayerService'],
    ProfileService = function($log, $q, $resource, HelperService, PlayerService) {

      var _self,
        _promisses,
        _profiles,
        _getProfiles,
        _ProfilesAPI,
        ProfilesResource;

      this.init = function () {

        _self = this;
        _promisses = [];

        _profiles = {
          current: {},
          items: []
        };

        ProfilesResource = $resource('resources/profiles.json');
        _ProfilesAPI = new ProfilesResource();

        _getProfiles = PlayerService.getPlayerId().then(function (_playerId) {

          return _ProfilesAPI.$get().then(function (data) {

            // find the profile for the current player
            // @todo probabily this function won't exist in the final version of the site
            var profile = HelperService.findWhereInArray(data.friends, {playerId: _playerId}, true); // return the first found

            angular.copy(profile, _profiles.items);
          });
        });

        //usefull when we want to use $q.all()
        _promisses.push(_getProfiles);
      };

      /**
       * Auxiliary function to check if the profile service was loaded (async)
       * @returns {*|Promise}
       */
      this.isProfileServiceLoaded = function () {
        return $q.all(_promisses).then(function () {
          return true;
        });
      };

      /**
       * Autoset a profile based on the selected playerId (assynchronous set)
       * @param profileId
       * @return void
       */
      this.setProfileById = function (profileId) {
        return _getProfiles.then(function () {
          return _profiles.current = HelperService.setById(profileId, _profiles.items);
        });
      };


      /**
       * Return all current profile information
       * @returns {*}
       */
      this.getProfileById = function (profileId) {
        return this.setProfileById(profileId).then(function (profile) {
          return profile;
        });
      };
    };

module.exports = dependencies.concat(ProfileService);


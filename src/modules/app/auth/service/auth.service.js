'use strict';

var dependencies = [ 'HelperService', 'StorageService' ],
    AuthService = function(HelperService, StorageService) {

      /**
       * Private Scope
       */
      var _self = this,
        _user = {};

      function updateUser() {
        StorageService.setData('user', _user);
      }

      /**
       * Public Scope
       **/

      this.init = function () {

        /**
         * This is suposed to be set by the login method bellow, the credentials must come from the
         * login form directive
         */
        _user = {
          id: 1,
          name: 'Fabio',
          session: 'ok'
        };

        updateUser();
      };


      this.login = function (credentials) {

        // must use credentials
        return StorageService.setData('user', credentials);
      };

      this.isAuthenticated = function () {
        return StorageService.getData('user');
      };

      this.getUserId = function () {
        var currentUser = _self.isAuthenticated();

        if (!currentUser) {
          return false;
        }

        return currentUser.id;
      };

      this.isAuthorized = function (authorizedRoles) {
        if (!angular.isArray(authorizedRoles)) {
          authorizedRoles = [authorizedRoles];
        }
        return (_self.isAuthenticated() &&
        HelperService.inArray(authorizedRoles, StorageService.getData('player').userRole));
      };

      this.$restore = function (storedUser) {
        _user = storedUser;
        updateUser();
      };
    };

module.exports = dependencies.concat(AuthService);

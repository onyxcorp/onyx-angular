'use strict';

var dependencies = [ 'StorageService', 'AuthService' ],
    run = function(StorageService, AuthService ) {

      var _user = StorageService.getData('user');

      if (angular.isObject(_user)) {
        AuthService.init();
        AuthService.$restore(_user);
      } else {
        AuthService.init();
      }
    };

module.exports = dependencies.concat(run);

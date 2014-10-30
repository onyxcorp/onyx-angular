'use strict';

// exports by angularUiRouter
var dependencies = [ '$stateProvider'],
    states = function($stateProvider) {

      $stateProvider
        .state('auth.modal.login', {
          url         : '/login',
          parent      : 'auth.modal',
          views       : {
            'modal@'    : {
              controller: 'LoginCtrl',
              controllerAs: 'loginCtrl',
              templateUrl: 'app/auth/login/form.html'
            }
          }
        })
        .state('auth.modal.register', {
          url     : '/registrar',
          parent  : 'auth.modal',
          views       : {
            'modal@'    : {
              controller  : 'RegisterStateCtrl',
              controllerAs: 'registerStateCtrl',
              templateUrl : 'app/auth/register/form.html'
            }
          }
        });
    };

module.exports = dependencies.concat(states);

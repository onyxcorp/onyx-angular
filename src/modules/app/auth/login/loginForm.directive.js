'use strict';

var loginFormDirective = function() {
  return {
    restrict    : 'ACE',
    controller  : 'LoginCtrl',
    controllerAs: 'loginCtrl',
    templateUrl : 'app/auth/login/form.html'
  };
};

module.exports = loginFormDirective;

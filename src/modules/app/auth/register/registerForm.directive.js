'use strict';

var registerFormDirective = function() {
  return {
    restrict : 'ACE',
    controller  :'RegisterCtrl',
    controllerAs: 'registerCtrl',
    templateUrl : 'app/auth/register/form.html'
  };
};

module.exports = registerFormDirective;

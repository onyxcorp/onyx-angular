'use strict';

module.exports =
  angular.module('auth', [])
  .constant('AUTH_EVENTS', require('./constant/authevents.constant'))
  .constant('USER_ROLES', require('./constant/userroles.constant'))
  .config(require('./states'))
  .run(require('./run'))
  .service('AuthService', require('./service/auth.service'))
  .controller('LoginCtrl', require('./login/login.controller'))
  .controller('RegisterCtrl', require('./register/register.controller'))
  .directive('loginForm', require('./login/loginForm.directive'))
  .directive('registerForm', require('./register/registerForm.directive'));

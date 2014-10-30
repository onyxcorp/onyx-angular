'use restrict';

var dependencies = [ '$scope', '$rootScope', 'AUTH_EVENTS', 'AuthService' ],
    LoginController = function($scope, $rootScope, AUTH_EVENTS, AuthService) {

      $scope.credentials = {
          username: '',
          password: ''
      };

      $scope.login = function (credentials) {

          AuthService.login(credentials).then(function (user) {
              $rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
              $scope.setCurrentUser(user);
          }, function () {

              $rootScope.$broadcast(AUTH_EVENTS.loginFailed);
          });

      };
    };

module.exports = dependencies.concat(LoginController);

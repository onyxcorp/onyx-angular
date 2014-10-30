(function(){

    'use strict';

    var HomeStateCtrl = function() {};

    HomeStateCtrl.$inject = [];

    angular.module('Onyx')

        .controller('HomeStateCtrl', HomeStateCtrl)

        .config(['$stateProvider', '$STOREPATH', function($stateProvider, $STOREPATH) {

            $stateProvider

                .state('page.home', {
                    url         : '/',
                    parent      : 'page',
                    views       : {
                        'mainView'    : {
                            controller: 'HomeStateCtrl',
                            controllerAs: 'homeStateCtrl',
                            templateUrl: $STOREPATH + 'page/home/home.html'
                        }
                    }
                });

        }]);
})();

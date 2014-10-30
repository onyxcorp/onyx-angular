
'use strict';

// exports by angularUiRouter
var dependencies = [ '$stateProvider', '$urlRouterProvider'],
    routes = function($stateProvider, $urlRouterProvider) {

      $stateProvider

        // abstract base template for the store
        .state('store', {
          abstract    : true,
          views       : {
            'main@'  : {
              templateUrl: 'common/partials/store.html'
            }
          }
        })

        .state('page', {
          abstract    : true,
          views       : {
            'main@'     : {
              templateUrl : 'common/partials/page.html'
            }
          }
        });

      $urlRouterProvider.otherwise('/loja');
    };

module.exports = dependencies.concat(routes);

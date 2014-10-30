'use strict';

// exports by angularUiRouter
var dependencies = [ '$stateProvider'],
    states = function($stateProvider) {

      $stateProvider
        .state('store.main.filter', {
          parent      : 'store.main',
          views       : {
            'mainViewTop@store.main'  : {
              controller  : 'TaxonomiesCtrl',
              controllerAs: 'taxonomiesCtrl',
              templateUrl : 'app/taxonomy/taxonomies/taxonomies.html',
              resolve     : {
                initialData: function () {
                  console.log('pre loaded main view filter');
                }
              }
            }
          }
        });

    };

module.exports = dependencies.concat(states);

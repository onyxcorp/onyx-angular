'use strict';

var dependencies = [ '$rootScope', 'StorageService', 'TaxonomyService' ],
    run = function( $rootScope, StorageService, TaxonomyService ) {
      $rootScope.$on('selectedTaxonomies:change', function () {
        TaxonomyService.updateService();
      });

      var _selectedTaxonomies = StorageService.getData('taxonomies');

      if (angular.isObject(_selectedTaxonomies)) {
        TaxonomyService.init();
        TaxonomyService.restore(_selectedTaxonomies);
      } else {
        TaxonomyService.init();
      }
    };

module.exports = dependencies.concat(run);

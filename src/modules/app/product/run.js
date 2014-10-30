'use strict';

var dependencies = [ '$rootScope', 'StorageService', 'ProductService' ],
  run = function($rootScope, StorageService, ProductService ) {

    $rootScope.$on('selectedProducts:change', function(){
      ProductService.updateService();
    });

    var _selectedProducts = StorageService.getData('products');

    if (angular.isObject(_selectedProducts)) {
      ProductService.init();
      ProductService.restore(_selectedProducts);
    } else {
      ProductService.init();
    }
  };

module.exports = dependencies.concat(run);

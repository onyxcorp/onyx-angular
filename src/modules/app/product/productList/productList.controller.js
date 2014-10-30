'use strict';

var dependencies = [ 'initialData'],
  ProductListCtrl = function(initialData) {
    this.products = initialData;
  };

// both forms are ok, dont know which is more readable
//return ProductsCtrl.$inject = dependencies;
module.exports = dependencies.concat(ProductListCtrl);

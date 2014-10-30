'use strict';

var dependencies = ['$scope', '$state', 'initialData', 'ProductService'],
  ProductCtrl = function($scope, $state, initialData, ProductService) {

    this.product = {};

    var product = initialData;

    /**
     * This is set because it is being used with a ng-if for the directive of the angular-chart
     * The problem and workaround being used here can be better described in this link
     * # https://github.com/chinmaymk/angular-charts/issues/76
      * @type {null}
     */
    this.product.id = null;

    /**
     * Mapping what the view can access on the product object
     *
     * Also we must return a function with the get value because ng-bind needs a returned expression to evaluate if the data has changed
     * if we only create a reference to the function it will not evalue the result but if the "function programming changed" (yep, that shit)
     *
     * @type {{title: Function}}
     */
    this.product = {
      id          : function id() { return product.getId(); },
      title       : function title() { return product.getTitle(); },
      image       : function image() { return product.getImage(); },
      expiration  : function expiration() { return product.getExpiration(); },
      originalPrice: function originalPrice() { return product.getOriginalPrice(); },
      price       : function price() { return product.getPrice(); },
      priceHistory: function priceHistory() { return product.getPriceHistory(); }
    };
  };

module.exports = dependencies.concat(ProductCtrl);


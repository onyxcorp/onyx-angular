'use strict';

module.exports =
  angular.module('product', [
    require('ngDialog')
  ])
  .config(require('./states'))
  .config(require('./config'))
  .run(require('./run'))
  .factory('ProductFactory', require('./service/product.factory.js'))
  .service('ProductService', require('./service/product.service.js'))
  .controller('ProductListCtrl', require('./productList/productList.controller.js'))
  .controller('ProductCtrl', require('./product/product.controller.js'))
  .controller('MiniBasketCtrl', require('./miniBasket/miniBasket.controller.js'))
  .controller('ProductItemCartCtrl', require('./productItemCart/productItemCart.controller.js'))
  .directive('miniBasket', require('./miniBasket/miniBasket.directive.js'))
  .directive('productItem', require('./productItemCart/productItem.directive.js'))
  .directive('productBind', require('./productItemCart/productBind.directive.js'))
  .directive('productItemAdd', require('./productItemCart/productItemAdd.directive.js'))
  .directive('productItemAddQuantity', require('./productItemCart/productItemAddQuantity.directive.js'))
  .directive('productItemImage', require('./productItemCart/productItemImage.directive.js'))
  .directive('productItemQuantity', require('./productItemCart/productItemQuantity.directive.js'))
  .directive('productItemRemoveQuantity', require('./productItemCart/productItemRemoveQuantity.directive.js'));

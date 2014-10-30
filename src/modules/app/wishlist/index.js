'use strict';

module.exports =
  angular.module('wishlist', [
    require('../player').name
  ])
  .config(require('./states'))
  .run(require('./run'))
  .service('WishlistService', require('./service/wishlist.service'))
  .controller('WishlistFilterCtrl', require('./filter/filter.controller'))
  .directive('wishlistFilterButton', require('./filter/filterButton.directive'));

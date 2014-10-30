
'use strict';

var filterButton = function() {
  return {
    restrict: 'E',
    controller: 'WishlistCtrl',
    controllerAs: 'wishlistCtrl',
    templateUrl: 'app/wishlist/filter/button.html',
    replace: true
  };
};

module.exports = filterButton;

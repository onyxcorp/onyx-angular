
'use strict';

var dependencies = [ 'WishlistService', 'StorageService' ],
    run = function(WishlistService, StorageService) {

      var _wishlist = StorageService.getData('wishlist');

      // @todo same procedure that we used in the cart, first get the default wishlist from the $resource
      // @Todo and after that we just keep storing the values in the localstore html5
      if (angular.isObject(_wishlist)) {
        WishlistService.init();
        WishlistService.restore(_wishlist);
      } else {
        WishlistService.init();
      }
    };

module.exports = dependencies.concat(run);

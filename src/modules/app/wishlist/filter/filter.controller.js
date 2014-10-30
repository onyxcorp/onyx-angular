
'use strict';

var dependencies = ['WishlisService'],
    WishlistCtrl = function(WishlistService) {

      this.isActive = WishlistService.getWishlistStatus;

      this.toggleWishlist = WishlistService.toggleWishlist;

    };

module.exports = dependencies.concat(WishlistCtrl);


'use strict';

var dependencies = [ '$log', '$q', '$resource', 'StorageService', 'HelperService', 'PlayerService', 'ProductService'],
    WishlistService = function($log, $q, $resource, StorageService, HelperService, PlayerService, ProductService) {

      var _self,
        _promisses,
        _wishlist,
        WishlistsResource,
        _getWishlists,
        WishlistsAPI;

      this.init = function () {

        // always use self internally to avoid scope problems when the functions are called as a reference
        // from the view to the model through the controller
        _self = this;
        _promisses = [];
        _wishlist = {
          active: false,
          items: []
        };

        _getWishlists = PlayerService.getPlayerId().then(function (_playerId) {

          var tempWishlist;

          WishlistsResource = $resource('resources/wishlists.json');
          WishlistsAPI = new WishlistsResource();

          return WishlistsAPI.$get().then(function (data) {

            /**
             * Wrapper actions that will be deleted once we start using an API
             **/
            tempWishlist = HelperService.findWhereInArray(data.wishlists, {player_id: _playerId}, true);
            if (tempWishlist.length) { // we found a current player wishlist data
              _wishlist.items = tempWishlist[0].product_id; // set it as the current wishlist
              $log.info(_wishlist);
            } else {
              $log.info('Wishlist init no wishlist found');
            }

            /**
             * End of wrapper
             **/

          });
        });

        //usefull when we want to use $q.all()
        _promisses.push(_getWishlists);
      };


      this.isWishlistServiceLoaded = function () {
        return $q.all(_promisses).then(function () {
          return true;
        });
      };

      this.updateService = function () {
        StorageService.setData('wishlist', _wishlist.active);

        // call setFunction on product
        ProductService.setProducts('id', _wishlist.items);
      };


      /**
       * Set the current wishlist status, default to false
       * @param status
       */
      this.setWishlistStatus = function (status) {

        if (angular.isString(status)) {
          status === 'true' ? status = true : status = false;
        } else {
          status = status || false;
        }

        status ? _wishlist.active = true : _wishlist.active = false;

        _self.updateService();
      };

      this.toggleWishlist = function () {
        if (_wishlist.active) {
          _self.setWishlistStatus(false);
        } else {
          _self.setWishlistStatus(true);
        }
      };

      this.getWishlistStatus = function () {
        return _wishlist.active;
      };

      this.addToWishlist = function (productId) {
        productId = HelperService.isInt(productId);
        if (productId) {
          if (!_self.isProductInWishlist(productId)) {
            _wishlist.items.push(productId);
            return true;
          }
        } else {
          $log.error('Wishlist addToWishlist needs a valid id number');
        }

        return false;
      };

      this.removeFromWishlist = function (productId) {
        productId = HelperService.isInt(productId);
        if (productId) {
          if (this.isProductInWishlist(productId)) {
            HelperService.removeFromArrayByValue(_wishlist.items, productId);
            if (!_self.isProductInWishlist(productId)) {
              return true;
              /** item removed with success from wishlist **/
            }
          }
        } else {
          $log.error('Wishlist removeFromWishlist needs a valid id number');
        }

        return false;
      };

      /**
       * Checks the existance of the product in the current wishlist
       * @param productId
       * @returns {boolean}
       */
      this.isProductInWishlist = function (productId) {
        var alreadyInWishlist;
        alreadyInWishlist = false;
        productId = HelperService.isInt(productId);
        if (productId) {

          // check the existance of the product in the wishlist
          // do something based on the returned value from the function above

        } else {
          $log.error('Wishlist isProductInWishlist needs a valid id number');
        }

      };

      this.restore = function (storedWishlist) {
        _self.isWishlistServiceLoaded().then(function () {
          _self.setWishlistStatus(storedWishlist);
        });
      };
    };

module.exports = dependencies.concat(WishlistService);

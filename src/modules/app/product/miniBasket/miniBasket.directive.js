'use strict';

var miniBasketDirective = function() {
      return {
        restrict    : 'E',
        controller  : 'MiniBasketCtrl',
        controllerAs: 'miniBasketCtrl',
        templateUrl : 'app/product/miniBasket/miniBasket.html',
        replace     : 'element'
      };
    };

module.exports = miniBasketDirective;


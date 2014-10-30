
'use strict';

var dependencies = [ 'ProductService', 'DeckService'],
    MiniBasketCtrl = function(ProductService, DeckService) {

      // must call the function otherwise we will have problems with the auto update feature
      this.itemsQty =  ProductService.getSelectedQuantity;

      // @todo must finish this
      this.card = null;

      this.percent = 0;

    };

//MiniBasketCtrl.$inject = dependencies;
module.exports = dependencies.concat(MiniBasketCtrl);

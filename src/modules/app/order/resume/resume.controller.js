'use strict';

var dependencies = [ 'ProductService' ],
    OrderResumeCtrl = function(ProductService) {

      this.shipping = ProductService.getSelectedShipping();

      this.subTotal = ProductService.getSelectedSubTotal();

      this.products = ProductService.getSelectedProducts();

      this.quantity = ProductService.getSelectedQuantity();

    };

module.exports = dependencies.concat(OrderResumeCtrl);

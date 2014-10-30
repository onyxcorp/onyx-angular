'use strict';

var dependencies = ['OrderService', 'initialData'],
    OrdersBlockCtrl = function(OrderService, initialData) {

      this.orders = initialData;

    };

module.exports = dependencies.concat(OrdersBlockCtrl);

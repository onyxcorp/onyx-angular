'use strict';

module.exports =
  angular.module('order', [])
    .config(require('./states'))
    .run(require('./run'))
    .factory('OrderFactory', require('./service/order.factory'))
    .service('OrderService', require('./service/order.service'))
    .controller('OrdersCtrl', require('./orders/orders.controller'))
    .directive('ordersToggle', require('./orders/ordersToggle.directive'))
    .directive('ordersButton', require('./orders/ordersButton.directive'));

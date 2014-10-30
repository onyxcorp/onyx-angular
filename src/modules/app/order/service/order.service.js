'use strict';

var dependencies = [ '$log', '$q', '$resource', 'HelperService', 'StorageService', 'PlayerService', 'OrderFactory' ],
    OrderService = function($log, $q, $resource, HelperService, StorageService, PlayerService, OrderFactory) {

      var _self,
          _promisses,
          _orders,
          _getOrders,
          _OrdersAPI,
          OrdersResource;

      this.init = function() {

          _self       = this;
          _promisses  = [];
          _orders     = {
              current : {},
              items   : []
          };

          _getOrders = PlayerService.getPlayerId().then(function(_playerId) {

              OrdersResource = $resource('resources/orders.json');
              _OrdersAPI = new OrdersResource();

              return _OrdersAPI.$get().then(function(data){

                  angular.forEach(data.orders, function(value, key) {
                      _self.addOrder(value);
                  });
              });
          });

          //usefull when we want to use $q.all()
          _promisses.push(_getOrders);
      };

      /**
       * Auxiliary function to check if the order service is loaded (async)
       * @returns {*|Promise}
       */
      this.isOrderServiceLoaded = function() {
          return $q.all(_promisses).then(function() {
              return true;
          });
      };


      /**
       * Create a new order object from the factory, first validate if the order already exists or not
       * @param data
       * @return void
       */
      this.addOrder = function(data) {
          if(!this.isOrderAlreadyAdded(data.id)) {
              _orders.items.push(new OrderFactory(
                  data.id,
                  data.subtotal,
                  data.discount,
                  data.total
              ));
          }
      };

      // @todo implement removeOrder
      this.removeOrderById = function(orderId) {
          // remove an order object by its id
      };


      this.getOrders = function() {
          return _orders;
      };

      this.setOrderById = function(orderId) {
          return _getOrders.then(function() {
            _orders.current = HelperService.setById(orderId, _orders.items);
            return _orders.current;
          });
      };

      this.getOrderById = function(orderId) {
          return _self.setOrderById(orderId).then(function(order) {
              return order;
          });
      };

      this.isOrderAlreadyAdded = function(orderId) {
          _self.getOrderById(orderId).then(function(order) {
              return order.hasOwnProperty('id');
          });
      };
    };

module.exports = dependencies.concat(OrderService);

'use strict';

var dependencies = [ '$log', 'HelperService' ],
    OrderFactory = function($log, HelperService) {

      var OrderFactory = function (id, subtotal, discount, total) {
        this.setId(id);
        this.setSubtotal(subtotal);
        this.setDiscount(discount);
        this.setTotal(total);
      };

      /**
       *
       * GETTERS & SETTERS
       *
       */
      OrderFactory.prototype.setId = function (id) {
        if (id) {
          this._id = id;
        } else {
          $log.error('Id must be set');
        }
      };

      OrderFactory.prototype.getId = function () {
        return this._id;
      };

      OrderFactory.prototype.setSubtotal = function (subtotal) {
        if (subtotal) {
          // @todo validate the subtotal, must be higher than 0
          this._subtotal = subtotal;
        } else {
          $log.error('Subtotal must be set');
        }
      };

      OrderFactory.prototype.getSubtotal = function () {
        return this._subtotal;
      };

      OrderFactory.prototype.setDiscount = function (discount) {
        if (discount) {
          // @todo validate the discount, must be higher than 0
          this._discount = discount;
        } else {
          $log.error('Discount must be set');
        }
      };

      OrderFactory.prototype.getDiscount = function () {
        return this._discount;
      };

      OrderFactory.prototype.setTotal = function (total) {
        if (total) {
          // @todo validate the total, must be higher than 0
          this._total = total;
        } else {
          $log.error('Total must be set');
        }
      };

      return OrderFactory;

    };

module.exports = dependencies.concat(OrderFactory);

'use strict';

var ordersButtonDirective = function() {
  return {
    restrict    : 'E',
    templateUrl : 'app/orders/button.html',
    replace     : true
  };
};

module.exports = ordersButtonDirective;

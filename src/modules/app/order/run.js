'use strict';

var dependencies = [ 'OrderService' ],
    run = function(OrderService ) {

      OrderService.init();

    };

module.exports = dependencies.concat(run);

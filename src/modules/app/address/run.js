'use strict';

var dependencies = [ 'AddressService' ],
  run = function(AddressService ) {

    AddressService.init();
  };

module.exports = dependencies.concat(run);

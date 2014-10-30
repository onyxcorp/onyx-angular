'use strict';

var dependencies = ['AddressService'],
    AddressesController = function(AddressService) {

      /**
       * Get current player addresses list data
       * @type {*}
       */
      this.addresses = AddressService.getAddresses();

      // setar o endereco pelo id e retornar o endereco que foi setado
      this.showAddress = AddressService.setAddressById;

    };

module.exports = dependencies.concat(AddressesController);

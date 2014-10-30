'use strict';

var dependencies = ['AddressService'],
    AddressController = function(AddressService) {
      var self = this;

      // async call to show the current address data
      AddressService.getCurrentAddress().then(function(data) {
          self.address = data;
      });
  };

module.exports = dependencies.concat(AddressController);

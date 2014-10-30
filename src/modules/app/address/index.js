'use strict';

module.exports =
  angular.module('address', [
    require('../player').name
  ])
  .config(require('./states'))
  .run(require('./run'))
  .factory('AddressFactory', require('./service/address.factory'))
  .service('AddressService', require('./service/address.service'))
  .controller('AddressesCtrl', require('./addresses/addresses.controller'))
  .controller('AddressCtrl', require('./address/address.controller'))
  .directive('addressesButton', require('./addresses/addressesButton.directive'))
  .directive('addressesToggle', require('./addresses/addressesToggle.directive'));

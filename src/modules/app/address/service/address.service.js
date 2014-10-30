
'use strict';

var dependencies = ['$log', '$q', '$resource', 'HelperService', 'PlayerService', 'AddressFactory'],
    AddressService = function ($log, $q, $resource, HelperService, PlayerService, AddressFactory) {
      var _self,
        _promisses,
        _addresses,
        _getAddresses,
        _AddressesAPI,
        AddressesResource;

      this.init = function () {

        _self = this;
        _promisses = [];
        _addresses = {
          current: {},
          items: []
        };

        _getAddresses = PlayerService.getPlayerId().then(function (_playerId) {

          AddressesResource = $resource('resources/addresses.json');
          _AddressesAPI = new AddressesResource();

          return _AddressesAPI.$get().then(function (data) {

            var _tempAddresses;

            // get only the addresses for the current player id, can be multiple addresses
            _tempAddresses = HelperService.findWhereInArray(data.addresses, {playerId: _playerId}, false);

            // make sure there are address to loop in
            if (_tempAddresses.length) {
              angular.forEach(_tempAddresses, function (value, key) {

                this.push(new AddressFactory(value.id, value.main, value.name, value.street, value.city, value.state, value.cep));

                // the default current address is the main adress of the current user
                // @todo for best efficiency we should create the address as a new _lastAddress and just set
                // @todo this _lastAddress as the _addresses.current item ;)
                if (value.main) {
                  _self.setAddressById(value.id);
                }
              }, _addresses.items);
            } else {
              $log.info('No addresses found');
            }
          });
        });


        // usefull when we want to use $q.all()
        _promisses.push(_getAddresses);
      };

      this.isAddressServiceLoaded = function () {
        return $q.all(_promisses).then(function (data) {
          return true;
        });
      };

      /**
       * Set an address as current for data request/update
       * @param addressId
       */
      this.setAddressById = function (addressId) {
        return _getAddresses.then(function () {
          _addresses.current = HelperService.setById(addressId, _addresses.items);
          return _addresses.current;
        });
      };

      /**
       * Return the current selected address
       * @returns {*}
       */
      this.getAddressById = function (addressId) {
        return this.setAddressById(addressId).then(function (address) {
          return address;
        });
      };

      /**
       * Return the profile data from the current seted user
       * @returns {*}
       */
      this.getAddresses = function () {
        return _getAddresses.then(function (data) {
          return _addresses;
        });
      };
    };

module.exports = dependencies.concat(AddressService);

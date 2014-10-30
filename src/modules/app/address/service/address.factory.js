'use strict';

var dependencies = ['$log'],
    AddressFactory= function($log) {

      function AddressFactory(id, main, name, street, city, state, cep) {
        this.setId(id);
        this.setMain(main);
        this.setName(name);
        this.setStreet(street);
        this.setCity(city);
        this.setState(state);
        this.setCep(cep);
      }

      /**
       *
       *
       *  SETTERS & GETTERS
       *
       */
      AddressFactory.prototype.setId = function(id) {
        if (id) {
          this._id = id;
        } else {
          $log.error('An id must be provided for the address');
        }
      };

      AddressFactory.prototype.getId = function() {
        return this._id;
      };

      /**
       * Set if the address is the currently main address of the player. The address either can be the main or not
       * so in case of any invalid data we just set it as "not main"
       *
       * @param main
       * @todo automatic update to the API and refresh the current data
       */
      AddressFactory.prototype.setMain = function(main) {
        if (main) {
          this._main = 1;
        } else {
          this._main = 0;
        }
      };

      /**
       * Actually returns a boolean since main will be 1 or 0, this method can be used as a check to see
       * if the address is currently a main one or not
       *
       * @returns {number}
       */
      AddressFactory.prototype.getMain = function() {
        return this._main;
      };

      /**
       * Update the current name/alias of the address
       * @param name
       * @todo automatic update to the API
       */
      AddressFactory.prototype.setName = function(name) {
        if (name) {
          this._name = name;
        } else {
          $log.error('An name must be provided for the address');
        }
      };

      /**
       * Returns the current address name/alias
       * @returns {*} string
       */
      AddressFactory.prototype.getName = function() {
        return this._name;
      };

      /**
       * Update the street name, currently this implementation is taking in consideration also the number of the
       * house
       *
       * @param street
       * @todo automatic update to the API
       */
      AddressFactory.prototype.setStreet = function(street) {
        if(street) {
          this._street = street;
        } else {
          $log.error('A street must be provided for the address');
        }
      };

      /**
       * Get street name
       * @returns {*}
       */
      AddressFactory.prototype.getStreet = function() {
        return this._street;
      };

      /**
       *
       * @param city
       * @todo automatic update to the API
       */
      AddressFactory.prototype.setCity = function(city) {
        if (city) {
          this._city = city;
        } else {
          $log.error('A city must be provided for the address');
        }
      };

      AddressFactory.prototype.getCity = function() {
        return this._city;
      };

      /**
       *
       * @param state
       * @todo automatic update to the API
       */
      AddressFactory.prototype.setState = function(state) {
        if (state) {
          this._state = state;
        } else {
          $log.error('A state must be provided for the address');
        }
      };

      AddressFactory.prototype.getState = function() {
        return this._city;
      };

      /**
       *
       * @param cep
       * @todo automatic update to the API
       */
      AddressFactory.prototype.setCep = function(cep) {
        if (cep) {
          this._cep = cep;
        } else {
          $log.error('A cep must be provided for the address');
        }
      };

      AddressFactory.prototype.getCep = function() {
        return this._city;
      };

      return AddressFactory;

    };

module.exports = dependencies.concat(AddressFactory);

'use strict';

require('angular');

var dependencies = [ 'localStorageService' ],
    StorageService = function(localStorageService) {
        /**
         * Try to get the data in the storage, if nothing is found returns false, or else the json parsed array
         * @param key
         * @returns {*}
         */
        this.getData = function (key) {
            var data = localStorageService.get(key);

            // convert anything to javascript types true or false, booleans, objects, arrays, etc
            return angular.fromJson(data);
        };

        /**
         * Try to set a new data information, returns true if the data was correctly passed
         *
         * @param key
         * @param data
         * @returns getData (array)
         */
        this.setData = function (key, data) {

            data = angular.toJson(data);

            if (data) {
                localStorageService.set(key, data);
            }

            return this.getData(key);
        };


        /**
         * Shorthand for setting data that area basicaly true or false
         * @param key
         * @returns setData -> getData -> array
         */
        this.toggleBoolean = function (key) {
            var buttonStatus = this.getData(key);

            if (buttonStatus) {
                return this.setData(key, false);
            }

            return this.setData(key, true);
        };
    };

module.exports = dependencies.concat(StorageService);

'use strict';

require('underscore');  // exports _
require('underscore-string');  // exports _.string

var dependencies = [ '$log' ],
    HelperService = function($log) {

        var _self = this;

        /**
         * Array that performs a search for intersection elements in objects in arrays
         * ref # http://stackoverflow.com/questions/8672383/how-to-use-underscores-intersection-on-objects
         *
         * @param a
         * @param b
         * @param areEqualFunction
         * @returns {Array}
         */
        function intersectionObjects2(a, b, areEqualFunction) {
            var Result = [];

            // iterate over each item in the array to search in element
            for (var i = 0; i < a.length; i++) {
                var aElement = a[i];
                var existsInB = _.any(b, function (bElement) {
                    return areEqualFunction(bElement, aElement);
                });
                if (existsInB) {
                    Result.push(aElement);
                }
            }

            return Result;
        }

        /**
         * Array that performs a search for intersection elements in objects in arrays
         * ref # http://stackoverflow.com/questions/8672383/how-to-use-underscores-intersection-on-objects
         *
         * @returns {Array}
         */
        this.getArrayIntersections = function (currentObject, objectToCompare, comparisonFunction) {
            // the first argument is always what we want to compare
            var Results = arguments[0];
            var ArrayCount = arguments.length;
            var LastArgument = arguments[arguments.length - 1];
            var areEqualFunction = _.isEqual;

            /**
             * if the last argument is a function we substitute the _.isEqual for the function passed as an argument
             * we also remove the counting from the array from the total arguments array count
             */
            if (typeof LastArgument === "function") {
                areEqualFunction = LastArgument;
                ArrayCount--;
            }

            for (var i = 1; i < ArrayCount; i++) {
                var array = arguments[i];
                Results = intersectionObjects2(Results, array, areEqualFunction);
                if (Results.length === 0) {
                    break;
                }
            }
            return Results;
        };

        /**
         * Remove an element from an array by searching for it's value
         *
         * @param arr array
         * @returns {*}
         */
        this.removeFromArrayByValue = function (arr) {
            var what, a = arguments, L = a.length, ax;
            while (L > 1 && arr.length) {
                what = a[--L];
                while ((ax = arr.indexOf(what)) !== -1) {
                    arr.splice(ax, 1);
                }
            }
            return arr;
        };

        /**
         * Remove elements from an array with properties by passing an array of values
         *
         * @param deleteInData array where we want to delete from
         * @param valueToSearch array with the data we are looking for to delete
         * @param property string the property we are looking at
         * @returns {*} array
         * @todo refactor this method, i the deleteFrom is not really clear
         */
        this.removeFromArrayByProperty = function (deleteInData, valueToSearch, property) {

            for (var i = 0; i < deleteInData.length; i++) {
                var obj = deleteInData[i];

                if (valueToSearch.indexOf(obj[property]) !== -1) {
                    deleteInData.splice(i, 1);
                    i--;
                }
            }

            return deleteInData;
        };

        /**
         * Simple wrapper for the method indexOf, so we avoid using that ugliness !== -1 all the time
         * @param simpleArray
         * @param value
         */
        this.inArray = function (simpleArray, value) {
          var index = simpleArray.indexOf(value);

          if ( index !== -1 ) {
              return index;
          }

          return false;
        };

        /**
         * Looks for a value in an array, if found will return this value
         * The last argument can be a simple value or argument or a function that
         *
         * Examples
         *
         * var even = findValueInArray([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }, true); // will return 2 only
         * var even = findValueInArray([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; }, false); // will return 2, 4 and 6
         *
         * @param simpleArray
         * @param compare
         * @param returnFirst
         * @returns Array
         */
        this.findInArray = function (simpleArray, compare, returnFirst) {

            var data,
                tempData;

            data = [];

            if (returnFirst) {
                tempData = _.find(simpleArray, compare);
                if (!angular.isUndefined(tempData)) {
                    data.push(tempData);
                }
            } else {
                tempData = _.filter(simpleArray, compare);
                if (!angular.isUndefined(tempData)) {
                    data = tempData;
                }
            }

            if (angular.isUndefined(data)) {
                data = [];
            }

            return data;

        };


        /**
         * Looks for matchs in the provided array based on the compare value. The compare value can be an object
         * in the format { foo : "bar" }, it also can accept multiple arguments like { foo : "bar" , foo2 : "bar2" }
         *
         * Examples
         *
         * findKeyInArray(listOfPlays, {author: "Shakespeare", true);  will return first value found
     * findKeyInArray(listOfPlays, {author: "Shakespeare", year: 1611}, false); will return all values found
     *
     *
     * @param objArray
         * @param compare
         * @param returnFirst
         * @returns Array
         */
        this.findWhereInArray = function (objArray, compare, returnFirst) {

            var data,
                tempData;

            data = [];

            if (returnFirst) {
                tempData = _.findWhere(objArray, compare);
                if (!angular.isUndefined(tempData)) {
                    data.push(tempData);
                }
            } else {
                tempData = _.where(objArray, compare);
                if (!angular.isUndefined(tempData)) {
                    data = tempData;
                }
            }

            return data;
        };

        /**
         * Default implementation to get some object based on it's id. It is suposed to be used insice services
         * classes requesting some factory
         *
         * @param id
         * @param dataGet
         * @returns object
         */
        this.setById = function (id, dataGet) {
          var _single = {};
          id = _self.isInt(id);
          if (id) {
              _single = _self.findWhereInArray(dataGet, {_id: id}, true);
              if (_single.length) {
                  _single = _single[0];
              } else {
                  $log.info('No item found');
              }
          } else {
              $log.error('Need a valid id too look for an item');
          }

          return _single;
        };

        /**
         * Wrapper function
         * Return all the values from an object using _.values from underscore
         *
         * _.values({one: 1, two: 2, three: 3}); => [1, 2, 3]
         *
         * @param obj
         * @returns array
         */
        this.getValuesFromObject = function (obj) {
            return _.values(obj);
        };

        /**
         * Wrapper function
         * Return all the keys from an object using _.keys from underscore
         *
         *  _.keys({one: 1, two: 2, three: 3}); => ["one", "two", "three"]
         *
         * @param obj
         * @returns array
         */
        this.getKeysFromObject = function (obj) {
            return _.keys(obj);
        };

        /**
         * Validate if a value is a valid integer
         *
         * @param numberInt
         * @returns {boolean|*}
         */
        this.isInt = function (numberInt) {
            numberInt = parseInt(numberInt);
            if (!isNaN(numberInt) && isFinite(numberInt)) {
                // is valid number
                return numberInt;
            } else {
                return false;
            }
        };

        /**
         * Validate if a value is a valid decimal
         *
         * @param numberFloat
         * @returns {boolean|*}
         */
        this.isFloat = function (numberFloat) {
            numberFloat = parseFloat(numberFloat);
            if (!isNaN(parseFloat(numberFloat)) && isFinite(numberFloat)) {
                return numberFloat;
            } else {
                return false;
            }

        };
    };

module.exports = dependencies.concat(HelperService);

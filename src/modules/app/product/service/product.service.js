'use strict';

var dependencies = [ '$log', '$rootScope', '$q', '$resource', 'StorageService', 'HelperService', 'ProductFactory'],
    ProductService = function($log, $rootScope, $q, $resource, StorageService, HelperService, ProductFactory) {

        var _self,
            _api,
            _promisses,
            _products,
            _getProducts,
            _ProductsAPI,
            ProductsResource;

        /**
         * Internal method to help create a productfactory instance
         * @param data
         * @returns {ProductFactory}
         */
        function createProduct(data) {
            return new ProductFactory(
                data.id,
                data.taxonomy,
                data.selected,
                data.quantity,
                data.title,
                data.description,
                data.supplier,
                data.original_price,
                data.initial_discount,
                data.current_discount,
                data.price_history,
                data.expiration,
                data.image
            );
        }

        /**
         * Function used to convert the data from the backend to a format that angular-charts will understand
         * @param priceHistory
         * @returns {*}
         */
        function convertPriceHistory(priceHistory) {

            var data,
                finalHistory = {};

            // both need to be an array of objects
            finalHistory.series = [];
            finalHistory.data = [];

            angular.forEach(priceHistory, function (value, key) {

                finalHistory.series = HelperService.removeFromArrayByValue(HelperService.getKeysFromObject(value), 'month');

                data = {
                    'x': value.month,
                    'y': []
                };

                angular.forEach(finalHistory.series, function (newValue, key) {
                    data.y.push(value[newValue]);
                });

                finalHistory.data.push(data);
            });

            return finalHistory;
        }

        /**
         * Constructor ProductService
         * @constructor
         */
        this.init = function () {

            _self = this;
            _promisses = [];
            _api = {     // to set or change products
                set: {
                    id: [],
                    taxonomy: [],
                    title: [],
                    price: [],
                    discount: []
                },
                change: {
                    currentDiscount: 0
                }
            };
            _products = {
                original: [],   // the origina list of products from the database
                all: {     // the current list of products may be updated based on card used
                    items: [],
                    shipping: 0,
                    subtotal: 0,
                    itemsQty: 0
                },
                // @todo in the future the product object will be avaialble only for the current
                current: {}   // the current selected/active product
            };

            _self.updateService();

            ProductsResource = $resource('resources/products.json');
            _ProductsAPI = new ProductsResource();

            _getProducts = _ProductsAPI.$get().then(function (data) {

                /**
                 * This actions are wrappers to update the current store data once we go live the discounts will be already
                 * calculated in the backend and will be sent ready in the $resource.$get().products.json
                 */
                angular.forEach(data.products, function (value, key) {

                    value.taxonomy = [];

                    // associate price history
                    angular.forEach(data.price_history, function (priceValue, priceKey) {
                        if (value.id === priceValue.product_id) {
                            value.price_history = convertPriceHistory(priceValue.prices);
                        }
                    });

                    // associate category
                    angular.forEach(data.category_product, function (categoryValue, key) {
                        if (value.id === categoryValue.product_id) {
                            angular.forEach(categoryValue.category_id, function (categoryId, key) {
                                value.taxonomy.push({id: categoryId, type: 'category'});
                            });
                        }
                    });

                    // associate tag
                    angular.forEach(data.tag_product, function (tagValue, key) {
                        if (value.id === tagValue.product_id) {
                            angular.forEach(tagValue.tag_id, function (tagId, key) {
                                value.taxonomy.push({id: tagId, type: 'tag'});
                            });
                        }
                    });

                    // calculate the initial_discount based on the price
                    value.initial_discount = (1 - value.price / value.original_price);

                    this.push(value);

                }, _products.original);

                /**
                 * End of the wrapper that will be removed once we go live with the API
                 */

                angular.forEach(_products.original, function (value, key) {
                    _products.all.items.push(createProduct(value));
                });
            });

            _promisses.push(_getProducts);
        };

        /**
         * Auxiliary function to check if the product service loaded (async)
         * @returns {*|Promise}
         */
        this.isProductsServiceLoaded = function () {
            return $q.all(_promisses).then(function () {
                return true;
            });
        };

        /**
         * Add a new product object by invoking the factory class
         * @param data object
         * @return boolean|void
         * @todo this function is here to fix a bug in the init that try to add the product , once we
         * @todo change the product to be instantiated only when current, this wont be needed anymore
         */
        this.addProduct = function (data) {

            var _product;

            if (angular.isObject(data) && !(data instanceof ProductFactory)) {
                _product = createProduct(data);
            } else {
                _product = data;
            }

            // check if the product was added already, if so just leave the function
            _self.isProductAlreadyAdded(_product.getId()).then(function (productExists) {
                if (productExists) {
                    $log.info('ja foi adicionado');
                    return false;
                } else {
                    $log.info('adicionando');
                    _products.all.items.push(_product);
                }
            });
        };

        /**
         * Update the data of the current selected products, equivalent to the updateCart function to get values
         * like shipping, subtotal, total itens, etc
         */
        this.updateService = function () {

            var selectedProducts = [];

            // first reset current data
            _products.all.subtotal = 0;
            _products.all.shipping = 0; // shipping must be set from an external service
            _products.all.itemsQty = 0;

            angular.forEach(_products.all.items, function (item) {
                _products.all.subtotal += item.getTotal();
                if (item.getSelected()) {
                    _products.all.itemsQty += 1;
                    this.push(
                        {id: item.getId(), quantity: item.getQuantity()}
                    );
                }
            }, selectedProducts);

            // lets save only the current session of products
            StorageService.setData('products', selectedProducts);
        };

        /**
         * Remove a product from the array of current products
         * @param productId
         * @returns boolean
         */
        this.removeProductById = function (productId) {
            return _getProducts.then(function () {
              productId = HelperService.isInt(productId);
              if (productId) {
                  HelperService.removeFromArrayByProperty(_products.all.items, [productId], '_id');
                  return true;
              } else {
                  $log.error('Product invalid id number to remove');
                  return false;
              }
            });
        };

        /**
         * Set the current product, but before that, make sure the product list was correctly retrieved
         * @param productId
         * @returns {*}
         */
        this.setProductById = function (productId) {
            return _getProducts.then(function () {
              _products.current = HelperService.setById(productId, _products.all.items);
              return _products.current;
            });
        };

        /**
         * Returns the current product data set
         * @returns {Array}
         */
        this.getProductById = function (productId) {
            return _self.setProductById(productId).then(function (_product) {
                return _product;
            });
        };

        /**
         * Check if the product already exists in the list of active product objects
         */
        this.isProductAlreadyAdded = function (productId) {
            return _self.getProductById(productId).then(function (product) {
                return product.hasOwnProperty('_id');
            });
        };

        /**
         * Return the full product list with no filters applied
         * @returns {*[]}
         * @todo refactor this because we dont want to return all instantiated product objects
         */
        this.getAllProducts = function () {
            return _getProducts.then(function () {
                return _products.all.items; // return products objects
            });
        };

        /**
         * Return boolean if the product is selected or not, just a wrapper for getSelectedById
         * @param id
         * @returns int
         */
        this.isProductSelected = function (id) {
          var length = 0;
          id = HelperService.isInt(id);
          if (id) {
            length = _self.getSelectedById(id).length;
          } else {
            $log.error('Product isProductSelected needs a valid id');
          }
          return length;
        };

        /**
         * Get a product that is already selected by its id
         *
         * @param id
         * @returns {Array}
         */
        this.getSelectedById = function (id) {
          var item = [];
          id = HelperService.isInt(id);
          if (id) {
            if (_products.all.items.length) {
              angular.forEach(_products.all.items, function (value, key) {
                if (value.getId() === id && value.getSelected() === 1) {
                  this.push(value);
                }
              }, item);
            }
          } else {
            $log.error('Product getSelectedById needs a valid id');
          }
          return item;
        };

        /**
         * Return the total ammount of different Items in current cart
         * @returns {{total: number}}
         */
        this.getSelectedQuantity = function () {
            return _products.all.itemsQty;
        };


        /**
         * Get current cart shipping price
         * @returns {*}
         */
        this.getSelectedShipping = function () {
            return _products.all.shipping;
        };

        /**
         * Get the sum of the total of all selected items
         * @returns {number}
         */
        this.getSelectedSubTotal = function () {
            return _products.all.subtotal;
        };

        /**
         * This is the equivalent of getting all products that were added to the cart
         * @returns {*}
         * @todo must return only the selected products
         */
        this.getSelectedProducts = function () {
            // @todo currently returning all products but its wrong, suposed to be only the selected ones
            return _products.all.items;
        };

        /**
         * Restore the products last session and values
         * @param storedAllProducts
         */
        this.restore = function (storedSelectedProducts) {
            this.isProductsServiceLoaded().then(function () {
                angular.forEach(storedSelectedProducts, function (value, key) {
                    _self.getProductById(value.id).then(function (product) {
                        product.setQuantity(value.quantity);
                    });
                });
                _self.updateService();
            });
        };

        /**
         *
         * API FUNCTIONS
         *
         * Those functions should be called for other services that want to change the product information.
         *
         * Ideally they would be setted as a interface, but since javascript has no support for it, we are going
         * to just describe here in the docs :(
         *
         * **/

        /**
         * This method is used to filter products in or out from the current available list, the type of search
         * alloweds are: id - taxonomy - title - price - discount
         *
         * @param propertyToCheck string
         * @param arrayDataToLookFor array
         * @return void (set products but return shit)
         * @todo perform test with the filter module
         */
        this.setProducts = function (propertyToCheck, arrayDataToLookFor) {

            var keys,
                keyFound,
                dataIsArray,
                funcName,
                productFound;

            function findProduct(product) {

                var productFound,
                    returnedData;

                // getSomething() from the product object
                returnedData = product[funcName]();

                // returnedData might be an array or not
                if (angular.isArray(returnedData)) {
                    // if an array intersection is found, means that the product has any of the selected taxonomies
                    productFound = HelperService.getArrayIntersections(returnedData, arrayDataToLookFor, function (item1, item2) {
                        // the intersection must match the ID and the TYPE (category, tag...)
                        return item1.id === item2.id && item1.type === item2.type;
                    });
                } else {
                    productFound = [];
                    // if the returned data is not an array we just need to to perform a simple inArray check
                    if (HelperService.inArray(arrayDataToLookFor, returnedData)) {
                        productFound.push(arrayDataToLookFor);
                    }
                }

                return productFound;
            }

            arrayDataToLookFor = arrayDataToLookFor || [];
            propertyToCheck = propertyToCheck || '';

            propertyToCheck = propertyToCheck.toLowerCase();

            // validate if check exists and it is valid
            keys = HelperService.getKeysFromObject(_api.set);
            keyFound = HelperService.inArray(keys, propertyToCheck);
            dataIsArray = angular.isArray(arrayDataToLookFor);

            // ok the propertyToCheck is valid and the data is in a correct format, lets starting filtering shit
            if (keyFound && dataIsArray) {

                // set the getter function from the product that will look up for the property value
                funcName = 'get' + _.string.capitalize(propertyToCheck);

                // make sure there is a taxonomy to look for
                if (arrayDataToLookFor.length) {

                    //
                    // @todo make sure the products are loaded before changing their data, still dont know the best way to do that
                    //
                    angular.forEach(_products.all.items, function (product, key) {

                        productFound = findProduct(product);

                        if (!productFound.length) {
                            _self.removeProductById(product.getId());
                        }
                    });
                }

                // @todo if we disable the filters or the wishlist the products are not coming back
                angular.forEach(_products.original, function (product, key) {

                    // create new instance
                    product = createProduct(product, false);

                    productFound = findProduct(product);

                    if (productFound.length) {
                        _self.addProduct(product);
                    }

                });

            } else {
                $log.error('Product.setProducts - Invalid Key or Invalid Data passed');
            }
        };

        /**
         * This method is used to change data from the current available products
         * @todo perform test with the card module
         * @param propertyToChange string
         * @param arrayNewDataToChange array
         */
        this.changeProducts = function (propertyToChange, arrayNewDataToChange) {

            propertyToChange = propertyToChange || '';
            arrayNewDataToChange = arrayNewDataToChange || [];

        };
    };

module.exports = dependencies.concat(ProductService);

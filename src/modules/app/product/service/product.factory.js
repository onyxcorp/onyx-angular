'use strict';

var dependencies = ['$log', '$rootScope', 'HelperService'],
    ProductFactory = function ($log, $rootScope, HelperService) {

        /**
         * Constructor for product factory
         *
         * @param id INTEGER
         * @param taxonomy ARRAY (OBJECT)
         * @param selected BOOLEAN
         * @param quantity INTEGER
         * @param title STRING
         * @param description STRING
         * @param supplier STRING
         * @param originalPrice FLOAT
         * @param initialDiscount FLOAT
         * @param currentDiscount FLOAT
         * @param priceHistory ARRAY
         * @param expiration STRING
         * @param image STRING
         * @constructor
         */
        var ProductFactory = function (id, taxonomy, selected, quantity, title, description, supplier, originalPrice, initialDiscount, currentDiscount, priceHistory, expiration, image) {
            this.setId(id);
            this.setTaxonomy(taxonomy);
            this.setSelected(selected);
            this.setQuantity(quantity);
            this.setTitle(title);
            this.setDescription(description);
            this.setSupplier(supplier);
            this.setOriginalPrice(originalPrice);
            this.setInitialDiscount(initialDiscount);
            this.setCurrentDiscount(currentDiscount);
            this.setPrice();
            this.setPriceHistory(priceHistory);
            this.setExpiration(expiration);
            this.setImage(image);
        };

        /**
         *
         * Getter & Setter - ID
         *
         */

        ProductFactory.prototype.setId = function (id) {
          id = HelperService.isInt(id);
          if (id) {
              this._id = id;
          } else {
              $log.error('ID must be set for product');
          }
        };

        ProductFactory.prototype.getId = function () {
            return this._id;
        };

        /**
         *
         * Getter & Setter - TAXONOMIES
         *
         */
        ProductFactory.prototype.setTaxonomy = function (taxonomy, relative) {

            // by default relative must be true, avoid overwriting the taxonomies added before
            relative = relative || true;

            // make sure the taxonomy variable exists and is an array
            if (!angular.isArray(this._taxonomy)) {
                this._taxonomy = [];
            }

            // we must first check for isArray because the isObject will set true for arrays also
            if (angular.isArray(taxonomy)) {
                // if relative we add the taxonomy to the array
                if (relative) {
                    // we dont know the size of the array but whatever, just run a loop..
                    angular.forEach(taxonomy, function (value, key) {
                        this.push(value);
                    }, this._taxonomy);
                } else {
                    this._taxonomy = taxonomy;
                }
            } else if (angular.isObject(taxonomy)) { // !important - javascript arrays are objects
                this._taxonomy.push(taxonomy);
            } else {
                $log.error('Product taxonomy must be an array or object');
            }

        };

        /**
         * Return all current taxonomies of the product
         *
         * @return array
         */
        ProductFactory.prototype.getTaxonomy = function () {
          return this._taxonomy;
        };

        /**
         * Returns only the taxonomies of type category
         * @returns Array
         * @todo allow to return the main category
         */
        ProductFactory.prototype.getCategories = function () {
          return HelperService.findWhereInArray(this._taxonomy, {type: 'category'}, false);
        };

        /**
         * Return only the taxonomies of type tag
         * @returns Array
         * @todo allow to return just a certain amount of tags
         */
        ProductFactory.prototype.getTags = function () {
          return HelperService.findWhereInArray(this._taxonomy, {type: 'tag'}, false);
        };

        /**
         *
         * Getter & Setter - SELECTED
         *
         */

        ProductFactory.prototype.setSelected = function (boolean) {
          if(boolean) {
            this._selected = 1;
          } else {
            this._selected = 0;
          }
        };

        ProductFactory.prototype.getSelected = function () {
          return this._selected;
        };

        /**
         * Just a wrapper for the quantity function since quantity automatically calls setSelected depending
         * on the value passed
         *
         * @param quantity
         * @returns {boolean}
         */
        ProductFactory.prototype.toggleSelect = function (quantity) {

            if (this.getSelected()) {
              this.setQuantity(0);
            } else {
              this.setQuantity(quantity);
            }

            return true;
        };

        /**
         *
         * Getter & Setter - QUANTITY
         *
         */

        /**
         * The method setQuantity is responsible for defining if the product is selected or not, setting anything
         * to 0 will make the product become unselected
         *
         * @param quantity
         * @param relative
         */
        ProductFactory.prototype.setQuantity = function (quantity, relative) {

            relative = relative || true;   // by default this method assumes that the quantity is always relative
            quantity = HelperService.isInt(quantity);

            // since quantity can be 0 and js considers 0 as false we must perform another check here
            // to confirm that it is a number and also to make it true
            if (angular.isNumber(quantity)) {
              if (quantity > 0) {
                if (relative === true) {
                  this._quantity += quantity;
                } else {
                  this._quantity = quantity;
                }
                this.setSelected(1);
              } else {
                this._quantity = 0;
                this.setSelected(0);
            }

              this.setPrice();

            } else {
                $log.info(quantity);
                $log.error('Invalid number set for quantity');
            }
        };

        ProductFactory.prototype.getQuantity = function () {

            if (this._quantity) {
                return this._quantity;
            } else {
                return 1;
            }
        };

        /**
         *
         * Getter & Setter - TITLE
         *
         */

        ProductFactory.prototype.setTitle = function (title) {
            if (title) {
                this._title = title;
            } else {
                $log.error('A product must have a title');
            }
        };

        ProductFactory.prototype.getTitle = function () {
            return this._title;
        };

        /**
         *
         * Getter & Setter - DESCRIPTION
         *
         */

        ProductFactory.prototype.setDescription = function (description) {

            if (description) {
                this._description = description;
            } else {
                $log.error('A product must have a description');
            }
        };

        ProductFactory.prototype.getDescription = function () {

            return this._description;
        };

        /**
         *
         * Getter & Setter - SUPPLIER
         *
         */

        ProductFactory.prototype.setSupplier = function (supplier) {

            if (supplier) {
                this._supplier = supplier;
            } else {
                $log.error('A product must have a supplier');
            }
        };

        ProductFactory.prototype.getSupplier = function () {

            return this._supplier;
        };

        /**
         *
         * Getter & Setter - ORIGINAL PRICE
         *
         */

        ProductFactory.prototype.setOriginalPrice = function (originalPrice) {
          // negative for isNaN(is not a number - so its a number!)
          originalPrice = HelperService.isFloat(originalPrice);
          if (originalPrice) {
            if (originalPrice) {
              if (originalPrice < 0) {
                $log.error('A original price must be equal to or higher than 0');
              } else {
                this._originalPrice = originalPrice;
              }
            } else {
              $log.error('A product must have an original price');
            }
          } else {
            $log.error('Invalid float value for original price');
          }
        };

        ProductFactory.prototype.getOriginalPrice = function () {
            return this._originalPrice;
        };

        /**
         *
         * Getter & Setter - INITIAL DISCOUNT
         *
         */

        ProductFactory.prototype.setInitialDiscount = function (initialDiscount) {
            // negative for isNaN(is not a number - so its a number!)
          initialDiscount = HelperService.isFloat(initialDiscount);
          if (initialDiscount) {
            if (initialDiscount > 0) {
              this._initialDiscount = initialDiscount;
              this.setPrice();
            } else {
              $log.error('A initial discount rice must be equal to or higher than 0');
            }
          } else {
            $log.error('A product must have an initial valid float number as a discount');
          }
        };

        ProductFactory.prototype.getInitialDiscount = function (base) {

          base = parseInt(base) || 100;

          return this._initialDiscount * base;

        };

        /**
         *
         * Getter & Setter - CURRENT DISCOUNT
         *
         */

        ProductFactory.prototype.setCurrentDiscount = function (currentDiscount) {

            currentDiscount = parseFloat(currentDiscount);

            if (currentDiscount < 0) {
                $log.error('A current discount  must be equal to or higher than 0');
            } else {
                this._currentDiscount = currentDiscount;
                this.setPrice();
            }
        };

        ProductFactory.prototype.getCurrentDiscount = function (base) {

            base = parseInt(base) || 100;

            return this._currentDiscount * base;
        };

        /**
         *
         * Getter & Setter - PRICE
         *
         */

        /**
         *
         * Set the product price based on the original price, initial_discount and current_discount
         * once this method is finish it will be responsible for calling the setTotal method to define the current
         * amount of this product
         *
         */
        ProductFactory.prototype.setPrice = function () {

            // if there is both currentDiscount and initialDiscount (card applied)
            if (this._currentDiscount && this._initialDiscount) {
                this._price = this._originalPrice - (this._originalPrice * (this._currentDiscount + this._initialDiscount));
            } else if (this._initialDiscount) { // if we have only the initialDiscount (no cards applied)
                this._price = this._originalPrice - (this._originalPrice * this._initialDiscount);
            } else { // if there is no discount to apply to the product just set it to the original value)
                this._price = this._originalPrice;
            }

            this.setTotal();
        };

        ProductFactory.prototype.getPrice = function () {

            if (!this._price) {
                this.setPrice();
            }

            return this._price;
        };

        /**
         *
         * Getter & Setter - PRICE_HISTORY
         *
         */

            // @todo must be set as an array (just like we did with taxonomy)
            // @todo allow also to set if the data is ABSOLUTE or RELATIVE
        ProductFactory.prototype.setPriceHistory = function (prices) {

            this._prices_history = prices;
        };

        ProductFactory.prototype.getPriceHistory = function () {

            return this._prices_history;
        };

        /**
         *
         * Getter & Setter - EXPIRATION
         *
         */

        ProductFactory.prototype.setExpiration = function (expiration) {

            if (expiration) {
                this._expiration = expiration;
            } else {
                $log.error('A Product must have an expiration');
            }
        };

        ProductFactory.prototype.getExpiration = function () {

            return this._expiration;
        };

        /**
         *
         * Getter & Setter - IMAGE
         *
         */

        ProductFactory.prototype.setImage = function (image) {
            if (image) {
                this._image = image;
            } else {
                $log.error('A product must have an image');
            }
        };

        ProductFactory.prototype.getImage = function () {
            return this._image;
        };

        /**
         *
         * Getter & Setter - TOTAL
         *
         */

        /**
         *
         * Set the total value for this product based on its quantity and current price (with the discounts already
         * applied). Once the function is finish defining the values it will broadcast an event to reach the parent
         * class (ProductService or anyother) in order for it to be able to update the current general cart values
         *
         */
        ProductFactory.prototype.setTotal = function () {
            this._total = this.getPrice * this.getQuantity();

            // this event should be broadcasted only from this function since all boils down to it
            // after the cart is updated in any type of calculated information. They are:
            // quantity, initial_discount, current_discount
            $rootScope.$broadcast('selectedProducts:change', {});
        };


        ProductFactory.prototype.getTotal = function () {

            return this._total;
        };

        return ProductFactory;


    };

module.exports = dependencies.concat(ProductFactory);

'use strict';

var dependencies = [ '$log', '$scope', 'ProductService' ],
    ProductItemCartCtrl = function($log, $scope, ProductService) {

      var _self = this,
          _setProduct;

      _setProduct = ProductService.getProductById($scope.id).then(function(product) {
        _self.product = product;
        return true;
      });

      this.quantity = 1;

      // check if the current product is selected or not
      this.isProductSelected = function() {
        return ProductService.isProductSelected($scope.id);
      };

      // equivalent to the addToCart
      this.selectProduct = function() {
        $log.log('selecting the product');
        _self.product.toggleSelect(this.quantity);
      };

      // set the quantity of the product, if the product
      // @todo wouldnt be better to auto-add the product once the user start changing the quantity of it?
      this.setQuantity = function(qty) {
        if(_self.isProductSelected()) {
          _self.product.setQuantity(qty, true);   // relative set the quantity
          this.quantity = _self.product.getQuantity();
          $log.log(this.quantity);
        } else {
          $log.log('nao existente');
          this.quantity += qty;
          $log.log(this.quantity);
        }
      };

      /**
       * Abstract like function that allow getting and setting any type of data the product may have in. The data
       * is suposed to be passed the way it come from the database, using snake_case. Exemplo: price_history
       *
       * @param data string (snake_case)
       * @returns {*}
       */
      this.setData = function(data) {

        var originalBindingName,
            funcName;

        // the original name the view is looking for, could be something like price or initial_discount, etc
        originalBindingName = data;

        // wait this shit to finish before trying to assign data
        return _setProduct.then(function() {
            data = _.string.camelize(data); // remove dashs and underscores and the first letter after make it uppercase
            data = _.string.capitalize(data);   // capitalize the word
            funcName = 'get' + data;    // the 'get' is default for all getter & setter in the Onyx Services Factory classes
            if(angular.isFunction(_self.product[funcName])) {
              _self[originalBindingName] = _self.product[funcName]();
            } else {
              _self[originalBindingName] = null;
              $log.error('Invalid function name in this.getData in productCtrl');
            }
            return _self[originalBindingName];
        });

      };

      this.getData = function(data) {
        return _self[data];
      };

    };

module.exports = dependencies.concat(ProductItemCartCtrl);

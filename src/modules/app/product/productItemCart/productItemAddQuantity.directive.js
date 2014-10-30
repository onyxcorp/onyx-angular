'use strict';

var productItemAddQuantity = function() {

  var linkCartItemPlus = function(scope, element, attributes, productCtrl) {
    element.on('click', function() {
      //scope.$apply(cartItemCtrl.setQuantity(+1));
      productCtrl.setQuantity(+1);
    });
  };

  return {
    restrict: 'AE',
    require: '^productItem',
    transclude: false,
    scope: {},
    link: linkCartItemPlus
  };
};

module.exports = productItemAddQuantity;

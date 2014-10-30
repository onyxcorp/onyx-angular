'use strict';

var productItemRemoveQuantity = function() {
    var linkCartItemMinus = function(scope, element, attributes, productCtrl) {

        element.on('click', function() {
            //scope.$apply(cartItemCtrl.setQuantity(-1));
            productCtrl.setQuantity(-1);
        });

    };

    return {
        restrict: 'AE',
        require: '^productItem',
        transclude: false,
        scope: {},
        link: linkCartItemMinus
    };
};

module.exports = productItemRemoveQuantity;

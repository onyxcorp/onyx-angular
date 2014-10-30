'use strict';

var productItemQuantity = function() {
    var linkProductItemQuantity = function(scope, element, attributes, productCtrl) {

        scope.quantity = productCtrl.getQuantity();

        // @todo weird here must return the fucntion but above i can just say which function should be watched
        scope.$watch(function() {
          return productCtrl.getQuantity();
        }, function(newVal, oldVal) {
          if(newVal !== oldVal) {
            scope.quantity = productCtrl.getQuantity();
          }
        });
    };

    return {
        restrict    : 'AE',
        require     : '^productItem',
        transclude  : false,
        scope       : {},
        template    : '<span ng-transclude ng-bind="quantity"></span>',
        link        : linkProductItemQuantity
    };
};

module.exports = productItemQuantity;

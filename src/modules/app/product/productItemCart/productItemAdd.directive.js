'use strict';

var dependencies = [ '$animate' ],
    directive = function($animate) {
      var linkProductItemAdd = function(scope, element, attributes, productCtrl) {

        scope.$watch(productCtrl.isProductSelected, function (newVal, oldVal) {
          if (newVal) {
            $animate.addClass(element, 'active');
          } else {
            $animate.removeClass(element, 'active');
          }
        });

        element.on('click', function () {
          console.log('productItemAdd.directive - clicando para selecionar o produto');
          scope.$apply(productCtrl.selectProduct());
        });
      };

      return {
        restrict: 'AE',
        require: '^productItem',
        transclude: false,
        scope: {},
        link: linkProductItemAdd
      };
    };

module.exports = dependencies.concat(directive);

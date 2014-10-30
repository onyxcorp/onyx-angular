
'use strict';

var dependencies = [ '$window', 'HelperService', '$timeout' ],
    gridItemDirective = function($window, HelperService, $timeout) {
      return {
        restrict : 'AC',
        require  : '^grid',
        scope    : true,
        link     : function(scope, element, attributes, gridCtrl) {

          // get the current index from the loop
          var index = scope.$index || 0;

          // Function to get the Min value in Array
          Array.min = function(array) {
            return Math.min.apply(Math, array);
          };


          function updatePosition() {

            var blocks = gridCtrl.getBlocks();
            var margin = gridCtrl.getMargin();
            var colWidth = element.prop('offsetWidth');
            gridCtrl.setWidth(colWidth);

            var min = Array.min(blocks);
            var index = HelperService.inArray(blocks, min);
            var leftPos = margin+(index*(colWidth+margin));

            element.css({
              'left':leftPos+'px',
              'top':min+'px'
            });


            gridCtrl.setNewBlockIndex(index, min + element.prop('offsetHeight')+margin);
          }

          /**
           * @todo this is a temporary fix because the offsetHeight is being called before the images are loaded
           * @todo which makes us get an incorrect value of the height of the element
           */
          $timeout(function() {
            console.log(element.prop('offsetHeight'));
            updatePosition();
          }, 1000);

          /**
           * Recalculate position on window resize
           */
          angular.element($window).bind('resize', function() {
            scope.$apply(function() {
              updatePosition();
            });
          });

          /**
           * Keep a $watch on the $index property (should be available through the ng-repeat directive)
           * and schedule a reload in the grid if the index of the item changes
           */
          scope.$watch('$index', function () {
            if (index !== undefined && index !== scope.$index) {
              updatePosition();
            }
            index = scope.$index;
          });

        }
      };
    };

module.exports = gridItemDirective;

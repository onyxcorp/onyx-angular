
'use strict';

var Tether = require('tether');

var dependencies = [ '$window' ],
    gridDirective = function($window){
      return {
        restrict    : 'ACE',
        controller  : 'GridCtrl',
        controllerAs: 'gridCtrl',
        link        : {
          pre : function preLink(scope, element, attributes, gridCtrl) {

            //var options = {
            //  columnWidth: parseInt(attributes.columnWidth, 10) || attributes.columnWidth
            //};

            //gridCtrl.updateDefaults(options);

            // detect window resize
            angular.element($window).bind('resize', function() {
              scope.$apply(function() {
                gridCtrl.reload();
              });
            });

          }
        }
      };
    };

module.exports = gridDirective;

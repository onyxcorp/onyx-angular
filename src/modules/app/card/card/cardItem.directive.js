'use strict';

var dependencies = ['$parse', '$animate'],
    cardItemDirective = function($parse, $STOREPATH, $animate) {
      return  {
        restrict    : 'ACE',
        controller  : 'CardController',
        controllerAs: 'cardController',
        transclude  : false,
        scope       : {
          id  : '='
        }
      };
    };

module.exports = dependencies.concat(cardItemDirective);



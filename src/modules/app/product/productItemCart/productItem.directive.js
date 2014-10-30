'use strict';

var productItem = function() {
  return {
    restrict    : 'AE',  /** attribute only **/
    controller  : 'ProductItemCartCtrl',
    controllerAs: 'ProductItemCartCtrl',
    transclude  : false,
    scope       : {
        id  : '='
    }
  };
};

module.exports = productItem;

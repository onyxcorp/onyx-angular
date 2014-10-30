
'use strict';

var cardUnsetDirective = function() {
  return  {
    restrict    : 'ACE',
    require     : '^cardItem',
    link        : function(scope, element, attribute, cardController) {

      element.on('click', function() {
        scope.$apply(cardController.unsetCard());
      });
    }
  };
};

module.exports = cardUnsetDirective;



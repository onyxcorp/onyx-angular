'use strict';

var dependencies = ['$parse', '$animate'],
  cardItemDirective = function($parse, $animate) {
    return  {
      restrict    : 'ACE',
      require     : '^cardItem',
      link        : function(scope, element, attribute, cardController) {

        // we are using a shared scope with the parent controller, so we cant get the id from the
        // scope {} attribute and must actually parse the id
        var cardItemData = $parse(attribute.id);
        var cardId = cardItemData(scope);

        element.on('click', function() {

          // @todo perform a validation that if we dont find a cardId, this directive should not work
          cardController.setId(cardId);

          // for simple css animations the ng-class supports it (changing the css)
          // #ref https://docs.angularjs.org/guide/animations
          if(element.hasClass('css-class')) {
            $animate.removeClass(element, 'css-class');
          } else {
            $animate.addClass(element, 'css-class');
          }
        });
      }
    };
  };

module.exports = dependencies.concat(cardItemDirective);



'use strict';

var deckToggleDirective = function() {
  return {
    restrict    : 'E',
    controller  : 'DeckCtrl',
    controllerAs: 'deckCtrl',
    templateUrl : 'app/card/deck/deck.html',
    replace     : true
  };
};

module.exports = deckToggleDirective;



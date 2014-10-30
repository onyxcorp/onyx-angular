'use strict';

var deckDirective = function() {
  return {
    restrict: 'E',
    templateUrl: 'app/card/deck/deck.html',
    replace: true
  };
};

module.exports = deckDirective;

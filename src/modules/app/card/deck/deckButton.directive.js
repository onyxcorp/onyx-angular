'use strict';

var deckButtonDirective = function() {
  return {
    restrict: 'E',
    templateUrl: 'app/card/deck/button.html',
    replace: true
  };
};

module.exports = deckButtonDirective;

'use strict';

module.exports =
  angular.module('card', [])
    .config(require('./states'))
    .run(require('./run'))
    .factory('CardFactory', require('./service/card.factory'))
    .service('DeckService', require('./service/deck.service'))
    .controller('CardCtrl', require('./card/card.controller'))
    .directive('cardItem', require('./card/cardItem.directive'))
    .directive('cardSet', require('./card/cardSet.directive'))
    .directive('cardUnset', require('./card/cardUnset.directive'))
    .controller('DeckCtrl', require('./deck/deck.controller'))
    .directive('deck', require('./deck/deck.directive'))
    .directive('deckButton', require('./deck/deckButton.directive'))
    .directive('deckToggle', require('./deck/deckToggle.directive'));

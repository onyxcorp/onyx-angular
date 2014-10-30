'use strict';

var dependencies = [ 'DeckService' ],
    CardCtrl = function(DeckService) {
      var cardId = null;

      this.setCardById = function(id) {
        if(id) {
          cardId = id;
          updateCurrentCard();
        }
      };

      this.unsetCard = function() {
        cardId = null;
        updateCurrentCard();
      };

      function updateCurrentCard() {
        DeckService.setCardById(cardId);
      }
    };

module.exports = dependencies.concat(CardCtrl);


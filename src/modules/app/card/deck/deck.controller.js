'use strict';

var dependencies = [ 'DeckService' ],
    DeckCtrl = function(DeckService) {
      var _self = this;

      DeckService.getDeck().then(function(deck) {
          _self.deck = deck;
      });

      /**
       * Set some card on the current store
       * @type {*}
       * @todo remove this method, should be accessible throught an directive/controller api
       */
      this.setCard = DeckService.setCardById;
  };

module.exports = dependencies.concat(DeckCtrl);



var dependencies = [ '$log', '$q', '$resource', 'HelperService', 'PlayerService', 'CardFactory' ],
    DeckService = function($log, $q, $resource, HelperService, PlayerService, CardFactory) {

      var _self,
        _api,
        _promisses,
        _deck,
        _getDeck,
        _CardsAPI,
        CardsResource;

      this.init = function () {
        _self = this;
        _promisses = [];
        _api = {
          change: {
            gauge: []
          }
        };
        _deck = {
          items: [],
          itemsQty: 0
        };


        _getDeck = PlayerService.getPlayerId().then(function (_playerId) {

          CardsResource = $resource('resources/cards.json');
          _CardsAPI = new CardsResource();

          return _CardsAPI.$get().then(function (data) {

            angular.forEach(data.cards, function (value, key) {
              _deck.items.push(new CardFactory(value.id, value.name, value.discount, value.applied, value.points_limit, value.image));
            });

            // @todo this must be a dynamic function to easily update the Deck when a new card is won
            _deck.itemsQty = _deck.items.length;

          });
        });

        // usefull when we want to use the $q.all(_promisses...
        _promisses.push(_getDeck);
      };

      /**
       * Auxiliary function to check if the deck service was loaded (async)
       * @returns {*|Promise}
       */
      this.isDeckServiceLoaded = function () {
        return $q.all(_promisses).then(function () {
          return true;
        });
      };

      this.updateService = function () {

      };

      /**
       * Return the deck object
       * @returns {*}
       */
      this.getDeck = function () {
        return _getDeck.then(function () {
          return _deck;
        });
      };

      /**
       * Change a card status to applied
       *
       * @param cardId
       */
      this.setCardById = function (cardId) {
        return _getDeck.then(function () {
          _deck.current = HelperService.setById(cardId, _deck.items);
          return _deck.current;
        });
      };

      /**
       * Return the current active card
       */
      this.getCardById = function (cardId) {
        return this.setCardById(cardId).then(function (card) {
          return card;
        });
      };

      // @todo when page is refreshed we should be able to keep wich card was active
      this.$restore = function () {

        // we need to know the current active card in store

        // wee need to know the current status of the gauge based on the current products added to the cart

      };
    };

module.exports = dependencies.concat(DeckService);

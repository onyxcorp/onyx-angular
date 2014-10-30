'use strict';

var dependencies = [ 'DeckService' ],
    run = function(DeckService ) {

      // @todo we must verify which card was active if the page was refreshed
      DeckService.init();

    };

module.exports = dependencies.concat(run);

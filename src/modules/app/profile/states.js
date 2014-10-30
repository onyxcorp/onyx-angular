'use strict';

// exports by angularUiRouter
var dependencies = [ '$stateProvider'],
    states = function($stateProvider) {

      $stateProvider

        .state('store.main.player.profile', {
          parent: 'store.main.player'
        });

    };

module.exports = dependencies.concat(states);

'use strict';

var dependencies = [ 'PlayerService' ],
    run = function(PlayerService ) {

      PlayerService.init();

    };

module.exports = dependencies.concat(run);

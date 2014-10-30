'use strict';

var dependencies = [ 'BadgeService' ],
    run = function(BadgeService ) {

      BadgeService.init();

    };

module.exports = dependencies.concat(run);

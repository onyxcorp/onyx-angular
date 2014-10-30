'use strict';

var dependencies = [ 'ProfileService' ],
    run = function(ProfileService) {

      ProfileService.init();

    };

module.exports = dependencies.concat(run);

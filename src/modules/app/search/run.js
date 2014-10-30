'use strict';

var dependencies = [ 'SearchService' ],
    run = function(SearchService) {

      SearchService.init();

    };

module.exports = dependencies.concat(run);

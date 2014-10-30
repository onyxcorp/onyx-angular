'use strict';

var dependencies = [ 'TaxonomyService' ],
    TaxonomiesController = function(TaxonomyService) {

      var _self = this;

      TaxonomyService.getTaxonomies().then(function(data) {
          _self.filters = data;
      });
  };

module.exports = dependencies.concat(TaxonomiesController);

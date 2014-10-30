'use strict';

module.exports =
  angular.module('taxonomy', [
    require('../product').name
  ])
  .config(require('./states'))
  .run(require('./run'))
  .factory('TaxonomyFactory', require('./service/taxonomy.factory'))
  .service('TaxonomyService', require('./service/taxonomy.service'))
  .controller('TaxonomiesCtrl', require('./taxonomies/taxonomies.controller'))
  .directive('toggleFilter', require('./taxonomies/taxonomiesToggle.directive'))
  .directive('filterButton', require('./taxonomies/taxonomiesButton.directive'));

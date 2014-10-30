
'use strict';

module.exports =
  angular.module('search', [])
  .config(require('./states'))
  .run(require('./run'))
  .service('SearchService', require('./service/search.service'))
  .controller('SearchCtrl', require('./block/block.controller'))
  .directive('searchBlock', require('./block/searchBlock.directive'));

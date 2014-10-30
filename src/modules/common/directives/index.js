'use strict';

module.exports =
  angular.module('angu.common.directives', [])
    .controller('GridCtrl', require('./grid/grid.controller'))
    .directive('grid', require('./grid/grid.directive'))
    .directive('gridItem', require('./grid/gridItem.directive'));

'use strict';

module.exports =
  angular.module('player', [
    require('../auth').name
  ])
  .config(require('./states'))
  .run(require('./run'))
  .service('PlayerService', require('./service/player.service'))
  .controller('PlayerBlockCtrl', require('./block/block.controller'))
  .directive('playerButton', require('./block/blockButton.directive'))
  .directive('playerToggle', require('./block/blockToggle.directive'));

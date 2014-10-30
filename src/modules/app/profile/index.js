
'use strict';

module.exports =
  angular.module('profile', [
    require('../player').name
  ])
  .config(require('./states'))
  .run(require('./run'))
  .service('ProfileService', require('./service/profile.service'))
  .controller('ProfileBlockCtrl', require('./block/block.controller'))
  .directive('toggleBadge', require('./block/profileToggle.directive'))
  .directive('buttonBadge', require('./block/profileButton.directive'));

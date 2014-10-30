'use strict';

module.exports =
  angular.module('badge', [
    require('../player').name
  ])
  .config(require('./states'))
  .run(require('./run'))
  .service('BadgeService', require('./service/badge.service'))
  .controller('BadgesCtrl', require('./badges/badges.controller'))
  .directive('badgeToggleBlock', require('./badges/badgesToggle.directive'))
  .directive('badgeButton', require('./badges/badgesButton.directive'));

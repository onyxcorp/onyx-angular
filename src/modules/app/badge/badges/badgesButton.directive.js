'use strict';

var badgeButtonDirective = function() {
  return {
    restrict: 'E',
    templateUrl: 'app/badge/badges/button.html',
    replace: true
  };
};

module.exports = badgeButtonDirective;

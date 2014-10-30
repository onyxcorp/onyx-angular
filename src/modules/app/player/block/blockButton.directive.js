'use strict';

var playerButtonDirective = function() {
  return {
    restrict    : 'E',
    templateUrl : 'app/player/block/button.html',
    replace     : true
  };
};

module.exports = playerButtonDirective;

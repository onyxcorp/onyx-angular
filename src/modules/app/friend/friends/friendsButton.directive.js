'use strict';

var friendsButtonDirective = function() {
  return {
    restrict : 'E',
    templateUrl : 'app/friend/friends/button.html',
    replace     : true
  };
};

module.exports = friendsButtonDirective;

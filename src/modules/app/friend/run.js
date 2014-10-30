'use strict';

var dependencies = [ 'FriendService' ],
    run = function(FriendService ) {

      FriendService.init();

    };

module.exports = dependencies.concat(run);

'use strict';

var dependencies = [ 'BadgeService' ],
    BadgesController = function(BadgeService) {

      var _self = this;

      BadgeService.getBadges().then(function(badges){
          _self.badges = badges;
      });

    };

module.exports = dependencies.concat(BadgesController);

'use strict';

var dependencies = [ 'ngTetherJs' ],
    badgesToggleDirective = function(ngTetherJs) {
      return {
        restrict    : 'AC',
        scope       : {},
        link        : function(scope, element, attributes) {
          element.on('click', function() {
            ngTetherJs.toggle({
              controller  : 'BadgesCtrl',
              controllerAs: 'badgesCTrl',
              templateUrl : 'app/badge/badges/badges.html',
              target      : element[0],
              attachment  : 'bottom center',
              targetAttachment : 'top center'
            });

            if(element.hasClass('active')) {
              element.addClass('active');
            } else {
              element.removeClass('active');
            }
          });
        }
      };
    };

module.exports = dependencies.concat(badgesToggleDirective);

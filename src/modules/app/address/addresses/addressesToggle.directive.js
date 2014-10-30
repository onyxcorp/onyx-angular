'use strict';

var dependencies = ['$state'],
    addressesToggleDirective = function($state) {
      return {
        restrict    : 'ACE',
        scope       : {},
        link        : function(scope, element, attributes, addressButtonCtrl) {
          element.on('click', function() {
            scope.$apply(function() {
              if($state.current.name === 'store.main.player.profile.address') {
                // if the deck was active and we clicked just send us back to a default page
                $state.go('store.main.player.profile');
                element.addClass('active');
              } else {
                $state.go('store.main.player.profile.address');
                element.removeClass('active');
              }
            });
          });
        }
      };
    };

module.exports = dependencies.concat(addressesToggleDirective);

'use strict';

var dependencies = [ '$state' ],
    ordersToggleDirective = function($state) {
      return {
        restrict    : 'ACE',
        scope       : {},
        link        : function(scope, element, attributes) {
          element.on('click', function() {
            scope.$apply(function() {
              if($state.current.name === 'store.main.player.player.modal.order') {
                // if the deck was active and we clicked just send us back to a default page
                // @todo maybe make it go to the latest active state would be a better approach, using StorageService
                $state.go('store.main.player.player');
                this.active = false;
              } else {
                $state.go('store.main.player.player.modal.order');
                this.active = true;
              }
            });
          });
        }
      };
    };

module.exports = dependencies.concat(ordersToggleDirective);

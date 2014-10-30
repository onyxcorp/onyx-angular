'use strict';

var dependencies = [ '$state' ],
    taxonomiesToggle = function($state) {
      return {
        restrict    : 'ACE',
        scope       : {},
        link        : function(scope, element, attributes) {
          element.on('click', function() {
            if($state.current.name === 'store.main.filter') {
              // if the deck was active and we clicked just send us back to a default page
              // @todo maybe make it go to the latest active state would be a better approach, using StorageService
              $state.go('store.main');
              element.addClass('active');
            } else {
              $state.go('store.main.filter');
              element.removeClass('active');
            }
          });
        }
      };
    };

module.exports = taxonomiesToggle;

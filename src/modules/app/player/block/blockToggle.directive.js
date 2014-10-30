
'use strictg';

var dependencies = [ 'ngTetherJs' ],
    playerToggleDirective = function(ngTetherJs) {
      return {
        restrict    : 'E',
        link        : function(scope, elements, attribute) {
          scope.$apply(
            ngTetherJs.toggle({
              controller  : 'PlayerBlockCtrl',
              controllerAs: 'playerBlockCtrl',
              templateUrl : 'app/player/block/block.html',
              target      : element[0],
              targetAttachment : 'bottom center'
            })
          );
        }
      };
    };

module.exports = dependencies.concat(playerToggleDirective);

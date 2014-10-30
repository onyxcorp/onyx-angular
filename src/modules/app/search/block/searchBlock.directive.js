
'use strict';

var storeSearchDirective = function() {
  return {
    restrict: 'E',
    controller: 'SearchCtrl',
    controllerAs: 'searchCtrl',
    templateUrl: 'app/search/block/search.html',
    replace: true
  };
};

module.exports = storeSearchDirective;

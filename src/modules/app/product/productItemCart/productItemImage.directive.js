'use strict';

var productItemImage = function() {
    // @todo this directive must be able to receive the class or other attributes from where it is being called
    // @todo change thjis directive to work like the ng-src one
    // @todo reference https://github.com/angular/angular.js/blob/master/src/ng/directive/attrs.js#L103
    var linkProductItemImage = function(scope, element, attributes, productCtrl) {
        productCtrl.setData('image').then(function(data) {
            scope.image = data;
        });
    };

    return {
        restrict    : 'AE',
        require     : '^productItem',
        transclude  : true,
        replace     : true,
        scope       : {},
        link        : linkProductItemImage,
        template    : '<img ng-src="{{image}}"/>'
    };
};

module.exports = productItemImage;

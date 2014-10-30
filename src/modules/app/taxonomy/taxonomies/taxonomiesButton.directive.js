'use strict';

var taxonomiesButtonDirective = function() {
      return {
          restrict    : 'E',
          templateUrl : 'app/taxonomy/taxonomies/button.html',
          replace     : true
      };
    };

module.exports = taxonomiesButtonDirective;

'use strict';

var addressesButtonDirective = function() {
  return  {
    restrict    : 'E',
    templateUrl : 'app/address/addresses/button.html',
    replace     : true
  };
};

module.exports = addressesButtonDirective;

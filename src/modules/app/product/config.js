'use strict';

var dependencies = [ 'ngDialogProvider' ],
    config = function(ngDialogProvider ) {

      ngDialogProvider.setDefaults({
        className: 'ngdialog-theme-default',
        plain: true,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true
      });
    };

module.exports = dependencies.concat(config);

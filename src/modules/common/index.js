'use strict';

module.exports =
  angular.module('angu.common', [
    require('./directives').name,
    require('./filters').name,
    require('./services').name
  ]);

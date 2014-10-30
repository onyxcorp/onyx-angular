'use strict';

module.exports =
  angular.module('angu.common.services', [])
  .service('HelperService', require('./helper.service'))
  .service('StorageService', require('./storage.service'))
  .provider('ngTetherJs', require('./tether.provider'));

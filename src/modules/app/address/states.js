'use strict';

// exports by angularUiRouter
var dependencies = [ '$stateProvider'],
    states = function($stateProvider) {

      $stateProvider

        .state('store.addresses', {
          url         : '/enderecos',
          views       : {
            'main@'  : {
              templateUrl: 'app/address/addresses/addresses.html',
              controller: 'AddressesCtrl',
              controllerAs: 'addressesCtrl',
              resolve: {
                initialData: function (ProductService) {
                  return ProductService.getAllProducts();
                }
              }
            }
          }
        })

        .state('store.address', {
          url         : '/endereco/:endereco_id',
          views       : {
            'modal@'  : {
              controller  : 'AddressCtrl',
              controllerAs: 'addressCtrl',
              templateUrl : 'app/address/address.html',
              resolve     : {
                initialData: function () {
                  console.log('preloaded address single view data');
                }
              }
            }
          }
        });
    };

module.exports = dependencies.concat(states);

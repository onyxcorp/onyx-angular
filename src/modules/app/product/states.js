'use strict';

// exports by angularUiRouter
var dependencies = [ '$stateProvider'],
    routes = function($stateProvider) {

      $stateProvider

        .state('store.main', {
          parent      : 'store',
          url         : '/loja',
          views       : {
            'mainView'  : {
              templateUrl: 'app/product/productList/productList.html',
              controller: 'ProductListCtrl',
              controllerAs: 'productListCtrl',
              resolve: {
                initialData: function (ProductService) {
                  return ProductService.getAllProducts();
                }
              }
            }
          }
        })

        .state('store.main.product', {
            parent      : 'store.main',
            url         : '/produto/:productId',
            onEnter     : function($state, ngDialog) {
                ngDialog.open({
                  template    : '<div ui-view="modal"></div>'
                })
                .closePromise.then(function (data) {
                  $state.go('store.main');
                });
            },
            views       : {
              'modal@'    : {
                controller  : 'ProductCtrl',
                controllerAs: 'productCtrl',
                templateUrl : 'app/product/product/product.html',
                resolve     : {
                    initialData : function($stateParams, ProductService) {
                        return ProductService.getProductById($stateParams.productId);
                    }
                }
              }
            }
        });
    };

module.exports = dependencies.concat(routes);

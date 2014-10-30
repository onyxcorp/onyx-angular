'use strict';

// exports by angularUiRouter
var dependencies = [ '$stateProvider' ],
    states = function($stateProvider) {

      $stateProvider

        .state('store.main.order', {
          parent      : 'store.main',
          views       : {
            'modal@'  : {
              controller  : 'OrderCtrl',
              controllerAs: 'orderCtrl',
              templateUrl : 'app/order/orders/orders.html',
              resolve     : {
                initialData: function (OrderService) {
                  console.log('Pre-load order history data');
                }
              }
            }
          }
        })

      /**
       * Same state with multiple views, this way we can isolate and scope of each one separately
       * (different controllers, tempalte, etc)
       *
       * references
       * # http://scotch.io/tutorials/javascript/angular-routing-using-ui-router
       * # https://github.com/angular-ui/ui-router/wiki/Multiple-Named-Views
       *
       */

        // abstract clast to be used by the cart module
        .state('order', {
          abstract    : true,
          url         : '/pedido',
          views       : {
            'main'      :   {
              template    : '<ui-view name="mainView"></ui-view>'
            },
            'header'    :   {
              template    : '<store-search></store-search><div flex  flex-lg="30" flex-md="30" flex-sm="30" style="height: 70px;"  layout-order-md="2" layout="horizontal" layout-align="center" ><a class="logo" ui-sref="store.main" title="Pagapo.co"></a></div><mini-basket></mini-basket>'
            }
          }
        })

        .state('order.close', {
          url         : '/fechar',
          parent      : 'order',
          views       : {
            'mainView'  :   {
              controller  : 'OrderResumeCtrl',
              controllerAs: 'orderResumeCtrl',
              templateUrl : 'app/order/resume/resume.html',
              resolve     : {
                initialData : function() {
                  /** preload all cart information **/
                  console.log('preloading order page');
                }
              }
            }
          }
        });
    };

module.exports = dependencies.concat(states);

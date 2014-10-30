(function(){

    'use strict';

    var OrderSingleCtrl = function(OrderService, initialData) {
        this.badges = initialData;
    };

    OrderSingleCtrl.$inject = ['OrderService', 'initialData'];

    angular.module('Onyx')

        .controller('OrderSingleCtrl', OrderSingleCtrl)

        .config(function($stateProvider, $STOREPATH) {

            $stateProvider

                .state('store.main.player.main.modal.order.single', {
                    parent      : 'store.main.player.main.modal.order',
                    views       : {
                        'modal@'  : {
                            controller  : 'OrderSingleCtrl',
                            controllerAs: 'orderSingleCtrl',
                            templateUrl : $STOREPATH + 'order/single/single.html',
                            resolve     : {
                                initialData: function () {

                                    console.log('Pre-load order single view data');
                                }
                            }
                        }
                    }
                });
        });
})();

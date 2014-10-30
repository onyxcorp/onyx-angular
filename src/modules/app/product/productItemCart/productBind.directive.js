'use strict';

var dependencies = [ '$filter' ],
    directive = function($filter) {
      return {
        restrict: 'A',
        require: '^productItem',
        transclude: false,
        scope: {},
        link: function (scope, element, attributes, productCtrl) {

          var dataToBind,
              filters,
              filterType,
              filterArgument;

          dataToBind = attributes.productBind;
          filters = attributes.filter;

          if (filters) {
            filters = filters.split(':');
            filterType = filters[0];
            filterArgument = filters[1];
          }

          if (dataToBind) {
            productCtrl.setData(dataToBind).then(function (data) {
              // #ref https://github.com/angular/angular.js/blob/master/src/ng/directive/ngBind.js#L3
              if (data === null) {
                data = '';
              } else {
                if (filters) {
                  data = $filter(filterType)(data, filterArgument);
                }
              }
              element.text(data === undefined ? '' : data);
            });
          }

          // @todo testar se este scope.$watch esta funcionando, ele devera se ativar ao colocar/remover um card
          //scope.$watch(dataToBind, function(newVal, oldVal) {
          //    if(newVal !== oldVal) {
          //        productCtrl.getData(dataToBind).then(function(data) {
          //            // #ref https://github.com/angular/angular.js/blob/master/src/ng/directive/ngBind.js#L3
          //            element.text(data == undefined ? '' : data);
          //        });
          //    }
          //});
        }
      };
    };

module.exports = dependencies.concat(directive);

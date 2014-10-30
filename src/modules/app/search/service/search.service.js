
'use strict';

var dependencies = [ 'ProductService' ],
    SearchService = function(ProductService) {

      var _self,
          _searchTerm;

      this.init = function () {

        _self = this;

        _searchTerm = '';

      };


      this.escapeRegExp = function(string) {
        return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      };

      this.searchProduct = function(type, term) {

        var regex = new RegExp('\\b' + _self.escapeRegExp(term), 'i');

        // call for the setProducts() mehtod in produt.service

      };

      /**
       * Simple term search function
       * @param term
       */
      this.searchProdutosLote = function (term) {
        _self.searchProduct('title', term);
      };

      this.setSearchKeyword = function (term) {
        _searchTerm = term;
      };

    };

module.exports = dependencies.concat(SearchService);

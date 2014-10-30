
'use strict';

var dependencies = [ 'SearchService' ],
    SearchCtrl = function(SearchService) {

      var self = this;

      /** lets set the initial tags filter **/
      //this.search = SearchService.getSearch();
      //
      //this.searchForm = function (term) {
      //  SearchService.searchProdutosLote(term);
      //};

      this.searchFormByTag = function (chosens) {
        console.log(self.movies);
      };
    };

module.exports = dependencies.concat(SearchCtrl);

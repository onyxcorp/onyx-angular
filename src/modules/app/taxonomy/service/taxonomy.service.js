'use strict';

var dependencies = [ '$log', '$q', '$resource', 'HelperService', 'StorageService', 'ProductService', 'TaxonomyFactory'],
    TaxonomyService = function($log, $q, $resource, HelperService, StorageService, ProductService, TaxonomyFactory) {

      var _self,
        _api,
        _promisses,
        _taxonomies,
        _getTags,
        _getCategories,
        _TagAPI,
        _CategoryAPI,
        TagsResource,
        CategoryResource;

      /**
       * Constructor ProductService
       * @constructor
       */
      this.init = function () {
        _self = this;
        _api = null; // there are no api set for the moment
        _promisses = [];
        _taxonomies = {
          items: {
            tag: [],
            category: []
          },
          current: [] // shall be used when visiting a taxonomy page (/loja/sometaxonomy)
        };

        this.loadTags();
        this.loadCategories();

        $q.all(_promisses).then(function () {
          _self.updateService();
        });
      };

      this.isTaxonomyServiceLoaded = function () {
        return $q.all(_promisses).then(function () {
          return true;
        });
      };

      /**
       * Update the taxonomy service data
       */
      this.updateService = function () {

        var selectedTaxonomies = [];

        angular.forEach(_taxonomies.items.tag, function (value, key) {
          if (value.getSelected()) {
            this.push({
              id: value.getId(), type: value.getType()
            });
          }
        }, selectedTaxonomies);

        angular.forEach(_taxonomies.items.category, function (value, key) {
          if (value.getSelected()) {
            this.push({
              id: value.getId(), type: value.getType()
            });
          }
        }, selectedTaxonomies);

        ProductService.setProducts('taxonomy', selectedTaxonomies);

        // lets save only the current session of products
        StorageService.setData('taxonomies', selectedTaxonomies);
      };

      this.loadTags = function () {

        TagsResource = $resource('resources/tags.json');
        _TagAPI = new TagsResource();

        _getTags = _TagAPI.$get().then(function (data) {
          angular.forEach(data.tags, function (value, key) {
            value.type = 'tag';
            _self.addTaxonomy(value);
          });
          return data;
        });
        //usefull when we want to use $q.all()
        _promisses.push(_getTags);
      };

      this.loadCategories = function () {

        CategoryResource = $resource('resources/categories.json');
        _CategoryAPI = new CategoryResource();

        _getCategories = _CategoryAPI.$get().then(function (data) {
          angular.forEach(data.categories, function (value, key) {
            value.type = 'category';
            _self.addTaxonomy(value);
          });
          return data;
        });
        //usefull when we want to use $q.all()
        _promisses.push(_getCategories);
      };

      /**
       * Auxiliary function to check if the tag service loaded (async)
       * @returns {*|Promise}
       */
      this.isTaxonomyServiceLoaded = function () {
        // wait for tag and categorie to load before returning
        return $q.all(_promisses).then(function () {
          return true;
        });
      };

      /**
       * Get current available tags for filtering
       *
       * @returns {*|XMLList|XML}
       */
      this.getTaxonomies = function () {
        return $q.all(_promisses).then(function () {
          return _taxonomies;
        });
      };

      /**
       * Add a new tag to the tags array
       * @param data object
       */
      this.addTaxonomy = function (data) {

        data.type = data.type || 'category';

        if (_taxonomies.items[data.type]) {
          _taxonomies.items[data.type].push(
            new TaxonomyFactory(data.id, data.type, data.name, data.slug, data.selected)
          );
        } else {
          $log.error('Taxonomy invalid type');
        }
      };

      /**
       * Remove a tag from the items array by the tag id
       * @param taxonomyId number
       * @param type string
       */
      this.removeTaxonomyById = function (taxonomyId, type) {
        type = type || 'category';
        taxonomyId = HelperService.isInt(taxonomyId);
        if (taxonomyId) {
          return $q.all(_promisses).then(function () {
            HelperService.removeFromArrayByProperty(_taxonomies.all.items[type], ['_id'], taxonomyId);
          });
        } else {
          $log.error('Taxonomy invalid id number to remove');
        }
      };

      this.setTaxonomyByIdAndType = function (taxonomyId, type) {

        var _taxonomy;
        taxonomyId = parseInt(taxonomyId);
        type = type || 'category';

        if (!isNaN(taxonomyId)) {
          return $q.all(_promisses).then(function () {
            _taxonomy = HelperService.findWhereInArray(_taxonomies.items[type], {_id: taxonomyId}, true);
            if (_taxonomy.length) {
              return _taxonomy[0];
            } else {
              $log.info('Taxonomy setTaxonomyByIdAndType no taxonomy found');
            }
          });
        } else {
          $log.error('Taxonomy setTaxonomyByIdAndType needs a valid id number');
        }
      };

      /**
       * Returns the current setted product data
       * @returns {Array}
       */
      this.getTaxonomyByIdAndType = function (taxonomyId, type) {
        return this.setTaxonomyByIdAndType(taxonomyId, type).then(function (taxonomy) {
          return taxonomy;
        });
      };

      /**
       * Restore function used if the browser was reloaded. Try to allocate the last selected taxonomies
       * @param selectedTaxonomies
       */
      this.restore = function (selectedTaxonomies) {

        this.isTaxonomyServiceLoaded().then(function () {
          angular.forEach(selectedTaxonomies, function (value, key) {
            _self.getTaxonomyByIdAndType(value.id, value.type).then(function (taxonomy) {
              taxonomy.setSelected(1);
            });
          });
          // @todo must wait the products to load before performing an update
          _self.updateService();
        });
      };

    };

module.exports = dependencies.concat(TaxonomyService);

'use strict';

var dependencies = [ '$log', '$rootScope', 'HelperService' ],
    TaxonomyFactory = function($log, $rootScope, HelperService) {

      var validTypes = ['tag', 'category'];

      var TaxonomyFactory = function (id, type, name, slug, selected) {
        this.setId(id);
        this.setType(type);
        this.setName(name);
        this.setSlug(slug);
        this.setSelected(selected);
      };

      TaxonomyFactory.prototype.setId = function (id) {
        // parse and always make sure that we are dealing with an integer
        id = parseInt(id);

        // negative for is not a number (so its a number)
        if (!isNaN(id)) {
          this._id = id;
        } else {
          $log.error('Taxonomy must have a id valid number');
        }
      };

      TaxonomyFactory.prototype.getId = function () {
        return this._id;
      };

      TaxonomyFactory.prototype.setSelected = function (boolean) {
        boolean ? this._selected = 1 : this._selected = 0;
        $rootScope.$emit('selectedTaxonomies:change', {});
      };

      TaxonomyFactory.prototype.getSelected = function () {
        return this._selected;
      };

      /**
       * Just a wrapper for the quantity function since quantity automatically calls setSelected depending
       * on the value passed
       *
       * @param quantity
       * @returns {boolean}
       */
      TaxonomyFactory.prototype.toggleSelect = function () {

        if (this.getSelected()) {
          this.setSelected(0);
        } else {
          this.setSelected(1);
        }

        return true;
      };

      TaxonomyFactory.prototype.setType = function (type) {

        type = type || 'category';

        if (type) {
          if (HelperService.inArray(validTypes, type)) {
            this._type = type;
          } else {
            $log.error('Taxonomy must have a valid type: category or tag');
          }
        } else {
          $log.error('Taxonomy must have a type');
        }
      };

      TaxonomyFactory.prototype.getType = function () {
        return this._type;
      };

      TaxonomyFactory.prototype.setName = function (name) {
        if (name) {
          this._name = name;
        } else {
          $log.error('Taxonomy must have a name');
        }
      };

      TaxonomyFactory.prototype.getName = function () {
        return this._name;
      };

      TaxonomyFactory.prototype.setSlug = function (slug) {
        if (slug) {
          // @todo do some sanitization here
          this._slug = slug;
        } else {
          $log.error('Taxonomy must have a slug');
        }
      };

      TaxonomyFactory.prototype.getSlug = function () {
        return this._slug;
      };

      return TaxonomyFactory;
    };

module.exports = dependencies.concat(TaxonomyFactory);

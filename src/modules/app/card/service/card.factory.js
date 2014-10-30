'use strict';

var dependencies = [ '$log', 'HelperService' ],
    CardFactory = function($log, HelperService) {

      var CardFactory = function (id, name, discount, applied, pointsLimit, image) {
        this.setId(id);
        this.setName(name);
        this.setDiscount(discount);
        this.setSelected(applied);
        this.setPointsLimit(pointsLimit);
        this.setImage(image);
      };

      CardFactory.prototype.setId = function (id) {
        // negative for is not a number (so its a number)
        if (id = HelperService.isInt(id)) {
          this._id = id;
        } else {
          $log.error('Card id must be a valid number')
        }
      };

      CardFactory.prototype.getId = function () {
        return this._id;
      };

      CardFactory.prototype.setName = function (name) {
        if (name) {
          this._name = name;
        } else {
          $log.error('A name must be provided');
        }
      };

      CardFactory.prototype.getName = function () {
        return this._name;
      };

      CardFactory.prototype.setDiscount = function (discount) {
        if (discount = HelperService.isFloat(discount)) {
          if (discount >= 0) {
            this._discount = {
              'decimal': (discount),
              'percent': (discount * 100)
            };
          } else {
            $log.error('A discount must be equal or higher than 0')
          }
        } else {
          $log.error('Card discount must be a valid number');
        }
      };

      CardFactory.prototype.getDiscount = function () {
        return this._discount;
      };

      CardFactory.prototype.setImage = function (image) {
        // validate the image here
        // must not be empty
        // must be a valid url
        // must be in jpeg format and such things..
        this._image = image;
      };

      /**
       * Returns the current card representativa image
       * @returns {*}
       */
      CardFactory.prototype.getImage = function () {
        return this._image;
      };

      /**
       * Applied must accept two values only, 1 or 0 (bool from database) it represents if the card already was
       * used with a previous store. An applied card must not be available to use now
       *
       * @param boolean
       */
      CardFactory.prototype.setSelected = function (boolean) {
        boolean ? this._selected = 1 : this._selected = 0;
      };

      /**
       * Return if the card is available or not
       * @returns boolean
       */
      CardFactory.prototype.getSelected = function () {
        return this._selected;
      };


      /**
       * The points the player earned by inviting friend or acting in the site that can be applied in the card
       * can be applied or subtracted from the card using this method
       *
       * @param points
       * @param relative
       */
      CardFactory.prototype.setPoints = function (points, relative) {

        points = points || 0;
        relative = relative || false;

        points = parseInt(points);

        if (!relative) {
          // @todo validate if points are a valid integer
          if (points >= 0) {
            this._points = points;
          } else {
            $log.error('Card point must be 0 or higher');
          }
        } else {
          // incremental/decremental values
          var tempPoints = this._points += points;
          if (tempPoints >= 0 && tempPoints <= this._pointsLimit) {
            do {
              this._points += points;
            }
            while (this._points >= 0 && this._points <= this._pointsLimit);
          } else {
            $log.error('Card points cannot exceed the limit');
          }
        }
      };

      /**
       * Returns the current ammount of points current applied to the card
       */
      CardFactory.prototype.getCurrentPoints = function () {
        return this._points;
      };


      /**
       * Set the limit of points this card can receive
       * @param points
       */
      CardFactory.prototype.setPointsLimit = function (points) {

        points = parseInt(points);

        // @todo validate if points are a valid integer
        if (points) {
          if (points <= 0) {
            $log.error('Limit points must be higher than 0');
          } else {
            this._pointsLimit = points;
          }
        } else {
          $log.error('A limit of points must be provided to the card');
        }
      };


      /**
       * The total ammount of points that can be applied to the cart
       */
      CardFactory.prototype.getPointsLimit = function () {
        return this._pointsLimit;
      };

      return CardFactory;
    };

module.exports = dependencies.concat(CardFactory);

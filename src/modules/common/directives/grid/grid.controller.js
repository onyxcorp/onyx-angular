
'use strict';

var dependencies = [ '$window', "$timeout" ],
    GridCtrl = function($window, $timeout) {

      var _current,
          _blocks;

      var _defaults = {
        margin : 15,
        windowWidth : $window.offsetWidth,
        colWidth  : 200,
        colCount : 0
      };

      this.getBlocks = function() {
        return _blocks;
      };

      this.getMargin = function() {
        return _current.margin;
      };

      this.setNewBlockIndex = function(index, value) {
        _blocks[index] = value;
      };

      this.setWidth = function(width) {
        _current.colWidth = width;
      };

      this.reload = function() {

        _current = [];
        _blocks = [];
        _blocks.length = 0;
        _current.length = 0;
        angular.extend(_current, _defaults);

        _current.windowWidth = $window.innerWidth;

        // decide the number of columns based on current view size
        _current.colCount = Math.floor(_current.windowWidth/(_current.colWidth + _current.margin));

        for(var i=0; i < _current.colCount; i++) {
          _blocks.push(_defaults.margin);
        }

        // step 2
        // add columns properties into the columns object above
        // perform a loop based on the current available columns


        // step 3
        // schedule the grid for a update only if there is no update running
        // in order to avoid major problems schedule updates once in 30 ms

      };

      this.reload();


      // @todo untested
      this.updateDefaults = function(options) {

        var newOptions = {};
        angular.forEach(options, function(value, key) {
          // check if the key exists in the original default options
          if(_defaults[key]) {
            // check if the data passed is the same type of the one in the default options
            if(typeof _defaults[key] === typeof value) {
              this[key] = value;
            }
          }
        }, newOptions);

        angular.extend(newOptions, _defaults);

      };

    };

module.exports = dependencies.concat(GridCtrl);

'use strict';

var angular = require('angular');
var Tether = require('tether');
//var isDef = angular.isDefined;
//var style = (document.body || document.documentElement).style;

var tetherJs = function() {

  /**
   * Those are the Tether.js options, more info at http://github.hubspot.com/tether/
   * @type {{
             * element: null,
             * leaveOnBlur: boolean,
             * attachment: string,
             * targetAttachment: string,
             * plain: boolean,
             * template: null,
             * templateUrl: null,
             * offset: string,
             * targetOffset: string,
             * classPrefix: string,
             * constraints: {
             *  to: string,
             *  attachment: string,
             *  pin: boolean
             *  }[]}}
   */
  var defaults = this.defaults = {
    element: null,
    leaveOnBlur: true,
    attachment: 'top center',
    targetAttachment: 'bottom center',
    plain : false,
    template : null,
    templateUrl : null,
    offset: '0 0',
    targetOffset: '0 0',
    classPrefix: 'tether',
    constraints: [{
      to: 'window',
      attachment: 'together',
      pin: true
    }]
  };

  var globalID = 0,    // global unique id
      tethers = {};   // keep track of all tether objects currently available

  /**
   * Allow to change the default options from the .config() method, will be applied globally
   * @param newDefaults
   */
  this.setDefaults = function (newDefaults) {
    angular.extend(defaults, newDefaults);
  };

  /**
   * The $get method from this provider (the Service), all logic inside..
   * @type {*[]}
   */
  this.$get = ['$document', '$templateRequest', '$templateCache', '$compile', '$q', '$rootScope', '$timeout', '$controller', '$animate',
    function ($document, $templateRequest, $templateCache, $compile, $q, $rootScope, $timeout, $controller, $animate) {

      // @todo dunno if it isn't best to use another pattern, the new fcName() one is more for instantiable objects, not singletons
      // @todo also multiple tethers should be available at once in the same page
      var _self,
        _tether,
        $body,
        element,
        options;

      function TetherJS() {
        _self = this;
        element = null;
        $body = $document.find('body');
        options = angular.copy(defaults);
      }

      /**
       * Just toggle
       * @param opts
       */
      TetherJS.prototype.toggle = function(opts) {
        if(element) {
          _self.leave();
        } else {
          _self.open(opts);
        }
      };


      /**
       * Open the tether, accept all the avaialble options
       * @param opts
       */
      TetherJS.prototype.open = function(opts) {

        // override default options
        opts = opts || {};
        angular.extend(options, opts);

        // set a unique id
        globalID += 1;

        // check the current scope, if there is none, let's create one from the $rootScope
        var scope = angular.isObject(options.scope) ? options.scope.$new() : $rootScope.$new();

        // load external templates and save it on the $templateCache automagically through the $templateRequest object
        function loadTemplate(tmpl) {

          var template;

          if (angular.isString(tmpl) && options.plain) {
            template = tmpl;
          } else if(!(template = $templateCache.get(tmpl))) {
            template = $templateRequest(tmpl);
          }

          return $q.when(template);
        }

        // async loading template..
        loadTemplate(options.template || options.templateUrl).then(function(html) {

          // we are currently wrapping the element in a div to avoid positioning problems that
          // were hapenning when we were animating the root element
          // also we need to set it's z-index to avoid problems with elements like angular-material
          element = angular.element('<div id="tether'+ globalID +'" style="z-index:3" class="animated tether"></div>');
          element.html(html.trim());

          // controller and controllerAs default logic
          if (options.controller && (angular.isString(options.controller) || angular.isArray(options.controller) || angular.isFunction(options.controller))) {

            var controllerInstance = $controller(options.controller, {
              $scope: scope
            });

            if (options.controllerAs && (angular.isString(options.controllerAs))) {
              scope[options.controllerAs] = controllerInstance;
            }
          }

          // compile is the act of walking the dom tree and match DOM elements with Directives
          // here we are executing all possible directives that exists in the layout passed and
          // also associating the controller and the scope with the element (the angular default stuff)
          $compile(element)(scope);

          $timeout(function () {

            if(!element) {
              return;
            }

            $animate.enter(element, $body);

            // get the compiled template and pass it to tether, all controller and directives are alredy binded by now
            options.element = element[0];
            _tether = new Tether(options);

            // positioning tether
            _tether.position();

            // if we are using the leaveOnBlur option, append the event to the $body element
            if(options.leaveOnBlur) {
              $body.on('click touchend', _self.leaveOnBlur);
            }
          });
        });
      };

      /**
       * Simple check if _tether is enabled or not
       * @todo we must allow for multiple tethers opened at once
       * @returns {*}
       */
      TetherJS.prototype.isActive = function() {
        return _tether && _tether.enabled;
      };

      TetherJS.prototype.leaveOnBlur = function(evt) {

        var target = evt.target;

        // se nao existir o elemento ou se o evento foi o proprio element we do nothing
        if (!element || target === element[0]) {
          return;
        }

        while (target.parentElement !== null) {
          // basicamente o parent de onde clicamos é o element que inserimos, fazer nada e sair
          if (target.parentElement == element[0]) {
            return;
          }
          // the parentElement is another element, so we set it to the current target (the parent where we clicked)
          // @todo why we can just do nothing? everytime leaveOnBlur is called a new var target is created anyway..
          target = target.parentElement;
        }
        // if we got here we should close the dialog
        return _self.leave();
      };

      /**
       * Leave tether and remove all references it might have in the page, also clear the DOM
       * from all event binding
       *
       * @returns {boolean}
       */
      TetherJS.prototype.leave = function() {

        // if there is no element or there is no actie tether, return false
        if (!element || !_self.isActive()) {
          return false;
        }

        // unbind what our service might have binded in the body
        if(options.leaveOnBlur) {
          $body.off('click touchend', _self.leaveOnBlur);
        }

        // send tether to oblivion!
        _tether.destroy();

        // sem o timeout o $animate.leave() não funciona.. no idea do porque.
        $timeout(function () {

          // perform $animate leave with callback (angular 1.3+ only)
          $animate.leave(element[0]).then(function() {

            // erase element and all its remains from history
            // the scope is automagically destroyed inside remove() - it calls the $destroy method implicitly
            element.remove();

            // nullify!
            element = null;
          });
        });
      };

      // @todo change for other factory type function
      return new TetherJS();
  }];

};

module.exports = tetherJs;

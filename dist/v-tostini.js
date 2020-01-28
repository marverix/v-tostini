"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/* v-tostini v1.1.0 | (c) Marek Sierociński | https://github.com/marverix/v-tostini/blob/master/LICENSE.md */
(function (global, factory) {
  (typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) : typeof define === 'function' && define.amd ? define(['vue'], factory) : global['v-tostini'] = factory(global.vue);
})(void 0, function (Vue) {
  'use strict';

  Vue = Vue && Vue.hasOwnProperty('default') ? Vue['default'] : Vue;
  /**
   * Bus
   *
   * Use it to communicate between some Vue instances/components and Tostini Component
   */

  var bus = new Vue();
  /**
   * Component
   *
   * Here will appear all delicious tostinis (or something else :) )
   */

  var component = {
    name: 'tostini-plate',
    data: function data() {
      return {
        tostinis: []
      };
    },
    methods: {
      /**
       * Add
       * @private
       */
      _add: function _add(config) {
        this.tostinis.push(config);

        this._setTimer(config);
      },

      /**
       * Remove
       * @private
       */
      _remove: function _remove(id) {
        var idx = this.tostinis.findIndex(function (tostini) {
          return tostini.id === id;
        });
        this.tostinis.splice(idx, 1);
      },

      /**
       * Set timer
       * @private
       */
      _setTimer: function _setTimer(config) {
        var _this = this;

        setTimeout(function (id) {
          _this._remove(id);
        }, config.duration, config.id);
      },

      /**
       * Bake
       */
      bake: function bake(config) {
        var _config = Object.assign({
          id: Date.now()
        }, config);

        this._add(_config);
      }
    },
    mounted: function mounted() {
      bus.$on('tostini-bake', this.bake);
    },
    render: function render(h) {
      return h('div', {
        class: 'tostini-plate'
      }, this.tostinis.map(function (tostini) {
        var domProps = {};
        domProps[tostini.html ? 'innerHTML' : 'innerText'] = tostini.message;
        return h('div', {
          class: 'tostini',
          attrs: {
            'data-type': tostini.type
          },
          domProps: domProps
        });
      }));
    }
  };
  /**
   * Bake
   */

  function bake(config) {
    // Handling config as string
    if (typeof config === 'string') {
      config = {
        message: config
      };
    } // Calculate duration


    if (config.duration == null) {
      config.duration = Math.max(2000, 1000 * config.message.length / 12.84 + 400);
    } // Type


    if (config.type == null) {
      config.type = 'default';
    } // HTML support?


    config.html = !!config.html; // Emit

    bus.$emit('tostini-bake', config);
  }
  /**
   * Plugin
   *
   * Definition of plugin itself
   */


  var plugin = {
    install: function install(Vue$$1) {
      // Define component
      Vue$$1.component(component.name, component); // Extend Vue prototype

      Vue$$1.prototype.$tostini = bake;
    }
  };
  return plugin;
});

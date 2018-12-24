/* v-tostini v1.0.0 | (c) Marek Sierociński | https://github.com/marverix/v-tostini/blob/master/LICENSE.md */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global['v-tostini'] = factory(global.vue));
}(this, (function (Vue) { 'use strict';

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
  const component = {
    name: 'tostini-plate',

    template: '\
<div class="tostini-plate">\
  <div v-for="tostini in tostinis"\
       class="tostini"\
       :data-type="tostini.type">{{ tostini.message }}</div>\
</div>\
',

    data: function() {
      return {
        tostinis: []
      };
    },

    methods: {
      /**
       * Add
       * @private
       */
      _add: function(config) {
        this.tostinis.push(config);
        this._setTimer(config);
      },

      /**
       * Remove
       * @private
       */
      _remove: function(id) {
        var idx = this.tostinis.findIndex((tostini) => tostini.id === id);
        this.tostinis.splice(idx, 1);
      },

      /**
       * Set timer
       * @private
       */
      _setTimer: function(config) {
        var that = this;
        setTimeout(function(id) {
          that._remove(id);
        }, config.duration, config.id);
      },

      /**
       * Bake
       */
      bake: function(config) {
        var _config = Object.assign({
          id: Date.now()
        }, config);
        this._add(_config);
      }
    },

    mounted: function() {
      bus.$on('tostini-bake', this.bake);
    }
  };

  /**
   * Bake
   */
  function bake(config) {
    // Handling config as string
    if(typeof config === 'string') {
      config = {
        message: config
      };
    }
    
    // Calculate duration
    if(config.duration == null) {
      config.duration = Math.max(2000, 1000 * config.message.length / 12.84 + 400);
    }
    
    // Type
    if(config.type == null) {
      config.type = 'default';
    }
    
    // Emit
    bus.$emit('tostini-bake', config);
  }

  /**
   * Plugin
   * 
   * Definition of plugin itself
   */
  const plugin = {
    install: function(Vue$$1) {
      // Define component
      Vue$$1.component(component.name, component);

      // Extend Vue prototype
      Vue$$1.prototype.$tostini = bake;
    }
  };

  return plugin;

})));

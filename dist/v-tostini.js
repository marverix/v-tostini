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
  const bus = new Vue();

  /**
   * Component
   *
   * Here will appear all delicious tostinis (or something else :) )
   */
  const component = {
    name: 'tostini-plate',

    data() {
      return {
        tostinis: []
      };
    },

    methods: {
      /**
       * Add
       * @private
       */
      _add(config) {
        this.tostinis.push(config);
        this._setTimer(config);
      },

      /**
       * Remove
       * @private
       */
      _remove(id) {
        const idx = this.tostinis.findIndex(tostini => tostini.id === id);
        this.tostinis.splice(idx, 1);
      },

      /**
       * Set timer
       * @private
       */
      _setTimer(config) {
        setTimeout(
          id => {
            this._remove(id);
          },
          config.duration,
          config.id
        );
      },

      /**
       * Bake
       */
      bake(config) {
        const _config = Object.assign(
          {
            id: Date.now()
          },
          config
        );
        this._add(_config);
      }
    },

    mounted() {
      bus.$on('tostini-bake', this.bake);
    },

    render(h) {
      return h(
        'div',
        {
          class: 'tostini-plate'
        },
        this.tostinis.map( (tostini) => {
          const domProps = {};
          domProps[tostini.html ? 'innerHTML' : 'innerText'] = tostini.message;

          return h(
            'div',
            {
              class: 'tostini',
              attrs: {
                'data-type': tostini.type
              },
              domProps
            }
          );
        })
      );
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
    }

    // Calculate duration
    if (config.duration == null) {
      config.duration = Math.max(
        2000,
        (1000 * config.message.length) / 12.84 + 400
      );
    }

    // Type
    if (config.type == null) {
      config.type = 'default';
    }

    // HTML support?
    config.html = !!config.html;

    // Emit
    bus.$emit('tostini-bake', config);
  }

  /**
   * Plugin
   *
   * Definition of plugin itself
   */
  const plugin = {
    install(Vue$$1) {
      // Define component
      Vue$$1.component(component.name, component);

      // Extend Vue prototype
      Vue$$1.prototype.$tostini = bake;
    }
  };

  return plugin;

})));

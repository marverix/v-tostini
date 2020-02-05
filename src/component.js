import bus from './bus';

/**
 * Component
 *
 * Here will appear all delicious tostinis (or something else :) )
 */
const component = {
  name: 'tostini-plate',

  props: {
    transitionName: {
      type: String
    }
  },

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
      'transition-group',
      {
        class: 'tostini-plate',
        props: {
          name: this.transitionName,
          tag: 'div'
        }
      },
      this.tostinis.map(({ type, message, html }, index) => {
        return this.$scopedSlots.default
          ? this.$scopedSlots.default({ type, message })
          : h(
            'div',
            {
              class: 'tostini',
              key: index,
              attrs: {
                'data-type': type
              },
              domProps: {
                [html ? 'innerHTML' : 'innerText']: message
              }
            }
          );
      })
    );
  }
};

export default component;

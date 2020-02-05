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
    const { default: slot } = this.$scopedSlots;

    return h(
      'transition-group',
      {
        class: 'tostini-plate',
        props: {
          name: this.transitionName,
          tag: 'div'
        }
      },
      this.tostinis.map(({ id, type, message, html }) => {
        return h(
          'div',
          {
            class: 'tostini',
            key: id,
            attrs: {
              'data-type': type
            },
            domProps: !slot && {
              [html ? 'innerHTML' : 'innerText']: message
            }
          },
          slot && slot({
            type,
            message,
            html,
            close: () => this._remove(id)
          })
        );
      })
    );
  }
};

export default component;

import bus from './bus';

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

export default component;

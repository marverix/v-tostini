define([], () => {
  return {
    template: `
    <form id="app">
      <!-- write some test message input -->
      <input type="text" v-model="message">

      <!-- select type of message
      note: this muse be valid with given CSS-->
      <select v-model="type">
        <option>default</option>
        <option>success</option>
        <option>error</option>
        <option>warning</option>
        <option>info</option>
      </select>

      <!-- select duration -->
      <select v-model="duration">
        <option value>auto</option>
        <option value="500">0.5s</option>
        <option value="1000">1s</option>
        <option value="2000">2s</option>
        <option value="4000">4s</option>
        <option value="8000">8s</option>
        <option value="16000">16s</option>
        <option value="32000">32s</option>
      </select>

      <!-- html support -->
      <select v-model="html">
        <option value="0">html off</option>
        <option value="1">html on</option>
      </select>

      <!-- check if it works! -->
      <input type="submit" value="Test" @click="test">

      <!-- this will show toasts -->
      <tostini-plate></tostini-plate>
    </form>
    `,

    data: () => {
      return {
        message: 'Lorem Ipsum',
        type: 'default',
        duration: '',
        html: '0'
      };
    },

    methods: {
      test: function (e) {
        e.preventDefault();

        this.$tostini({
          message: this.message,
          duration: this.duration.length ? parseInt(this.duration) : null,
          type: this.type,
          html: this.html === '1'
        });
      }
    }
  };
});

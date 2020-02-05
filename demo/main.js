require.config({
  paths: {
    vue: 'https://cdn.jsdelivr.net/npm/vue@2.6.11/dist/vue.min',
    vTostini: '../dist/v-tostini'
  }
});

requirejs([
  'vue', 'vTostini', 'Demo'
], (
  Vue, vTostini, Demo
) => {
  Vue.config.productionTip = false;
  Vue.use(vTostini);

  new Vue({
    render: h => h(Demo)
  }).$mount('#demo');

  return;
});

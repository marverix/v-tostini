import component from './component';
import bake from './bake';

/**
 * Plugin
 *
 * Definition of plugin itself
 */
const plugin = {
  install(Vue) {
    // Define component
    Vue.component(component.name, component);

    // Extend Vue prototype
    Vue.prototype.$tostini = bake;
  }
};

export default plugin;

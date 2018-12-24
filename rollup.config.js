// Imports
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import uglify from 'rollup-plugin-uglify';

import $package from './package.json';

var externals = Object.keys($package.dependencies || []);
var globals = {};

for(let ext of externals) {
  globals[ext] = ext;
}

// Common
var config = {
  input: 'src/index.js',

  output: {
    file: 'dist/v-tostini',
    format: 'umd',
    name: 'v-tostini',
    banner: `/* v-tostini v${$package.version} ` +
            '| (c) Marek Sierociński ' +
            '| https://github.com/marverix/v-tostini/blob/master/LICENSE.md ' +
            '*/',
    globals: globals
  },

  extensions: ['.js'],
  external: externals
};

var input = config.input;

var output = function(min) {
  return {
    file: config.output.file + (min ? '.min' : '') + '.js',
    format: config.output.format,
    name:  config.output.name,
    banner: config.output.banner,
    globals: config.output.globals
  };
};

var plugins = [
  nodeResolve({
    extensions: config.extensions
  }),
  commonjs({
    extensions: config.extensions
  })
];

var external = config.external;

// Export
export default [
  // Uncompressed config
  {
    input,
    output: output(),
    plugins,
    external
  },

  // Compressed config
  {
    input,
    output: output(true),
    plugins: plugins.concat([
      uglify({
        output: {
          comments: /license/i
        }
      })
    ]),
    external
  }
];

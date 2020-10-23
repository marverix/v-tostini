import cjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';

import $package from './package.json';

const input = 'src/index.js';
const external = Object.keys($package.dependencies || []);
const globals = {};

for(let ext of external) {
  globals[ext] = ext;
}

var output = function(min) {
  return {
    file: `dist/v-tostini${(min ? '.min' : '')}.js`,
    format: 'umd',
    name: 'v-tostini',
    banner: `/* v-tostini v${$package.version} ` +
            '| (c) Marek Sierociński and contributors ' +
            '| https://github.com/marverix/v-tostini/blob/master/LICENSE.md ' +
            '*/',
    globals
  };
};

var plugins = [
  cjs(),
  resolve(),
  babel({
    exclude: [/\/core-js\//],
    presets: [
      [
        '@babel/env',
        {
          targets: '> 2%, Firefox ESR, ie 11, safari 9',
          useBuiltIns: 'usage',
          corejs: 3,
          modules: false
        }
      ]
    ],
    babelHelpers: 'bundled'
  })
];

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
      terser({
        output: {
          comments: /license/i
        }
      })
    ]),
    external
  }
];

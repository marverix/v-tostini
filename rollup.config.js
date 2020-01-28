'use strict';

import 'finka';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

import $package from './package.json';

const external = Object.keys($package.dependencies || []);
const globals = {};

for(const ext of external) {
  globals[ext] = ext;
}

// Common
const config = {
  common: {
    input: 'src/index.js',
    output: {
      file: 'dist/v-tostini.js',
      format: 'umd',
      name: 'v-tostini',
      banner: `/* v-tostini v${$package.version} ` +
              '| (c) Marek Sierociński and contributors ' +
              '| https://github.com/marverix/v-tostini/blob/master/LICENSE.md ' +
              '*/',
      globals
    },
    external
  },

  uncompressed: undefined,
  compressed: undefined,

  extensions: ['.js'],
};

const plugins = [
  resolve({
    extensions: config.extensions
  }),
  babel({
    exclude: 'node_modules/**',
    presets: [
      [
        '@babel/env',
        {
          modules: false,
          targets: {
            browsers: '> 2%, IE 11, Safari 9, not dead',
            node: 8
          },
          useBuiltIns: 'usage',
          corejs: 2
        }
      ]
    ]
  }),
  commonjs({
    extensions: config.extensions
  })
];

// Uncompressed
config.uncompressed = Object.deepAssign({
  output: {},
  plugins: plugins.clone()
}, config.common);

// Compressed
config.compressed = Object.deepAssign({
  output: {},
  plugins: plugins.clone()
}, config.common);
config.compressed.output.file = config.compressed.output.file.replace(/\.js$/, '.min.js');
config.compressed.plugins.push(
  uglify({
    output: {
      comments: (node, comment) => {
        if (comment.type === 'comment2') {
          // multiline comment
          return /LICENSE|\(c\)/.test(comment.value);
        }
        return false;
      }
    }
  })
);

// Export
export default [
  config.uncompressed,
  config.compressed
];

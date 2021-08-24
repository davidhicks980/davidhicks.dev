import commonjs from '@rollup/plugin-commonjs';
import replace from '@rollup/plugin-replace';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import { terser } from 'rollup-plugin-terser';

export default {
  input: './src/polyfills.ts',
  output: {
    file: './src/polyfills.js',
    format: 'iife',
  },
  plugins: [
    // babel({ babelHelpers: 'bundled', exclude: 'node_modules/**/*' }),
    typescript({
      outDir: './src/',
    }),
    commonjs(),
    resolve(),
    injectProcessEnv({
      NODE_ENV: 'production',
    }),
    terser({
      output: {
        comments: false,
      },
      compress: true,
      mangle: true,
    }),
    replace({ 'Reflect.decorate': 'undefined' }),
  ],
};

// @ts-nocheck
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import watchAssets from 'rollup-plugin-watch-assets';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import serve from 'rollup-plugin-serve';
import json from '@rollup/plugin-json';

const copyConfig = {
  targets: [
    { src: 'node_modules/@webcomponents', dest: 'dist/node_modules' },
    { src: 'src/assets/', dest: 'dist' },
    { src: 'src/index.html', dest: 'dist' },
    { src: 'src/icons', dest: 'dist' },
  ],
};
process.env.NODE_ENV = 'dev';
export default {
  input: './src/components.ts',
  output: {
    dir: 'dist',
    format: 'es',
    module: true,
  },
  watch: {
    include: 'src/**',
    chokidar: true,
  },
  onwarn(warning) {
    if (warning.code !== 'THIS_IS_UNDEFINED') {
      //console.error(`(!) ${warning.message}`);
    }
  },
  preserveEntrySignatures: true,
  plugins: [
    // babel({ babelHelpers: 'bundled', exclude: 'node_modules/**/*' }),
    json(),
    typescript(),

    copy(copyConfig),
    commonjs(),
    resolve(),
    watchAssets({ assets: ['src/index.html'] }),
    injectProcessEnv({
      NODE_ENV: 'development',
    }),
    replace({ 'Reflect.decorate': 'undefined' }),
    serve({ openPage: './dist/index.html' }),
  ],
};

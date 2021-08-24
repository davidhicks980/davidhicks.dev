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
import { copyConfig } from './rollup.variables';
process.env.NODE_ENV = 'dev';
export default [
  {
    input: './src/components.ts',
    output: {
      dir: 'dist',
      format: 'iife',
      //module: true,
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
    preserveEntrySignatures: 'strict',
    plugins: [
      // babel({ babelHelpers: 'bundled', exclude: 'node_modules/**/*' }),
      typescript({
        outDir: './dist/',
        incremental: true,
        tsBuildInfoFile: './dist/out',
      }),
      copy(copyConfig('dist')),
      commonjs(),
      resolve(),
      watchAssets({ assets: ['src/index.html'] }),
      injectProcessEnv({
        NODE_ENV: 'development',
      }),
      replace({ 'Reflect.decorate': 'undefined' }),
      serve({ openPage: './dist/index.html' }),
    ],
  },
];

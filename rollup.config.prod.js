// @ts-nocheck
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import watchAssets from 'rollup-plugin-watch-assets';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import { copyConfig } from './rollup.variables';
process.env.NODE_ENV = 'production';
export default {
  input: './src/components.ts',
  output: {
    dir: `./public`,
    format: 'iife',
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
    typescript({
      outDir: './public/',
      removeComments: true,
      tsBuildInfoFile: './public/.cache',
      incremental: true,
    }),
    copy(copyConfig('public')),
    commonjs(),
    resolve(),
    watchAssets({ assets: ['src/index.html'] }),
    injectProcessEnv({
      NODE_ENV: 'production',
    }),
    replace({ 'Reflect.decorate': 'undefined' }),
    terser({
      output: {
        comments: false,
      },
      //compress: true,
      // mangle: true,
    }),
    serve({ port: '3333', watch: true }),
  ],
};

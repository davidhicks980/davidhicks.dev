// @ts-nocheck
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import watchAssets from 'rollup-plugin-watch-assets';
import injectProcessEnv from 'rollup-plugin-inject-process-env';
import serve from 'rollup-plugin-serve';
//import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

const mode = 'production';
const folder = mode === 'production' ? 'public' : 'dist';
const copyConfig = {
  targets: [
    { src: 'src/assets/', dest: folder },
    { src: 'src/index.html', dest: folder },
    { src: 'src/icons', dest: folder },
    { src: 'src/icons', dest: folder + '/assets' },
  ],
};
process.env.NODE_ENV = 'dev';
export default {
  input: './src/components.ts',
  output: {
    dir: `./${folder}`,
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
  preserveEntrySignatures: 'strict',
  plugins: [
    typescript({
      outDir: './public/',
      incremental: false,
    }),
    copy(copyConfig),
    commonjs(),
    //babel({ babelHelpers: 'bundled', exclude: 'node_modules/**/*' }),
    resolve(),
    watchAssets({ assets: ['src/index.html'] }),
    injectProcessEnv({
      NODE_ENV: mode,
    }),
    replace({ 'Reflect.decorate': 'undefined' }),
    terser({
      output: {
        comments: false,
      },
      compress: true,
      mangle: true,
    }),
    serve(),
  ],
};

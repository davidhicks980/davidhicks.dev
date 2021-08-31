import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import html from '@web/rollup-plugin-html';
import serve from 'rollup-plugin-serve';
import { copyConfig } from './rollup.variables';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import polyfillsLoader from '@web/rollup-plugin-polyfills-loader';
import litcss from 'rollup-plugin-lit-css';
import styles from 'rollup-plugin-styles';
process.env.NODE_ENV = 'production';
const devMode = process.env.NODE_ENV === 'development';
export default {
  preserveEntrySignatures: 'strict',
  onwarn() {
    return null;
  },
  plugins: [
    copy(copyConfig('public')),
    html({
      input: 'index.html',
      minify: !devMode,
      transformHtml: [
        (html) =>
          html
            .replace(
              '<!--Asset Tag-->',
              devMode ? '<link rel="stylesheet" href="./main.prod.css" />' : ''
            )
            .replace(
              '<!--AppCheck Debug-->',
              devMode
                ? '<script>self.FIREBASE_APPCHECK_DEBUG_TOKEN = true;</script>'
                : ''
            ),
      ],
    }),
    commonjs(),
    resolve(),

    devMode ? null : minifyHTML(),
    devMode
      ? null
      : terser({
          compress: true,
          mangle: {
            reserved: ['data'],
          },
          safari10: true,
          module: true,
          output: {
            comments: false,
          },
        }),
    replace({ 'Reflect.decorate': 'undefined' }),
    devMode
      ? null
      : polyfillsLoader({
          polyfills: {
            hash: false,
            coreJs: true,
            regeneratorRuntime: true,
            fetch: true,
            webcomponents: true,
            intersectionObserver: true,
            resizeObserver: true,
            esModuleShims: true,
            abortController: true,
            dynamicImport: true,
            // Custom configuration for loading Lit's polyfill-support module,
            // required for interfacing with the webcomponents polyfills
            custom: [
              {
                name: 'lit-polyfill-support',
                path: 'node_modules/lit/polyfill-support.js',
                test: "!('attachShadow' in Element.prototype)",
              },
            ],
          },
          minify: true,
        }),
    serve({ openPage: './public/index.html' }),
  ],
  output: {
    format: 'esm',
    dir: './public',
  },
};

import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import copy from 'rollup-plugin-copy';
import html from '@web/rollup-plugin-html';
import serve from 'rollup-plugin-serve';
import { copyConfig } from './rollup.variables';
import minifyHTML from 'rollup-plugin-minify-html-literals';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';

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
          html.replace(
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
          ecma: 2020,
          output: {
            comments: false,
          },
        }),
    replace({ 'Reflect.decorate': 'undefined' }),
    serve({ openPage: './public/index.html' }),
  ],
  output: { dir: 'public', format: 'esm' },
};

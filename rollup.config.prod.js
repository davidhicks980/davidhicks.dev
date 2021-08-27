import polyfillsLoader from '@web/rollup-plugin-polyfills-loader';
import resolve from '@rollup/plugin-node-resolve';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import html from '@web/rollup-plugin-html';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';
import minifyHTML from 'rollup-plugin-minify-html-literals';

// Configure an instance of @web/rollup-plugin-html
const htmlPlugin = html({
  rootDir: './',
  flattenOutput: false,
});

export default {
  input: './index.html',
  output: [
    {
      // Modern JS bundles (no JS compilation, ES module output)
      format: 'esm',
      chunkFileNames: '[name].js',
      entryFileNames: '[name].js',
      dir: 'public',
      plugins: [htmlPlugin.api.addOutput('modern')],
    },
    {
      // Legacy JS bundles (ES5 compilation and SystemJS module output)
      format: 'esm',
      chunkFileNames: 'legacy-[name].js',
      entryFileNames: 'legacy-[name].js',
      dir: 'public',
      plugins: [
        htmlPlugin.api.addOutput('legacy'),
        // Uses babel to compile JS to ES5 and modules to SystemJS
        getBabelOutputPlugin({
          compact: true,
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  ie: '11',
                },
                modules: 'systemjs',
              },
            ],
          ],
        }),
      ],
    },
  ],
  preserveEntrySignatures: false,
  plugins: [
    htmlPlugin,
    // Resolve bare module specifiers to relative paths
    resolve(),
    // Minify HTML template literals
    minifyHTML(),
    // Minify JS
    terser({
      mangle: true,
      compress: true,
      output: {
        comments: false,
      },
    }),
    polyfillsLoader({
      // List of polyfills to inject (each has individual feature detection)
      polyfills: {
        hash: false,
        coreJs: true,
        regeneratorRuntime: true,
        fetch: true,
        webcomponents: true,
        intersectionObserver: true,
        resizeObserver: true,
        systemjs: true,
        systemjsExtended: true,
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
    }),

    serve({ port: 3333, openPage: './public/index.html' }),
  ],
};

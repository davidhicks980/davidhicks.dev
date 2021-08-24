export const copyConfig = (root) => {
  return {
    targets: [
      { src: 'src/assets/', dest: root },
      { src: 'src/index.html', dest: root },
      {
        src: 'node_modules/lit/polyfill-support.js',
        dest: root + '/polyfills',
      },
      {
        src: 'node_modules/@webcomponents/webcomponentsjs',
        dest: root + '/polyfills',
      },
      {
        src: 'src/polyfills.js',
        dest: root + '/polyfills',
      },
    ],
  };
};

export const copyConfig = (root) => {
  return {
    targets: [
      { src: 'src/assets/', dest: root },
      { src: 'src/index.html', dest: root },
      { src: 'src/icons', dest: root },
      { src: 'src/icons', dest: root + '/assets' },
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

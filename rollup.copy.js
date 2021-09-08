export const copyConfig = (root) => {
  return {
    targets: [
      { src: 'assets', dest: root },
      { src: 'index.html', dest: root },
      { src: 'dist/no-script.prod.css', dest: root + '/assets' },
      /*  {
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
      },*/
    ],
  };
};

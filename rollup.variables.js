export const copyConfig = (root) => {
  return {
    targets: [
      { src: 'assets', dest: root },
      { src: 'index.html', dest: root },
      { src: 'src/main.prod.css', dest: root },
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

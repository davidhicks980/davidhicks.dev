import { sassRender } from './lit-sass';
import chokidar = require('chokidar');
const options = {
  persistent: true,
  ignoreInitial: false,
};

const inst = chokidar.watch(
  ['src/**/*.component.scss', 'src/**/*.dev.scss'],
  options
);
inst.on('change', (path) => {
  sassRender(path, process.argv.includes('--dev ')).catch((err) => {
    console.log(err);
  });
});

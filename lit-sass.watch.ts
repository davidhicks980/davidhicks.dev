import { sassRender } from './lit--sass';
import chokidar = require('chokidar');
const options = {
  persistent: true,
  ignoreInitial: false,
};

const inst = chokidar.watch(['**/*.component.scss', '**/*.dev.scss'], options);
inst.on('change', (path) => {
  sassRender(path).catch((err) => {
    console.log(err);
  });
});

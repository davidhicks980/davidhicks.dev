import { sassRender } from './lit--sass';
import chokidar = require('chokidar');
const options = {
  persistent: true,
};

const inst = chokidar.watch('**/*.component.scss', options);
inst.on('ready', (path) => console.log('ready'));
inst.on('change', (path) => {
  console.log(path);
  sassRender(path).catch((err) => {
    // eslint-disable-next-line no-console
    console.error(err);
  });
});

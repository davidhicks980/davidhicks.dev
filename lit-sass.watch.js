'use strict';
exports.__esModule = true;
var lit__sass_1 = require('./lit--sass');
var chokidar = require('chokidar');
var options = {
  persistent: true,
};
var inst = chokidar.watch('**/*.component.scss', options);
inst.on('ready', function (path) {
  return console.log('ready', path);
});
inst.on('change', function (path) {
  lit__sass_1.sassRender(path)['catch'](function (err) {
    // eslint-disable-next-line no-console
  });
});

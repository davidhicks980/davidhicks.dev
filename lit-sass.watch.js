"use strict";
exports.__esModule = true;
var lit__sass_1 = require("./lit--sass");
var chokidar = require("chokidar");
var options = {
    persistent: true,
    ignoreInitial: false
};
var inst = chokidar.watch(['src/**/*.component.scss', 'src/**/*.dev.scss'], options);
inst.on('change', function (path) {
    lit__sass_1.sassRender(path, process.argv.includes('--dev '))["catch"](function (err) {
        console.log(err);
    });
});

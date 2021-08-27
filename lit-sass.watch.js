"use strict";
exports.__esModule = true;
var lit__sass_1 = require("./lit--sass");
var chokidar = require("chokidar");
var options = {
    persistent: true,
    ignoreInitial: false
};
var inst = chokidar.watch(['**/*.component.scss', '**/*.dev.scss'], options);
inst.on('change', function (path) {
    lit__sass_1.sassRender(path)["catch"](function (err) {
        console.log(err);
    });
});

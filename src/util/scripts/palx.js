"use strict";
exports.__esModule = true;
require('typescript-require');
var fs = require("fs");
var chroma = require("chroma-js");
var names = [
    'red',
    'orange',
    'yellow',
    'lime',
    'green',
    'teal',
    'cyan',
    'blue',
    'indigo',
    'violet',
    'fuschia',
    'pink',
    'red', // 360
];
var hueName = function (h) {
    var i = Math.round((h - 2) / 30);
    var name = names[i];
    return name;
};
var lums = [9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
    .map(function (n) { return n + 0.5; })
    .map(function (n) { return n / 10; });
var createArray = function (length) {
    var arr = [];
    for (var i = 0; i < length; i++) {
        arr.push(i);
    }
    return arr;
};
var createHues = function (length) {
    var hueStep = 360 / length;
    return function (base) {
        var hues = createArray(length).map(function (n) {
            return Math.floor((base + n * hueStep) % 360);
        });
        return hues;
    };
};
var desat = function (n) { return function (hex) {
    var _a = chroma(hex).hsl(), h = _a[0], s = _a[1], l = _a[2];
    return chroma.hsl(h, n, l).hex();
}; };
var createBlack = function (hex) {
    var d = desat(1 / 8)(hex);
    return chroma(d).luminance(0.05).hex();
};
var createShades = function (hex) {
    return lums.map(function (lum) {
        return chroma(hex).luminance(lum).hex();
    });
};
// Mappers
var keyword = function (hex) {
    var _a = chroma(hex).hsl(), hue = _a[0], sat = _a[1];
    if (sat < 0.5) {
        return 'gray';
    }
    var name = hueName(hue);
    return name;
};
// Reducer
var toObj = function (a, color) {
    var key = a[color.key] ? color.key + '2' : color.key;
    a[key] = color.value;
    return a;
};
var palx = function (hex, options) {
    if (options === void 0) { options = {}; }
    var color = chroma(hex);
    var colors = [];
    var _a = color.hsl(), hue = _a[0], sat = _a[1], lte = _a[2];
    var hues = createHues(12)(hue);
    colors.push({
        key: 'black',
        value: createBlack('' + color.hex())
    });
    colors.push({
        key: 'gray',
        value: createShades(desat(1 / 8)('' + color.hex()))
    });
    hues.forEach(function (h) {
        var c = chroma.hsl(h, sat, lte);
        var key = keyword(c);
        colors.push({
            key: key,
            value: createShades('' + c.hex())
        });
    });
    var obj = Object.assign({
        base: hex
    }, colors.reduce(toObj, {}));
    return obj;
};
var palette = palx('#245181');
var sasspalette = function (primary, secondary) {
    var eq = function (value, level) {
        return value.map(function (element, i) {
            return "\n      $" + level + "-" + i + ": " + element + ";\n      --" + level + "-" + i + ": " + element + ";";
        });
    };
    return Object.entries(palette)
        .filter(function (_a) {
        var key = _a[0], value = _a[1];
        return Array.isArray(value);
    })
        .map(function (_a) {
        var key = _a[0], value = _a[1];
        if (key === primary) {
            return eq(value, 'primary');
        }
        else if (key === secondary) {
            return eq(value, 'secondary');
        }
        else if (key === 'gray') {
            return eq(value, 'gray');
        }
    })
        .flat()
        .join('  ');
};
fs.writeFileSync('src/util/_variables.scss', ':root{' + sasspalette('indigo', 'orange') + '}');

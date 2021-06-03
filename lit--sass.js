"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var fs_1 = __importDefault(require("fs"));
var process = require("process");
var sass = require("sass");
var postcss_1 = __importDefault(require("postcss"));
var autoprefixer_1 = __importDefault(require("autoprefixer"));
var postcss_preset_env_1 = __importDefault(require("postcss-preset-env"));
var glob_1 = require("glob");
var defaultOpts = {
    srcDir: './src',
    outDir: './dist'
};
var getOptions = function () {
    var options = Object.assign({}, defaultOpts);
    if (process.env.argv) {
        var srcIndex = process.env.argv.indexOf('-s');
        var distIndex = process.env.argv.indexOf('-o');
        if (srcIndex > -1) {
            options.srcDir = process.env.argv[srcIndex + 1];
        }
        if (distIndex > -1) {
            options.outDir = process.env.argv[distIndex + 1];
        }
    }
    return options;
};
/////////////////////////////////////////////
function getFiles() {
    var filterScss = function (f) { return f.endsWith('.component.scss'); };
    return new Promise(function (resolve, reject) {
        return glob_1.glob('src/**/*.scss', {}, function (err, matches) {
            if (err) {
                reject(err);
            }
            else {
                resolve(matches.filter(filterScss));
            }
        });
    });
}
//////////////////////////////////////////////////////////
/**
 *
 * @param {String} sassFile
 * @returns {Promise<String>}
 */
var sassToCss = function (sassFile) {
    var renderOptions = {
        file: sassFile,
        outputStyle: 'expanded'
    };
    var stringifiedCss = function (resolve, reject) {
        // @ts-ignore
        sass.render(renderOptions, function (err, result) {
            err ? reject(err) : resolve(result.css.toString());
        });
    };
    return new Promise(stringifiedCss);
};
var writeFile = function (outFile, data) {
    // eslint-disable-next-line no-console
    console.log("Creating file " + outFile + "...");
    return new Promise(function (resolve, reject) {
        fs_1["default"].writeFile(outFile, data, { encoding: 'utf-8' }, function (err) {
            if (err) {
                reject(err);
            }
            else {
                resolve(true);
            }
        });
    });
};
var sassRender = function () { return __awaiter(void 0, void 0, void 0, function () {
    var template, options, sassFiles, _i, sassFiles_1, file, cssString, processedCss, newFileName, cssTemplate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                template = "import { css } from 'lit';\n\n export const style = css`{0}`;\n";
                options = getOptions();
                return [4 /*yield*/, getFiles()];
            case 1:
                sassFiles = _a.sent();
                _i = 0, sassFiles_1 = sassFiles;
                _a.label = 2;
            case 2:
                if (!(_i < sassFiles_1.length)) return [3 /*break*/, 7];
                file = sassFiles_1[_i];
                console.log(file);
                return [4 /*yield*/, sassToCss(file)];
            case 3:
                cssString = _a.sent();
                return [4 /*yield*/, postcss_1["default"]([
                        autoprefixer_1["default"]({ grid: 'autoplace' }),
                        postcss_preset_env_1["default"],
                    ]).process(cssString)];
            case 4:
                processedCss = _a.sent();
                newFileName = file.replace(/_([\w\d\s]+).component.scss/, '$1.css.ts');
                cssTemplate = template.replace('{0}', processedCss.css.trim());
                return [4 /*yield*/, writeFile(newFileName, cssTemplate)];
            case 5:
                _a.sent();
                _a.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 2];
            case 7: return [2 /*return*/];
        }
    });
}); };
sassRender()["catch"](function (err) {
    // eslint-disable-next-line no-console
    console.error(err);
    process.exit(-1);
});

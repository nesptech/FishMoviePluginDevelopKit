"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: 靳兆鲁[1756404649@qq.com]
 * @Date: 2019-10-26 20:18:09
 * @LastEditors: 靳兆鲁[1756404649@qq.com]
 * @LastEditTime: 2019-10-26 20:27:03
 */
var fs_1 = __importDefault(require("fs"));
// const zlib = require('zlib');
var zlib_1 = __importDefault(require("zlib"));
var ZipUtils = /** @class */ (function () {
    function ZipUtils() {
    }
    ZipUtils.zip = function (inFilePath, outFilePath, callbackClose) {
        var inFile = fs_1.default.createReadStream(inFilePath);
        var outFile = fs_1.default.createWriteStream(outFilePath);
        inFile.pipe(zlib_1.default.createGzip()).pipe(outFile);
        outFile.on("close", function () {
            if (callbackClose === undefined)
                return;
            callbackClose(outFilePath);
        });
    };
    ZipUtils.unzip = function (inFilePath, outFilePath, callbackClose) {
        var inFile = fs_1.default.createReadStream(inFilePath);
        var outFile = fs_1.default.createWriteStream(outFilePath);
        inFile.pipe(zlib_1.default.createGunzip()).pipe(outFile);
        outFile.on("close", function () {
            if (callbackClose === undefined)
                return;
            callbackClose(outFilePath);
        });
    };
    return ZipUtils;
}());
exports.ZipUtils = ZipUtils;

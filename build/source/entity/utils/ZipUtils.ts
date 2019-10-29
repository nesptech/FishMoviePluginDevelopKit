/*
 * @Descripttion: 
 * @version: 
 * @Author: 靳兆鲁[1756404649@qq.com]
 * @Date: 2019-10-26 20:18:09
 * @LastEditors: 靳兆鲁[1756404649@qq.com]
 * @LastEditTime: 2019-10-26 20:27:03
 */
import fs from "fs";
// const zlib = require('zlib');
import zlib, { gzip } from 'zlib';

export class ZipUtils {

    public static zip(inFilePath: string, outFilePath: string, callbackClose?: (outFilePath: string) => {}) {
        let inFile = fs.createReadStream(inFilePath)
        let outFile = fs.createWriteStream(outFilePath)
        inFile.pipe(zlib.createGzip()).pipe(outFile);
        outFile.on("close", () => {
            if (callbackClose === undefined) return;
            callbackClose(outFilePath);
        })
    }
    public static unzip(inFilePath: string, outFilePath: string, callbackClose?: (outFilePath: string) => {}) {
        let inFile = fs.createReadStream(inFilePath)
        let outFile = fs.createWriteStream(outFilePath)
        inFile.pipe(zlib.createGunzip()).pipe(outFile)
        outFile.on("close", () => {
            if (callbackClose === undefined) return;
            callbackClose(outFilePath);
        })
    }


}
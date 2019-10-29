/*
 * @Descripttion: 
 * @version: 
 * @Author: 靳兆鲁[1756404649@qq.com]
 * @Date: 2019-10-26 15:38:52
 * @LastEditors: 靳兆鲁[1756404649@qq.com]
 * @LastEditTime: 2019-10-26 20:47:32
 */
import fs from "fs";
import path from "path";
// const zlib = require('zlib');
import zlib, {gzip} from 'zlib';
import {ZipUtils} from "./entity/utils/ZipUtils";

class PluginCompile {

    private pluginProjectRootPath: string = ""
    private pluginProjectSrcPath: string = ""
    private pluginProjectManifestPath: string = ""
    private pluginOutRootPath: string = ""
    private pluginOutFilePath: string = ""
    private MANIFEST_FILE_NAME: string = "manifest.json"
    private SUBFIX_JSON = ".json"
    private SUBFIX_FPP = ".fpp"
    private SUBFIX_FPM = ".fpm"
    private pluginOutFileSubFix = this.SUBFIX_JSON

    constructor(pluginProjectRootPath: string) {
        this.pluginProjectRootPath = pluginProjectRootPath;

        this.pluginProjectSrcPath = path.join(pluginProjectRootPath, "src");
        this.pluginOutRootPath = path.join(pluginProjectRootPath, "out");
        this.pluginProjectManifestPath = path.join(this.pluginProjectSrcPath, this.MANIFEST_FILE_NAME);
        this.mkdirsSync(this.pluginOutRootPath);
    }

    public startCompile() {

        var readPluginManifest: MoviePluginSdk.VideoPluginInfo
        var manifestFileStr: string;
        try {
            manifestFileStr = fs.readFileSync(this.pluginProjectManifestPath, "utf-8");
        } catch (error) {
            console.error(">>>>>>>>>读取插件清单文件失败\n" + error.message);
            return
        }

        try {
            readPluginManifest = JSON.parse(manifestFileStr)

            if (readPluginManifest.name === "" || readPluginManifest.name.trim().length <= 0) {
                console.log(">>>>>>>插件名字未设置，请更改后重试....")
                return
            }

            this.pluginOutFilePath = path.join(this.pluginOutRootPath, `${readPluginManifest.name}${this.pluginOutFileSubFix}`)
            try {
                readPluginManifest.mainPageScript = this.resovelScriptStr("mainPageScript", readPluginManifest.mainPageScript)
                readPluginManifest.videosPageScript = this.resovelScriptStr("videosPageScript", readPluginManifest.videosPageScript)
            } catch (e) {
             
            }

            readPluginManifest.searchPageScript = this.resovelScriptStr("searchPageScript", readPluginManifest.searchPageScript)
            readPluginManifest.infoPageScript = this.resovelScriptStr("infoPageScript", readPluginManifest.infoPageScript)
            readPluginManifest.playUrlParserScript = this.resovelScriptStr("playUrlParserScript", readPluginManifest.playUrlParserScript)

            try {
                console.log(">>>>>>>>正在生成插件(" + this.pluginOutFilePath + ")....")
                fs.writeFileSync(this.pluginOutFilePath, JSON.stringify(readPluginManifest));
                // ZipUtils.zip(this.pluginOutFilePath, this.pluginOutFilePath.replace(".json", "") + ".zip")

                console.log("插件(" + this.pluginOutFilePath + ")生成完成!<<<<<<<<")
            } catch (error) {
                console.error(">>>>>>>>>插件生成失败!!!\n" + error.message)
            }
        } catch (e) {
            console.error(">>>>>>>>>插件清单文件格式不正确，请检查后重试....\n" + e.message)
            return
        }
    }

    private mkdirsSync(dirname: string) {
        if (fs.existsSync(dirname)) {
            return true;
        } else {
            if (this.mkdirsSync(path.dirname(dirname))) {
                fs.mkdirSync(dirname);
                return true;
            }
        }
    }

    private resovelScriptStr(scriptName: string, scriptStr: string): string {
        if (scriptStr === "") {
            console.log(`>>>>>>>>>脚本[${scriptName}]不用处理，跳过.....`)
            return "";
        }
        console.log(`>>>>>>>>>正在处理脚本[${scriptName}]`)

        var absScriptPath: string;
        if (scriptStr.startsWith("./")) {
            absScriptPath = path.join(this.pluginProjectSrcPath, scriptStr.substring(1));
        } else if (scriptStr.startsWith("/")) {
            absScriptPath = path.join(this.pluginProjectSrcPath, scriptStr);
        } else {
            // scriptStr = scriptStr;
            return scriptStr;
        }
        try {
            let scriptStrTmp: string = this.deleteFileHeader(fs.readFileSync(absScriptPath, "utf-8"))
            if (scriptStrTmp == "") {
                console.error(">>>>>>>>>警告:脚本[" + absScriptPath + "]无内容：\n")
            }
            return scriptStrTmp;
        } catch (error) {
            console.error(">>>>>>>>>读取脚本[" + absScriptPath + "]失败,将跳过此脚本：\n" + error.message)
            return ""
        }
    }

    /**
     *去掉头部注释
     * @param fileContent 脚本内容
     */
    private deleteFileHeader(fileContent: string): string {
        if (fileContent.startsWith("/*")) {
            return fileContent.split("*/")[1]
        }
        return fileContent;
    }
}

function main(args: string[]) {
    if (args.length <= 0) {
        console.error("Error :请指定插件工程根目录")
        return
    }
    let pluginProjectRootPath = args[0];
    console.error(`工程目录：${pluginProjectRootPath}`)
    new PluginCompile(pluginProjectRootPath).startCompile()
}

main(process.argv.splice(2))





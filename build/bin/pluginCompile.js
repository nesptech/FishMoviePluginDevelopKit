"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
 * @Descripttion:
 * @version:
 * @Author: 靳兆鲁[1756404649@qq.com]
 * @Date: 2019-10-26 15:38:52
 * @LastEditors: 靳兆鲁[1756404649@qq.com]
 * @LastEditTime: 2019-10-26 20:47:32
 */
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var PluginCompile = /** @class */ (function () {
    function PluginCompile(pluginProjectRootPath) {
        this.pluginProjectRootPath = "";
        this.pluginProjectSrcPath = "";
        this.pluginProjectManifestPath = "";
        this.pluginOutRootPath = "";
        this.pluginOutFilePath = "";
        this.MANIFEST_FILE_NAME = "manifest.json";
        this.SUBFIX_JSON = ".json";
        this.SUBFIX_FPP = ".fpp";
        this.SUBFIX_FPM = ".fpm";
        this.pluginOutFileSubFix = this.SUBFIX_JSON;
        this.pluginProjectRootPath = pluginProjectRootPath;
        this.pluginProjectSrcPath = path_1.default.join(pluginProjectRootPath, "src");
        this.pluginOutRootPath = path_1.default.join(pluginProjectRootPath, "out");
        this.pluginProjectManifestPath = path_1.default.join(this.pluginProjectSrcPath, this.MANIFEST_FILE_NAME);
        this.mkdirsSync(this.pluginOutRootPath);
    }
    PluginCompile.prototype.startCompile = function () {
        var readPluginManifest;
        var manifestFileStr;
        try {
            manifestFileStr = fs_1.default.readFileSync(this.pluginProjectManifestPath, "utf-8");
        }
        catch (error) {
            console.error(">>>>>>>>>读取插件清单文件失败\n" + error.message);
            return;
        }
        try {
            readPluginManifest = JSON.parse(manifestFileStr);
            if (readPluginManifest.name === "" || readPluginManifest.name.trim().length <= 0) {
                console.log(">>>>>>>插件名字未设置，请更改后重试....");
                return;
            }
            this.pluginOutFilePath = path_1.default.join(this.pluginOutRootPath, "" + readPluginManifest.name + this.pluginOutFileSubFix);
            readPluginManifest.mainPageScript = this.resovelScriptStr("mainPageScript", readPluginManifest.mainPageScript);
            readPluginManifest.videosPageScript = this.resovelScriptStr("videosPageScript", readPluginManifest.videosPageScript);
            readPluginManifest.searchPageScript = this.resovelScriptStr("searchPageScript", readPluginManifest.searchPageScript);
            readPluginManifest.infoPageScript = this.resovelScriptStr("infoPageScript", readPluginManifest.infoPageScript);
            readPluginManifest.playUrlParserScript = this.resovelScriptStr("playUrlParserScript", readPluginManifest.playUrlParserScript);
            try {
                console.log(">>>>>>>>正在生成插件(" + this.pluginOutFilePath + ")....");
                fs_1.default.writeFileSync(this.pluginOutFilePath, JSON.stringify(readPluginManifest));
                // ZipUtils.zip(this.pluginOutFilePath, this.pluginOutFilePath.replace(".json", "") + ".zip")
                console.log("插件(" + this.pluginOutFilePath + ")生成完成!<<<<<<<<");
            }
            catch (error) {
                console.error(">>>>>>>>>插件生成失败!!!\n" + error.message);
            }
        }
        catch (e) {
            console.error(">>>>>>>>>插件清单文件格式不正确，请检查后重试....\n" + e.message);
            return;
        }
    };
    PluginCompile.prototype.mkdirsSync = function (dirname) {
        if (fs_1.default.existsSync(dirname)) {
            return true;
        }
        else {
            if (this.mkdirsSync(path_1.default.dirname(dirname))) {
                fs_1.default.mkdirSync(dirname);
                return true;
            }
        }
    };
    PluginCompile.prototype.resovelScriptStr = function (scriptName, scriptStr) {
        if (scriptStr === "") {
            console.log(">>>>>>>>>\u811A\u672C[" + scriptName + "]\u4E0D\u7528\u5904\u7406\uFF0C\u8DF3\u8FC7.....");
            return "";
        }
        console.log(">>>>>>>>>\u6B63\u5728\u5904\u7406\u811A\u672C[" + scriptName + "]");
        var absScriptPath;
        if (scriptStr.startsWith("./")) {
            absScriptPath = path_1.default.join(this.pluginProjectSrcPath, scriptStr.substring(1));
        }
        else if (scriptStr.startsWith("/")) {
            absScriptPath = path_1.default.join(this.pluginProjectSrcPath, scriptStr);
        }
        else {
            // scriptStr = scriptStr;
            return scriptStr;
        }
        try {
            var scriptStrTmp = this.deleteFileHeader(fs_1.default.readFileSync(absScriptPath, "utf-8"));
            if (scriptStrTmp == "") {
                console.error(">>>>>>>>>警告:脚本[" + absScriptPath + "]无内容：\n");
            }
            return scriptStrTmp;
        }
        catch (error) {
            console.error(">>>>>>>>>读取脚本[" + absScriptPath + "]失败,将跳过此脚本：\n" + error.message);
            return "";
        }
    };
    /**
     *去掉头部注释
     * @param fileContent 脚本内容
     */
    PluginCompile.prototype.deleteFileHeader = function (fileContent) {
        if (fileContent.startsWith("/*")) {
            return fileContent.split("*/")[1];
        }
        return fileContent;
    };
    return PluginCompile;
}());
function main(args) {
    if (args.length <= 0) {
        console.error("Error :请指定插件工程根目录");
        return;
    }
    var pluginProjectRootPath = args[0];
    console.error("\u5DE5\u7A0B\u76EE\u5F55\uFF1A" + pluginProjectRootPath);
    new PluginCompile(pluginProjectRootPath).startCompile();
}
main(process.argv.splice(2));

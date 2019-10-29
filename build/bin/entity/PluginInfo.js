"use strict";
/*
 * @Descripttion:
 * @version:
 * @Author: 靳兆鲁[1756404649@qq.com]
 * @Date: 2019-10-26 15:12:57
 * @LastEditors: 靳兆鲁[1756404649@qq.com]
 * @LastEditTime: 2019-10-26 16:21:46
 */
var MoviePluginSdk;
(function (MoviePluginSdk) {
    var VideoPluginInfo = /** @class */ (function () {
        function VideoPluginInfo() {
            this.hostUrl = "";
            this.intro = "";
            this.mainPageUrl = "";
            this.mainPageScript = "";
            this.moviePageUrl = "";
            this.soapPageUrl = "";
            this.varietyPageUrl = "";
            this.animPageUrl = "";
            this.searchPageUrl = "";
            this.searchPageScript = "";
            this.videosPageScript = "";
            this.infoPageScript = "";
            this.playUrlParserScript = "";
            this.verName = "";
            this.author = "";
            this.img = "";
            this.introShort = "";
            this.updateTime = "";
            this.name = "";
            this.supports = [true];
            this.tags = ["快速"];
            this.vipCode = 0;
            this.verCode = 0;
            this.engineVerCode = 0;
        }
        VideoPluginInfo.prototype.getSupportUI = function () {
            return this.supports[0];
        };
        VideoPluginInfo.prototype.setSupportUI = function (isSupport) {
            this.supports[0] = isSupport;
        };
        return VideoPluginInfo;
    }());
    MoviePluginSdk.VideoPluginInfo = VideoPluginInfo;
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        Utils.println = function (param) {
            console.log(param);
        };
        return Utils;
    }());
    MoviePluginSdk.Utils = Utils;
})(MoviePluginSdk || (MoviePluginSdk = {}));

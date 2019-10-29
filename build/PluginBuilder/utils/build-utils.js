const buildToolsInfo = {
    name: 'fishMovieBuilder'
};
isUrl = function (str) {
    const reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
    return reg.test(str);
}
checkBuildRootPath = function () {
    const path = require('path');
    const {ipcRenderer} = require('electron');

    console.log('checkBuildRootPath:  ' + path.join(setting.buildRootPath, 'buildToolsInfo.json'));

    const checkBuilderResult = ipcRenderer.sendSync('BuildUtilsMain:checkBuildRootPathSync', {path: path.join(setting.buildRootPath, 'buildToolsInfo.json')});
    console.log('checkBuildRootPath:  ' + "================" + JSON.stringify(checkBuilderResult));

    if (checkBuilderResult.resultCode === 1) {
        try {
            console.log('checkBuilder: ' + checkBuilderResult.resultValue);
            JSON.stringify(checkBuilderResult.resultValue);
            return true;
        } catch (e) {
            console.log('checkBuilder: ' + e);
            return false;
        }
    } else {
        console.log('checkBuilder: ' + JSON.stringify(checkBuilderResult));
        return false;
    }
};
checkPluginInfo = function (isSupportUI, tags) {
    // const resultCheckSettings = checkSettingsEnable();
    // if (!resultCheckSettings.enable) {
    //     return resultCheckSettings;
    // }

    Date.prototype.Format = function (fmt) {
        var o = {
            "M+": this.getMonth() + 1,                 //月份
            "d+": this.getDate(),                    //日
            "h+": this.getHours(),                   //小时
            "m+": this.getMinutes(),                 //分
            "s+": this.getSeconds(),                 //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            "S": this.getMilliseconds()             //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    };


    function urlDisUse(url) {
        return !!(valueDisUse(url.trim()) || !this.isUrl(url));
    }

    function valueDisUse(value) {
        return value === undefined || value === null || value === ''
    }

    const result = {enable: false, msg: ''};

    if (valueDisUse(FishMovieSdk.videoPluginInfo.name.trim())) {
        result.msg = '插件名不可以为空';
        return result;
    }

    if (isSupportUI === '否' || isSupportUI === 'false' || isSupportUI === false) {
        FishMovieSdk.videoPluginInfo.supports[0] = false;
    }

    if (isSupportUI === '是' || isSupportUI === 'true' || isSupportUI === true) {
        FishMovieSdk.videoPluginInfo.supports[0] = true;
    }

    if (tags.trim !== '' && tags.trim !== undefined) {
        FishMovieSdk.videoPluginInfo.tags = tags.split(' ');
    } else {
        // FishMovieSdk.videoPluginInfo.tags = [''];
    }


    if (urlDisUse(FishMovieSdk.videoPluginInfo.hostUrl)) {
        result.msg = '根地址为空或格式不正确';
        return result;
    }

    if (urlDisUse(FishMovieSdk.videoPluginInfo.mainPageUrl)) {
        FishMovieSdk.videoPluginInfo.mainPageScript = FishMovieSdk.videoPluginInfo.hostUrl;
    }

    if (FishMovieSdk.videoPluginInfo.supports.length <= 0) {
        result.msg = '请填写是否支持UI';
        return result;
    }

    if (valueDisUse(FishMovieSdk.videoPluginInfo.searchPageUrl)) {
        result.msg = '搜索页地址为空或格式不正确';
        return result;
    }

    if (FishMovieSdk.videoPluginInfo.searchPageUrl.indexOf("@st") === -1) {
        result.msg = '搜索页地址未包含搜索关键字定位符 @st';
        return result;
    }

    if (valueDisUse(FishMovieSdk.videoPluginInfo.searchPageScript.trim)) {
        result.msg = '搜索页脚本为空';
        return result;
    }

    if (valueDisUse(FishMovieSdk.videoPluginInfo.infoPageScript.trim)) {
        result.msg = '播放页脚本为空';
        return result;
    }

    if (FishMovieSdk.videoPluginInfo.verCode < 0) {
        result.msg = '版本号格式不正确';
        return result;
    }

    if (FishMovieSdk.videoPluginInfo.supports[0]) {

        if (urlDisUse(FishMovieSdk.videoPluginInfo.moviePageUrl)) {
            result.msg = '电影页地址为空或格式不正确';
            return result;
        }

        if (urlDisUse(FishMovieSdk.videoPluginInfo.soapPageUrl)) {
            result.msg = '电视剧页地址为空或格式不正确';
            return result;
        }

        if (urlDisUse(FishMovieSdk.videoPluginInfo.varietyPageUrl)) {
            result.msg = '综艺页地址为空或格式不正确';
            return result;
        }

        if (urlDisUse(FishMovieSdk.videoPluginInfo.animPageUrl)) {
            result.msg = '动漫页地址为空或格式不正确';
            return result;
        }

        if (valueDisUse(FishMovieSdk.videoPluginInfo.mainPageScript.trim)) {
            result.msg = '主页脚本为空';
            return result;
        }

        if (valueDisUse(FishMovieSdk.videoPluginInfo.videosPageScript.trim)) {
            result.msg = '分类页脚本为空';
            return result;
        }
    }

    if (valueDisUse(FishMovieSdk.videoPluginInfo.updateTime)) {
        FishMovieSdk.videoPluginInfo.updateTime = new Date().Format("yyyy-MM-dd");
    }

    result.enable = true;
    return result;
};
createNewPluginProject = function (onCreateListener, onFinish, onError) {
    const path = require('path');
    const {ipcRenderer} = require('electron');

    function create() {
        const pluginProjectInfo = {};
        pluginProjectInfo.projectPath = path.join(setting.pluginsRootPath, FishMovieSdk.videoPluginInfo.name);
        pluginProjectInfo.outPath = path.join(pluginProjectInfo.projectPath, 'out');
        pluginProjectInfo.srcPath = path.join(pluginProjectInfo.projectPath, 'src');
        pluginProjectInfo.manifestPath = path.join(pluginProjectInfo.projectPath, 'src', 'manifest.json');

        console.log(JSON.stringify(pluginProjectInfo));

        if (setting.exportPluginInfo.manifestPath === undefined || setting.exportPluginInfo.manifestPath == null || setting.exportPluginInfo.manifestPath === "") {
            setting.exportPluginInfo.manifestPath = pluginProjectInfo.manifestPath;
            saveSettings(JSON.stringify(setting))
        }

        onCreateListener('正在创建 ' + 'manifest.json ....');

        let createManifestResult;

        if (FishMovieSdk.videoPluginInfo.supports[0]) {
            createManifestResult = ipcRenderer.sendSync('BuildUtilsMain:createManifestSync', {
                path: pluginProjectInfo.manifestPath,
                data: JSON.stringify(FishMovieSdk.videoPluginInfo)
            });
        } else {
            createManifestResult = ipcRenderer.sendSync('BuildUtilsMain:createManifestSync', {
                path: pluginProjectInfo.manifestPath,
                data: JSON.stringify(FishMovieSdk.getVideoPluginInfoNoUI())
            });
        }

        if (createManifestResult.resultCode === 1) {
            onCreateListener('创建 ' + 'manifest.json 成功....');
        } else {
            onError('创建 ' + 'manifest.json 失败....');
            onCreateListener('创建 ' + 'manifest.json 失败....');
        }

        copyProjectFileSync('demo/build.sh', 'build.sh');
        copyProjectFileSync('demo/build_x86.bat', 'build_x86.bat');
        copyProjectFileSync('demo/build.bat', 'build.bat');

        onCreateListener('正在检查 ' + '脚本文件 ....');

        if (FishMovieSdk.videoPluginInfo.supports[0]) {
            createJsFileSync('mainPage.js',FishMovieSdk.videoPluginInfo.mainPageScript);
            createJsFileSync('videosPage.js',FishMovieSdk.videoPluginInfo.videosPageScript);
        }

        createJsFileSync('searchPage.js',FishMovieSdk.videoPluginInfo.searchPageScript);
        createJsFileSync('playPage.js',FishMovieSdk.videoPluginInfo.infoPageScript);
        createJsFileSync('playUrlParser.js',FishMovieSdk.videoPluginInfo.playUrlParserScript);
        onFinish();

        function createJsFileSync(fromScriptName,str) {
            let jsPath = '';
            if (str.startsWith('./')) {
                jsPath = path.join(pluginProjectInfo.srcPath, str.split('./')[1])
            } else if (str.startsWith('/')) {
                jsPath = path.join(pluginProjectInfo.srcPath, str.split('/')[1])
            }

            if (jsPath === '') return;

            onCreateListener('正在创建 ' + '脚本文件 ' + str + ' ....');
            // const result = ipcRenderer.sendSync('BuildUtilsMain:createJsFileSync', {
            //     path: jsPath,
            //     data: ''
            // });
            const result = ipcRenderer.sendSync('BuildUtilsMain:copyProjectFileSync', {
                fromPath: path.join(setting.buildRootPath,'demo','src','scripts', fromScriptName),
                toPath: jsPath
            });
            if (result.resultCode === 1) {
                onCreateListener('创建脚本文件 ' + str + '成功....');
            } else {
                onError('创建脚本文件 ' + str + '失败....');
                onCreateListener('创建脚本文件 ' + str + '失败....');
            }
        }

        function copyProjectFileSync(from, to) {
            const name = path.basename(from);
            onCreateListener('正在创建 ' + name + ' ....');
            const result = ipcRenderer.sendSync('BuildUtilsMain:copyProjectFileSync', {
                fromPath: path.join(setting.buildRootPath, from),
                toPath: path.join(pluginProjectInfo.projectPath, to)
            });

            if (result.resultCode === 1) {
                console.log('copyProjectFileSync ' + path.join(setting.buildRootPath, from) + ' ' + path.join(pluginProjectInfo.projectPath, to));
                onCreateListener('创建 ' + name + ' 成功....');
            } else {
                onError('创建 ' + name + ' 失败....');
                onCreateListener('创建 ' + name + ' 失败....');
            }
        }
    }

    create();
}




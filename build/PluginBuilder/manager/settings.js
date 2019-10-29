const {ipcRenderer} = require('electron');

exports.settingsStrongPath = './settings.json';

exports.checkSettingsEnable = function () {
    const result = {enable: false, msg: ''};
    if (setting.buildRootPath === undefined || setting.buildRootPath === null | setting.buildRootPath === "") {
        result.msg = '插件构建工具路径不能为空';
        return result;
    }
    if (setting.pluginsRootPath === undefined || setting.pluginsRootPath === null | setting.pluginsRootPath === "") {
        result.msg = '插件工作工作区路径不能为空';
        return result;
    }
    result.enable = true;
    return result;
}

exports.setting = {
    buildRootPath: "",
    pluginsRootPath: "",
    exportPluginInfo: {
        manifestPath: "",
        subfix: "json",
    }
};

const ipcTag = [false, false];


exports.saveSettings = function (settingsStr, onListener) {
    if (!ipcTag[0]) {
        ipcRenderer.on("writeFileSync{settings}-reply", onListener);
        ipcTag[0] = true;
    }

    ipcRenderer.send("writeFileSync{settings}", {path: settingsStrongPath, data: settingsStr});
};

exports.loadSettings = function (onListener) {
    if (!ipcTag[1]) {
        ipcRenderer.on('readFileSync{settings}-reply', (event, args) => {

            if (args.resultValue === undefined || args.resultValue === "") {
                onListener({resultCode: 0});
                return;
            }
            try {
                JSON.parse(args.resultValue);
            } catch (e) {
                onListener({resultCode: 0});
                return;
            }
            console.log('loadSettings   4 ' + args.resultCode);

            onListener({resultCode: args.resultCode, resultValue: JSON.parse(args.resultValue)});
        });
        ipcTag[1] = true;
    }
    ipcRenderer.send('readFileSync{settings}', {path: settingsStrongPath});
};

exports.initSettings = function () {
    saveSettings(JSON.stringify(setting), (event, args) => {

    })
};











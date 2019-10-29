
function exportPlugin(onProgress, onFinish) {

    const path = require('path');
    const pluginProjectRootPath = path.dirname(path.dirname(setting.exportPluginInfo.manifestPath));
    const pluginProjectOutPath = path.join(pluginProjectRootPath,'out');
    const pluginBuildPathForLinux = path.join(pluginProjectRootPath, 'build.sh');
    const pluginBuildPathForWinX86 = path.join(pluginProjectRootPath, 'build_x86.bat');

    const exec = require('child_process').exec;
    const cmd_linux = `${pluginBuildPathForLinux} ${setting.buildRootPath}`;
    const cmd_win_x86 = `${pluginBuildPathForWinX86} ${setting.buildRootPath}`;

    let cmd = '';

    if (process.platform === 'linux') {
        cmd = cmd_linux;
        exec(`chmod 777 ${pluginBuildPathForLinux}`)
    } else if (process.platform === 'win32') {
        cmd = cmd_win_x86;
    } else {
        onProgress(`暂不支持(${process.platform})操作系统`);
        return;
    }
    exec(cmd, function (err, stdout, stderr) {
        console.log(cmd_linux);
        if (err) {
            onProgress(`运行失败　${err}`);
            console.log(err);
            onFinish(false,err);
        } else {
            onProgress(stdout);
            console.log(stdout);
            console.log(JSON.stringify(stdout));
            onFinish(true,'');
        }
    });
}

function checkExportInfo() {

    const result = {enable: false, msg: ""};

    if (setting.exportPluginInfo.manifestPath.trim() === undefined
        || setting.exportPluginInfo.manifestPath.trim() == null
        || setting.exportPluginInfo.manifestPath.trim() === "") {
        result.msg = "清单路径不能为空";
        return result;
    }

    result.enable = true;
    return result;
}

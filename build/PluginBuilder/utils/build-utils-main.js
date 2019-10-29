exports.BuildUtilsMain = {
    attach: function () {

        console.log("BuildUtilsMain");
        const {ipcMain} = require('electron');
        const fs = require('fs');
        const path = require('path');
        const {FileUtils} = require('./fileUtils');

        ipcMain.on("BuildUtilsMain:checkBuildRootPathSync", (event, args) => {
            try {
                const value = fs.readFileSync(args.path, 'utf-8');
                console.log("BuildUtilsMain:checkBuildRootPathSync  " + JSON.stringify(value));
                event.returnValue = {resultValue: value, resultCode: 1};
            } catch (e) {
                console.log("BuildUtilsMain:checkBuildRootPathSync Error " + e);
                event.returnValue = {resultCode: 0};
            }
        });

        ipcMain.on("BuildUtilsMain:copyProjectFileSync", (event, args) => {
            let resultCode = 1;
            try {
                FileUtils.mkdirsSync(path.dirname(args.toPath));
                fs.writeFileSync(args.toPath, fs.readFileSync(args.fromPath, 'utf-8'), 'utf-8');
                console.log('BuildUtilsMain:copyProjectFileSynced: ' + 'from:' + args.fromPath + ' to:' + args.toPath)
                // fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
            } catch (e) {
                console.log('BuildUtilsMain:copyProjectFileSync error: ' + e + ' from:' + args.fromPath + ' to:' + args.toPath)
                resultCode = 0;
            }
            event.returnValue = {resultCode: resultCode}
        });


        ipcMain.on("BuildUtilsMain:createManifestSync", (event, args) => {
            let resultCode = 1;
            try {
                FileUtils.mkdirsSync(path.dirname(args.path));
                fs.writeFileSync(args.path, args.data, 'utf-8');
            } catch (e) {
                resultCode = 0;
            }
            event.returnValue = {resultCode: resultCode};
        });

        ipcMain.on("BuildUtilsMain:createJsFileSync", (event, args) => {
            let resultCode = 1;
            try {
                FileUtils.mkdirsSync(path.dirname(args.path));
                fs.writeFileSync(args.path, args.data, 'utf-8');
            } catch (e) {
                resultCode = 0;
            }
            event.returnValue = {resultCode: resultCode};
        });

    },
};
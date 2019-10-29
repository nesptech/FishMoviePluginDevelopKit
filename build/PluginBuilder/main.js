// Modules to control application life and create native browser window
const {app, ipcMain, BrowserWindow} = require('electron');
const path = require('path');
const fs = require('fs');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let welcomeWindow;
let mainWindow;

function createWelcomeWindow() {
    // Create the browser window.
    welcomeWindow = new BrowserWindow({
        resizable: false,
        frame: false,
        width: 400,
        height: 300,
        icon: "./build/icons/512x512.png",

        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    // and load the index.html of the app.
    welcomeWindow.loadFile('splash.html');
    createMainWindow();


    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // const {Menu} = require('electron');
    // Menu.setApplicationMenu(null);
    //
    // welcomeWindow.once('ready-to-show', () => {
    //     console.log('show')
    //     createMainWindow()
    // })
    // Emitted when the window is closed.
    welcomeWindow.on('closed', function () {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        welcomeWindow = null
    })
}

function createMainWindow() {
    // Create the browser window.
    if (mainWindow != null) return;
    mainWindow = new BrowserWindow({
        minWidth: 800,
        minHeight: 500,
        icon: "./build/icons/512x512.png",
        show: false,
        height: 600,
        width: 800,
        webPreferences: {
            nodeIntegration: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    mainWindow.loadFile('index.html');

    const {Menu} = require('electron');
    Menu.setApplicationMenu(null);

    mainWindow.once('ready-to-show', () => {
        if (welcomeWindow != null) {
            welcomeWindow.close();
        }
        mainWindow.show()
    })
    mainWindow.on('closed', function () {
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWelcomeWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
});

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (welcomeWindow === null) createWelcomeWindow();
});

const {FileUtils} = require('./utils/fileUtils')
const {BuildUtilsMain} = require('./utils/build-utils-main')

BuildUtilsMain.attach();

ipcMain.on("copyFileSync", (event, args) => {
    let resultCode = 1;
    try {
        FileUtils.mkdirsSync(path.dirname(args.toPath))
        fs.writeFileSync(args.toPath, fs.readFileSync(args.fromPath, 'utf-8'), 'utf-8');
        //fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
    } catch (e) {
        resultCode = 0;
    }
    event.reply("copyFileSync-reply", {resultCode: resultCode})
});

ipcMain.on("copyFile", (event, args) => {
    let resultCode = 1;
    try {
        FileUtils.mkdirsSync(path.dirname(args.toPath))
        fs.writeFileSync(args.toPath, fs.readFileSync(args.fromPath, 'utf-8'), 'utf-8');
        console.log('copyed: ' + 'from:' + args.fromPath + ' to:' + args.toPath)

        // fs.createReadStream(src).pipe(fs.createWriteStream(dst));大文件复制
    } catch (e) {
        console.log('copy error: ' + 'from:' + args.fromPath + ' to:' + args.toPath)
        resultCode = 0;
    }
    event.returnValue = {resultCode: resultCode}
});


ipcMain.on("writeFileSync", (event, args) => {
    let resultCode = 1;
    try {
        FileUtils.mkdirsSync(path.dirname(args.path))
        fs.writeFileSync(args.path, args.data, 'utf-8');
    } catch (e) {
        resultCode = 0;
    }
    event.reply("writeFileSync-reply", {resultCode: resultCode})
});

ipcMain.on("writeFile", (event, args) => {
    let resultCode = 1;
    try {
        FileUtils.mkdirsSync(path.dirname(args.path))
        fs.writeFileSync(args.path, args.data, 'utf-8');
    } catch (e) {
        resultCode = 0;
    }
    event.returnValue = {resultCode: resultCode};
});

ipcMain.on('readFileSync', (event, args) => {
    try {
        const value = fs.readFileSync(args.path, 'utf-8')
        event.reply('readFileSync-reply', {resultValue: value, resultCode: 1});
    } catch (e) {
        event.reply('readFileSync-reply', {resultCode: 0});
    }
});

ipcMain.on('readFile', (event, args) => {
    try {
        const value = fs.readFileSync(args.path, 'utf-8')
        event.returnValue = {resultValue: value, resultCode: 1};
    } catch (e) {
        event.returnValue = {resultCode: 0};
    }
});

ipcMain.on("writeFileSync{settings}", (event, args) => {
    let resultCode = 1;
    try {
        FileUtils.mkdirsSync(path.dirname(args.path))
        fs.writeFileSync(args.path, args.data, 'utf-8');
    } catch (e) {
        resultCode = 0;
    }
    event.reply("writeFileSync{settings}-reply", {resultCode: resultCode})
});

ipcMain.on('readFileSync{settings}', (event, args) => {
    try {
        const value = fs.readFileSync(args.path, 'utf-8')
        event.reply('readFileSync{settings}-reply', {resultValue: value, resultCode: 1});
    } catch (e) {
        event.reply('readFileSync{settings}-reply', {resultCode: 0});
    }
});

// FileUtils.mkdirsSync(path.dirname('./test/s/a.txt'))
// fs.writeFileSync('./test/s/a.txt',"")

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.













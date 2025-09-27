const { app, BrowserWindow, ipcMain, session } = require('electron');
const { join } = require('path');
let x = 375;
let y = 670;
let mainWindow = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: x,
    height: y,
    resizable: false,
    frame: false,
    webPreferences: {
      preload: join(__dirname, 'preload.js'),
      nodeIntegration: false,
      contextIsolation: true
    }
  });

  if (process.env.NODE_ENV === 'development') {
    const rendererPort = process.argv[2];
    mainWindow.loadURL(`http://localhost:${rendererPort}`);
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(join(app.getAppPath(), 'renderer', 'index.html'));
    // mainWindow.webContents.openDevTools(); // Enable debugging tools in the production environment
  }
}

app.whenReady().then(() => {
  createWindow();

  mainWindow.webContents.on('did-finish-load', () => {
    mainWindow?.webContents.send('window-created', {
      message: 'Window is ready'
    });
  })

  session.defaultSession.webRequest.onHeadersReceived((details, callback) => {
    callback({
      responseHeaders: {
        ...details.responseHeaders
      }
    })
  })

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  })
})

ipcMain.on("minimize", () => {
  mainWindow?.minimize()
})

ipcMain.on("close", () => {
  app.quit()
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})
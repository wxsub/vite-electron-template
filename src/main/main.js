const { app, BrowserWindow, ipcMain, session } = require('electron');
const { join } = require('path');
const { updateElectronApp, UpdateSourceType } = require('update-electron-app');

let x = 375, y = 670, mainWindow = null;

const logger = require('electron-log');

app.whenReady().then(() => {
  createWindow();

  updateElectronApp({
    updateSource: {
      type: UpdateSourceType.ElectronPublicUpdateService,
      repo: 'github-user/repo'
    },
    repo: 'wxsub/vite-electron-template',
    updateInterval: '1 hour', // set 5 minutes Interval used for testing
    logger: logger,
    notifyUser: true
  });
  logger.info('自动更新配置完成');

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

ipcMain.on("minimize", () => mainWindow?.minimize())

ipcMain.on("quit", () => app.quit())

ipcMain.on("resize-window", (event, { width, height }) => {
  if (mainWindow && width && height) {
    const [currentX, currentY] = mainWindow.getPosition();
    
    const wasResizable = mainWindow.isResizable();
    mainWindow.setResizable(true);
    
    mainWindow.setSize(width, height);
    mainWindow.setPosition(currentX, currentY);
    
    mainWindow.setResizable(wasResizable);
    
    mainWindow.webContents.executeJavaScript('window.dispatchEvent(new Event("resize"))');
    
    x = width;
    y = height;
  }
})

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})

function createWindow() {
  mainWindow = new BrowserWindow({
    width: x,
    height: y,
    minWidth: 200,
    minHeight: 200,
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
const { app, BrowserWindow, ipcMain } = require('electron')
const path = require('node:path')

const createWindow = () => {
  const win = new BrowserWindow({
    width: 960,
    height: 540,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  win.webContents.openDevTools()

  const win2 = new BrowserWindow({
    x: 960, // 将第二个窗口放置在第一个窗口的右边
    y: 0,
    width: 960,
    height: 540,
    webPreferences: {
      nodeIntegration: true
    }
  });
  win2.loadFile('www.baidu.com'); 
}

app.whenReady().then(() => {
  ipcMain.handle('ping', () => 'pong')
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

const { app, BrowserWindow, ipcMain, BrowserView } = require('electron')
const path = require('node:path')
const { Builder, By, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const http = require('https');
const { exec } = require('child_process');

app.commandLine.appendSwitch('remote-debugging-port', '9222');

app.whenReady().then(() => {
  ipcMain.handle('runSelenium', runSelenium)
  ipcMain.handle('loginSuccess', createMainWindow)
  createLoginWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

exec(path.join(__dirname, '/node_modules/.bin/chromedriver'))

console.log('MAIN_WINDOW_WEBPACK_ENTRY', MAIN_WINDOW_WEBPACK_ENTRY)

const createWindow = async () => {
  const win1 = new BrowserWindow({
    width: 960,
    height: 540,
    autoHideMenuBar: true,
    webPreferences: {
      // webSecurity: false,
      // nodeIntegration: true,
      partition: 'b1',
    }
  })

  // const proxyUrl = 'http://45.203.141.3:7000:isbuqhwq34:utdfrkcy68'; 	fwhfvpch01:ttchtlin01 proxy.smartproxycn.com:1000
  // 'direct' | 'auto_detect' | 'pac_script' | 'fixed_servers' | 'system'
  win1.webContents.on('login', (event, details, authInfo, callback) => {
    event.preventDefault()
    callback('fwhfvpch01', 'ttchtlin01') 
    // trunks_life-120_session-PK7C1OUcXC:123456
    // callback('trunks_life-120_session-PK7C1OUcXC', '123456')
  })

  await win1.webContents.session.setProxy({ 
    proxyRules: '175.6.77.124:14263'
    // proxyRules: '45.203.141.3:7000'
    // proxyRules: 'proxy.smartproxycn.com:1000'
  });

  // win1.webContents.openDevTools()

  win1.loadURL('https://www.xiaohongshu.com/explore')

  // const win2 = new BrowserWindow({
  //   width: 960,
  //   height: 540,
  //   webPreferences: {
  //     webSecurity: false,
  //     partition: 'b2'
  //   }
  // })

  // const proxyUrl = 'http://45.203.141.3:7000:isbuqhwq34:utdfrkcy68';

  // await win2.webContents.session.setProxy({ 
  //   mode: 'pac_script',
  //   proxyRules: 'socks5://45.203.141.3:7000'
  // });
  

  // win2.loadURL('https://www.xiaohongshu.com/explore')


  const mainWin = new BrowserWindow({
    width: 1290,
    height: 780,
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWin.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWin.webContents.openDevTools()
}

async function runSelenium() {
  const driver = await new Builder().usingServer('http://localhost:9515').setChromeOptions(new chrome.Options().debuggerAddress('localhost:9222')).forBrowser(Browser.CHROME).build();
  const windows = await driver.getAllWindowHandles()
  for(w of windows) {
    driver.switchTo().window(w)
    await driver.getTitle()
  }
  // const text = await driver.findElement(By.id('homefeed_recommend')).getText()
  // console.log(Browser.CHROME, tit, '测试')
  return driver.getTitle()
}

let loginWin
const createLoginWindow = async() => {
  loginWin = new BrowserWindow({
    width: 600,
    height: 450,
    autoHideMenuBar: true,
    maximizable: false,
    resizable: false,
    webPreferences: {
      preload: LOGIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    }
  })

  loginWin.loadURL(LOGIN_WINDOW_WEBPACK_ENTRY)

  // loginWin.webContents.openDevTools()
}

let mainWin
const createMainWindow = () => {
  loginWin.close()
  mainWin = new BrowserWindow({
    width: 1290,
    height: 780,
    autoHideMenuBar: true,
    webPreferences: {
      preload: MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY
    }
  })

  mainWin.loadURL(MAIN_WINDOW_WEBPACK_ENTRY)

  mainWin.webContents.openDevTools()
}

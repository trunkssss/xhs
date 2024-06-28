const { app, BrowserWindow, ipcMain, BrowserView, Menu } = require('electron')
const path = require('node:path')
const { Builder, By, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const http = require('https');
const { exec, execFile } = require('child_process');

app.commandLine.appendSwitch('remote-debugging-port', '9222');

app.whenReady().then(() => {
  ipcMain.handle('controlSelenium', controlSelenium)
  ipcMain.handle('loginSuccess', createMainWindow)
  ipcMain.handle('toggleWindow', toggleWProxyWindow)
  createLoginWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})
// console.log(path.join(path.resolve(), './node_modules/.bin'))
// exec('chromedriver', {cwd: path.join(path.resolve(), './node_modules/.bin')}, (err) => {
//   console.log(err)
// })
// execFile(path.join(path.resolve(), './chromedriver.exe'), (error, stdout, stderr) => {
//   if (error) {
//     console.error(`执行错误: ${error}`);
//     return;
//   }
// });

const driverPath = app.isPackaged ? path.join(process.resourcesPath, 'extraResources', 'chromedriver.exe')
                                  : path.join(path.resolve(), './extraResources/chromedriver.exe')

execFile(driverPath, (error, stdout, stderr) => {
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`输出: ${stdout}`);
});


let driver
const controlSelenium = async(e, status, data) => {
  const {id, name, ip, ipAccount, ipPassword, winId, winHandle} = data;

  if (!driver) {
    driver = await new Builder()
              .usingServer('http://localhost:9515')
              .setChromeOptions(new chrome.Options().debuggerAddress('localhost:9222'))
              .forBrowser(Browser.CHROME).build();
  }
  
  // const windows = await driver.getAllWindowHandles()

  await driver.switchTo().window(winHandle)

  const title = await driver.getTitle()

  // for(w of windows) {
  //   await driver.switchTo().window(w)
  //   const t = await driver.getTitle()
  //   console.log(t, w)
  // }

  try {
    await driver.findElement(By.className('input-button')).click()
    const inputEl = await driver.findElement(By.className('phone'))
    inputEl.sendKeys('18073778398');

  } catch(e) {}

  return driverPath
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

const toggleWProxyWindow = async(e, data) => {
  
  const {id, name, ip, ipAccount, ipPassword, winId} = data;
  
  const callback = () => {
    driver.quit()
    mainWin.webContents.send('proxyWinClose', { id, winId: '', winHandle: '' });
  }

  // 如果winId存在则是关闭窗口
  if (winId) {
    const foundWindow = BrowserWindow.fromId(winId);
    foundWindow.close()
    foundWindow.off('close', callback)
    return { winId: '', winHandle: '' }
  }
  if (!driver) {
    driver = await new Builder()
              .usingServer('http://localhost:9515') 
              .setChromeOptions(new chrome.Options().debuggerAddress('localhost:9222'))
              .forBrowser(Browser.CHROME).build();
  }

  const proxyWindow = new BrowserWindow({
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
  // proxyWindow.webContents.on('login', (event, details, authInfo, callback) => {
  //   event.preventDefault()
  //   // callback('fwhfvpch01', 'ttchtlin01') 
  //   // trunks_life-120_session-PK7C1OUcXC:123456
  //   // callback('trunks_life-120_session-PK7C1OUcXC', '123456')
  //   callback(ipAccount, ipPassword) 
  // })

  // if (ip) {
  //   await proxyWindow.webContents.session.setProxy({ 
  //     proxyRules: ip
  //     // proxyRules: '175.6.77.124:14263'
  //     // proxyRules: '45.203.141.3:7000'
  //     // proxyRules: 'proxy.smartproxycn.com:1000'
  //   });
  // }
  
  await proxyWindow.loadURL('https://www.xiaohongshu.com/explore')

  const windows = await driver.getAllWindowHandles()
  
  proxyWindow.on('close', callback)
  
  return { winId: proxyWindow.id, winHandle: windows[windows.length - 1]}
}

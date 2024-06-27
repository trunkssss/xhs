const { app, BrowserWindow, ipcMain, BrowserView } = require('electron')
const path = require('node:path')
const { Builder, By, Browser } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const http = require('https');

// const { SocksProxyAgent } = require('socks-proxy-agent');

// const agent = new SocksProxyAgent('socks://isbuqhwq34:utdfrkcy68@45.203.141.3:7000');

// http.get('https://ipinfo.io', { agent }, (res) => {
// 	// console.log(res.headers);
// 	res.pipe(process.stdout);
// });

const { exec } = require('child_process');
app.commandLine.appendSwitch('remote-debugging-port', '9222');
// 忽略证书相关错误
app.commandLine.appendSwitch('ignore-certificate-errors')

exec(path.join(__dirname, '/node_modules/.bin/chromedriver'), (error, stdout, stderr) => {
  if (error) {
    console.error(`执行的错误: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  if (stderr) {
    console.log(`stderr: ${stderr}`);
  }
})

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
    console.log('login')
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

  win1.webContents.openDevTools()

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


  const win = new BrowserWindow({
    width: 1290,
    height: 780,
    autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  win.loadFile('index.html')

  win.webContents.openDevTools()

  win.on('ready-to-show', () => {
    // win.setMenu(null);
  });
}

app.whenReady().then(() => {
  ipcMain.handle('runSelenium', runSelenium)
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

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

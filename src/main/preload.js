const { contextBridge, ipcRenderer } = require('electron')

window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const dependency of ['chrome', 'node', 'electron']) {
    replaceText(`${dependency}-version`, process.versions[dependency])
  }
})

contextBridge.exposeInMainWorld('mainContext', {
  // node: () => process.versions.node,
  // chrome: () => process.versions.chrome,
  // electron: () => process.versions.electron,
  controlSelenium: (status, data) => ipcRenderer.invoke('controlSelenium', status, data),
  toggleWindow: (data) => ipcRenderer.invoke('toggleWindow', data),
  onProxyWinClose: (callback) => {
    ipcRenderer.once('proxyWinClose', callback); 
  },
})



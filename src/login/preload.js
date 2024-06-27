const { contextBridge, ipcRenderer } = require('electron')
contextBridge.exposeInMainWorld('loginContext', {
  loginSuccess: () => ipcRenderer.invoke('loginSuccess'),
})

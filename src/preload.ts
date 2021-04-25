const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('dpckerApi', {
  invoke: (test: string): Promise<any> => ipcRenderer.invoke('request', test),
})

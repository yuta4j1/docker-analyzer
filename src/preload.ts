const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('dockerApi', {
  invoke: (test: string): Promise<any> => ipcRenderer.invoke('request', test),
})

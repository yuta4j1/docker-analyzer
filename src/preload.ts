const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('dockerApi', {
  invoke: (reqParam: { url: string }): Promise<any> =>
    ipcRenderer.invoke('api-request', reqParam),
})

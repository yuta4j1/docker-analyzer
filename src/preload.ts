const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('dockerApi', {
  get: (reqParam: { url: string }): Promise<any> =>
    ipcRenderer.invoke('api-request-get', reqParam),
  post: (reqParam: { url: string }): Promise<any> =>
    ipcRenderer.invoke('api-request-post', reqParam),
})

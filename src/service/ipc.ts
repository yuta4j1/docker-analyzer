import { ipcRenderer } from 'electron'

export const requestHttp = (): Promise<any> => {
  return ipcRenderer.invoke('call-action', 'test')
}

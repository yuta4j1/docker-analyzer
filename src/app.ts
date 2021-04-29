const { app, BrowserWindow, ipcMain } = require('electron')
import http from 'http'
import { convertToCamelcase } from './helper/json'
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('./dist/index.html')
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
})

const getRequest = async <T>(url: string): Promise<T> => {
  return new Promise<T>((resolve, reject) => {
    const clientRequest = http.request(
      {
        socketPath: '/var/run/docker.sock',
        path: url,
      },
      (res) => {
        res.setEncoding('utf8')
        let chunk = ''
        res.on('data', (data) => (chunk += data))

        res.on('end', () => {
          try {
            const parsed = JSON.parse(chunk)
            resolve(convertToCamelcase(parsed))
          } catch (err) {
            console.error(err)
          }
        })
        res.on('error', (err) => {
          console.error(err)
          reject(err)
        })
      }
    )
    clientRequest.end()
  })
}

// Main process
ipcMain.handle('request', async (event, someArgument) => {
  // console.log('event', event)
  console.log('someArgument', someArgument)
  const res = await getRequest('/v1.40/containers/json?all=1')
  return res
})

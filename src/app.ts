const { app, BrowserWindow, ipcMain } = require('electron')
import net from 'net'
import http from 'http'
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

// Main process
ipcMain.handle('request', async (event, someArgument) => {
  // console.log('event', event)
  console.log('someArgument', someArgument)

  const clientRequest = http.request(
    {
      socketPath: '/var/run/docker.sock',
      path: '/v1.40/containers/json?all=true',
    },
    (res) => {
      console.log('statuscode', res.statusCode)
      res.setEncoding('utf8')

      res.on('data', (data) => {
        try {
          const parsed = JSON.parse(data)
          console.log(parsed)
        } catch (err) {
          console.error(err)
        }
      })
      // res.on('error', (err) => console.error(err))
    }
  )
  clientRequest.end()
  return 'ok'
})

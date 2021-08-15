const { app, BrowserWindow, ipcMain } = require('electron')
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from 'electron-devtools-installer'
import http from 'http'
import { convertToCamelcase } from './helper/json'
const path = require('path')

function createWindow() {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
  })

  win.loadFile('./dist/index.html')
}

app.whenReady().then(() => {
  // installExtension(REACT_DEVELOPER_TOOLS)
  //   .then((name) => console.log(`Added Extension:  ${name}`))
  //   .catch((err) => console.log('An error occurred: ', err))

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
        method: 'GET',
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

const postRequest = async (url: string): Promise<any> => {
  return new Promise<any>((resolve, reject) => {
    const clientRequest = http.request(
      {
        method: 'POST',
        socketPath: '/var/run/docker.sock',
        path: url,
        headers: {
          'Content-Type': 'application/json',
        },
      },
      (res) => {
        res.setEncoding('utf8')
        let chunk = ''
        res.on('data', (data) => (chunk += data))

        res.on('end', () => {
          try {
            if (chunk && chunk.length > 0) {
              const parsed = JSON.parse(chunk)
              resolve(convertToCamelcase(parsed))
            }
            resolve({})
          } catch (err) {
            console.log('kokoka????? chunk', chunk)
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
ipcMain.handle('api-request-get', async (event, arg) => {
  const res = await getRequest(`/v1.40/${arg.url}`)
  return res
})

ipcMain.handle('api-request-post', async (event, arg) => {
  const res = await postRequest(`/v1.40/${arg.url}`)
  return res
})

const { app, BrowserWindow } = require('electron')
const { ipcMain } = require('electron')

function createWindow() {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  })

  win.loadFile('./template/index.html')
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

ipcMain.handle('call-action', (event, ...args) => {
  console.log('event', event)
})

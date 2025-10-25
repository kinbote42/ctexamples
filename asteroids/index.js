const electron = require('electron')
const {app, BrowserWindow} = electron

app.on('window-all-closed', function() {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('ready', function () {
  let mainWindow = new BrowserWindow({width: 400, height: 400})
  mainWindow.loadURL('file://' + __dirname + '/index.html')
//  mainWindow.openDevTools()
  mainWindow.on('closed', function () {
    mainWindow = null
  })
})

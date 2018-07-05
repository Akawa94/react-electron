const { app, BrowserWindow } = require('electron');
const path = require('path');

let mainWindow;

const createWindow = () => {
  console.log('creating window');
  const width = 1400;
  const height = 1000;
  mainWindow = new BrowserWindow({ width, height });

  const startUrl =
    process.env.ELECTRON_START_URL ||
    url.format({
      pathname: path.join(__dirname, '/../build/index.html'),
      protocol: 'file:',
      slashes: true
    });
  mainWindow.loadURL(startUrl);
  console.log(`startUrl ${startUrl}`);

  mainWindow.on('closed', () => {
    console.log('closed window');
    mainWindow = null;
  });
};

app.on('ready', () => {
  createWindow();
});

app.on('window-all-closed', () => {
  console.log('window-all-closed');
  if (process.platform === 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  console.log('activate');
  if (mainWindow === null) {
    createWindow();
  }
});

//electron

const { app, BrowserWindow } = require('electron');
const path = require('path');
const isDev = require('electron-is-dev');

function createWindow() {
    // Create the browser window.
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        }
    });

    // Load the index.html of the app.
    win.loadURL(
        isDev
            ? 'http://localhost:3000' // Dev server ran by React scripts
            : `file://${path.join(__dirname, '../build/index.html')}` // Production build file
    );

    // Open the DevTools.
    if (isDev) {
        win.webContents.openDevTools();
    }
}

// This method will be called when Electron has finished initialization.
app.whenReady().then(createWindow);

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
    // On macOS, recreate a window in the app when the dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

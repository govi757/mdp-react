const { app, BrowserWindow,ipcMain, Notification,dialog, } = require('electron');
const path = require('path');
const fs = require("fs");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    }
  });

  mainWindow.loadFile(path.join(__dirname, 'dist/index.html'));
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

app.on('activate', () => {
  if (mainWindow === null) createWindow();
});

ipcMain.on("notify", (event, message) => {
    console.log("Notify called")
    new Notification({ title: "Notification", body: message }).show();
});


ipcMain.handle("read-file", async (event, src) => {
    const p = new Promise((res) => {
      fs.readFile(src, "utf8", (err, jsonString) => {
        if (err) {
          console.log("File read failed:", err);
          res("{}");
        }
        res(jsonString);
      });
    });
  
    return p;
  });

  ipcMain.handle("read-dir", async (event, src) => {
    const response = await fs.readdirSync(src);
    return response;
  });

  ipcMain.handle("open-folder", async (event, message) => {


    const response = await dialog.showOpenDialog({
      properties: ["openFile"],
    });
    return response;
  });
  ipcMain.handle("is-file-exist", async (event, src) => {
    const response = await fs.existsSync(src);
    return response;
  });

  ipcMain.on("write-file", (event, path, content = "{}") => {
    try {
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  
    const filePath = path;
    fs.writeFileSync(filePath, content);
  } catch(e) {
    console.log(e)
  }
  });

  ipcMain.on("create-file", async (event, path, fileName, content) => {

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
  
    const filePath = path + "/" + fileName;
      if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, content);
      }
    
  });
const { app, BrowserWindow, nativeImage, session } = require("electron");
const fs = require("fs");
const path = require("path");

let mainWindow;
let reloadTimer;

function createWindow() {
  const iconPath = path.join(__dirname, "assets", "logo.ico");
  const icon = nativeImage.createFromPath(iconPath);

  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 360,
    minHeight: 560,
    title: "Your Schedule",
    icon,
    backgroundColor: "#f5f6f1",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

function watchForChanges() {
  const files = ["index.html", "styles.css", "app.js"];

  files.forEach((file) => {
    const filePath = path.join(__dirname, file);
    fs.watch(filePath, { persistent: false }, () => {
      clearTimeout(reloadTimer);
      reloadTimer = setTimeout(() => {
        if (mainWindow && !mainWindow.isDestroyed()) {
          mainWindow.webContents.reloadIgnoringCache();
        }
      }, 160);
    });
  });
}

app.setName("Your Schedule");
app.setPath("userData", path.join(app.getPath("appData"), "Zaman Takvimi"));

app.whenReady().then(() => {
  session.defaultSession.setPermissionRequestHandler((_webContents, permission, callback) => {
    callback(permission === "notifications");
  });

  createWindow();
  if (!app.isPackaged) watchForChanges();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});



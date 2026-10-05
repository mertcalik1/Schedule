const { app, BrowserWindow, nativeImage, session } = require("electron");
const fs = require("fs");
const path = require("path");

let mainWindow;
let reloadTimer;
let autoUpdater;

try {
  ({ autoUpdater } = require("electron-updater"));
} catch {
  autoUpdater = null;
}

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

function setupAutoUpdates() {
  if (!app.isPackaged || !autoUpdater) return;

  autoUpdater.autoDownload = true;
  autoUpdater.on("error", (error) => {
    console.warn("Auto update failed", error);
  });
  autoUpdater.on("update-downloaded", () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
      mainWindow.webContents.send("update-downloaded");
    }
  });
  autoUpdater.checkForUpdatesAndNotify().catch((error) => {
    console.warn("Auto update check failed", error);
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
  setupAutoUpdates();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});



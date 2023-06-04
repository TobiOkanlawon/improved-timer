const { app, BrowserWindow } = require("electron");
const path = require("path");
const express = require("express");

const expressInstance = express();
const port = 7757;

const options = {
  root: path.join(__dirname, "timer", "dist"),
};

expressInstance.get("/", (req, res) => {
  res.sendFile("index.html", options);
});

expressInstance.use(
  "/assets",
  express.static(path.join(options.root, "assets"))
);

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
  });

  win.loadURL(`http://localhost:${port}`);
};

const readyCallback = () => {
  app.whenReady().then(() => {
    createWindow();
    app.on("activate", () => {
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  });
};

expressInstance.listen(port, readyCallback);

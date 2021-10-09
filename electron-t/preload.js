const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myAPI", {
  desktop: true,
  selectFile: () => {
    return ipcRenderer.sendSync("selectFile");
  },

  selectFolder: () => {
    return ipcRenderer.sendSync("selectFolder");
  },

  runCmd: ({ cmd, src, dest }) => {
    if (!src.length || !dest) {
      return;
    }
    let args = [];
    switch (cmd) {
      case "cp":
        args = [...src, ...dest];
        break;
      case "7zz":
        args = ["x", ...src, `-o${dest[0]}`];
        break;
      default:
        break;
    }
    
    return ipcRenderer.sendSync("runCmd", cmd, args);
  },
});

// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const type of ["chrome", "node", "electron"]) {
    replaceText(`${type}-version`, process.versions[type]);
  }
});

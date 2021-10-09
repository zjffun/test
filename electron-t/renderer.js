// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// No Node.js APIs are available in this process because
// `nodeIntegration` is turned off. Use `preload.js` to
// selectively enable features needed in the rendering
// process.

document.body.insertAdjacentHTML("beforeend", JSON.stringify(window.myAPI));

const srcFileEl = document.querySelector(".srcFiles");
let srcFile = [];
document.getElementById("selectFile").addEventListener("click", (params) => {
  const filePaths = window.myAPI.selectFile();
  if (!filePaths) {
    return;
  }
  srcFile = srcFile.concat(filePaths);
  filePaths.forEach((path) => {
    srcFileEl.innerHTML += `<p>${path}</p>`;
  });
});

const destFolderEl = document.querySelector(".destFolder");
let destFolder = "";
document.getElementById("selectFolder").addEventListener("click", (params) => {
  const path = window.myAPI.selectFolder();
  if (!path) {
    return;
  }
  destFolder = path;
  destFolderEl.innerHTML += `<p>${path}</p>`;
});

document.getElementById("cp").addEventListener("click", (params) => {
  const res = window.myAPI.runCmd({
    cmd: "cp",
    src: srcFile,
    dest: destFolder,
  });
  console.log(res);
});

document.getElementById("7zz").addEventListener("click", (params) => {
  const res = window.myAPI.runCmd({
    cmd: "7zz",
    src: srcFile,
    dest: destFolder,
  });
  console.log(res);
});

const { ipcRenderer, contextBridge } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    notificationApi: {
        sendNotification(message) {
          ipcRenderer.send("notify", message);
        },
      },
      filesApi: {
        openFolder(res = () => {}) {
            ipcRenderer.invoke("open-folder", "Hello").then((response) => {
              res(response);
            });
          },
          readDir(src, res = () => {}) {
            ipcRenderer.invoke("read-dir", src).then((response) => {
              res(response);
            });
          },
          writeFile(src, content) {
            // const filePath = `${src}/${fileName}`;
            ipcRenderer.send("write-file", src,content);
          },
          createFile(src, fileName,content="{}") {
            // const filePath = `${src}/${fileName}`;
            ipcRenderer.send("create-file", src, fileName,content);
          },
          // readFile(src, fileName, res=() => {}) {
          //   const filePath = `${src}/${fileName}`;
          //   return ipcRenderer.invoke("read-file", filePath)
          // },
          readFile(src, res=() => {}) {
            
            return ipcRenderer.invoke("read-file", src)
          },
          isFileExists(src, fileName) {
            const filePath = src + fileName;
            ipcRenderer.invoke("is-file-exist", filePath).then((response) => {
              res(response);
            });
          },
      }
})
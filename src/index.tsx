import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import IPreLoad from "./general/interfaces";
const electron: IPreLoad = ((window as any).electron as IPreLoad) || {};
const App = () => {
  const [content, setContent] = useState("");
  const [selectedFilePath, setSelectedFilePath] = useState("");
  const openFolder = () => {
    electron.filesApi.openFolder((res) => {
      console.log(res);
      setSelectedFilePath(res.filePaths[0])
      electron.filesApi
        .readFile(res.filePaths[0])
        .then((fileRes) => {
          console.log(fileRes, "fileRes");
          setContent(fileRes);
        });
    });
  };

  const updateContentInFile = () => {
    electron.filesApi.writeFile(selectedFilePath, content);
    alert("Sucessfully edited the content")
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div>
        <button
          onClick={() => {
            openFolder();
          }}
        >
          Open Folder
        </button>
      </div>
      <div>
        <textarea
          style={{ minHeight: 300, marginTop: 20, width: 300 }}
          minLength={10}
          value={content}
          onInput={(event: any) => setContent(event.target.value)}
        ></textarea>
        
      </div>
      <button
          onClick={() => {
            updateContentInFile();
          }}
        >
          Update
        </button>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("app"));

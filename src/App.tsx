import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SideMenu from "./side-menu/sideMenu";
import SideEditor from "./side-editor/sideEditor";
import CodePlayer from "./player/codeplayer";
import SpritManager from "./sprit-manager/spritManager";
import codeService from "./service/code.service";

function App() {
  return (
    <div className="flex-col" style={{ width: "100%", height: "100%" }}>
      <div
        className="flex-row"
        style={{ backgroundColor: "black", color: "white" }}
      >
        <div className="flex-item" style={{ padding: 10 }}>Scrap UI</div>
        <button style={{margin: "0 2px", backgroundColor:"blue"}} onClick={()=>codeService.event(1)}>Event 1</button>
        <button style={{margin: "0 2px", backgroundColor:"blue"}} onClick={()=>codeService.event(2)}>Event 2</button>
        <button style={{margin: "0 2px", backgroundColor:"blue"}} onClick={()=>codeService.event(3)}>Event 3</button>
      </div>
      <div className="flex-row flex-item" style={{minHeight: 0, overflow: "hidden"}}>
        <SideMenu></SideMenu>
        <SideEditor></SideEditor>
        <div className="flex-item flex-col">
          <div className="flex-item">
            <CodePlayer></CodePlayer>
          </div>
          <div style={{height: "30vh", border:"dashed 1px"}}>
            <SpritManager></SpritManager>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

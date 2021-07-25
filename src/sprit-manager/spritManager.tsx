import React from "react";
import codeService, { SpiritRootBlock } from "../service/code.service";

export default class SpritManager extends React.Component {
  fileInputRef = React.createRef<HTMLInputElement>();
  state:{
      selectedSpirit: SpiritRootBlock | null,
      codes: {[id:string]: SpiritRootBlock}
  } = {
    selectedSpirit: codeService.selectedSpirit,
    codes: codeService.codes
  };
  addNewSprit(e: any) {
    if (e.target.value === "") return;
    console.log(e.target.files[0]);
    codeService.addSpirit(e.target.files[0]);
    e.target.value = "";
  }
  selectSpirit() {}

  componentDidMount() {
    codeService.$spritSelected.subscribe((val)=>{
        this.setState({
            selectedSpirit: val
        })
    })
    codeService.$spritUpdated.subscribe((val)=>{
        this.setState({
            codes: val
        });

    });
  }
  componentWillUnmount() {
    Object.values(this.state.codes).forEach((x) => URL.revokeObjectURL(x.url));
  }
  render() {
    return (
      <div
        className="flex-row"
        style={{
          width: "100%",
          height: "100%",
          flexWrap: "wrap",
          overflowY: "auto",
        }}
      >
        <input
          type="file"
          style={{ display: "none" }}
          ref={this.fileInputRef}
          onChange={(e) => this.addNewSprit(e)}
        />
        <button onClick={() => this.fileInputRef.current?.click()}>
          New Sprit
        </button>
        {Object.keys(this.state.codes).map((id, key) => {
          return (
            <div className="flex-col" style={{margin: 10, border: this.state.selectedSpirit?.id === id ? "solid 2px blue" : "solid 1px black"}} key={id}>
              <img src={this.state.codes[id].url} style={{ width: 140, height: 140 }} alt="" />
              <div className="flex-row">
                <button onClick={()=>codeService.selectSpirit(id)} className="flex-item">select</button>
                <button onClick={()=>codeService.removeSpirit(id)}>X</button>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

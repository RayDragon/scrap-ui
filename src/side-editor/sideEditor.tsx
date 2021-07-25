import React from "react";
import dragDropService from "../service/drag-drop.service";

import codeService, {
  RootBlock,
  SpiritRootBlock,
} from "../service/code.service";
import CodeBlock from "../service/codeBlock";
import CodeContainer from "./code-container";

export default class SideEditor extends React.Component {
  droppableDivRef = React.createRef<HTMLDivElement>();
  state: {
    rootCodes: SpiritRootBlock | null;
  } = {
    rootCodes: codeService.selectedSpirit,
  };

  componentDidMount() {
    (window as any).$(this.droppableDivRef.current).droppable({
      greedy: true,
      drop: () => this.itemDrop(),
    });
    dragDropService.$dragStopped.subscribe(() => {
      this.setState({
        rootCodes: codeService.selectedSpirit,
      });
    });
    codeService.$spritSelected.subscribe((val)=>{
        this.setState({rootCodes: val});
    });
  }

  itemDrop() {
    // console.log("Size just before drop:", codeService.codeBlocks.length);
    if (this.droppableDivRef.current) {
      console.log("Item was dropped");
      let position = dragDropService.getOffsetValuesOfDrop(
          this.droppableDivRef.current
        ),
        drag_data = dragDropService.drag_data;

      if (drag_data.type === "menu") {
        codeService.selectedSpirit?.rootBlocks.push({
          position,
          code: new CodeBlock(codeService.selectedSpirit, drag_data.data, null, null, null, 0),
        });
      } else if (drag_data.type === "code") {
        drag_data.data.parent = null;
        codeService.selectedSpirit?.rootBlocks.push({
          position,
          code: drag_data.data as CodeBlock,
        });
      }
      // if drooped here, means its a root element
      this.setState({
        rootCodes: codeService.selectedSpirit,
      });
      //   dragDropService.$dragStopped.next();
    }
  }

  render() {
    //   console.log(codeService.selectedSpirit?.rootBlock.length);
    return (
      <div
        ref={this.droppableDivRef}
        className="flex-item"
        style={{
          position: "relative",
          border: "dotted 1px black",
          zIndex: 0,
          minWidth: "40vw",
        }}
      >
        {this.state.rootCodes == null ? (
          <h1>Please add or / and select a sprit first</h1>
        ) : null}
        {this.state.rootCodes?.rootBlocks.map((item: RootBlock, key: number) => (
          <CodeContainer
            key={key + "_" + item.code.id}
            style={{
              position: "absolute",
              top: item.position.y + "px",
              left: item.position.x + "px",
            }}
            item={item.code}
          ></CodeContainer>
        ))}
      </div>
    );
  }
}

import React from "react";
import dragDropService from "../service/drag-drop.service";
import DraggableComponent from "./draggable";
import "./sideMenu.css";

export default class SideMenu extends React.Component {
  // constructor(props: any) {
  //     super(props);
  //     this.state = {

  //     };
  // }
  componentDidMount() {
    dragDropService.$dragStopped.subscribe(() => {
      this.forceUpdate();
    });
  }

  render() {
    return (
        <div style={{zIndex:0, padding: 10, overflow: "auto", height:"100%"}}>
            <div className="flex-col" style={{zIndex:0}}>
          <h5>Motion</h5>
        <DraggableComponent resetOnDrop menuType="move">
          <div className="flex-col" style={{overflow: "hidden"}}>
              <div className="flex-row" style={{position: "absolute", top: -10, width:"100%"}}>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px", backgroundColor:"yellow"}}></div>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "0px 0px 1px 0px"}}></div>
                <div className="flex-item" style={{backgroundColor:"yellow", minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px"}}></div>
              </div>
              <div className="flex-row" style={{backgroundColor: "yellow", padding: 5, border: "solid", borderWidth: "0px 1px 0px 1px"}}>
                  {/* <div style={{backgroundColor: "yellow", width: 10}}></div> */}
                <div className="flex-item" style={{margin: 5}}>Move Forward</div>
                <input type="number" min="0" style={{width: 30}} />
                steps
              </div>
              <div className="flex-row">
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div style={{width: 30, minHeight: 10,  backgroundColor:"yellow", border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
              </div>
          </div>
        </DraggableComponent>
        <DraggableComponent resetOnDrop menuType="rotate">
        <div className="flex-col" style={{overflow: "hidden"}}>
              <div className="flex-row" style={{position: "absolute", top: -10, width:"100%"}}>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px", backgroundColor:"yellow"}}></div>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "0px 0px 1px 0px"}}></div>
                <div className="flex-item" style={{backgroundColor:"yellow", minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px"}}></div>
              </div>
              <div className="flex-row" style={{backgroundColor: "yellow", padding: 5, border: "solid", borderWidth: "0px 1px 0px 1px"}}>
                  {/* <div style={{backgroundColor: "yellow", width: 10}}></div> */}
                <div className="flex-item" style={{margin: 5}}>Rotate</div>
                <input type="number" min="0" style={{width: 30}} />  deg
              </div>
              <div className="flex-row"  >
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div style={{width: 30, minHeight: 10,  backgroundColor:"yellow", border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
              </div>
          </div>
        </DraggableComponent>
        <DraggableComponent resetOnDrop menuType="delay">
        <div className="flex-col" style={{overflow: "hidden"}}>
              <div className="flex-row" style={{position: "absolute", top: -10, width:"100%"}}>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px", backgroundColor:"yellow"}}></div>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "0px 0px 1px 0px"}}></div>
                <div className="flex-item" style={{backgroundColor:"yellow", minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px"}}></div>
              </div>
              <div className="flex-row" style={{backgroundColor: "yellow", padding: 5, border: "solid", borderWidth: "0px 1px 0px 1px"}}>
                  {/* <div style={{backgroundColor: "yellow", width: 10}}></div> */}
                <div className="flex-item" style={{margin: 5}}>Delay</div>
                <input type="number" min="0" style={{width: 30}} /> Sec
              </div>
              <div className="flex-row"  >
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div style={{width: 30, minHeight: 10,  backgroundColor:"yellow", border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
              </div>
          </div>
        </DraggableComponent>
        <br />
        <h5>Looks</h5>
        <DraggableComponent resetOnDrop menuType="sound">
            <div className="flex-col" style={{overflow: "hidden"}}>
              <div className="flex-row" style={{position: "absolute", top: -10, width:"100%"}}>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px", backgroundColor:"green"}}></div>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "0px 0px 1px 0px"}}></div>
                <div className="flex-item" style={{backgroundColor:"green", minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px"}}></div>
              </div>
              <div className="flex-row" style={{backgroundColor: "green", padding: 5, border: "solid", borderWidth: "0px 1px 0px 1px"}}>
                  {/* <div style={{backgroundColor: "green", width: 10}}></div> */}
                <div className="flex-item" style={{margin: 5}}>Play Sound</div>
              </div>
              <div className="flex-row"  >
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div style={{width: 30, minHeight: 10,  backgroundColor:"green", border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
              </div>
          </div>
        </DraggableComponent>
        <br />
        <h5>Event</h5>
        <DraggableComponent resetOnDrop menuType="e1">
            <div className="flex-col" style={{overflow: "hidden"}}>
              <div className="flex-row" style={{position: "absolute", top: -10, width:"100%"}}>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 1px", backgroundColor:"blue"}}></div>
                <div style={{width: 30, minHeight: 10, backgroundColor:"blue", border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div className="flex-item" style={{backgroundColor:"blue", minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 0px"}}></div>
              </div>
              <div className="flex-row" style={{backgroundColor: "blue", padding: 5, border: "solid", borderWidth: "0px 1px 0px 1px"}}>
                  {/* <div style={{backgroundColor: "blue", width: 10}}></div> */}
                <div className="flex-item" style={{margin: 5}}>On Event One</div>
              </div>
              <div className="flex-row"  style={{width: '100%', }}>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div style={{width: 30, minHeight: 10,  backgroundColor:"blue", border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
              </div>
          </div>
        </DraggableComponent>
        <DraggableComponent resetOnDrop menuType="e2">
            <div className="flex-col" style={{overflow: "hidden"}}>
              <div className="flex-row" style={{position: "absolute", top: -10, width:"100%"}}>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 1px", backgroundColor:"blue"}}></div>
                <div style={{width: 30, minHeight: 10, backgroundColor:"blue", border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div className="flex-item" style={{backgroundColor:"blue", minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 0px"}}></div>
              </div>
              <div className="flex-row" style={{backgroundColor: "blue", padding: 5, border: "solid", borderWidth: "0px 1px 0px 1px"}}>
                  {/* <div style={{backgroundColor: "blue", width: 10}}></div> */}
                <div className="flex-item" style={{margin: 5}}>On Event Two</div>
              </div>
              <div className="flex-row"  style={{width: '100%', }}>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div style={{width: 30, minHeight: 10,  backgroundColor:"blue", border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
              </div>
          </div>
        </DraggableComponent>
        <DraggableComponent resetOnDrop menuType="e3">
            <div className="flex-col" style={{overflow: "hidden"}}>
              <div className="flex-row" style={{position: "absolute", top: -10, width:"100%"}}>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 1px", backgroundColor:"blue"}}></div>
                <div style={{width: 30, minHeight: 10, backgroundColor:"blue", border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div className="flex-item" style={{backgroundColor:"blue", minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 0px"}}></div>
              </div>
              <div className="flex-row" style={{backgroundColor: "blue", padding: 5, border: "solid", borderWidth: "0px 1px 0px 1px"}}>
                  {/* <div style={{backgroundColor: "blue", width: 10}}></div> */}
                <div className="flex-item" style={{margin: 5}}>On Event Three</div>
              </div>
              <div className="flex-row"  >
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div style={{width: 30, minHeight: 10,  backgroundColor:"blue", border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
              </div>
          </div>
        </DraggableComponent>
        <br />
        <h5>Control</h5>
        <DraggableComponent resetOnDrop  menuType="repeat">
        <div className="flex-col" style={{overflow: "hidden"}}>
              <div className="flex-row" style={{position: "absolute", top: -10, width:"100%"}}>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px", backgroundColor:"red"}}></div>
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "0px 0px 1px 0px"}}></div>
                <div className="flex-item" style={{backgroundColor:"red", minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px"}}></div>
              </div>
              <div className="flex-row" style={{backgroundColor: "red", padding: 5, border: "solid", borderWidth: "0px 1px 0px 1px"}}>
                <div className="flex-item" style={{margin: 5}}>Repeat</div>
                <input type="number" min="0" style={{width: 30}} />
                times
              </div>
              <div className="flex-row" style={{ minHeight: 30, border:"solid", borderWidth: "0 0px 0 1px"}}>
                  <div style={{minHeight: '100%', backgroundColor: "red", width: 10, border: "solid", borderWidth:"0 0px 0 0"}}></div>
                  <div className="flex-col flex-item" style={{position: "relative"}}>
                    <div className="flex-row" style={{width:"100%"}}>
                        <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                        <div style={{width: 30, minHeight: 10,  backgroundColor:"red", border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                        <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                    </div>
                    <div style={{minHeight: 10}}></div>
                    <div className="flex-row"  style={{position: "absolute", bottom: 0, width: '100%'}}>
                        <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 0px", backgroundColor:"red"}}></div>
                        <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "0px 0px 1px 0px"}}></div>
                        <div className="flex-item" style={{backgroundColor:"red", minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px"}}></div>
                    </div>
                  </div>
              </div>
              <div style={{backgroundColor:"red", height: 10, border:"solid", borderWidth:"0 1px 0 1px"}}></div>
              <div className="flex-row"  >
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div style={{width: 30, minHeight: 10,  backgroundColor:"red", border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
              </div>
          </div>
        </DraggableComponent>
        <br /><br />
        {/* <div className="item draggable">Some Item</div>
        <div className="item draggable">Some Item</div>
        <div className="item draggable">Some Item</div>
        <div className="item draggable">Some Item</div> */}
      </div>
    
        </div>
        );
  }
}

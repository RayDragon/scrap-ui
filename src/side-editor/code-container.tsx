import React from "react";
import { Subscription } from "rxjs";
import codeService from "../service/code.service";
import CodeBlock from "../service/codeBlock";
import dragDropService from "../service/drag-drop.service";



export default class CodeContainer extends React.Component<{
  item: CodeBlock;
  style?: any;
}> {
  currentContainerRef = React.createRef<HTMLDivElement>();
  
  childContainerRef1 = React.createRef<HTMLDivElement>();
  childContainerRef2 = React.createRef<HTMLDivElement>();
  childDummyRef = React.createRef<HTMLDivElement>();
  
  nextContainerRef1 = React.createRef<HTMLDivElement>();
  nextContainerRef2 = React.createRef<HTMLDivElement>();
  nextDummyRef = React.createRef<HTMLDivElement>();
  

  state: {
    item: CodeBlock;
  } = {
    item: this.props.item,
  };

  thisIsDraggable() {
    (window as any).$(this.currentContainerRef.current).draggable({
      start: () => {
        dragDropService.setOffsetValuesOfDrag(
          this.currentContainerRef.current as HTMLDivElement
        );
        dragDropService.$dragStarted.next(this.props.item.type);
        // Set Drag Data
        dragDropService.drag_data = { data: this.props.item, type: "code" };

        // Remove element from parent
        if (["none", null, ""].includes(this.props.item.parent) && codeService.selectedSpirit) {
          console.log("Removed item from codeBlocks");
          codeService.selectedSpirit.rootBlocks = codeService.selectedSpirit.rootBlocks.filter(
            (x) => x.code !== this.props.item
          );
          //   console.log(codeService.codeBlocks.length);
        } else if (
          (this.props.item.parent as CodeBlock).next === this.props.item
        ) {
          this.props.item.parent.next = null;
        } else if (
          (this.props.item.parent as CodeBlock).child === this.props.item
        ) {
          this.props.item.parent.child = null;
        } else {
          console.log("No parent matched", this.props.item);
        }
      },
    });
  }

  childAcceptsDraggable() {
    if (!this.childContainerRef1.current) return;
    let elements = [
        this.childContainerRef1.current,
        this.state.item.type === "repeat" ? this.childContainerRef2.current : undefined,
      ].filter(x=>x!==undefined);

    (window as any)
      .$(elements)
      .droppable({
        greedy: true,
        over: (a: any, b: any) => {
          if (this.childDummyRef.current){
              this.childDummyRef.current.style.display = "block";
              let drag_data = dragDropService.drag_data,
              height  = drag_data.type === "menu" ? drag_data.data === "repeat" ? 92 : 52 : drag_data.data.type === "repeat" ? 92: 52;
              this.childDummyRef.current.style.minHeight = height+"px";
          }
          // console.log("Overed!");
        },
        out: () => {
          if (this.childDummyRef.current){
              this.childDummyRef.current.style.display = "none";
              this.childDummyRef.current.style.minHeight = "0";
          }
        },
        drop: () => {
          let drag_data = dragDropService.drag_data;
          if(drag_data.type === "menu") {
            let child_item = new CodeBlock(this.props.item.spirit, drag_data.data, null);
            this.props.item.setChild(child_item); 
          } else {
              this.props.item.setChild(dragDropService.drag_data.data);
          }
          dragDropService.$dragStopped.next();
            if (this.childDummyRef.current){
                this.childDummyRef.current.style.display = "none";
                this.childDummyRef.current.style.minHeight = "0";
            }
        },
      });
  }

  nextAcceptsDraggable() {
    if (!this.nextContainerRef1.current || !this.nextContainerRef2) return;
    let elements = [
        this.nextContainerRef1.current,
        this.nextContainerRef2.current
      ].filter(x=>x!==undefined);

    (window as any)
      .$(elements)
      .droppable({
        greedy: true,
        over: (a: any, b: any) => {
          if (this.nextDummyRef.current){
              this.nextDummyRef.current.style.display = "block";
              let drag_data = dragDropService.drag_data,
              height  = drag_data.type === "menu" ? drag_data.data === "repeat" ? 92 : 52 : drag_data.data.type === "repeat" ? 92: 52;
              this.nextDummyRef.current.style.minHeight = height+"px";
          }
          // console.log("Overed!");
        },
        out: () => {
          if (this.nextDummyRef.current){
              this.nextDummyRef.current.style.display = "none";
              this.nextDummyRef.current.style.minHeight = "0";
          }
        },
        drop: () => {
          let drag_data = dragDropService.drag_data;
          if(drag_data.type === "menu") {
            let next_item = new CodeBlock(this.props.item.spirit, drag_data.data, this.props.item);
            this.props.item.next = next_item; 
          } else {
              this.props.item.next = dragDropService.drag_data.data;
              (this.props.item.next as CodeBlock).parent = this.props.item;
          }
          dragDropService.$dragStopped.next();
            if (this.nextDummyRef.current){
                this.nextDummyRef.current.style.display = "none";
                this.nextDummyRef.current.style.minHeight = "0";
            }
        },
      });
  }

  subscriptons: Subscription[] = [];
  componentDidMount() {
    this.subscriptons.push(dragDropService.$dragStopped.subscribe(() => this.setState({
        item: this.props.item,
      })));
    this.thisIsDraggable();
    this.childAcceptsDraggable();
    this.nextAcceptsDraggable();
  }

  componentWillUnmount() {
      console.log("This component will be deleted..");
      this.subscriptons.forEach(val=>val.unsubscribe());
  }

  getColor() {
      return ({
          move: "yellow",
          rotate: "yellow",
          delay:"yellow",
          sound:"green",
          e1: "blue",
          e2: "blue",
          e3: "blue",
          e4: "blue",
          repeat:"red"
      } as any )[this.state.item.type as any];
  }

    render() {
        let color = this.getColor(), item=this.state.item;
        return (
            <div 
                ref={this.currentContainerRef}
                className="flex-col draggable" 
                style={{...this.props.style, position: item.parent == null ? "absolute" : "unset"}}>
              <div className="flex-row" style={{position: "absolute", top: -10, width: '100%'}}>
                {
                    color === "blue" ? (
                        <React.Fragment>
                            <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 1px", backgroundColor:"blue"}}></div>
                            <div style={{width: 30, minHeight: 10, backgroundColor:"blue", border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                            <div className="flex-item" style={{backgroundColor:"blue", minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 0px"}}></div>
                        </React.Fragment>
                    ) : (
                        <React.Fragment>
                            <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px", backgroundColor:color}}></div>
                            <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "0px 0px 1px 0px"}}></div>
                            <div className="flex-item" style={{backgroundColor:color, minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px"}}></div>
                        </React.Fragment>
                    )
                }
              </div>
              <div className="flex-row" ref={this.childContainerRef1} style={{backgroundColor: color, padding: 5, border: "solid", borderWidth: "0px 1px 0px 1px"}}>
                {
                    item.type === "move" ? (
                        <React.Fragment>
                            <div className="flex-item" style={{margin: 5}}>Move</div>
                            <input type="number" min="0" style={{width: 30}} onChange={(e)=>{
                                    console.log("Setting Value", e.target)
                                    this.props.item.data=parseInt((e.target as HTMLInputElement).value)
                                }
                            } />
                            <div>Steps</div>
                        </React.Fragment>
                    ):(null)
                }
                {
                    item.type === "rotate" ? (
                        <React.Fragment>
                            <div className="flex-item" style={{margin: 5}}>Rotate</div>
                            <input type="number" min="0" style={{width: 30}} onChange={(e)=>{
                                    console.log("Setting Value", e.target)
                                    this.props.item.data=parseInt((e.target as HTMLInputElement).value)
                                }} />
                            <div>Deg</div>
                        </React.Fragment>
                    ):(null)
                }
                {
                    item.type === "delay" ? (
                        <React.Fragment>
                            <div className="flex-item" style={{margin: 5}}>Delay</div>
                            <input type="number" min="0" style={{width: 30}} onChange={(e)=>{
                                    console.log("Setting Value", e.target)
                                    this.props.item.data=parseInt((e.target as HTMLInputElement).value)
                                }} />
                            <div>Sec</div>
                        </React.Fragment>
                    ):(null)
                }
                {
                    ["e1", "e2", "e3", "e4", "e5"].includes(item.type) ? (
                        <React.Fragment>
                            <div className="flex-item" style={{margin: 5}}>On Event {item.type.slice(1, 2)}</div>
                        </React.Fragment>
                    ):(null)
                }
                {
                    item.type === "sound" ? (
                        <React.Fragment>
                            <div className="flex-item" style={{margin: 5}}>Play Sound</div>
                        </React.Fragment>
                    ):(null)
                }
                {
                    item.type === "repeat" ? (
                        <React.Fragment>
                            <div className="flex-item" style={{margin: 5}}>Repeat</div>
                            <input type="number" min="0" style={{width: 30}} onChange={(e)=>{
                                    console.log("Setting Value", e.target)
                                    this.props.item.data=parseInt((e.target as HTMLInputElement).value)
                                }} />
                            <div>Times</div>
                        </React.Fragment>
                    ):(null)
                }
              </div>
              {
                  item.type === "repeat" ? (
                      <React.Fragment>
                          <div className="flex-row" ref={this.childContainerRef2} style={{ minHeight: 30, border:"solid", borderWidth: "0 0px 0 1px"}}>
                              <div style={{ backgroundColor: color, width: 10, minHeight: '100%', border: "solid", borderWidth:"0 0px 0 0"}}></div>
                              <div className="flex-col flex-item" style={{position: "relative"}}>
                                <div className="flex-row" style={{width:"100%"}}>
                                    <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                                    <div style={{width: 30, minHeight: 10,  backgroundColor:color, border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                                    <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                                </div>
                                <div className="flex-col" style={{minHeight: 10, position: "relative"}}>
                                    {
                                        item.child ? (
                                            <CodeContainer style={{width: "100%"}} item={item.child}></CodeContainer>
                                        ):(null)
                                    }

                                    <div  className="dummy" ref={this.childDummyRef} style={{width: "100%", backgroundColor: "#0002", minHeight: 0, display:"none"}}>
                                        <div className="flex-row" style={{position:"relative", top: "-10px", width: "100%"}}>
                                            <div style={{width: 30, minHeight: 10, border: "none", borderWidth: "1px 1px 0px 1px", backgroundColor: "#0002"}}></div>
                                            <div style={{width: 30, minHeight: 10, border: "none", borderWidth: "0px 0px 1px 0px"}}></div>
                                            <div className="flex-item" style={{backgroundColor: "#0002", minHeight: 10, border: "none", borderWidth: "1px 1px 0px 1px"}}></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-row"style={{position: "absolute", bottom: 0, width: '100%'}}>
                                    <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 0px", backgroundColor:color}}></div>
                                    <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "0px 0px 1px 0px"}}></div>
                                    <div className="flex-item" style={{backgroundColor:color, minHeight: 10, border: "solid", borderWidth: "1px 1px 0px 1px"}}></div>
                                </div>
                              </div>
                          </div>
                          <div style={{backgroundColor:color, height: 10, border:"solid", borderWidth:"0 1px 0 1px"}}></div>
                      </React.Fragment>
                  ) : (null)
              }
              <div className="flex-row"  ref={this.nextContainerRef1} >
                <div style={{width: 30, minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
                <div style={{width: 30, minHeight: 10,  backgroundColor:color, border: "solid", borderWidth: "0px 1px 1px 1px"}}></div>
                <div className="flex-item" style={{minHeight: 10, border: "solid", borderWidth: "1px 0px 0px 0px"}}></div>
              </div>
              <div ref={this.nextContainerRef2} className="flex-col" style={{minHeight: 0, position: "relative"}}>
                {
                    item.next ? (
                        <CodeContainer style={{width: "100%"}} item={item.next}></CodeContainer>
                    ):(null)
                }

                <div className="dummy" ref={this.nextDummyRef} style={{width: "100%", backgroundColor: "#0002", minHeight: 0, display:"none"}}>
                    <div className="flex-row" style={{position:"relative", top: "-10px", width: "100%"}}>
                        <div style={{width: 30, minHeight: 10, border: "none", borderWidth: "1px 1px 0px 1px", backgroundColor: "#0002"}}></div>
                        <div style={{width: 30, minHeight: 10, border: "none", borderWidth: "0px 0px 1px 0px"}}></div>
                        <div className="flex-item" style={{backgroundColor: "#0002", minHeight: 10, border: "none", borderWidth: "1px 1px 0px 1px"}}></div>
                    </div>
                </div>
            </div>
          </div>
        )
    }
}

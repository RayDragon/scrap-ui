import React from "react";
import { transform } from "typescript";
import codeService, { SpiritRootBlock } from "../service/code.service";

export default class CodePlayer extends React.Component<any, {
    selectedSpirit: SpiritRootBlock | null,
    codes: {[id: string]: SpiritRootBlock}
}>{
    state = {
        selectedSpirit: codeService.selectedSpirit,
        codes: codeService.codes
    }
    
    componentDidMount() {
        codeService.$spritUpdated.subscribe((val)=>{
            this.setState({codes: val});
        });
        codeService.$spritSelected.subscribe((val)=>this.setState({selectedSpirit: val}));
        codeService.$spiritEvent.subscribe((value)=>{

            // let refElement = this.getRef(value.forSpirit);
            if(!value.forSpirit.position) {
                value.forSpirit.position = {
                    x: 0,
                    y: 0,
                    deg: 0
                }
            }
            if(value.value && value.type === "move" && value.forSpirit.position) {
                let position = value.forSpirit.position;
                let stepSize = value.value;
                let xMove = (Math.round(Math.cos(position.deg * Math.PI / 180) * 100) / 100) * stepSize;
                let yMove = (Math.round(Math.sin(position.deg * Math.PI / 180) * 100) / 100) * stepSize;
                value.forSpirit.position = {
                    x: position.x + xMove,
                    y: position.y + yMove,
                    deg: position.deg
                };
                
            }
            if(value.value && value.type === "rotate" && value.forSpirit.position) {
                value.forSpirit.position.deg += value.value;
            }
            
            console.log(value.forSpirit.position);
            this.forceUpdate();
        });
    }
    refs: {[id: string]: any} = {};

    // getRef(id: string, create=false) {
    //     if(id in this.refs) return this.refs[id];
    //     else if(create) {
    //         this.refs[id] = React.createRef<HTMLImageElement>();
    //         return this.refs[id];
    //     } 
    //     else return undefined;
    // }
    render() {
        return (
            <div className="flex-item flex-col" style={{position:"relative"}}>
                {
                    Object.values(this.state.codes).map((val, index)=>{
                        // ref={this.getRef(val.id)}
                        return (
                            <img 
                            className="spirit draggable" 
                            key={val.id} src={val.url} alt="" 
                            style={{
                                position:"absolute", 
                                width: 100, height: 100, 
                                top: val.position?.y, left: val.position?.x,
                                transform: `rotate(${val.position?.deg}deg)`
                            }} />
                        );
                    })
                }
            </div>
        )
    }
}
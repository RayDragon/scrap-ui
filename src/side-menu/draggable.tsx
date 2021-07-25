import React from "react";
import dragDropService from "../service/drag-drop.service";
import "./sideMenu.css";



export default class DraggableComponent extends React.Component<{resetOnDrop?: boolean, menuType: "move"| "rotate"| "sound"| "e1"| "e2"| "e3"| "e4"| "repeat" | "delay"}> {
    draggableElementRef = React.createRef<HTMLDivElement>();
    
    componentDidMount() {
        (window as any).$(this.draggableElementRef.current).draggable({
            helper: "clone",
            appendTo: "body",
            start: ()=>this.dragStarted(),
            stop: ()=>this.dragStopped()
        });
    }

    dragStarted() {
        dragDropService.setOffsetValuesOfDrag(this.draggableElementRef.current as HTMLDivElement);
        dragDropService.$dragStarted.next(this.props.menuType);
        dragDropService.drag_data = {
            type: "menu",
            data: this.props.menuType
        }
    }

    dragStopped() {
        dragDropService.$dragStopped.next();
        if(this.props.resetOnDrop) {
            this.resetPosition();
        }
    }
    
    resetPosition() {
        if(this.draggableElementRef.current) {
            this.draggableElementRef.current.style.left = "0";
            this.draggableElementRef.current.style.top = "0";
        }
    }

    componentWillUnmount() {
        
    }

    render() {
        return (
            <div className="draggable" style={{position:"relative"}} ref={this.draggableElementRef}>
                {this.props.children}
            </div>
        )
    }
}
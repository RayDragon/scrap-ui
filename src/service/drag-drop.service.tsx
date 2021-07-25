import {Subject } from "rxjs";

interface DragData {
    data: any;
    type: string;
}

class DragDropService {
    currentMouseX: number = 0;
    currentMouseY: number = 0;

    dragOffsetX: number = 0;
    dragOffsetY: number = 0;

    constructor() {
        this.$dragStarted.subscribe(data=>{
            // console.log("Drag Started", data);
        });
        document.onmousemove = (event: MouseEvent) => {
            this.currentMouseX = event.clientX;
            this.currentMouseY = event.clientY;
            // console.log("Mouse Move", event.clientX, event.clientY);
        }
        this.$dragStopped.subscribe(data=>(window as any).$(".dummy").hide());
    }

    drag_data!: DragData;
    register_drag_data(data:DragData) {
        // On drop, droppables should be able to get drag data from here
    }


    setOffsetValuesOfDrag(draggedElement: HTMLDivElement) {
        this.dragOffsetX = this.currentMouseX - draggedElement.getBoundingClientRect().left;
        this.dragOffsetY = this.currentMouseY - draggedElement.getBoundingClientRect().top;
    }

    getOffsetValuesOfDrop(droppedOnElement: HTMLDivElement) {

        return {
            x: (this.currentMouseX - droppedOnElement.offsetLeft) - this.dragOffsetX,
            y: (this.currentMouseY - droppedOnElement.offsetTop) - this.dragOffsetY
        };
    }

    register_droppable(item: any, allowed_draggable_types: any[] = []) {
        // For disabling some droppables based on drag type
    }

    $dragStarted = new Subject<"move"| "rotate"| "sound"| "e1"| "e2"| "e3"| "e4"| "repeat" | "delay">();
    $dragStopped = new Subject<void>(); // Only to tell that drag is processed and need to refresh

}

export default new DragDropService();
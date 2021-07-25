import codeService, { SpiritRootBlock } from "./code.service";

export function makeId(length: number) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * 
 charactersLength));
   }
   return result;
}

export default class CodeBlock{
    
    public id: string = makeId(10);
    constructor(
        public spirit: SpiritRootBlock,
        public type: "move"| "rotate"| "sound"| "e1"| "e2"| "e3"| "e4"| "repeat" | "delay", 
        public parent: string | CodeBlock | any,
        public child?: CodeBlock  | null,
        public next?: CodeBlock | null,
        public data?: number
        ) {
            if(!this.data) this.data = 0;
        
    }

    setValueForId(id: string, value: number) : boolean {
        if(this.id === id) {
            this.data =value;
            return true;
        } 
        let foundInChild = false, foundInNext = false;
        if(this.child) foundInChild = this.child.setValueForId(id, value);
        if(this.next) foundInNext = this.next.setValueForId(id, value);
        return foundInChild || foundInNext;
    }

    setChild(block: CodeBlock) {
        if(this.child != null) this.child.setChild(block);
        else {
            this.child = block;
            this.child.parent = this;
        }
    }

    setNext(block: CodeBlock) {
        if(this.next != null) this.next.setChild(block);
        else this.next = block;
    }

    async start() {
        // Execute Self ->
        if(["move", "rotate"].includes(this.type)) {
            codeService.$spiritEvent.next({forSpirit: this.spirit, type:this.type as string, value: this.data as number});
        }
        else if(this.type==="repeat" && this.data) {
            for(let i=0; i<this.data; i++) {
                // Execute Child ->
                await this.child?.start();
            }
        }
        else if(this.type === "sound") {
            // alert("I had to play sound");
            let audio = new Audio("Cat-sound-mp3.mp3");
            audio.play(); // Not waiting for audio to finish;
        }
        else if(this.type === "delay") {
            await new Promise<void>((res, rej)=>{
                setTimeout(()=>res(), this.data === undefined? 1000 : this.data*1000);
            });
        }
        // Execute Next ->
        await this.next?.start();
    }

}
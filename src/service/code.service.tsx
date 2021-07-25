import { Subject } from "rxjs";
import CodeBlock, { makeId } from "./codeBlock";

export interface RootBlock {
    position: {
        x: number;
        y: number;
    };
    code: CodeBlock;
}

export interface SpiritRootBlock {
    id: string;
    url: string;
    rootBlocks: RootBlock[],
    position?: {
        x: number,
        y: number,
        deg: number
    } 
}

class CodeService{
    // selectedBlocks!: RootBlock[];
    selectedSpirit: SpiritRootBlock | null = null;
    
    codes: {[id: string]: SpiritRootBlock} = {};
    
    $spritUpdated = new Subject<{[id: string]: SpiritRootBlock}>();
    addSpirit(img: File) {
        let obj = {
            id: makeId(20),
            url: URL.createObjectURL(img)
        }
        this.codes[obj.id] = {
            id: obj.id,
            url: obj.url,
            rootBlocks: []
        };
        this.$spritUpdated.next(this.codes);
        // this.$spritSelected.next(this.codes[obj.id] );
    }
    removeSpirit(id: string) {
        delete this.codes[id];
        if(this.selectedSpirit && this.selectedSpirit.id === id) {
            this.selectedSpirit = null;
            this.$spritSelected.next(this.selectedSpirit);
        }
    }

    $spritSelected = new Subject<SpiritRootBlock | null>();
    selectSpirit(id: string) {
        this.selectedSpirit = this.codes[id];
        if(this.selectedSpirit)
            this.$spritSelected.next(this.selectedSpirit);
    }

    event(type: 1 | 2 | 3) {
        Object.values(this.codes).forEach(value=>{
            value.rootBlocks.forEach(data=>{
                if(data.code.type === "e"+type) {
                    data.code.start(); // Don't wait as we need to do simultaneous Executions
                }
            })
        });
    }
    // setValue(id: string, value: string) {
    //     this.selectedSpirit?.rootBlocks.forEach(block=>{
            
    //     })
    // }
    $spiritEvent = new Subject<{forSpirit: SpiritRootBlock, type: string, value?: number}>();
}

export default new CodeService();
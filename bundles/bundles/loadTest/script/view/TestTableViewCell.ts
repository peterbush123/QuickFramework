import { Button, Event, find, Label, _decorator , Node, input } from "cc";
import { TableViewCell } from "db://quick/core/ui/TableViewCell";
import { inject } from "db://quick/defines/Decorators";


const {ccclass, property} = _decorator;

export interface CellData{
    content : string,
    type : number,
}

@ccclass("TestTableViewCell")
export default class TestTableViewCell extends TableViewCell {

    @inject("label",Label)
    private _label : Label = null!;
    @inject("button",Button)
    private _button : Button = null!;

    onLoad(){
        super.onLoad && super.onLoad();
        this.onN(this._button.node,Node.EventType.TOUCH_END,this.onClick);
    }

    init(){
        
    }

    willRecycle(): void {
        // this._button.node.off(Node.EventType.TOUCH_END);
    }

    updateData(v : CellData){
        this._label.string = v.content;
    }

    get string(){
        return this._label.string;
    }

    private onClick(){
        Log.d("当前点击:",this.string);
    }
}

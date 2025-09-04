import GameView from "db://quick/core/ui/GameView";
import { inject } from "db://quick/defines/Decorators";
import { _decorator, Component, Label, Node, NodeEventType } from 'cc';
import { MultiLogic } from "../logic/MultiLogic";
import { MultiGameData } from "../data/MultiGameData";
import { MultiLogicTwo } from "../logic/MultiLogicTwo";
import { MultiLogicOne } from "../logic/MultiLogicOne";
import { MultiLogicThree } from "../logic/MultiLogicThree";
import { BundleType } from "db://assets/scripts/common/config/Config";
const { ccclass, property } = _decorator;

@ccclass('MultiLogicGameView')
export default class MultiLogicGameView extends GameView {

    static logicType = MultiLogic;

    public static getPrefabUrl() {
        // 返回你自己的 预置体资源路径，相对于bundle的
        return "prefabs/MultiLogicGameView";
    }

    @inject("logic1", Node, "op")
    private logic1Node1: Node = null!;
    @inject("logic2", Node, "op")
    private logic1Node2: Node = null!;
    @inject("logic3", Node, "op")
    private logic1Node3: Node = null!;
    @inject("mainLogic", Node, "op")
    private mainLogicNode: Node = null!;
    @inject("goback", Node)
    private goback: Node = null!;

    @inject({name : "logic",type : MultiLogic})
    private logic : MultiLogic = null!;
    @inject({name : "logic",type : MultiLogicOne})
    private logic1 : MultiLogicOne = null!;
    @inject({name : "logic",type : MultiLogicTwo})
    private logic2 : MultiLogicTwo = null!;
    @inject({name : "logic",type : MultiLogicThree})
    private logic3 : MultiLogicThree = null!;
    @inject("Label",Label)
    private label : Label = null!;

    @inject("goto",Node)
    private goto : Node = null!

    onLoad() {
        super.onLoad();
        this.onN(this.goback, Node.EventType.TOUCH_END, this.backBundle);
        this.onN(this.logic1Node1, Node.EventType.TOUCH_END, this.onLogic1);
        this.onN(this.logic1Node2, Node.EventType.TOUCH_END, this.onLogic2);
        this.onN(this.logic1Node3, Node.EventType.TOUCH_END, this.onLogic3);
        this.onN(this.mainLogicNode,Node.EventType.TOUCH_END,this.onMainLogic);
        this.onN(this.goto,Node.EventType.TOUCH_END,this.onGoto);
    }
    private onLogic3() {
        this.label.string = this.logic3.logicName;
    }
    private onLogic2() {
        this.label.string = this.logic2.logicName;
    }
    private onLogic1() {
        this.label.string = this.logic1.logicName;
    }

    private onMainLogic(){
        this.label.string = this.logic.logicName;
    }

    onDestroy(): void {
        super.onDestroy()
    }

    addEvents(): void {
        super.addEvents();
    }

    onShow(): void {
        // todo
        super.onShow()
    }

    onClose(): void {
        // todo
        super.onClose();
    }

    private onGoto(){
        this.enterBundle(BundleType[BundleType.loadTest],{isAttach:true});
    }
}



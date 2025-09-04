import { _decorator, Component, Node, find, Sprite, UITransform } from 'cc';
import GameView from "db://quick/core/ui/GameView";
import { inject } from "db://quick/defines/Decorators";
const { ccclass, property } = _decorator;

@ccclass('SnapshotView')
export class SnapshotView extends GameView {

    public static getPrefabUrl(){
        return "prefabs/SnapshotView";
    }

    @inject("girl",Node)
    private captureNode : Node = null!;
    @inject("girlshow",Sprite)
    private showSprite : Sprite = null!;

    onLoad(){
        super.onLoad();
        this.onN(find("Button",this.node)!,Node.EventType.TOUCH_END,this.onClick)
        this.onN(find("goBack",this.node)!,Node.EventType.TOUCH_END,this.onGoBack);
    }

    private onClick(){
        App.platform.snapshot(this.captureNode,(sp,size)=>{
            this.showSprite.spriteFrame = sp;
            this.showSprite.node.getComponent(UITransform)?.setContentSize(size);
        })
    }

    private onGoBack(){
        this.backBundle();
    }
}


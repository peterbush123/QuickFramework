import UIView from "db://quick/core/ui/UIView";
import { _decorator,Node, find, Label, tween, Vec3, UITransform } from "cc";
import { inject } from "db://quick/defines/Decorators";

const { ccclass, property } = _decorator;

@ccclass('TankBattleGameOver')
export default class TankBattleGameOver extends UIView {

    public static getPrefabUrl() {
        return "prefabs/TankBattleGameOver";
    }

    private logic : TankBattleLogic = null!;

    @inject("content",Node)
    private content : Node = null!;
    private title : Node = null!;
    private trans : UITransform = null!;

    onLoad() {
        super.onLoad();
        if ( this.args ){
            this.logic = this.args[0];
        }
        this.title =  find("title", this.content)!;
        this.trans = this.node.getComponent(UITransform)!;
    }

    onShow(): void {
        let title = this.title;
        let trans = this.trans;
        tween(title)
        .set({ position : new Vec3(title.position.x,trans.height/2,title.position.z)})
        .to(1,{ position : new Vec3(title.position.x,0,title.position.z)})
        .delay(2)
        .call(()=>{
            this.close();
            if ( this.logic ){
                this.logic.mapClear();
                this.logic.onOpenSlectedView();
            }
        })
        .start();
        super.onShow();
    }
}

import UIView from "db://quick/core/ui/UIView";
import { _decorator,Node, find, Label, Vec3, EventKeyboard, macro } from "cc";
import { TankBettle } from "../data/TankBattleConfig";
import { Macro } from "db://quick/defines/Macros";
import { inject } from "db://quick/defines/Decorators";

const { ccclass, property } = _decorator;

@ccclass('TankBattleStartView')
export default class TankBattleStartView extends UIView{

    public static getPrefabUrl() {
        return "prefabs/TankBattleStartView";
    }

    /**@description 选择模式的小坦克 */
    @inject("tank",Node,"content")
    private selectTank: Node = null!;
    /**@description 单人 */
    @inject("player",Node,"content")
    private singlePlayer: Node = null!;
    /**@description 多人 */
    @inject("players",Node,"content")
    private doublePalyers: Node = null!;
    private logic : TankBattleLogic = null!;

    onLoad() {
        super.onLoad();
        if ( this.args && this.args.length > 0 ){
           this.logic = this.args[0];
        }
        this.selectTank.setPosition(new Vec3(this.selectTank.position.x,this.singlePlayer.position.y,this.selectTank.position.z));
    }

    protected onKeyBackUp(ev: EventKeyboard) {
        super.onKeyBackUp(ev);
        App.entryManager.enterBundle(Macro.BUNDLE_HALL);
    }

    protected onKeyUp(ev: EventKeyboard) {
        super.onKeyUp(ev);
        if(this.logic ){
            this.logic.onKeyUp(ev,TankBettle.ViewType.START_VIEW,this);
        }
    }

    isSingle(){
        return this.selectTank.position.y == this.singlePlayer.position.y;
    }

    updateSelectTank( isSingle : boolean){
        if ( isSingle ){
            this.selectTank.setPosition(new Vec3(this.selectTank.position.x,this.singlePlayer.position.y,this.selectTank.position.z));
        }else{
            this.selectTank.setPosition(new Vec3(this.selectTank.position.x,this.doublePalyers.position.y,this.selectTank.position.z));
        }
    }

    onShow(): void {
        this.enabledKeyUp = true;
        this.audioHelper.stopMusic();
        super.onShow();
    }

    onClose(): void {
        this.enabledKeyUp = false;
        super.onClose();
    }
}

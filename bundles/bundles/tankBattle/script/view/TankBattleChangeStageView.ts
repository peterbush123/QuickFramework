import UIView from "db://quick/core/ui/UIView";
import { _decorator,Node, find, Label ,Animation, AnimationState, tween} from "cc";
import UILabel from "db://quick/core/ui/UILabel";
import { inject } from "../../../../../quick/defines/Decorators";


const {ccclass, property} = _decorator;

@ccclass('TankBattleChangeStageView')
export default class TankBattleChangeStageView extends UIView {

    public static getPrefabUrl() {
        return "prefabs/TankBattleChangeStageView";
    }

    private level = 0;
    private logic : TankBattleLogic = null!;
    @inject("level",UILabel)
    private levelLb : UILabel = null!;
    private action : Animation = null!;
    onLoad(){
        super.onLoad()
        if ( this.args ){
            this.level = this.args[0];
            this.logic = this.args[1];
        }
        //获取动画
        this.action = this.node.getComponent(Animation) as Animation;
        this.action.playOnLoad = false;
    }

    onShow(): void {
        [this.level,this.logic] = this.args;
        this.levelLb.params = [ this.level + 1];
        this.action.off(Animation.EventType.FINISHED,this.onStartFinished,this)
        this.action.off(Animation.EventType.FINISHED,this.onStartQuitFinished,this)
        this.action.on(Animation.EventType.FINISHED,this.onStartFinished,this)
        this.action.play("startEnter");
        super.onShow();
    }

    private onStartFinished(type: string, state: AnimationState){
        tween(this.node).delay(1.0).call(()=>{
            Log.d(`Animation finish ${type} ${state.name}`)
            this.action.off(Animation.EventType.FINISHED,this.onStartFinished,this);
            this.action.on(Animation.EventType.FINISHED,this.onStartQuitFinished,this)
            this.action.play("startQuit");
            this.logic?.onShowMapLevel(this.level);
        }).start()
    }

    private onStartQuitFinished(type: string, state: AnimationState){
        Log.d(`Animation finish ${type} ${state.name}`)
        this.action.on(Animation.EventType.FINISHED,this.onStartQuitFinished,this)
        this.close()
    }
}

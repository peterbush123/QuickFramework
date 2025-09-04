import GameView from "db://quick/core/ui/GameView";
import { inject } from "db://quick/defines/Decorators";
import { _decorator, Component, Node } from 'cc';
import { Macro } from "db://quick/defines/Macros";
const { ccclass, property } = _decorator;

@ccclass('ChangeOrientationView')
export default class ChangeOrientationView extends GameView {
    
    static getPrefabUrl(){
        if ( App.stageData.isLandscape ){
            return "prefabs/ChangeOrientationView";
        }
        return "prefabs/ChangeOrientationViewV";
    }

    @inject("goBack",Node)
    private goBackBtn:Node = null!;

    @inject("content/content/change",Node)
    private changeNode:Node = null!;

    onLoad(){
        super.onLoad();
        this.onN(this.goBackBtn,Node.EventType.TOUCH_END,this.onGoBack);
        this.onN(this.changeNode,Node.EventType.TOUCH_END,this.onChange);
    }

    private onGoBack( ){
        this.enterBundle(Macro.BUNDLE_HALL);
    }

    private onChange(){
        dispatch(Macro.CHANGE_ORIENTATION);
    }
}



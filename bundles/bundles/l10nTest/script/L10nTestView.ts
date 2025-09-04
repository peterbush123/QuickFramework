import GameView from "db://quick/core/ui/GameView";
import { inject } from "db://quick/defines/Decorators";
import { _decorator, Button, Component, EventTouch, Node } from 'cc';
import { l10n, L10nLabel } from "db://localization-editor/l10n";
const { ccclass, property } = _decorator;

@ccclass('L10nTestView')
export default class L10nTestView extends GameView {
    
    public static getPrefabUrl() {
        return "prefabs/L10nTestView";
    }

    @inject("goback",Node)
    private goback : Node = null!;

    @inject("cn",Button)
    private cn : Button = null!;

    @inject("en",Button)
    private en : Button = null!;

    onLoad(){
        super.onLoad();
        this.onN(this.goback,Node.EventType.TOUCH_END,this.backBundle);
        this.cn.node.userData = "zh-Hans-CN";
        this.en.node.userData = "en-US";
        this.onN(this.cn.node,Node.EventType.TOUCH_END,this.changeLanguage);
        this.onN(this.en.node,Node.EventType.TOUCH_END,this.changeLanguage);

    }

    private changeLanguage(event: EventTouch){
        let language = event.target.userData;
        l10n.changeLanguage(language);
    }
}



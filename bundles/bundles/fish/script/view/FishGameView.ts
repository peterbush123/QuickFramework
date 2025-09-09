
import { _decorator, Node } from 'cc';
import GameView from 'db://quick/core/ui/GameView';
import { inject } from 'db://quick/defines/Decorators';
import FishGameHandler from '../net/FishGameHandler';
const { ccclass, property } = _decorator;

@ccclass("FishGameView")
export default class FishGameView extends GameView {
    @inject("goback", Node)
    private goback: Node = null!;
    @inject("sendBtn", Node)
    private sendBtn: Node = null!;


    public static getPrefabUrl(): string {
        return "prefabs/FishGameView";
    }


    onLoad(): void {
        super.onLoad();
        this.onN(this.goback, Node.EventType.TOUCH_END, this.backBundle);
        this.onN(this.sendBtn, Node.EventType.TOUCH_END, this.onSendBtn);
    }

    onSendBtn() {
        let sender = App.handlerManager.get(FishGameHandler);
        if (sender) {
            sender.sendEx();
        }
    }




}

import GameView from "db://quick/core/ui/GameView";
import UIQRCode from "db://quick/core/ui/UIQRCode";
import { inject } from "db://quick/defines/Decorators";

import { _decorator, Component, EditBox, Node } from 'cc';
import { BundleType } from "db://assets/scripts/common/config/Config";
const { ccclass, property } = _decorator;

@ccclass("QRCodeView")
export default class QRCodeView extends GameView {

    public static getPrefabUrl(): string {
        return "prefabs/QRCodeView";
    }

    @inject("goback", Node)
    private goback: Node = null!;

    @inject("editbox", EditBox)
    private editbox: EditBox = null!;

    @inject("qrcode", UIQRCode)
    private qrcode: UIQRCode = null!;

    @inject("goto", Node)
    private goto: Node = null!;

    onLoad(): void {
        super.onLoad();
        this.onN(this.goback, Node.EventType.TOUCH_END, this.backBundle);
        let eventHandler = new Component.EventHandler;
        eventHandler.component = "QRCodeView";
        eventHandler.target = this.node;
        eventHandler.handler = "onTextChanged"
        this.editbox.textChanged.push(eventHandler);

        this.onN(this.goto, Node.EventType.TOUCH_END, this.onGoto);
    }

    private onTextChanged(data: string) {
        this.qrcode.string = data;
    }

    private onGoto() {
        this.enterBundle(BundleType[BundleType.multiLogic], { isAttach: true });
    }
}

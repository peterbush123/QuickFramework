import { _decorator, Event, EventTouch, find, instantiate, Label, Node } from "cc";
import UIView from "db://quick/core/ui/UIView";
import { inject } from "db://quick/defines/Decorators";

const { ccclass, property } = _decorator;

@ccclass('BundleDebugView')
export class BundleDebugView extends UIView {
    static getPrefabUrl(): string {
        return "common/prefabs/DebugView";
    }

    @inject("content", Node)
    private content: Node = null!;
    @inject("item", Node, "content")
    private itemPrefab: Node = null!;
    @inject("background", Node)
    private background: Node = null!;
    @inject("logView", Node)
    private logView: Node = null!;
    @inject("closeDebug", Node)
    private closeDebug: Node = null!;

    private get datas() {
        const datas = App.dataCenter.get(App.stageData.where);
        if (datas && datas.debugConfig) {
            return datas.debugConfig;
        }
        return [];
    }

    onLoad(): void {
        super.onLoad();
        this.itemPrefab.removeFromParent();
        this.content.removeAllChildren();
        this.logView.destroy();
        this.closeDebug.destroy();
        this.onN(this.background, Node.EventType.TOUCH_END, () => {
            if (this.args && this.args.onClose) {
                this.args.onClose();
            }
            this.close();
        })
    }

    onShow(): void {
        super.onShow();
        this.initData();
    }

    onClose(): void {
        if (this.args && this.args.onClose) {
            this.args.onClose();
        }
        super.onClose();
    }

    private initData() {
        const config = this.datas;
        this.content.removeAllChildren();
        config.forEach((v, i) => {
            const node = instantiate(this.itemPrefab);
            node.name = `debug${i}`;
            node.userData = v;
            find("Label", node)!.getComponent(Label)!.string = v;
            this.onN(node, Node.EventType.TOUCH_END, this.onEvent);
            this.content.addChild(node);
        })
    }

    private onEvent(ev: EventTouch) {
        const node = ev.target as Node;
        const data = node.userData;
        dispatch(data);
        this.close();
    }
}
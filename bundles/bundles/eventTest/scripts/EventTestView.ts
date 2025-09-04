import GameView from "db://quick/core/ui/GameView";
import { inject } from "db://quick/defines/Decorators";
import { _decorator, Component, instantiate, Label, Node, ScrollView, Tween, tween } from 'cc';
import { EventProcessor } from "db://quick/core/event/EventProcessor";
const { ccclass, property } = _decorator;

enum Events {
    Sync = "Sync",
    Async = "Async",
    Log = "Log",
}

class TestEvent extends EventProcessor{

    addEvents(): void {
        this.onD(Events.Sync, this.onSyncEvent,10);
        this.onD(Events.Async, this.onAsyncEvent,10);
    }

    private onSyncEvent(ev: DispatchEvent) {
        dispatch(Events.Log, "TestEvent.onSyncEvent");
        return "sync";
    }

    private async onAsyncEvent(ev: DispatchEvent) {
        dispatch(Events.Log, "TestEvent.onAsyncEvent");
        await App.utils.delay(1);
        dispatch(Events.Log, "TestEvent.onAsyncEvent end");
        return "async";
    }


}

@ccclass('EventTestView')
export default class EventTestView extends GameView {

    public static getPrefabUrl() {
        return "prefabs/EventTestView";
    }

    @inject("goback", Node)
    private goback: Node = null!;

    @inject("op/sync", Node)
    private btnSync: Node = null!;

    @inject("op/async", Node)
    private btnAsync: Node = null!;

    @inject("LogView",ScrollView)
    private logView:ScrollView = null!;

    @inject("LogView/view/content/item",Node)
    private logItem:Node = null!;

    private testEvent = new TestEvent();


    onLoad() {
        super.onLoad();
        this.onN(this.goback, Node.EventType.TOUCH_END, this.backBundle);
        this.onN(this.btnSync, Node.EventType.TOUCH_END, this.onClickSync);
        this.onN(this.btnAsync, Node.EventType.TOUCH_END, this.onClickAsync);
        this.logItem.removeFromParent();
        this.testEvent.onLoad();
    }

    onDestroy(): void {
        this.testEvent.onDestroy();
        super.onDestroy();
    }

    addEvents(): void {
        super.addEvents();
        this.onD(Events.Sync, this.onSyncEvent);
        this.onD(Events.Async, this.onAsyncEvent);
        this.onD(Events.Log, this.onLogEvent);

    }

    private onSyncEvent(ev: DispatchEvent) {
        this.toLog(`onSyncEvent ${JSON.stringify(ev,null,2)}`);
        return ev.result ? `上一事件处理结果:${ev.result}` : "sync";
    }

    private async onAsyncEvent(ev: DispatchEvent) {
        this.toLog(`onAsyncEvent ${JSON.stringify(ev,null,2)}`);

        // 1，说明，这里需要先把上一层的返回做备份
        // 2，await 可以理解成返回了一个 Promise 对象
        // 3，在 await App.utils.delay(1); 后
        // 其实 ev.result 会再次的被派发器赋值为 2 的 Promise 对象

        let result = ev.result;
        await App.utils.delay(1);
        ev.result = result;
        this.toLog(`onAsyncEvent end ${JSON.stringify(ev,null,2)}`);
        return ev.result ? `上一事件处理结果:${ev.result}` : "async";
    }

    private onClickSync() {
        const result = dispatch(Events.Sync);
        this.toLog(`onClickSync ${result}`);

    }

    private async onClickAsync() {
        let result = await dispatchAsync(Events.Async);
        this.toLog(`onClickAsync ${result}`);

    }

    private onLogEvent(ev: DispatchEvent,msg:string) {
        this.toLog(msg);
    }


    private toLog(msg: string) {
        let item = instantiate(this.logItem);
        if (item) {
            const comp = item.getComponent(Label);
            if (comp) {
                comp.string = `${Date.format("yyyy-MM-dd hh:mm:ss.SSS")} ${msg}`;
            }
        }
        this.logView.content?.addChild(item);
        Tween.stopAllByTarget(this.logView);
        tween(this.logView)
        .delay(0.1)
        .call(()=>{
            this.logView.scrollToBottom(1);
        })
        .start();
    }

}



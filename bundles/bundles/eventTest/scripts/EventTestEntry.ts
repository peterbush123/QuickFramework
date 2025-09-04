import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import EventTestView from "./EventTestView";


//注册自己的bundle名及GameView的具体实现类型
@registerEntry("EventTestEntry", "eventTest", EventTestView)
class EventTestEntry extends Entry {

    protected addNetHandler(): void {

    }
    protected removeNetHandler(): void {

    }
    protected loadResources(completeCb: () => void): void {
        completeCb();
    }
    protected initData(): void {

    }
    protected pauseMessageQueue(): void {

    }
    protected resumeMessageQueue(): void {

    }
}



import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import { ChatService } from "../../../scripts/common/net/ChatService";
import { GameService } from "../../../scripts/common/net/GameService";
import ChatHandler from "./net/ChatHandler";
import GameHandler from "./net/GameHandler";
import NetTestView from "./view/NetTestView";

@registerEntry("NetTestEntry", "netTest", NetTestView)
class NetTestEntry extends Entry {
    protected addNetHandler(): void {
        App.handlerManager.get(ChatHandler);
        App.handlerManager.get(GameHandler);
    }
    protected removeNetHandler(): void {
        App.handlerManager.destory(ChatHandler);
        App.handlerManager.destory(GameHandler);
    }
    protected loadResources(completeCb: () => void): void {
        completeCb();
    }
    protected initData(): void {
        App.serviceManager.get(GameService, true, "192.168.1.2", 8000);
        App.serviceManager.get(ChatService, true, "192.168.1.3", 8000);
    }
    protected pauseMessageQueue(): void {

    }
    protected resumeMessageQueue(): void {

    }

    onUnloadBundle() {
        super.onUnloadBundle();
        App.serviceManager.destory(GameService);
        App.serviceManager.destory(ChatService);
    }
}
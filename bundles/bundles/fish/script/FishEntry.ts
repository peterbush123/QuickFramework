import { GameService } from "db://assets/scripts/common/net/GameService";
import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import FishGameHandler from "./net/FishGameHandler";
import FishGameView from "./view/FishGameView";
@registerEntry("FishEntry", "fish", FishGameView)
export default class FishEntry extends Entry {
    protected addNetHandler(): void {
        App.handlerManager.get(FishGameHandler);
    }
    protected removeNetHandler(): void {
        App.handlerManager.destory(FishGameHandler);
    }
    protected loadResources(completeCb: () => void): void {
        completeCb();
    }
    protected initData(): void {
        App.serviceManager.get(GameService, false);
    }
    protected pauseMessageQueue(): void {

    }
    protected resumeMessageQueue(): void {

    }

}

import { SpriteFrame, tween } from "cc";
import { Resource } from "db://quick/core/asset/Resource";
import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import { Macro } from "db://quick/defines/Macros";
import { LobbyService } from "../../../scripts/common/net/LobbyService";
import { HallLanguage } from "./data/HallLanguage";
import HallHandler from "./net/HallHandler";
import HallView from "./view/HallView";

@registerEntry("HallEntry", Macro.BUNDLE_HALL, HallView)
class HallEntry extends Entry { //add 
    protected language = new HallLanguage;
    protected addNetHandler(): void {
        App.handlerManager.get(HallHandler);
    }
    protected removeNetHandler(): void {
        //add jack
        //大厅的到登录界面会自动初清除
        // Manager.netHelper.destoryHandler(HallHandler);
    }
    protected loadResources(completeCb: () => void): void {
        this.loader.getLoadResources = () => {
            return [
                { dir: "texture", bundle: this.bundle, type: SpriteFrame },
            ]
        };
        this.loader.onLoadStart = () => {
            App.gameLoading.show("login");
        }

        this.loader.onLoadProgress = (loadedCount: number, total: number, data: Resource.Cache) => {
            App.gameLoading.onProgress(loadedCount - 1, total);
        }


        this.loader.onLoadComplete = (err: Resource.LoaderError) => {
            if (err == Resource.LoaderError.LOADING) {
                return;
            }
            App.gameLoading.onComplete();
            tween(this.node)
                .delay(0.2)
                .call(() => {
                    App.gameLoading.hide();
                })
                .start();
            App.protoManager.load(this.bundle).then((isSuccess) => {
                completeCb();
            })
        };
        this.loader.loadResources();
    }
    protected initData(): void {
        //初始化网络
        App.serviceManager.get(LobbyService, true, "192.168.1.6", 8000);
    }
    protected pauseMessageQueue(): void {

    }
    protected resumeMessageQueue(): void {

    }
}

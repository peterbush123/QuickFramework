
import { find, Label } from "cc";
import { IGameLoading } from "db://quick/interface/IGameLoading";
import { ViewZOrder } from "../config/Config";

/**
 * @description 加载动画
 */

export default class GameLoading extends IGameLoading {
    static module: string = "【GameLoading】";

    protected get zOrder(): number {
        return ViewZOrder.GameLoading;
    }
    protected findText(): Label {
        return find("content/text", this.node)!.getComponent(Label)!;
    }


    protected get prefab() {
        return App.uiManager.getScenePrefab("GameLoading")!;
    }



}

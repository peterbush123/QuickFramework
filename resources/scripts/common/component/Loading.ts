import { find, Label} from "cc";
import { Config, ViewZOrder } from "../config/Config";
import { ILoading } from "db://quick/interface/ILoading";
/**
 * @description 加载动画
 */

export default class Loading extends ILoading{
    static module: string = "【Loading】";

    protected get zOrder(): number {
        return ViewZOrder.Loading;
    }
    protected findText(): Label {
        return find("content/text", this.node)?.getComponent(Label)!;
    }
    protected get interval(): number {
        return Config.LOADING_CONTENT_CHANGE_INTERVAL;
    }

    protected get timeout(): number {
        return Config.LOADING_TIME_OUT
    }

    protected get prefab() {
        return App.uiManager.getScenePrefab("Loading")!;
    }
}

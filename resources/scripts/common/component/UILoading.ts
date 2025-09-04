import { find, Label } from "cc";
import { Config, ViewZOrder } from "../config/Config";
import { IUILoading } from "db://quick/interface/IUILoading";
/**
 * @description 加载动画
 */

export default class UILoading extends IUILoading{
    static module: string = "【UILoading】";
   
    protected get prefab(){
        return App.uiManager.getScenePrefab("UILoading")!;
    }

    protected get delayTime(): number {
        return Config.LOAD_VIEW_DELAY;
    }

    protected get timeout(): number {
        return Config.LOAD_VIEW_TIME_OUT;
    }

    protected get zOrder(): number {
        return ViewZOrder.UILoading;
    }

    /**@description 查找内容节点 */
    protected findContent(){
        return find("content", this.node)!;
    }

    /**@description 查找显示组件 */
    protected findText(){
        return find("text", this.content)?.getComponent(Label)!;
    }
}

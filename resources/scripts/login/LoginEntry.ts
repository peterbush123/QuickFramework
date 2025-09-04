
/**
 * @description 登录流程 , 不用导出
 */

import { Entry } from "db://quick/core/entry/Entry";
import { UpdateItem } from "db://quick/core/update/UpdateItem";
import { registerEntry } from "db://quick/defines/Decorators";
import { Macro } from "db://quick/defines/Macros";
import { Singleton } from "db://quick/utils/Singleton";
import { ViewZOrder } from "../common/config/Config";
import ChangeView from "../common/view/ChangeView";
import LoginLogic from "./logic/LoginLogic";
import LoginView from "./view/LoginView";

@registerEntry("LoginEntry", Macro.BUNDLE_RESOURCES, LoginView)
class LoginEntry extends Entry {
    /**@description 是否是主包入口，只能有一个主包入口 */
    isMain = true;
    constructor() {
        super();
        App.dispatcher.add(Macro.CHANGE_ORIENTATION, this.onChangeOrientation, this);
    }

    private onChangeOrientation(): void {
        App.uiManager.open({ type: ChangeView, bundle: Macro.BUNDLE_RESOURCES, zIndex: ViewZOrder.Loading });
    }

    protected addNetHandler(): void {

    }
    protected removeNetHandler(): void {

    }
    protected loadResources(completeCb: () => void): void {
        completeCb();
        //    completeCb();
        // App.protoManager.load(Macro.BUNDLE_RESOURCES).then((isSuccess) => {
        //     completeCb();
        // })
    }
    protected openGameView(): void {
        super.openGameView();
        App.entryManager.onCheckUpdate();
        if (App.updateManager.isSkipUpdate) {
            // 跳过更新，直接进入游戏
            App.entryManager.enterBundle(Macro.BUNDLE_HALL, { isPreload: true });
            // App.entryManager.enterBundle(Macro.BUNDLE_HALL);
        } else {
            // 需要等主包更新完成，避免导致主包没更新完，就去下载大厅，主包更新后，又重新更新大厅的情况
        }
    }

    onMainUpdateComplete(item: UpdateItem): void {
        App.entryManager.enterBundle(Macro.BUNDLE_HALL, { isPreload: true });
        // App.entryManager.enterBundle(Macro.BUNDLE_HALL);
    }
    protected initData(): void {
    }
    protected pauseMessageQueue(): void {

    }
    protected resumeMessageQueue(): void {

    }

    /**@description 是否是切换显示方向 */
    private isChangeOrientation = false;

    onDestroyGameView(gameView: GameView): void {
        super.onDestroyGameView(gameView);
        // 如果是切换显示方向，需要等场景销毁完成
        if (this.isChangeOrientation) {

            // 延迟等场景销毁完成
            setTimeout(() => {
                this.onStartGameView();
                this.clearCache();
            }, 200);
            this.isChangeOrientation = false;
        }
    }

    protected onStartGameView(userData?: EntryUserData): void {
        if (userData && userData.changeOrientation) {
            // 删除所有缓存
            App.onLowMemory();
            // 如果是切换显示方向，需要等场景销毁完成
            this.isChangeOrientation = true;
        } else {
            super.onStartGameView(userData);
            this.clearCache();
            Log.d(`--------------onStartGameView--------------`);
        }
    }

    private clearCache(): void {
        //关闭除登录之外的界面
        App.uiManager.closeExcept([LoginView]);
        //销毁不必要单列
        Singleton.destory();
        //销毁除LoginLogic之外的逻辑控制器
        App.logicManager.destoryExclude([LoginLogic]);
    }
}

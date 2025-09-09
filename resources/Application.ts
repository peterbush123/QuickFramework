import { Node } from "cc";
import { Framewok } from "db://quick/Framework";
import LayerManager from "db://quick/core/ui/LayerManager";
import { StageData } from "db://quick/data/StageData";
import { toApp } from "db://quick/defines/Decorators";
import { LogLevel } from "db://quick/defines/Enums";
import { Singleton } from "db://quick/utils/Singleton";
import Alert from "./scripts/common/component/Alert";
import GameLoading from "./scripts/common/component/GameLoading";
import Loading from "./scripts/common/component/Loading";
import Tips from "./scripts/common/component/Tips";
import UILoading from "./scripts/common/component/UILoading";
import { UIReconnect } from "./scripts/common/component/UIReconnect";
import UpdateLoading from "./scripts/common/component/UpdateLoading";
import { Config } from "./scripts/common/config/Config";
import { Lang } from "./scripts/common/language/Lang";
// import { l10n, L10nManager } from 'db://localization-editor/l10n'

/**@description 游戏所有运行单例的管理 */
export class Application extends Framewok {

    /**@description 获取Stage数据 */
    get stageData() {
        return Singleton.get(StageData, true, Config.BUNDLES)!;
    }

    /**@description 重连专用提示UI部分 */
    get uiReconnect() {
        return Singleton.get(UIReconnect)!;
    }

    /**@description 小提示 */
    get tips() {
        return Singleton.get(Tips)!;
    }
    /**@description 进游戏loading界面 */
    get gameLoading() {
        return Singleton.get(GameLoading)!;
    }

    /**@description 游戏加载界面 */
    get uiLoading() {
        return Singleton.get(UILoading)!;
    }

    get alert() {
        return Singleton.get(Alert)!;
    }

    get loading() {
        return Singleton.get(Loading)!;
    }

    get updateLoading() {
        return Singleton.get(UpdateLoading)!;
    }

    get layerMgr() {
        return Singleton.get(LayerManager, true, Config.LAYERS)!;
    }

    private _lang: Lang = null!;
    private get lang() {
        return this._lang || (this._lang = new Lang);
    }

    async onLoad(node: Node): Promise<void> {
        // await l10n.createIntl({
        //     localStorageLanguageKey : L10nManager.LOCAL_STORAGE_LANGUAGE_KEY,
        //     language : localStorage.getItem(L10nManager.LOCAL_STORAGE_LANGUAGE_KEY)
        // });
        this.language.addDelegate(this.lang);
        super.onLoad(node);
    }

    init() {
        super.init();
        this.stageData.isShowDebugButton = Config.isShowDebugButton;
        this.updateManager.hotUpdateUrl = Config.HOT_UPDATE_URL;
        this.updateManager.isAutoVersion = Config.USE_AUTO_VERSION;
        this.updateManager.isSkipUpdate = Config.isSkipUpdate;
        //语言包初始化
        //cc.log("language init");
        this.language.addDelegate(this.lang);
    }
}

let app = new Application();
app.logger.level = LogLevel.ALL;
(<any>window)["App"] = app;
app.init();
toApp();
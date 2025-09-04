import { EventTouch, _decorator, Node, PageView, instantiate, find, Label, ProgressBar, sys, PhysicsSystem2D, Component, Button, EventHandler, js } from "cc";
import { Update } from "db://quick/core/update/Update";
import { Macro } from "db://quick/defines/Macros";
import GameView from "db://quick/core/ui/GameView";
import { UpdateItem } from "db://quick/core/update/UpdateItem";
import UILabel from "db://quick/core/ui/UILabel";
import { inject } from "db://quick/defines/Decorators";
import SettingView from "../../../../scripts/common/component/SettingView";
import { Config, ViewZOrder } from "../../../../scripts/common/config/Config";
import BundleMgrView from "../../../../scripts/common/view/BundleMgrView";
import { QuickEvent } from "db://quick/core/event/QuickEvent";

const { ccclass, property } = _decorator;

@ccclass("HallView")
export default class HallView extends GameView {
    public static getPrefabUrl() {
        return "prefabs/HallView";
    }

    @inject("games", Node)
    private gamePage: Node = null!;
    @inject("gameItem", Node)
    private gameItem: Node = null!;
    @inject("pageview", PageView)
    private pageView: PageView = null!;
    private readonly PAGE_COUNT = 6;

    private get data() {
        return App.stageData;
    }

    addEvents(): void {
        this.onD(Macro.ON_UPDATE_DOWNLOADING, this.onDownloadProgess);
        this.onD(Macro.ON_UPDATE_FAILED, this.onUpdateFailed);
        this.onD(Macro.ON_DELETE_BUNDLE_CACHE, this.onDeleteBundleCache)
        super.addEvents();
    }

    private onClick(ev: EventTouch) {
        let node: Node = ev.target as Node;
        let config = this.data.getEntry(node.userData);
        if (config) {
            if (config.bundle == "aimLine") {
                //瞄准线，需要使用box2d
                if (!PhysicsSystem2D.PHYSICS_BOX2D) {
                    App.tips.show("该功能请把2D物理引擎切换到Box2D");
                    return;
                }
            } else if (config.bundle == "tankBattle" || config.bundle == "taxi") {
                if (!PhysicsSystem2D.PHYSICS_BUILTIN) {
                    App.tips.show("该功能请把2D物理引擎切换到内置");
                    return;
                }
            }
            this.enterBundle((ev.target as Node).userData);
        }
    }

    private createPage() {

        let games = this.data.games;
        //计算出总页数
        let count = games.length;
        let pageCount = Math.ceil(count / this.PAGE_COUNT);
        for (let i = 0; i < pageCount; i++) {
            let page = instantiate(this.gamePage);
            page.active = true;
            this.pageView.addPage(page);
        }

        for (let i = 0; i < count; i++) {
            let game = instantiate(this.gameItem);
            let config = games[i];
            game.name = `game_${config.bundle}`;
            game.active = true;
            game.userData = config.bundle;
            let labelNode = find("Background/label", game);
            if (labelNode) {
                let label = labelNode.getComponent(UILabel);
                if (label) {
                    label.language = config.language;
                }
            }
            this.onN(game, Node.EventType.TOUCH_END, this.onClick);
            this.updateGameItemStatus(game);
            //计算出所有页
            let page = Math.floor(i / this.PAGE_COUNT);
            this.pageView.getPages()[page].addChild(game);
        }
    }

    onLoad() {
        super.onLoad();
        this.createPage();
        let bottom_op = find("bottom_op", this.node) as Node;
        let setting = find("setting", bottom_op) as Node;
        this.onN(setting, Node.EventType.TOUCH_END, () => {
            App.uiManager.open({ type: SettingView, bundle: Macro.BUNDLE_RESOURCES, zIndex: ViewZOrder.UI, name: "设置界面" });
        });

        let change = find("mail", bottom_op) as Node;

        this.onH(change.getComponent(Button),QuickEvent.Type.Click,this.onMail,this,"sfsfsfs")

        let bundleMgr = find("shop", bottom_op)!;
        this.onN(bundleMgr, Node.EventType.TOUCH_END, this.onBundleMgr)
    }

    private onMail(ev : EventTouch,data: string) {
        console.log(`ev`,ev);
        console.log(`data`,data);

        App.audio.playEffect(Config.audioPath.button, false, Macro.BUNDLE_RESOURCES);
        let lan = App.language.getLanguage();
        if (lan == sys.Language.CHINESE) {
            lan = sys.Language.ENGLISH
        } else if (lan == sys.Language.ENGLISH) {
            lan = sys.Language.CHINESE;
        }
        App.language.change(lan);

        console.log(Date.format("yyyy-MM-dd hh:mm:ss SSS"))
        // this.offH(ev.target.getComponent(Button),QuickEvent.Type.Click,this.onMail,this)
    }

    private onBundleMgr() {
        App.uiManager.open({
            type: BundleMgrView,
            bundle: Macro.BUNDLE_RESOURCES,
            zIndex: ViewZOrder.UI,
            name: "Bundle管理"
        })
    }

    private getGameItem(bundle: string) {
        let pages = this.pageView.getPages();
        for (let i = 0; i < pages.length; i++) {
            let page = pages[i];
            let item = find(`game_${bundle}`, page);
            if (item) {
                return item;
            }
        }
        return null;
    }

    private updateGameItemStatus(item: Node) {
        let bundle = item.userData;
        let status = App.updateManager.getStatus(bundle);
        let updateNode = find("Background/update", item);
        if (!updateNode) return;
        if (status == Update.Status.UP_TO_DATE) {
            updateNode.active = false;
            return;
        } else {
            updateNode.active = true;
        }
        let downloading = find("downloading", updateNode);
        let down = find("down", updateNode);
        let update = find("update", updateNode);
        if (downloading && down && update) {
            if (status == Update.Status.NEED_DOWNLOAD) {
                downloading.active = false;
                down.active = true;
                update.active = false;
            } else {
                downloading.active = false;
                down.active = false;
                update.active = true;
            }
        }
    }

    private onDownloadProgess(ev:DispatchEvent,item: UpdateItem, info: Update.DownLoadInfo) {
        let node = this.getGameItem(info.bundle);
        if (node) {
            let updateNode = find("Background/update", node);
            if (!updateNode) return;

            let downloading = find("downloading", updateNode);
            let down = find("down", updateNode);
            let update = find("update", updateNode);
            if (downloading && down && update) {
                updateNode.active = true;
                let progressBar = find(`downloading`, updateNode)?.getComponent(ProgressBar);
                let progressLabel = find(`downloading/progress`, updateNode)?.getComponent(Label);
                down.active = false;
                update.active = false;

                if (progressBar && progressLabel) {
                    if (info.progress == -1) {
                        updateNode.active = false;
                    } else if (info.progress < 1) {
                        updateNode.active = true;
                        downloading.active = true;
                        progressBar.progress = info.progress;
                        progressLabel.string = `${(info.progress * 100).toFixed(2)}%`;
                    } else {
                        updateNode.active = false;
                    }
                }
            }
        }
    }

    private onUpdateFailed(ev:DispatchEvent,item: UpdateItem) {
        let node = this.getGameItem(item.bundle);
        if (!node) return;
        let updateNode = find("Background/update", node);
        if (!updateNode) return;
        updateNode.active = true;

        let downloading = find("downloading", updateNode);
        let down = find("down", updateNode);
        let update = find("update", updateNode);
        if (downloading && down && update) {
            downloading.active = false;
            down.active = false;
            update.active = true;
        }
    }

    private onDeleteBundleCache(ev:DispatchEvent,bundle: string) {
        this.updateGameItemStatus(this.getGameItem(bundle)!);
    }

    show(args?: any[] | any) {
        super.show(args)
        let version = find("version", this.node)?.getComponent(Label);
        if (version) {
            version.string = App.updateManager.getVersion(this.bundle);
        }
        this.audioHelper.playMusic("audio/background")
    }
}


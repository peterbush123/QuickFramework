import UIView from "db://quick/core/ui/UIView";
import { inject } from "db://quick/defines/Decorators";
import { _decorator, Component, find, instantiate, Node } from 'cc';
import { BundleMgrItem } from "./BundleMgrItem";
import { Macro } from "db://quick/defines/Macros";
import { EntryData } from "db://quick/core/entry/Entry";
import { UpdateItem } from "db://quick/core/update/UpdateItem";
import { Update } from "db://quick/core/update/Update";
const { ccclass, property } = _decorator;

@ccclass('BundleMgrView')
export default class BundleMgrView extends UIView {

    public static getPrefabUrl() {
        return "common/prefabs/BundleMgrView";
    }

    @inject("content", Node)
    private content: Node = null!;
    @inject("scrollview/view/content/item", Node, "content")
    private itemPrefab: Node = null!;
    @inject("scrollview/view/content", Node, "content")
    private viewContent: Node = null!

    /**@description 更新项 */
    private items: Map<string, BundleMgrItem> = new Map();

    onLoad() {
        super.onLoad();
        this.onD(Macro.ON_UPDATE_DOWNLOADING, this.onDownloadProgress);
        this.onD(Macro.ON_DELETE_BUNDLE_CACHE, this.onDeleteBundleCache);
        this.onN(find("close", this.content)!, Node.EventType.TOUCH_END, this.close);

        this.itemPrefab.removeFromParent();

        App.stageData.entrys.forEach(v => {
            this.viewContent.addChild(this.createItem(v))
        })
    }

    protected get showAction() {
        return App.utils.showView(this.content);
    }

    protected get closeAction() {
        return App.utils.hideView(this.content);
    }

    private createItem(data: EntryData) {
        const node = instantiate(this.itemPrefab);
        const ui = node.addComponent(BundleMgrItem)
        ui.data = data;
        ui.deleteCb = (target) => {
            this.onDelete(target);
        }
        ui.updateCb = (target) => {
            this.onUpdate(target);
        }

        this.items.set(data.bundle, ui);
        return node;
    }

    private onUpdate(target: BundleMgrItem) {
        const data = target.data;
        Log.d("更新", data.bundle);
        App.entryManager.enterBundle(data.bundle);
    }

    private onDelete(target: BundleMgrItem) {
        const data = target.data;
        Log.d("删除", data.bundle)
        App.updateManager.removeBunbleCache(data.bundle);
    }

    private onDownloadProgress(ev:DispatchEvent,item: UpdateItem, info: Update.DownLoadInfo) {
        const ui = this.items.get(item.bundle)
        if (ui) {
            ui.onDownLoadProgress(item, info);
        }
    }

    private onDeleteBundleCache(ev:DispatchEvent,bundle: string) {
        Log.d(`删除 ${bundle} 完成`);
        const ui = this.items.get(bundle);
        if (ui) {
            ui.updateStatus();
        }
    }
}



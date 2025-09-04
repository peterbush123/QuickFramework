import { _decorator, Button, Component, find, Label, Node, ProgressBar } from 'cc';
import EventComponent from 'db://quick/components/EventComponent';
import { EntryData } from 'db://quick/core/entry/Entry';
import { inject } from 'db://quick/defines/Decorators';
import { Update } from 'db://quick/core/update/Update';
import { UpdateItem } from 'db://quick/core/update/UpdateItem';
const { ccclass, property } = _decorator;

/**
 * @description Bundle管理项
 */
@ccclass('BundleMgrItem')
export class BundleMgrItem extends EventComponent {

    /**
         * @description 数据
         */
    data: EntryData = null!;

    /**@description 删除回调 */
    deleteCb: (target: this) => void = null!;
    /**@description 更新回调 */
    updateCb: (target: this) => void = null!;

    /**@description 删除按钮 */
    @inject("delete", Button, "bg")
    private deleteBtn: Button = null!;
    /**@description 更新按钮 */
    @inject("update", Button, "bg")
    private updateBtn: Button = null!;
    /**@description 状态显示 */
    @inject("label", Label, "bg")
    private statusLb: Label = null!;
    /**@description 更新进度 */
    @inject("progressBar", ProgressBar, "bg")
    private progress: ProgressBar = null!;
    /**@description bunlde名 */
    @inject("name", Label, "bg")
    private nameLb: Label = null!;

    onLoad(): void {
        this.nameLb.string = App.getLanguage(this.data.language as any);
        this.updateStatus();

        const updateHandler = new Component.EventHandler();
        updateHandler.component = "BundleMgrItem";
        updateHandler.handler = "onUpdateBundle";
        updateHandler.target = this.node;
        this.updateBtn.clickEvents.push(updateHandler)

        const deleteHandler = new Component.EventHandler();
        deleteHandler.component = "BundleMgrItem";
        deleteHandler.handler = "onDeleteBundle";
        deleteHandler.target = this.node;
        this.deleteBtn.clickEvents.push(deleteHandler)

    }

    /**
     * @description 更新状态
     */
    updateStatus() {
        const status = App.updateManager.getStatus(this.data.bundle);
        if (App.updateManager.isSkipUpdate) {
            this.updateBtn.interactable = false;
            this.deleteBtn.interactable = false;
            this.statusLb.string = "最新版本";
            this.progress.progress = 1;
            find("Label", this.updateBtn.node)!.getComponent(Label)!.string = "更新";
            return;
        }
        this.deleteBtn.interactable = true;
        if (status == Update.Status.UP_TO_DATE) {
            this.statusLb.string = "最新版本";
            this.progress.progress = 1;
            this.updateBtn.interactable = false;
            find("Label", this.updateBtn.node)!.getComponent(Label)!.string = "更新";
        } else if (status == Update.Status.NEED_UPDATE) {
            this.statusLb.string = "有更新";
            this.progress.progress = 0;
            this.updateBtn.interactable = true;
            find("Label", this.updateBtn.node)!.getComponent(Label)!.string = "更新";
        } else {
            this.statusLb.string = "需要下载";
            this.progress.progress = 0;
            this.updateBtn.interactable = true;
            find("Label", this.updateBtn.node)!.getComponent(Label)!.string = "下载";
        }
    }

    onDownLoadProgress(item: UpdateItem, info: Update.DownLoadInfo) {
        if (info.progress == -1) {
            //更新失败
            this.statusLb.string = "更新失败";
            this.updateBtn.interactable = true;
            find("Label", this.updateBtn.node)!.getComponent(Label)!.string = "更新";
            this.progress.progress = 0;
        } else if (info.progress < 1) {
            this.statusLb.string = `更新(${(info.progress * 100).toFixed(2)}%)`;
            this.updateBtn.interactable = false;
            this.deleteBtn.interactable = false;
        } else {
            //更新完成
            this.statusLb.string = "更新完成";
            this.updateBtn.interactable = false;
            this.deleteBtn.interactable = true;
            this.progress.progress = 1;
            find("Label", this.updateBtn.node)!.getComponent(Label)!.string = "更新";
        }
    }

    private onDeleteBundle() {
        this.deleteCb && this.deleteCb(this);
    }

    private onUpdateBundle() {
        this.updateCb && this.updateCb(this);
    }
}


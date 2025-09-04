import { find, instantiate, Label, Node, ProgressBar, Tween, Vec3 } from "cc";
export class IGameLoading implements ISingleton {
    static module: string = "【IGameLoading】";
    module: string = null!;
    isResident = true;

    /**@description 当前loading节点 */
    protected node: Node = null!;
    protected get prefab() {
        return App.uiManager.getScenePrefab("GameLoading")!;
    }
    protected delay: number = 0;
    protected content: Node = null!;
    protected background: Node = null!;
    protected text: Label = null!;
    private progressBar: ProgressBar = null!;
    private type: string = "";

    /**@description 渲染层级 */
    protected get zOrder() {
        return 99;
    }

    /**@description 查找内容节点 */
    protected findContent() {
        return find("content", this.node)!;
    }

    /**@description 查找内容节点 */
    protected findBackground() {
        return find("background", this.node)!;
    }

    /**@description 查找显示组件 */
    protected findText() {
        return find("text", this.content)!.getComponent(Label)!;
    }

    /**@description 查找显示组件 */
    protected findProgressBar() {
        return find("progressBar", this.content)!.getComponent(ProgressBar)!;
    }

    /**
    * @description 显示全屏幕加载动画
    * @param delay 延迟显示时间 当为null时，不会显示loading进度，但会显示阻隔层 >0时为延迟显示的时间
    */
    public show(type: string = "") {
        this.type = type;
        this._show();
    }
    protected _timerId: any = -1;

    /**
     * @description 显示动画
     * @param timeOut 超时加载时间。默认10为加载界面失败
     * @param timeOutCb 超时回调
     */
    protected _show() {
        if (!this.node) {
            this.node = instantiate(this.prefab)!;
        }
        this.node.removeFromParent();
        App.uiManager.addView(this.node, this.zOrder);
        this.node.position = Vec3.ZERO;
        this.content = this.findContent();
        Tween.stopAllByTarget(this.content);
        this.text = this.findText()
        this.background = this.findBackground();
        this.progressBar = this.findProgressBar();
        this.text.string = "0%";
        this.node.active = true;
        // if(this.type == "login")
        // {
        //    this.background.active = true;
        // }
        // else
        // {
        //     this.background.active = true;
        // }
    }


    /**@description 停止计时 */
    protected stopTimeOutTimer() {
        this._timerId = -1;
    }

    public hide() {
        if (this.node) {
            Tween.stopAllByTarget(this.content);
            this.node.active = false;
        }
    }

    onProgress(curr: number, total: number): void {
        var per: number = 0 != total ? Math.floor(curr / total * 100) : 0;
        if (per > 100) return;
        this.text.string = per + "%";
        this.progressBar.progress = per / 100;
    }

    onComplete(): void {
        this.text.string = "100%";
        this.progressBar.progress = 1;
    }


}


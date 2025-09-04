/**@description 全局配置 */

import { Enum } from "cc";

/**
 * @description 游戏类型 语言包用到，定义好之前，请不要随意修改顺序，以免读取语言包错误
 */
export enum BundleType {
    resources,
    aimLine,
    eliminate,
    hall,
    loadTest,
    netTest,
    nodePoolTest,
    tankBattle,
    taxi,
    qrcode,
    stateMachine,
    multiLogic,
    snapshot,
    changeOrientation,
    l10nTest,
    eventTest,
}

//排序规则
enum Sort {
    resources = 0,
    hall,
    aimLine,
    eliminate,
    loadTest,
    taxi,
    netTest,
    nodePoolTest,
    tankBattle,
    stateMachine,
    qrcode,
    multiLogic,
    snapshot,
    changeOrientation,
    l10nTest,
    eventTest,

    //私有项目
    private,
}

const eTypes = Enum(BundleType)

/**
 * @description 界面层级定义
 */

export enum ViewZOrder {
    /**@description 最底层 */
    Default = 0,
    /**@description 小喇叭显示层 */
    Horn,
    /**@description ui层 */
    UI,
    /**@description 提示 */
    Tips,
    /**@description 提示弹出框 */
    Alert,
    /**@description Loading层 */
    Loading,
    /**@description 界面加载动画层，暂时放到最高层，加载动画时，界面未打开完成时，不让玩家点击其它地方 */
    UILoading,
    GameLoading,
    /**@description debug */
    Debug,
}

export namespace Config {
    /**@description 是否显示调试按钮 */
    export const isShowDebugButton = true;

    /**@description 公共音效路径 */
    export const audioPath = {
        dialog: "common/audio/dlg_open",
        button: "common/audio/btn_click",
    }

    /**@description 是否跳过热更新检测 */
    export const isSkipUpdate = false;

    /**@description 测试热更新服务器地址 */
    export const HOT_UPDATE_URL = "http://192.168.2.241/hotupdate372";

    /**@description 是否使用了自动版本 */
    export const USE_AUTO_VERSION = true;

    /**@description Loading动画显示超时回调默认超时时间 */
    export const LOADING_TIME_OUT = 30;

    /**@description Loading提示中切换显示内容的时间间隔 */
    export const LOADING_CONTENT_CHANGE_INTERVAL = 3;

    /**@description 加载界面超时时间,如果在LOAD_VIEW_TIME_OUT秒未加载出，提示玩家加载界面超时 */
    export const LOAD_VIEW_TIME_OUT = 20;

    /**@description UILoading显示默认时间，即在打开界面时，如果界面在LOAD_VIEW_DELAY之内未显示，就会弹出一的加载界面的进度 
     * 在打开界面时，也可直接指定delay的值
     * @example  
     * Manager.uiManager.open({ type : LoginLayer, zIndex: ViewZOrder.zero, delay : 0.2});
     */
    export const LOAD_VIEW_DELAY = 0.1;

    /**@description 重连的超时时间 */
    export const RECONNECT_TIME_OUT = 30;

    /**@description 进入后台最大时间（单位秒）大于这个时间时就会进入重连*/
    export const MAX_INBACKGROUND_TIME = 60;
    /**@description 进入后台最小时间（单位秒）大于这个时间时就会进入重连*/
    export const MIN_INBACKGROUND_TIME = 5;
    export const BUNDLES: BundleData[] = [
        { sort: Sort.aimLine, type: BundleType.aimLine, name: { CN: "瞄准线", EN: "Aim Line" }, bundle: eTypes[BundleType.aimLine] },
        { sort: Sort.eliminate, type: BundleType.eliminate, name: { CN: "爱消除", EN: "Eliminate" }, bundle: eTypes[BundleType.eliminate] },
        { sort: Sort.loadTest, type: BundleType.loadTest, name: { CN: "加载示例", EN: "Load Test" }, bundle: eTypes[BundleType.loadTest] },
        { sort: Sort.netTest, type: BundleType.netTest, name: { CN: "网络示例", EN: "Net Test" }, bundle: eTypes[BundleType.netTest] },
        { sort: Sort.nodePoolTest, type: BundleType.nodePoolTest, name: { CN: "对象池示例", EN: "Node Pool" }, bundle: eTypes[BundleType.nodePoolTest] },
        { sort: Sort.tankBattle, type: BundleType.tankBattle, name: { CN: "坦克大战", EN: "BATTLE\nCITY" }, bundle: eTypes[BundleType.tankBattle] },
        { sort: Sort.taxi, type: BundleType.taxi, name: { CN: "快上车", EN: "Taxi" }, bundle: eTypes[BundleType.taxi] },
        { sort: Sort.resources, type: BundleType.resources, name: { CN: "主包", EN: "Main" }, bundle: eTypes[BundleType.resources] },
        { sort: Sort.hall, type: BundleType.hall, name: { CN: "大厅", EN: "Hall" }, bundle: eTypes[BundleType.hall] },
        { sort: Sort.qrcode, type: BundleType.qrcode, name: { CN: "二维码", EN: "QR Code" }, bundle: eTypes[BundleType.qrcode] },
        { sort: Sort.stateMachine, type: BundleType.stateMachine, name: { CN: "状态机", EN: "State\nMachine" }, bundle: eTypes[BundleType.stateMachine] },
        { sort: Sort.multiLogic, type: BundleType.multiLogic, name: { CN: "Multi Logic", EN: "Multi Logic" }, bundle: eTypes[BundleType.multiLogic] },
        { sort: Sort.snapshot, type: BundleType.snapshot, name: { CN: "截图", EN: "Snapshot" }, bundle: eTypes[BundleType.snapshot] },
        { sort: Sort.changeOrientation, type: BundleType.changeOrientation, name: { CN: "横竖屏切换", EN: "Change\nOrientation" }, bundle: eTypes[BundleType.changeOrientation] },
        { sort: Sort.l10nTest, type: BundleType.l10nTest, name: { CN: "语言包测试", EN: "L10n Test" }, bundle: eTypes[BundleType.l10nTest] },
        { sort: Sort.eventTest, type: BundleType.eventTest, name: { CN: "事件测试", EN: "Event Test" }, bundle: eTypes[BundleType.eventTest] },
    ];

    export const LAYERS = Enum(ViewZOrder);

    export const SHOW_STATUS = true;
}

/**@description 网络优先级,值越大，优化级越高 */
export enum NetPriority {
    Game,
    Chat,
    Lobby,
}

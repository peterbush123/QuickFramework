/**@description 调试 */
interface Logger {
	/**@description 错误日志 */
	e(...data: any[]): void;
	/**@description debug日志 */
	d(...data: any[]): void;
	/**@description 警告输出 */
	w(...data: any[]): void;
	/**
	 * @description dump 对象数据
	 * @param object dump的对象
	 * @param label 标签
	 * @param deep 深度
	 */
	dump(object: unknown, label?: string, deep?: number): void;
}
declare let Log: Logger;

declare type BUNDLE_TYPE = string | import("cc").AssetManager.Bundle;
declare type SocketBuffer = string | Uint8Array;
declare type AssetDataType = import("cc").Asset | import("cc").Asset[]
interface DispatchEvent{
	[key: string]: any;
	/**@description 是否阻止事件继续执行, 默认为 false */
	isStop: boolean;
	/**@description 函数返回结果 */
	result?: any;
}

/**
 * @description 同步发事件
 * @param name 事件名
 * @param args 参数
 * @example 
 * ```ts
 * const ret = dispatch("test",1,2,3);
 * // todo
 * ```
 */
declare function dispatch(name: string, ...args: any[]): any;

/**
 * @description 异步发事件
 * @param name 事件名
 * @param args 参数
 * @example 
 * ```ts
 * const ret = await dispatchAsync("test",1,2,3);
 * // todo
 * ```
 */
declare function dispatchAsync(name: string, ...args: any[]): Promise<any>;

declare interface Date {
	/**
	 * @description 格式当前时间 
	 * @example 
	 * y : 年
	 * M ：月
	 * d : 日
	 * h : 时 
	 * m : 分
	 * s : 秒
	 * q : 季度
	 * S ：毫秒
	 * let now = new Date();
	 * let str = now.format("yyyy:MM:dd hh:mm:ss"); //2019:11:07 10:19:51
	 * str = now.format("yyyy/MM/dd");//2019/11/07
	 * str = now.format("hh:mm:ss");//10:19:51
	 * str = now.format("yyyy/MM/dd hh:mm:ss.SS 第qq季度");//2022/07/21 23:32:23.75 第03季度
	 * */
	format(format: string): string;
}

declare interface DateConstructor {
	/**
	 * @description 返回当前时间的秒数
	 * @example 
	 * Date.timeNow()
	 *  */
	timeNow(): number;
	/**
	 * @description 返回格式化后的时间
	 * @param format 
	 * @param date 如果不传入，则为当前时间
	 */
	format(format: string, date?: Date): string;
}

declare interface StringConstructor {
	/**
	 * @description 格式化字符串
	 * @example
	 * String.format("{0}-->{1}-->{2}","one","two","three") | String.format("{0}-->{1}-->{2}",["one","two","three"])
	 * => "one-->two-->three"
	 * */
	format(...args: any[]): string;
}

declare function md5(data: any): any;

/**@description 提示弹出框配置 */
declare interface AlertConfig {
	/**@description 用来标识弹出框，后面可指定tag进行关闭所有相同tag的弹出框 */
	tag?: string | number,
	/**@description 提示内容 richText只能二先1 */
	text?: string,
	/**@description 标题,默认为 : 温馨提示 */
	title?: string,
	/**@description 确定按钮文字 默认为 : 确定*/
	confirmString?: string,
	/**@description 取消按钮文字 默认为 : 取消*/
	cancelString?: string,
	/**@description 确定按钮回调 有回调则显示按钮，无回调则不显示*/
	confirmCb?: (isOK: boolean) => void,
	/**@description 取消按钮回调 有回调则显示按钮，无回调则不显示*/
	cancelCb?: (isOK: boolean) => void,
	/**@description 富文件显示内容 跟text只能二选1 */
	richText?: string,
	/**@description true 回调后在关闭弹出 false 关闭弹出框在回调 默认为 : false */
	immediatelyCallback?: boolean,
	/**@description 是否允许该tag的弹出框重复弹出，默认为true 会弹出同类型的多个 */
	isRepeat?: boolean,
	/**@description 用户自定义数据 */
	userData?: any,
}

/**
 * @description 处理游戏事件接口声明
 * cc.game.EVENT_ENGINE_INITED
 * cc.game.EVENT_GAME_INITED
 * cc.game.EVENT_HIDE
 * cc.game.EVENT_RESTART
 * cc.game.EVENT_SHOW
 **/
declare interface GameEventInterface {

	/**@description 进入后台 cc.game.EVENT_HIDE*/
	onEnterBackground(): void;

	/**
	 * @description 进入前台 cc.game.EVENT_SHOW
	 * @param inBackgroundTime 在后台运行的总时间，单位秒
	 */
	onEnterForgeground(inBackgroundTime: number): void;
}

declare type UIView = import("../quick/core/ui/UIView").default;
declare interface UIClass<T extends UIView> {
	new(): T;
	/**
	 *@description 视图prefab 地址 resources目录下如z_panels/WeiZoneLayer,
	 * 如果是在主场景上的节点
	 * static getPrefabUrl(){
	 *   return `@LoginView`;
	 * } 
	 */
	getPrefabUrl(): string;

	/**@description 界面逻辑处理器 */
	logicType: ModuleClass<Logic>;
}

/**
 * @description 单列接口类
 */
declare interface ISingleton {
	/**@description 初始化 */
	init?(...args: any[]): any;
	/**@description 销毁(单列销毁时调用) */
	destory?(...args: any[]): any;
	/**@description 清理数据 */
	clear?(...args: any[]): any;
	/**@description 是否常驻，即创建后不会删除 */
	isResident?: boolean;
	/**@description 不用自己设置，由单列管理器赋值 */
	module: string;
	/**输出调试信息 */
	debug?(...args: any[]): void;

	onLoad?(node:import("cc").Node|UIView): void;
	onDestroy?(node:import("cc").Node|UIView): void;
	onUpdate?(node:import("cc").Node|UIView,dt:number): void;
}

declare interface ModuleClass<T> {
	new(...args: any): T;
	/**@description 模块名 */
	module: string;
}

/**@description 单列类型限制 */
declare interface SingletonClass<T> extends ModuleClass<T> {
	instance?: T;
}

declare interface EntryClass<T> {
	new(): T;
	/**@description 当前bundle名 */
	bundle: string;
}

declare type Entry = import("../quick/core/entry/Entry").Entry;
declare type Logic = import("../quick/core/logic/Logic").Logic;
declare type GameView = import("../quick/core/ui/GameView").default;
declare type AudioComponent = import("../quick/components/AudioComponent").default;

declare type Handler = import("../quick/core/net/service/Handler").Handler;
declare type WSService = import("../quick/core/net/ws/WSService").WSService;
declare interface WSServiceClass<T extends WSService> extends ModuleClass<T> {
}

/**
 * @description 通过预置体路径创建节点 请使用全局的导入
 * @param config 配置信息
 * @param config.url 预置体路径
 * @param config.view 预置视图资源管理器，继承自UIView
 * @param config.complete 创建完成回调 
 * @param config.bundle 可不填，默认为打开UIView时指向的Bundle
 * @example 
 * createPrefab({url :GAME_RES("res/animations/shzDealerCommon"),view:this,complete:(node)=>{
 *     if ( node ){
 *         // to do 
 *     }
 * }});
 **/
declare function createPrefab(
	config: {
		/**@description url */
		url: string,
		/**@description 资源持有者 UIView 子类 */
		view: UIView,
		/**@description 完成回调 */
		complete?: (node: import("cc").Node) => void,
		/**@description 资源所在bundle */
		bundle?: BUNDLE_TYPE
	}): void;

/**
* @description 扩展一个在界面中加载指定目录的接口 请使用全局的导入
* @param config 配置信息
* @param config.url 资源路径
* @param config.view 资源持有者,继承自UIView
* @param config.onComplete 加载完成回调 data为ResourceCacheData，用之前先判断当前返回的data.data是否是数组
* @param config.onProgress 加载进度
* @param config.bundle 可不填，默认为view指向的bundle
* @param config.type 加载的资源类型
* */
declare function loadDirRes(config: {
	/**@description 资源所在bundle */
	bundle?: BUNDLE_TYPE,
	/**@description url */
	url: string,
	/**@description 资源类型 */
	type: typeof import("cc").Asset,
	/**@description  资源持有者 UIView 子类 */
	view: UIView,
	/**@description 加载进度回调 */
	onProgress?: (finish: number, total: number, item: import("cc").AssetManager.RequestItem) => void,
	/**@description 加载完成回调 */
	onComplete?: (data: import("../quick/core/asset/Resource").Resource.Cache) => void
}): void;

/**
* @description 扩展一个在界面加载指定资源接口 请使用全局的导入
* @param config 配置信息
* @param config.bundle 可不填，默认为view指向的bundle
* @param config.url 资源路径
* @param config.type 加载的资源类型
* @param config.onProgress 加载进度
* @param config.onComplete 加载完成回调 data为ResourceCacheData
* @param config.view 资源持有者,继承自UIView
*/
declare function loadRes<T extends import("cc").Asset>(config: {
	/**@description 资源所在bundle */
	bundle?: BUNDLE_TYPE,
	/**@description url */
	url: string,
	/**@description 资源类型 */
	type:typeof import("cc").Asset,
	/**@description 加载进度回调 */
	onProgress?: (finish: number, total: number, item: import("cc").AssetManager.RequestItem) => void,
	/**@description 加载完成回调 */
	onComplete?: (data: T) => void,
	/**@description  资源持有者 UIView 子类 */
	view: UIView,
}): void;


declare type EntryDelegate = import("../quick/core/entry/EntryDelegate").EntryDelegate;
declare type Message = import("../quick/core/net/message/Message").Message;

declare type IWSMsgHandler = import("../quick/core/net/ws/IWSMsgHandler").IWSMsgHandler;

/**@description 语言包相关 */
declare namespace Language {

	interface FrameworkData {
		/**@description 程序写入 */
		bundles: Record<string, any>;
		/**@description 保存图片失败 */
		capture_save_failed: string;
		/**@description 截图成功*/
		capture_success: string;
		/**@description 截图失败 */
		capture_failed: string;
		/**@description 成功保存到设备相册 */
		capture_save_photo_album: string;
		/**@description 成功保存在设备目录并加载成功: {0} */
		capture_save_local_success1: string;
		/**@description 成功保存在设备目录: {0}*/
		capture_save_local_success2: string;
		/**@description {0}网络已断开，是否重新连接？ */
		warningReconnect: string;
		/**@description {0}网络:正在尝试第{1}次连接... */
		tryReconnect: string;
		/**@description 更新{0}失败*/
		updateFaild: string;
		/**@description 检测更新中...*/
		checkingUpdate: string;
		/**@description {0}已升级到最新 */
		alreadyRemoteVersion: string;
		/**@description {0}加载失败!!! */
		loadFailed: string;
		/**@description {0}更新完成，需要重启游戏 */
		restartApp: string;
		/**@description 下载文件失败，请重试!!! */
		downloadFailed: string;
		/**@description 正在加载... */
		loading: string;
	}

	export interface Data<T extends FrameworkData = FrameworkData> {
		language: string;
		[key:string] : Object;
		data: T;
	}

	export interface BundleData<T extends Object = Object> {
		language: string;
		[key:string] : Object;
		data: T;
	}

	export interface LanguageComponent {
		forceDoLayout(): void;
	}
}

/**@description UIManager open参数说明 */
declare interface OpenOption {
	/**@description 打开界面的类型 */
	type: UIClass<UIView>;
	/**@description 视图绑定预置资源所在bundle,默认为resources目标 */
	bundle?: BUNDLE_TYPE;
	/**@description 节点层级，默认为0 */
	zIndex?: number;
	/**
	 * @description 
	 * delay > 0 时间未加载界面完成显示加载动画，
	 * delay = 0 则不显示加载动画，但仍然会显示UILoading,在加载界面时阻挡玩家的触摸事件
	 * delay 其它情况以UILoading的默认显示时间为准
	 */
	delay?: number;
	/**@description 默认""
	 * 界面名字，如商城，个人信息,当delay>0时，加载超时后，会提示显示某某界面失败 
	 * 否则默认提示加载界面失败
	 **/
	name?: string;
	/**@description 是否是预加载预置资源，默认为false */
	preload?: boolean;
	/**@description 用户自定义参数 */
	args?: any | any[];
	/**@description 默认为 true 是否缓存界面，开启懒释放功能生效，会把整个界面及加载过的资源都缓存起来，收到内存警告时，才会通过释放管理器释放资源及节点 */
	isCache?: boolean;
}

declare interface DefaultOpenOption extends OpenOption {
	/**@description 视图绑定预置资源所在bundle,默认为resources目标 */
	bundle: BUNDLE_TYPE;
	/**@description 节点层级，默认为0 */
	zIndex: number;
	/**@description 是否是预加载预置资源，默认为false */
	preload: boolean;
}

declare type ByteArray = import("../quick/plugin/ByteArray").ByteArray;

declare type TableView = import("../quick/core/ui/TableView").default;

declare let App: import("../assets/Application").Application;

/**@description 等待注入到App中的数据 */
declare interface WaitToAppData {
	entrys: { [key: string]: { target: any, type: UIClass<any> } };
}

declare let WaitToApp: WaitToAppData;

/**@description 注入类型 */
type InjectType = "logic" | "data" | "singleton" | "service"  | "handler";
interface InjectParam<T> {
	type: ({ new(...args: any): T } | string);
	name: InjectType;
}

/**@description bundle 数据 */
interface BundleData {
	/**@description bundle 展示名，该字段会合并到语言包内 */
	name: {
		/**@description 中文 */
		CN: string,
		/**@description 英文 */
		EN: string
	};
	/**@description bundle 名 */
	bundle: string;
	/**@description 类型，相当于枚举值，定义后，不能改变数值，否则会影响到语言包的获取 */
	type: number;
	/**@description 排序 */
	sort: number;
}

/**@description 入口用户数据 */
interface EntryUserData{
	[key:string] : any;
	/**@description 是否是预加载资源,并不会进入bundle */
	isPreload ?: boolean;
	/**@description 是否附加在当前 bundle 运行*/
	isAttach ?: boolean;
	/**@description 是否切换显示方向*/
	changeOrientation ?: boolean;
}

/**@description 热更新导航数据 */
interface NavigationData{
	/**@description 当前热更新版本号 */
	version : string;
	/**@description 
	 * undefined 时，所有人都更新 version 对应热更新, 
	 * 不为 undefined 时，只有白名单内的用户更新 version 对应热更新
	 * 否则更新 onlineVersion 对应热更新
	 * */
	whiteList ?: string[];
	/**@description 线上运营热更新版本号 */
	onlineVersion ?: string;
}

interface DebugConfig{
    /**@description 按钮文本 */
    text : string;
    /**@description 回调 */
    onEvent : ()=>void;
}

interface DebugViewArgs{
    onClose?: () => void;
}

/**@description 层级 配置 */
interface LayerConfig {
	/**@description 层级名 */
	name: string,
	/**@description 层级排序 */
	sort: number,
}
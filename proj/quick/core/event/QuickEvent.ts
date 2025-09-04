import { Component, NodeEventType, Node, __private, js, EventHandler } from "cc";
import { DEBUG } from "cc/env";

export namespace QuickEvent {
    export type Callback = (...any: any[]) => void;

    export enum Type {
        /**@description 组件 Button */
        Click = "clickEvents",
        /**@description 组件 EditBox */
        EditingDidBegan = "editingDidBegan",
        /**@description 组件 EditBox */
        TextChanged = "textChanged",
        /**@description 组件 EditBox */
        EditingDidEnded = "editingDidEnded",
        /**@description 组件 EditBox */
        EditingReturn = "editingReturn",
        /**@description 组件 ScrollView */
        Scroll = "scrollEvents",
        /**@description 组件 Slider */
        Slider = "slideEvents",
        /**@description 组件 Toggle | ToggleContainer */
        Check = "checkEvents",
        /**@description 组件 PageView */
        Page = "pageEvents",
        /**@description 组件 UICoordinateTracker */
        Sync = "syncEvents",
        /**@description 组件 VideoPlayer */
        Video = "videoPlayerEvent",
        /**@description 组件 WebView */
        WebView = "webviewEvents",
    }

    export interface Args {
        /**
         * @description 绑定事件类型
         */
        bind: "Dispatcher" | "Game" | "Input" | "Node" | "EventHandler";

        /**@description 事件类型名 */
        type: string | NodeEventType;
        /**
         * @description 绑定事件的节点，bindType 为 NODE,必选参数,其它可以不用
         */
        node?: Node;
        /**@description 绑定回调 */
        cb?: Callback;
        /**@description node.on参数中的target */
        target?: unknown;
        /**@description node.on参数中的useCapture */
        useCapture?: any;
        /**@description 回调会在第一时间被触发后删除自身*/
        once?: boolean;
        /**@description 优先级,仅 onD 有效*/
        sort?: number;
        /**@description 自定义事件数据 仅 onH 有效 */
        customEventData?: string;
        /**@description 组件 仅 onH 有效 */
        comp?: Component | null;
        /**@description 是否强制绑定 target 为 this 默认为 true */
        forceBindTarget?: boolean;
        /**@description 原始回调 onH 有效 */
        originCb?: Callback;
    }

    export interface Processor {
        addEvents(): void;
        /**
         * @description 注册事件
         * @param args 
         */
        on(args: Args): void;
        /**
         * @description 注册只响应一次的事件
         * @param args 
         */
        once(args: Args): void;
        /**
         * @description 反注册事件
         * @param args 
         */
        off(args: Args): void;

        /**
         * @description 注册绑定到 App.dispatcher 的事件
         * @param eventName 
         * @param func 
         */
        onD(eventName: string, func: Callback, sort?: number): void;
        /**
         * @description 注册绑定到 App.dispatcher 只响应一次的事件
         * @param eventName 
         * @param func 
         */
        onceD(eventName: string, func: Callback, sort?: number): void;
        /**
         * @description 反注册绑定到 App.dispatcher 的事件
         * @param eventName 
         * @param func 
         */
        offD(eventName: string): void;

        /**
         * @description 注册 game 的特定事件类型回调。
         * @param type 
         * @param cb 
         */
        onG(type: string, cb: Callback): void;
        /**
         * @description 注册 game 的特定事件类型回调，回调会在第一时间被触发后删除自身。
         * @param type 
         * @param cb 
         */
        onceG(type: string, cb: Callback): void;
        /**
         * @description 反注册 game 事件
         * @param type 
         * @param cb 
         */
        offG(type: string, cb: Callback): void;

        /**
         * @description 注册 输入事件。
         * @param type 
         * @param cb 
         */
        onI<K extends keyof __private._cocos_input_input__InputEventMap>(eventType: K, cb: Callback): void;
        /**
         * @description 注册 输入事件，回调会在第一时间被触发后删除自身。
         * @param type 
         * @param cb 
         */
        onceI<K extends keyof __private._cocos_input_input__InputEventMap>(eventType: K, cb: Callback): void;
        /**
         * @description 反注册 输入事件
         * @param type 
         * @param cb 
         */
        offI<K extends keyof __private._cocos_input_input__InputEventMap>(eventType: K, cb: Callback): void;

        /**
         * @description 注册节点事件
         * @param node 
         * @param type 
         * @param cb 
         * @param target
         * @param useCapture 
         */
        onN(node: Node | null | undefined, type: string | NodeEventType, cb: Callback, target?: unknown, useCapture?: any): void;
        /**
         * @description 注册节点事件，回调会在第一时间被触发后删除自身。
         * @param node 
         * @param type 
         * @param cb 
         * @param target
         * @param useCapture 
         */
        onceN(node: Node | null | undefined, type: string | NodeEventType, cb: Callback, target?: unknown, useCapture?: any): void;
        /**
         * @description 反注册 注册节点事件
         * @param node 
         * @param type 
         * @param cb 
         * @param target
         * @param useCapture 
         */
        offN(node: Node | null | undefined, type: string | NodeEventType, cb: Callback, target?: unknown, useCapture?: any): void;

        /**
         * @description 注册组件事件
         * @param comp 组件
         * @param cb 回调函数名
         * @param target 事件目标 传入当前 this 最终会通过 js.getClassName(target) 对 handler.component 赋值 
         * @param customEventData 自定义事件数据
         * ```ts
         * // 注册组件事件
         * this.onH(this.button, "click", "click");
         * // 等同于
         *  let handler = new Component.EventHandler();
         *  handler.target = this.node;
         *  handler.component = "HallView";
         *  handler.handler = "onMail";
         *  handler.customEventData = "mail";
         *  change.getComponent(Button)!.clickEvents.push(handler);
         * ```
         */
        onH(
            comp: Component | null | undefined,
            type: Type,
            cb: string | Function,
            target: unknown,
            customEventData?: string,
        ): void;

        offH(
            comp: Component | null | undefined,
            type: Type,
            cb: string | Function,
            target: unknown,
            customEventData?: string,
        ): void;
    }

    function createHandler(args: Args) {
        let handler = new EventHandler();
        const target = args.target as Component;
        handler.target = target.node;
        handler.component = js.getClassName(target);
        handler.handler = args.cb as any;
        (handler as any).originCb = args.originCb;
        handler.customEventData = args.customEventData || "";
        return handler;
    }

    export function addHandler(args: Args, events: EventHandler[]) {
        args = fixHandlerArgs(args);
        if (events && Array.isArray(events)) {
            if (events.find((item) => (item as any).originCb == args.originCb)) {
                Log.w(`事件 ${args.type} 重复注册`);
                return;
            }
            events.push(createHandler(args));
        } else {
            DEBUG && Log.w(`组件 ${js.getClassName(args.comp)} 不支持 ${args.type}`);
        }
    }

    export function removeHandler(args: Args, events: EventHandler[]) {
        args = fixHandlerArgs(args);
        if (events && Array.isArray(events)) {
            const index = events.findIndex((item) => (item as any).originCb == args.originCb);
            if (index != -1) {
                events.splice(index, 1);
            }
        }
    }

    function fixHandlerArgs(args: Args) {
        const target = args.target as Component;
        args.originCb = args.cb;
        let cb = args.cb as any;
        if (typeof args.cb == "function") {
            cb = args.cb.name;
            if (!cb) {
                let funcName = `on_${js.getClassName(target)}_${args.type}_${args.comp?.uuid}`;
                (target as any)[funcName] = args.originCb?.bind(target);
                cb = funcName;
                Log.w(`无法找到函数，重新绑定: ${funcName}`);
            }
            args.cb = cb;
        }
        return args;
    }

}
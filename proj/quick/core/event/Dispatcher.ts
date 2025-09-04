import { Node } from "cc";
/**
 * @description 事件派发器，原生的，当前节点没有在运行时，无法收到消息
 */

interface IEvent {
    /**@description 事件类型 */
    type: string;
    /**@description 事件target */
    target: any;
    /**@description 事件回调 */
    callback: Function;
    /**@description 是否只调用一次 */
    once?: boolean;
    /**@description 优先级 默认为0，数值越大，优先级越高 */
    sort?: number;
}

export class Dispatcher implements ISingleton {

    protected static _instance: Dispatcher = null!;
    public static get instance() { return this._instance || (this._instance = new Dispatcher()); }
    private _eventCaches: { [key: string]: Array<IEvent> } = null!;
    constructor() {
        this._eventCaches = {};
    }
    isResident?: boolean = true;
    static module: string = "【事件管理器】";
    module: string = null!;
    destory() {
        Dispatcher._instance = null as any;
    }

    onDestroy(node: Node): void {
        this.clear();
    }

    clear(...args: any[]) {
        this._eventCaches = {};
    }
    /**
     * @description 添加事件
     * @param type 事件类型
     * @param callback 事件回调
     * @param target target
     */
    public add(
        type: string,
        callback: Function,
        target: any,
        options: { once?: boolean, sort?: number } = {},
    ) {
        if (!type || !callback || !target) return;
        let eventCaches: Array<IEvent> = this._eventCaches[type] || [];
        let hasSame = false;
        for (let i = 0; i < eventCaches.length; i++) {
            if (eventCaches[i].target === target) {
                hasSame = true;
                break;
            }
        }
        if (hasSame) {
            return;
        }
        let newEvent: IEvent = {
            type: type,
            callback: callback,
            target: target,
            once: options.once,
            sort: options.sort == undefined ? 0 : options.sort
        };
        eventCaches.push(newEvent);
        eventCaches.sort((a: IEvent, b: IEvent) => {
            return b.sort! - a.sort!;
        });
        this._eventCaches[type] = eventCaches;
    }

    /**
     * @description 移除事件
     * @param type 事件类型
     * @param target 
     */
    public remove(type: string, target: any) {
        if (!type || !target) {
            return;
        }
        let eventCaches: Array<IEvent> = this._eventCaches[type];
        if (!eventCaches) {
            return;
        }
        for (let i = 0; i < eventCaches.length; i++) {
            if (eventCaches[i].target === target) {
                eventCaches.splice(i, 1);
                break;
            }
        }
        if (eventCaches.length == 0) {
            delete this._eventCaches[type];
        }
    }

    /**
     * @description 派发事件
     * @param type 事件类型
     * @param data 事件数据
     */
    public dispatch(...args: any[]) {
        if (args.length < 1) {
            return undefined;
        }
        let type = args[0];
        if (!type) return undefined;
        const eventArgs = args.slice(1);
        let eventCaches: Array<IEvent> = this._eventCaches[type];
        if (!eventCaches) return;
        let onceEvent: IEvent[] = [];
        let ev: DispatchEvent = {
            isStop: false,
            result: undefined,
        };
        for (let i = 0; i < eventCaches.length; i++) {
            let event = eventCaches[i];
            try {
                if (typeof Reflect == "object") {
                    ev.result = Reflect.apply(event.callback, event.target, [ev, ...eventArgs]);
                } else {
                    ev.result = event.callback.apply(event.target, [ev, ...eventArgs]);
                }
                if (event.once) {
                    onceEvent.push(event);
                }
                if (ev.isStop) {
                    break;
                }
            } catch (err) {
                Log.e(err);
            }
        }
        for (let i = 0; i < onceEvent.length; i++) {
            const ele = onceEvent[i];
            this.remove(ele.type, ele.target);
        }
        return ev.result;
    }

    /**
     * @description 派发事件
     * @param type 事件类型
     * @param data 事件数据
     */
    public async dispatchAsync(...args: any[]) {
        if (args.length < 1) {
            return undefined;
        }
        let type = args[0];
        if (!type) return undefined;
        const eventArgs = args.slice(1);
        let eventCaches: Array<IEvent> = this._eventCaches[type];
        if (!eventCaches) return;
        let onceEvent: IEvent[] = [];
        let ev: DispatchEvent = {
            isStop: false,
            result: undefined,
        }
        for (let i = 0; i < eventCaches.length; i++) {
            let event = eventCaches[i];
            try {
                if (typeof Reflect == "object") {
                    ev.result = Reflect.apply(event.callback, event.target, [ev, ...eventArgs]);
                } else {
                    ev.result = event.callback.apply(event.target, [ev, ...eventArgs]);
                }
                if (ev.result instanceof Promise) {
                    ev.result = await ev.result;
                }
                if (event.once) {
                    onceEvent.push(event);
                }
                if (ev.isStop) {
                    break;
                }
            } catch (err) {
                Log.e(err);
            }
        }
        for (let i = 0; i < onceEvent.length; i++) {
            const ele = onceEvent[i];
            this.remove(ele.type, ele.target);
        }
        return ev.result;
    }
}

window.dispatch = function () {
    //向自己封闭的管理器中也分发
    if (App) {
        return Reflect.apply(App.dispatcher.dispatch, App.dispatcher, arguments);
    } else {
        return Reflect.apply(Dispatcher.instance.dispatch, Dispatcher.instance, arguments);
    }
}

window.dispatchAsync = function () {
    //向自己封闭的管理器中也分发
    if (App) {
        return Reflect.apply(App.dispatcher.dispatchAsync, App.dispatcher, arguments);
    } else {
        return Reflect.apply(Dispatcher.instance.dispatchAsync, Dispatcher.instance, arguments);
    }
}
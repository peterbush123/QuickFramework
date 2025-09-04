/**
 * @description 事件处理组件
 */

import { game, input, isValid, Node, NodeEventType, __private, Toggle, Component, EventHandler, js } from "cc";
import { QuickEvent } from "./QuickEvent";
import { DEBUG } from "cc/env";
export class EventProcessor implements QuickEvent.Processor {

    /**@description Dispatcher 事件 */
    private _eventsD: Map<string, QuickEvent.Args> = new Map();
    /**@description game 事件 */
    private _eventsG: QuickEvent.Args[] = [];
    /**@description  输入事件*/
    private _eventsI: QuickEvent.Args[] = [];

    /**
     * 注册事件 ，在onLoad中注册，在onDestroy自动移除
     * @param name 
     * @param func 
     */
    onD(name: string, func: QuickEvent.Callback, sort: number = 0): void {
        this.on({
            bind: "Dispatcher",
            type: name,
            cb: func,
            sort
        });
    }

    onceD(eventName: string, func: QuickEvent.Callback, sort: number = 0): void {
        this.once({
            bind: "Dispatcher",
            type: eventName,
            cb: func,
            sort
        });
    }
    offD(eventName: string): void {
        this.off({
            bind: "Dispatcher",
            type: eventName,
        });
    }

    onG(type: string, cb: QuickEvent.Callback): void {
        this.on({
            bind: "Game",
            type: type,
            cb: cb,
        })
    }
    onceG(type: string, cb: QuickEvent.Callback): void {
        this.once({
            bind: "Game",
            type: type,
            cb: cb,
        });
    }
    offG(type: string, cb: QuickEvent.Callback): void {
        this.off({
            bind: "Game",
            type: type,
            cb: cb
        });
    }

    onI<K extends keyof __private._cocos_input_input__InputEventMap>(eventType: K, cb: QuickEvent.Callback): void {
        this.on({
            bind: "Input",
            type: eventType,
            cb: cb,
        })
    }
    onceI<K extends keyof __private._cocos_input_input__InputEventMap>(eventType: K, cb: QuickEvent.Callback): void {
        this.once({
            bind: "Input",
            type: eventType,
            cb: cb,
        });
    }

    offI<K extends keyof __private._cocos_input_input__InputEventMap>(eventType: K, cb: QuickEvent.Callback): void {
        this.off({
            bind: "Input",
            type: eventType,
            cb: cb
        });
    }

    onN(node: Node, type: string | NodeEventType, cb: QuickEvent.Callback, target?: unknown, useCapture?: any): void {
        this.on({
            bind: "Node",
            type: type,
            cb: cb,
            target: target,
            useCapture: useCapture,
            node: node,
        });
    }
    onceN(node: Node, type: string | NodeEventType, cb: QuickEvent.Callback, target?: unknown, useCapture?: any): void {
        this.once({
            bind: "Node",
            type: type,
            cb: cb,
            target: target,
            useCapture: useCapture,
            node: node
        })
    }
    offN(node: Node, type: string | NodeEventType, cb: QuickEvent.Callback, target?: unknown, useCapture?: any): void {
        this.off({
            bind: "Node",
            type: type,
            cb: cb,
            target: target,
            useCapture: useCapture,
            node: node
        });
    }

    onH(
        comp: Component | null | undefined,
        type: QuickEvent.Type,
        cb: string | QuickEvent.Callback,
        target: unknown,
        customEventData?: string,
    ): void {
        this.on({
            bind: "EventHandler",
            type: type,
            cb: cb as any,
            comp: comp,
            target: target,
            customEventData: customEventData,
            forceBindTarget: false,
        })
    }

    offH(
        comp: Component | null | undefined,
        type: QuickEvent.Type,
        cb: string | QuickEvent.Callback,
        target: unknown,
        customEventData?: string,
    ): void {
        this.off({
            bind: "EventHandler",
            type: type,
            cb: cb as any,
            comp: comp,
            target: target,
            customEventData: customEventData,
            forceBindTarget: false,
        })
    }

    addEvents() {

    }

    onLoad(...args: any[]) {
        this.addEvents();
    }

    onDestroy(...args: any[]) {
        this._cleanD();
        this._cleanG();
        this._cleanI();
        this._cleanN();
        this._cleanH();
    }

    on(args: QuickEvent.Args): void {
        switch (args.bind) {
            case "Dispatcher": this._onD(args); break;
            case "Game": this._onG(args); break;
            case "Input": this._onI(args); break;
            case "Node": this._onN(args); break;
            case "EventHandler": this._onH(args); break;
            default: Log.e(`on ${args.bind} 未知事件类型`)
        }
    }
    once(args: QuickEvent.Args): void {
        args.once = true;
        this.on(args);
    }

    off(args: QuickEvent.Args): void {
        switch (args.bind) {
            case "Dispatcher": this._offD(args); break;
            case "Game": this._offG(args); break;
            case "Input": this._offI(args); break;
            case "Node": this._offN(args); break;
            case "EventHandler": this._offH(args); break;
            default: Log.e(`off ${args.bind} 未知事件类型`)
        }
    }

    private _onD(args: QuickEvent.Args) {
        if (!args.target) {
            args.target = this;
        }
        if (this._eventsD.has(args.type)) {
            Log.e(`${args.type} 重复注册`);
            return;
        }
        App.dispatcher.add(args.type, args.cb!, args.target, { once: args.once, sort: args.sort });
        this._eventsD.set(args.type, args);
    }

    private _offD(args: QuickEvent.Args) {
        if (!args.target) {
            args.target = this;
        }
        if (this._eventsD.has(args.type)) {
            //事件移除
            App.dispatcher.remove(args.type, args.target);
            //删除本地事件
            this._eventsD.delete(args.type);
        }
    }

    private _cleanD() {
        this._eventsD.forEach((args, name) => {
            App.dispatcher.remove(args.type, args.target);
        });
        this._eventsD.clear();
    }

    private _onG(args: QuickEvent.Args) {
        if (!args.target) {
            args.target = this;
        }
        if (game.hasEventListener(args.type, args.cb!, args.target)) {
            return;
        }
        game.on(args.type, args.cb!, args.target, args.once);
        this._eventsG.push(args);
    }

    private _offG(args: QuickEvent.Args) {
        if (!args.target) {
            args.target = this;
        }
        game.off(args.type, args.cb, args.target);
        for (let i = 0; i < this._eventsG.length; i++) {
            const ele = this._eventsG[i];
            if (ele.type == args.type && ele.cb == args.cb && ele.target == ele.target) {
                this._eventsG.splice(i, 1);
                break;
            }
        }
    }

    private _cleanG() {
        for (let i = 0; i < this._eventsG.length; i++) {
            const ele = this._eventsG[i];
            game.off(ele.type, ele.cb, ele.target);
        }
        this._eventsG = [];
    }

    private _onI(args: QuickEvent.Args) {
        if (!args.target) {
            args.target = this;
        }
        if (this._has(this._eventsI, args)) {
            return;
        }
        if (args.once) {
            input.once(args.type as unknown as any, args.cb!, args.target);
        } else {
            input.on(args.type as unknown as any, args.cb!, args.target);
        }
        this._eventsI.push(args);
    }

    private _offI(args: QuickEvent.Args) {
        if (!args.target) {
            args.target = this;
        }
        input.off(args.type as unknown as any, args.cb, args.target);
        for (let i = 0; i < this._eventsI.length; i++) {
            const ele = this._eventsI[i];
            if (ele.type == args.type && ele.cb == args.cb && ele.target == ele.target) {
                this._eventsI.splice(i, 1);
                break;
            }
        }
    }

    private _cleanI() {
        for (let i = 0; i < this._eventsI.length; i++) {
            const ele = this._eventsI[i];
            input.off(ele.type as unknown as any, ele.cb, ele.target);
        }
        this._eventsI = [];
    }

    private _onN(args: QuickEvent.Args) {
        if (!args.target) {
            args.target = this;
        }
        if (!isValid(args.node)) {
            return;
        }
        if (args.once) {
            args.node?.once(args.type, args.cb!, args.target, args.useCapture);
        } else {
            args.node?.on(args.type, args.cb!, args.target, args.useCapture);
        }
    }

    private _offN(args: QuickEvent.Args) {
        if (!args.target) {
            args.target = this;
        }
        if (!isValid(args.node)) {
            return;
        }
        args.node?.off(args.type, args.cb, args.target, args.useCapture);
    }

    private _cleanN() {

    }

    private _onH(args: QuickEvent.Args) {
        if (!args.target) {
            DEBUG && Log.e("事件绑定目标不能为空");
            return;
        }

        if (!(args.target instanceof Component)) {
            DEBUG && Log.e("事件绑定目标必须是组件");
            return;
        }

        if (!isValid(args.comp)) {
            return;
        }
        const events = (args.comp as any)[`${args.type}`];
        QuickEvent.addHandler(args,events);
    }

    private _offH(args: QuickEvent.Args) {
        if (!args.target) {
            return;
        }
        if (!isValid(args.comp)) {
            return;
        }
        const events = (args.comp as any)[`${args.type}`];
        QuickEvent.removeHandler(args,events);
    }

    private _cleanH() {

    }

    private _has(datas: QuickEvent.Args[], args: QuickEvent.Args) {
        for (let i = 0; i < datas.length; i++) {
            const element = datas[i];
            if (element.type == args.type &&
                element.cb == args.cb &&
                element.target == args.target) {
                return true;
            }
        }
        return false;
    }
}

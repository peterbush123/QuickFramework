/**
 * @description 事件处理组件
 */

import { Component, Node, NodeEventType, _decorator, __private, Button, ToggleContainer, ScrollView, Toggle } from "cc";
import { EventProcessor } from "../core/event/EventProcessor";
import { QuickEvent } from "../core/event/QuickEvent";

const { ccclass, property } = _decorator;

@ccclass("EventComponent")
export default class EventComponent extends Component implements QuickEvent.Processor {

    private _eventProcessor = new EventProcessor;

    on(args: QuickEvent.Args): void {
        if (args.forceBindTarget == undefined) {
            args.forceBindTarget = true;
        }
        if (args.forceBindTarget && !args.target) {
            args.target = this;
        }
        this._eventProcessor.on(args);
    }
    once(args: QuickEvent.Args): void {
        if (args.forceBindTarget == undefined) {
            args.forceBindTarget = true;
        }
        if (args.forceBindTarget && !args.target) {
            args.target = this;
        }
        this._eventProcessor.once(args);
    }
    off(args: QuickEvent.Args): void {
        if (args.forceBindTarget == undefined) {
            args.forceBindTarget = true;
        }
        if (args.forceBindTarget && !args.target) {
            args.target = this;
        }
        this._eventProcessor.off(args);
    }

    onD(eventName: string, func: QuickEvent.Callback, sort?: number): void {
        this.on({
            bind: "Dispatcher",
            type: eventName,
            cb: func,
            sort: sort,
        });
    }

    onceD(eventName: string, func: QuickEvent.Callback, sort?: number): void {
        this.once({
            bind: "Dispatcher",
            type: eventName,
            cb: func,
            sort: sort,
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
            cb: cb
        })
    }
    onceG(type: string, cb: QuickEvent.Callback): void {
        this.once({
            bind: "Game",
            type: type,
            cb: cb
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
            cb: cb
        })
    }
    onceI<K extends keyof __private._cocos_input_input__InputEventMap>(eventType: K, cb: QuickEvent.Callback): void {
        this.once({
            bind: "Input",
            type: eventType,
            cb: cb
        })
    }
    offI<K extends keyof __private._cocos_input_input__InputEventMap>(eventType: K, cb: QuickEvent.Callback): void {
        this.off({
            bind: "Input",
            type: eventType,
            cb: cb
        })
    }

    onN(node: Node, type: string | NodeEventType, cb: QuickEvent.Callback, target?: unknown, useCapture?: any): void {
        this.on({
            bind: "Node",
            type: type,
            cb: cb,
            target: target,
            useCapture: useCapture,
            node: node
        })
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
        })
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

    onLoad() {
        super.onLoad && super.onLoad();
        this.addEvents();
    }

    onDestroy() {
        this._eventProcessor.onDestroy();
        this.node.targetOff(this);
        super.onDestroy && super.onDestroy();
    }
}

/**
 * @description 启动脚本
 */
import { _decorator, Asset, Component, director, DirectorEvent, EventTouch, find, Game, Input, isValid, Node, profiler, UITransform, Vec2, Vec3 } from 'cc';
import { DEBUG } from 'cc/env';
import EventComponent from 'db://quick/components/EventComponent';
import { Macro } from 'db://quick/defines/Macros';
import { DebugView } from '../debug/DebugView';
import { ViewZOrder } from '../common/config/Config';
import { Singleton } from 'db://quick/utils/Singleton';
const { ccclass, property, menu } = _decorator;

@ccclass('Launch')
@menu("Quick公共组件/Launch")
export class Launch extends EventComponent {
    @property(Asset)
    wssCacert: Asset = null!;

    async onLoad() {
        super.onLoad();
        await App.onLoad(this.node);
        if (this.wssCacert) {
            App.wssCacertUrl = this.wssCacert.nativeUrl;
        }
        this.initDebug();
        //游戏事件注册
        this.onG(Game.EVENT_HIDE, this.onEnterBackground);
        this.onG(Game.EVENT_SHOW, this.onEnterForgeground);
        //内存警告事件
        this.onG(Game.EVENT_LOW_MEMORY, this.onLowMemory);
    }

    onDestroy() {
        App.onDestroy(this.node);
        super.onDestroy();
    }

    private onEnterBackground() {
        App.onEnterBackground();
    }

    private onEnterForgeground() {
        App.onEnterForgeground();
    }

    private onLowMemory() {
        App.onLowMemory();
    }

    private initDebug() {
        let debug = find("debug", this.node);
        if (DEBUG) {
            if (debug) {
                let isVisibleDebugInfo = App.storage.getItem(Macro.SHOW_DEBUG_INFO_KEY, App.isShowStatus);
                if (isVisibleDebugInfo) {
                    profiler && profiler.showStats();
                } else {
                    profiler && profiler.hideStats();
                }
                if (App.stageData.isShowDebugButton) {
                    debug.active = true;
                    this.onN(debug, Input.EventType.TOUCH_END, (ev: EventTouch) => {
                        let start = ev.getUIStartLocation();
                        let end = ev.getUILocation();
                        const moveDistance = Vec2.distance(start, end);
                        if (moveDistance > 5) {
                            return;
                        }
                        if (debug) debug.active = false;
                        App.uiManager.open({
                            type : DebugView,
                            bundle : Macro.BUNDLE_RESOURCES,
                            args : {
                                onClose : () => {
                                    if (debug) debug.active = true;
                                },
                                onCloseDebug : () => {
                                    if (debug) debug.active = false;
                                }
                            },
                            zIndex : ViewZOrder.Debug
                        })
                    });
                    this.onN(debug, Input.EventType.TOUCH_MOVE, (ev: EventTouch) => {
                        let location = ev.getUILocation();
                        let pos = this.node.getComponent(UITransform)?.convertToNodeSpaceAR(new Vec3(location.x, location.y));
                        debug?.setPosition(pos!);
                    })
                } else {
                    debug.destroy();
                }

            }
        }else{
            if (debug && isValid(debug)) debug.destroy();
        }
    }
}


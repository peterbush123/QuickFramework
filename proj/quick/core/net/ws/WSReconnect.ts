import { DEBUG } from "cc/env";
import { Macro } from "../../../defines/Macros";
import { tween, Tween } from "cc";
/**
 * @description 网络重连
 */
export class WSReconnect {

    service: WSService = null!;

    constructor(service: WSService) {
        this.service = service;
    }

    private get maxCount() {
        return this.service.options.reconnectTimes!;
    }
    readonly connectID = 100;
    /**
     * 是否在等待玩家操作
     */
    isWaiting = false;

    /**
     * 是否正在重连
     */
    isReconnecting = false;

    async start(onConnected: (service: WSService) => void) {
        
        if (this.isWaiting || this.isReconnecting) {
            return;
        }
        DEBUG && Log.d(`${this.service?.module} WSReconnect start`);
        this.isReconnecting = true;
        for (let i = 0; i < this.maxCount; i++) {
            await this.service.flows.reconnectStartFlow.exec({service:this.service,reconnectTimes:i+1})
            let delay = i * 1.5;
            if (delay > 3) {
                delay = 3;
            }
            if (await this.reconnect(delay)) {
                await this.service.flows.reconnectSuccessFlow.exec(this.service);
                onConnected(this.service);
                this.isReconnecting = false;
                return;
            }
        }
        this.isReconnecting = false;
        DEBUG && Log.d(`${this.service?.module} WSReconnect end`);

        this.isWaiting = true;
        const result = await this.service.flows.reconnectFailedFlow.exec({
            service: this.service,
            isNeedReconnect: false,
        });
        if (result && result.isNeedReconnect ) {
            this.isWaiting = false;
            this.service.flows.reconnectFlow.exec(this.service);
        }else{
            this.isWaiting = false;
        }
    }

    private async reconnect(delay: number) {

        if (this.service.isConnected) {
            return true;
        }

        return new Promise<boolean>((resolve, reject) => {
            this.delayCall(this.connectID, delay, async () => {
                try {
                    resolve(await this.service.start());
                } catch (error) {
                    resolve(false);
                }
            });
        });
    }

    private stopAction(tag: number) {
        Tween.stopAllByTag(tag);
    }

    private delayCall(tag: number, time: number, func: () => void) {
        this.stopAction(tag);
        tween(this).tag(tag).delay(time).call(func).start();
    }

    private stopActions() {
        this.stopAction(this.connectID);
    }

    stop() {
        this.stopActions();
    }
}
/**
 * @description websocket服务
 */

import { DEBUG } from "cc/env";
import { Macro } from "../../../defines/Macros";
import { Flow } from "../../flow/Flow";
import { Message } from "../message/Message";
import { Net } from "../Net";
import { WSMsgHandler } from "./WSMsgHandler";
import { NORMAL_CLOSE_CODE } from "./WSProxy";
import { WSReconnect } from "./WSReconnect";
import { IWSServerOptions, IWSServerOptionsBase, WSServer } from "./WSServer";

export interface IWSServiceOptions extends IWSServerOptionsBase {
    /**@description 是否启用心跳 默认为 true */
    enableHeartbeat?: boolean;
    /**@description 心跳间隔(单位毫秒) 默认为 2000毫秒 */
    heartbeatInterval?: number;
    /**@description 丢包心跳次数 默认为 5次 如果5次收不到心跳，则认为连接已断开 */
    lostHeartbeat?: number;
    /**@description 是否定时发送心跳 <br>
     * 默认为 false<br>
     * 如果为 true, 则每隔心跳间隔发送一次心跳<br>
     * 如果为 false, 当收到服务器的任何消息都为被当一个心跳包回包处理<br>
     * */
    isScheduleHeartbeat?: boolean;
    /**@description 进入后台的最大允许时间(单位毫秒，超过了最大值，则进入网络重连,默认60000毫秒 */
    maxEnterBackgroundTime?: number;
    /**@description 是否启用网络重连 默认为 true */
    enableReconnect?: boolean;
    /**@description 重连次数 默认为 3 */
    reconnectTimes?: number;
    /**@description 是否输出心跳消息的日志 默认为 false */
    printHeartbeatLog?: boolean;
    /**@description 最大函数回调处理超时时间(单位毫秒) 默认 5000毫秒，
     * 如果需要处理动画等操作，如果默认时间不够，可自行调整时长 
     * */
    maxHandleTimeout?: number;

}

export abstract class WSService implements IWSMsgHandler, ISingleton {

    /**@description Service所属模块，如Lobby,game */
    static module: string = Macro.UNKNOWN;
    /**@description 该字段由ServiceManager指定 */
    module = Macro.UNKNOWN;

    constructor(module: string) {
        this.module = module;
        this._reconnect = new WSReconnect(this);
        this._handler = new WSMsgHandler(this);
    }

    /**@description 心跳定时器 */
    private _heartbeatTimer: number = -1;

    /**@description 心跳超时计时器 */
    private _lostHeartbeat: number = 0;

    /**@description 是否销毁 */
    isDestory: boolean = false;

    protected _options: IWSServiceOptions = null!
    get options() {
        return this._options;
    }
    set options(v: IWSServiceOptions) {
        this._options = v;
        this.options.tag = this.module;
        this.options.enableHeartbeat = this.options.enableHeartbeat == undefined ? true : this.options.enableHeartbeat;
        this.options.heartbeatInterval = this.options.heartbeatInterval || 2000;
        this.options.lostHeartbeat = this.options.lostHeartbeat || 5;
        this.options.maxEnterBackgroundTime = this.options.maxEnterBackgroundTime || 60000;
        this.options.enableReconnect = this.options.enableReconnect == undefined ? true : this.options.enableReconnect;
        this.options.reconnectTimes = this.options.reconnectTimes || 3;
        this.options.printHeartbeatLog = this.options.printHeartbeatLog == undefined ? false : this.options.printHeartbeatLog;
        this.options.maxHandleTimeout = this.options.maxHandleTimeout || 5000;
        this.options.isScheduleHeartbeat = this.options.isScheduleHeartbeat == undefined ? false : this.options.isScheduleHeartbeat;

        const serverOptions = this.options as IWSServerOptions;
        serverOptions.onOpen = async (ev: Event) => {
            this.flows.openFlow.exec(this);
            if (this.options.enableHeartbeat) {
                this._lostHeartbeat = 0;
                this.doSendHeartbeat();
                this.startHeartbeat();
            }
        };
        serverOptions.onClose = (ev: CloseEvent) => {
            this.flows.closeFlow.exec(this);
            if (ev.code != NORMAL_CLOSE_CODE) {
                this.flows.reconnectFlow.exec(this);
            }
            if (this.options.enableHeartbeat) {
                this.stopHeartbeat();
            }
        };

        serverOptions.onMessage = async (ev: MessageEvent) => {
            let isHandleHeartbeat = false;
            if (this.options.enableHeartbeat && this.options.isScheduleHeartbeat) {
                this._lostHeartbeat = 0;
                this.startHeartbeat();
                isHandleHeartbeat = true;
            }

            // 先对包头进行解析
            let header = await this.doDecodeHeader(ev);
            if (!header) {
                DEBUG && Log.e(`${this.options.tag} decode header error`);
                return;
            }

            if (await this.doIsHeartBeat(header)) {
                // 心跳消息,路过处理,应该不会有人注册心跳吧
                if (DEBUG && this.options.printHeartbeatLog) {
                    Log.d(`${this.options.tag} receive heartbeat message`);
                }
                if (!isHandleHeartbeat && this.options.enableHeartbeat) {
                    this._lostHeartbeat = 0;
                    this.startHeartbeat();
                }
                return;
            }
            DEBUG && Log.d(`${this.options.tag} recv data cmd : ${header.cmd}`);
            this.handler.onMessage(header, this.options.tag);
        };

        serverOptions.onError = (ev: Event) => {
            if (this.options.enableHeartbeat) {
                this.stopHeartbeat();
            }
        };

        if (!this.server) {
            this.server = new WSServer();
        }
        this.server.options = serverOptions
    }

    serviceType: Net.ServiceType = Net.ServiceType.Unknown;

    /**@description 服务器 */
    private server: WSServer = null!;
    get isConnected() { return this.server.isConnected }

    /**@description 重连 */
    protected _reconnect: WSReconnect = null!;
    /**@description 重连 */
    get reconnect() { return this._reconnect }

    /**@description 消息处理 */
    protected _handler: WSMsgHandler = null!;
    /**@description 消息处理 */
    get handler() { return this._handler }

    /**@description 优先级,值越大优先级越高 */
    priority: number = 0

    readonly flows = {
        /**@description 网络连接成功调用 */
        openFlow: new Flow<WSService>(),
        /**@description 网络断开调用 */
        closeFlow: new Flow<WSService>(),
        /**@description 重连调用 */
        reconnectFlow: new Flow<WSService>(true),
        /**@description 重连网络失败 */
        reconnectFailedFlow: new Flow<{
            service: WSService,
            /**@description 是否需要重连 */
            isNeedReconnect: boolean
        }>(),
        /**@description 重连网络开始*/
        reconnectStartFlow: new Flow<{
            service: WSService,
            /**@description 重连次数 */
            reconnectTimes: number,
        }>(),
        /**@description 重连网络成功*/
        reconnectSuccessFlow: new Flow<WSService>(),
        /**@description 发送心跳调用 */
        sendHeartbeatFlow: new Flow<WSService>(true),
        /**@description 判断消息是否是心跳包 */
        isHeartBeatFlow: new Flow<{
            service: WSService,
            message: Message,
            result: boolean,
        }>(true),
        /**@description 包头解析 */
        decodeHeaderFlow: new Flow<{
            service: WSService,
            message: MessageEvent,
            result: Message
        }>(true),
        /**@description 包头打包 */
        encodeHeaderFlow: new Flow<{
            service: WSService,
            message: Message
            result: { isSuccess: boolean, message: Message }
        }>(true),
        /**@description 解析数据(包体) */
        decodeMessageFlow: new Flow<{
            service: WSService,
            message: Message,
            decodeData: Net.DecodeData,
            result: any,
        }>(true),
        /**@description 进入后台 */
        enterBackgroundFlow: new Flow<WSService>(true),
        /**@description 进入前台 */
        enterForegroundFlow: new Flow<{
            service: WSService,
            /**@description 进入后台总时长,单位秒 */
            enterBackgroundTime: number,
            /**@description 返回值，是否需要进入重连 */
            isNeedReconnect: boolean
        }>(true),
        /**@description 发送消息前调用 */
        preSendFlow: new Flow<{
            service: WSService,
            message: Message,
        }>(),
    }

    /**
     * @description 启动心跳
     */
    protected startHeartbeat() {
        this.stopHeartbeat();
        this._heartbeatTimer = setInterval(() => {
            this._lostHeartbeat++;
            if (this._lostHeartbeat > this.options.lostHeartbeat!) {
                this.stopHeartbeat();
                this.server.stop().then(() => {
                    this.flows.reconnectFlow.exec(this);
                })
                return;
            }
            this.doSendHeartbeat();
        }, this.options.heartbeatInterval);
    }

    /**
     * @description 停止心跳
     */
    protected stopHeartbeat() {
        clearInterval(this._heartbeatTimer);
    }

    /**
     * @description 发送心跳
     */
    private doSendHeartbeat() {
        //发送心跳
        if (this.flows.sendHeartbeatFlow.nodes.length > 0) {
            this.flows.sendHeartbeatFlow.exec(this);
        } else {
            DEBUG && Log.e(`${this.options.tag} sendHeartbeatFlow 未注册`);
        }
    }

    /**
     * @description 是否为心跳消息
     */
    private async doIsHeartBeat(data: Message) {
        if (this.flows.isHeartBeatFlow.nodes.length > 0) {
            const result = await this.flows.isHeartBeatFlow.exec({ service: this, message: data, result: false });
            if (result) {
                return result.result;
            }
            return false;
        } else {
            DEBUG && Log.e(`${this.options.tag} isHeartBeatFlow 未注册`);
            return false;
        }
    }

    private async doDecodeHeader(data: MessageEvent) {
        if (this.flows.decodeHeaderFlow.nodes.length > 0) {
            const result = await this.flows.decodeHeaderFlow.exec({ service: this, message: data, result: null! });
            if (result) {
                return result.result;
            }
            return null!;
        } else {
            DEBUG && Log.e(`${this.options.tag} decodeHeaderFlow 未注册`);
            return null;
        }
    }

    private async doEncodeHeader(data: Message) {
        if (this.flows.encodeHeaderFlow.nodes.length > 0) {
            const result = await this.flows.encodeHeaderFlow.exec({ service: this, message: data, result: null! });
            if (result) {
                return result.result;
            }
            return null!;
        } else {
            DEBUG && Log.e(`${this.options.tag} encodeHeaderFlow 未注册`);
            return null;
        }
    }

    /**@description 启动服务器 */
    start(ip: string, port: number, protocol: string) {
        return this.server.start(ip, port, protocol);
    }

    // connct(ip: string, port: number, protocol: string) {
    //     return this.server.start(ip, port, protocol);
    // }

    /**@description 停止服务器 */
    stop() {
        this.handler.stop();
        this.reconnect.stop();
        return this.server.stop();
    }

    async send(data: Message) {
        // data.buffer
        if (data.encode()) {
            let result = await this.doEncodeHeader(data);
            if (!result) {
                return false;
            }
            if (!result.isSuccess) {
                DEBUG && Log.e(`${this.options.tag} encode header error`);
                return false;
            }
            data = result.message;
            if (DEBUG) {
                if (await this.doIsHeartBeat(data)) {
                    if (this.options.printHeartbeatLog) {
                        Log.d(`${this.options.tag} send heartbeat message`);
                    }
                } else {
                    Log.d(`${this.options.tag} send cmd : ${data.cmd} `);
                }
            }
            return this.server.send(data.buffer);
        }
        DEBUG && Log.e(`${this.options.tag} encode error`)
        return false;
    }

    async sendAsync<T extends Message>(data: Message, type: { new(): T } | string, cmd: string, timeout: number = Macro.DEFAULT_RPC_TIEMEOUT) {
        return new Promise<T | null>(async (resolve, reject) => {
            const rpcData = new Net.RPCData(cmd, data, type, resolve, timeout);
            this.handler.addRPC(rpcData);
            await this.flows.preSendFlow.exec({ service: this, message: data });
            const success = await this.send(data);
            if (!success) {
                this.handler.removeRPC(rpcData);
                resolve(null);
            }
        })
    }

    onS(cmd: string, type: any, func: Net.MessageHandleFunc, isQueue: boolean, target: any) {
        this.handler.onS(cmd, type, func, isQueue, target)
    }

    offS(target: any, cmd?: string) {
        this.handler.offS(target, cmd)
    }

    /**
     * @description 暂停消息队列处理
     */
    pause() {
        this.handler.isPause = true;
    }

    /**
     * @description 恢复消息队列处理
     */
    resume() {
        this.handler.isPause = false;
    }

    /**
     * @description 更新
     * @param dt 
     */
    update(dt: number) {
        this.handler.update(dt);
    }

    destory() {
        this.isDestory = true;
        this.stop();
        this.handler.destroy();
    }
}
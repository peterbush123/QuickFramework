
import { DEBUG } from "cc/env";
import { IMessage, Message, MessageHead } from "db://quick/core/net/message/Message";
import { Net } from "db://quick/core/net/Net";
import { IWSServiceOptions, WSService } from "db://quick/core/net/ws/WSService";
import { Macro } from "db://quick/defines/Macros";
import { MainCmd, SUB_CMD_SYS } from "../protocol/CmdDefines";
import { HeartbeatBinary } from "../protocol/HeartbetBinary";
import { GetCmdKey } from "./GetCmdKey";

export interface MessageStruct extends IMessage {
    mainCmd: number
    subCmd: number
}

export class CmmHead extends MessageHead {
    /**@description 消息主cmd码 */
    mainCmd: number = 0;
    /**@description 消息子cmd码 */
    subCmd: number = 0;
    /**@description 数据buffer */
    buffer: Uint8Array = null!;
    headerSize: number = 3 * Uint32Array.BYTES_PER_ELEMENT;

    encode(data: MessageStruct): boolean {
        this.mainCmd = data.mainCmd;
        this.subCmd = data.subCmd;
        let payload = data.buffer ? new Uint8Array(data.buffer as any) : new Uint8Array();
        let MessageHeader = App.protoManager.getType<typeof netpkt.MessageHeader>("MessageHeader");
        const header = MessageHeader.create({
            version: 4,
            main_id: this.mainCmd,
            sub_id: this.subCmd,
            request_id: Date.now(),
            body_len: payload.length,
            codec_type: 0, // NONE
            reserved: 0
        });
        const buffer = App.protoManager.SerializeMsg("MessagePacket", {
            header,
            payload
        });
        const packet: netpkt.MessagePacket = App.protoManager.DeserializeMsg<netpkt.MessagePacket>('MessagePacket', buffer);
        const dd: tp.RoomInfo = App.protoManager.DeserializeMsg<tp.RoomInfo>('RoomInfo', packet.payload);
        this.buffer = buffer;
        return true;
    }

    decode(event: MessageEvent): boolean {
        try {
            const uint8Buf = new Uint8Array(event.data as ArrayBuffer);
            const packet: netpkt.MessagePacket = App.protoManager.DeserializeMsg<netpkt.MessagePacket>('MessagePacket', uint8Buf);
            const header = packet.header as netpkt.MessageHeader;
            this.mainCmd = header.main_id;
            this.subCmd = header.sub_id;
            this.buffer = packet.payload;

            // 校验 body 长度是否正确
            return header.body_len === this.buffer.length;
        } catch (e) {
            console.error("decode error:", e);
            return false;
        }
    }

    // encode(data: MessageStruct): boolean {
    //     this.mainCmd = data.mainCmd;
    //     this.subCmd = data.subCmd;
    //     let dataSize = 0;
    //     /**第一种写法 */
    //     if (data.buffer) {
    //         //如果有包体，先放入包体
    //         dataSize = data.buffer.length;
    //     }

    //     let buffer = new ByteArray()
    //     buffer.endian = Macro.USING_LITTLE_ENDIAN;
    //     buffer.writeUnsignedInt(this.mainCmd);
    //     buffer.writeUnsignedInt(this.subCmd);
    //     buffer.writeUnsignedInt(dataSize);
    //     if (data.buffer) {
    //         let dataBuffer = new ByteArray(data.buffer as Uint8Array);
    //         buffer.writeBytes(dataBuffer);
    //     }
    //     this.buffer = buffer.bytes;
    //     return true;
    // }
    // decode(event: MessageEvent): boolean {
    //     let dataView = new ByteArray(event.data);
    //     dataView.endian = Macro.USING_LITTLE_ENDIAN;
    //     //取包头
    //     this.mainCmd = dataView.readUnsignedInt();
    //     this.subCmd = dataView.readUnsignedInt();
    //     let dataSize = dataView.readUnsignedInt();
    //     let buffer = dataView.buffer.slice(dataView.position)
    //     this.buffer = new Uint8Array(buffer);
    //     return dataSize == this.buffer.length;
    // }


    get cmd() { return String(this.mainCmd) + String(this.subCmd); }

}

/**
 * @description service公共基类
 */
export class CommonService extends WSService {
    protected ip = "localhost";
    protected port = 3000;
    protected protocol: Net.Type = "ws"

    private _backgroundTimeOutId: number = -1
    private get data() {
        return App.stageData;
    }

    constructor(module: string, ip: string, port: number) {
        super(module);
        ip && (this.ip = ip);
        port && (this.port = port);
        let options: IWSServiceOptions = {
            url: `${this.protocol}://${this.ip}:${this.port}`,
            tag: module,
            // maxEnterBackgroundTime : 3000,
        }
        this.options = options;

        this.flows.sendHeartbeatFlow.push(async (service) => {
            if (this.heartbeat) {
                await this.send(new this.heartbeat());
            } else {
                Log.e("请先设置心跳解析类型")
            }
            return service;
        });

        this.flows.isHeartBeatFlow.push((item) => {
            item.result = item.message.cmd == GetCmdKey(MainCmd.CMD_SYS, SUB_CMD_SYS.CMD_SYS_HEART);
            return item;
        })

        this.flows.decodeHeaderFlow.push((item) => {
            let header = new CmmHead();
            header.decode(item.message);
            item.result = header as any;
            return item;
        })

        this.flows.encodeHeaderFlow.push((item) => {
            let header = new CmmHead();
            const isSuccess = header.encode(item.message as any);
            item.result = {
                isSuccess,
                message: header as any
            }
            return item;
        })

        this.flows.decodeMessageFlow.push((item) => {
            const o = item.decodeData;
            const msg = item.message;
            let obj: Message = null!;
            if (this.serviceType == Net.ServiceType.Proto) {
                if (o.type && typeof o.type == "string") {
                    let type = App.protoManager.lookup(o.type) as protobuf.Type;
                    if (type) {
                        try {
                            obj = App.protoManager.decode({
                                className: o.type,
                                buffer: msg.buffer as Uint8Array,
                            }) as any;
                        } catch (error) {
                            DEBUG && Log.e("decode proto error", o.type, "CMD", `${msg.cmd}`, "buffer", msg.buffer, "error", error);
                            obj = null!;
                        }
                    } else {
                        obj = msg.buffer as any;
                    }
                } else {
                    obj = msg.buffer as any;
                }
                item.result = obj;
                return item;
            } else {
                if (o.type && typeof o.type != "string") {
                    obj = new o.type();
                    //解包
                    obj.decode(msg.buffer);
                } else {
                    //把数据放到里面，让后面使用都自己解析,数据未解析，此消息推后解析
                    obj = msg.buffer as any;
                }
                item.result = obj;
                return item;
            }
        })

        // 进入后台处理
        this.flows.enterBackgroundFlow.push((service) => {
            if (this.data.isLoginStage()) {
                return service;
            }
            this._backgroundTimeOutId = setTimeout(() => {
                //进入后台超时，主动关闭网络
                DEBUG && Log.d(`${this.options.tag} 进入后台时间过长，主动关闭网络，等玩家切回前台重新连接网络`);
                App.alert.close(Macro.RECONNECT_ALERT_TAG);
                this.stop();
            }, this.options.maxEnterBackgroundTime);
            return service;
        });
        // 进入前台处理
        this.flows.enterForegroundFlow.push((item) => {
            if (this._backgroundTimeOutId != -1) {
                DEBUG && Log.d(`${this.options.tag} 清除进入后台的超时关闭网络定时器`);
                clearTimeout(this._backgroundTimeOutId);
                DEBUG && Log.d(`${this.options.tag} 在后台时间${item.enterBackgroundTime} , 最大时间为: ${this.options.maxEnterBackgroundTime}`)
                //登录界面，不做处理
                if (this.data.isLoginStage()) {
                    item.isNeedReconnect = false;
                    return item;
                }
                if (item.enterBackgroundTime * 1000 > this.options.maxEnterBackgroundTime!) {
                    DEBUG && Log.d(`${this.options.tag} 从回台切换，显示重新连接网络`);
                    App.alert.close(Macro.RECONNECT_ALERT_TAG);
                    item.isNeedReconnect = true;
                    return item;
                }
            }
            item.isNeedReconnect = false;
            return item;
        });

        this.flows.reconnectFailedFlow.push(async (item) => {
            App.uiReconnect.hide();
            if (this.data.isLoginStage()) {
                item.isNeedReconnect = false;
                return item;
            }
            const isReconnect = await this.showReconnectAlert();
            item.isNeedReconnect = isReconnect;
            return item;
        })

        this.flows.reconnectStartFlow.push((item) => {
            App.uiReconnect.show(App.getLanguage("tryReconnect", [this.module, item.reconnectTimes]));
            return item;
        })

        this.flows.reconnectSuccessFlow.push((item) => {
            App.uiReconnect.hide();
            return item;
        })

        this.heartbeat = HeartbeatBinary;
    }

    private showReconnectAlert() {
        return new Promise<boolean>((resolve, reject) => {
            App.alert.show({
                tag: Macro.RECONNECT_ALERT_TAG,
                isRepeat: false,
                text: App.getLanguage("warningReconnect", [this.module]) as string,
                confirmCb: (isOK) => {
                    if (isOK) {
                        Log.d(`${this.module} 重连连接网络`);
                        resolve(true);
                    } else {
                        this.gotoLogin();
                        resolve(false);
                    }
                },
                cancelCb: () => {
                    resolve(false);
                    this.gotoLogin();
                }
            });
        })
    }

    private gotoLogin() {
        Log.d(`${this.module} 玩家网络不好，不重连，退回到登录界面`);
        App.entryManager.enterBundle(Macro.BUNDLE_RESOURCES);
    }

    private _Heartbeat: Net.HeartbeatClass<Message> = null!;
    /**@description 心跳的消息定义类型 */
    public get heartbeat(): Net.HeartbeatClass<Message> { return this._Heartbeat }
    public set heartbeat(value: Net.HeartbeatClass<Message>) {
        this._Heartbeat = value;
        this.serviceType = value.type;
    }
}
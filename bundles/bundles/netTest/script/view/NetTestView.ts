import { _decorator, EventTouch, find, instantiate, Label, Node, ScrollView, Toggle } from "cc";
import { FlowNode } from "db://quick/core/flow/Flow";
import GameView from "db://quick/core/ui/GameView";
import { inject } from "db://quick/defines/Decorators";
import { CommonEvent } from "../../../../scripts/common/event/CommonEvent";
import { ChatService } from "../../../../scripts/common/net/ChatService";
import { CommonService } from "../../../../scripts/common/net/CommonService";
import { GameService } from "../../../../scripts/common/net/GameService";
import { LobbyService } from "../../../../scripts/common/net/LobbyService";
import { HeartbeatBinary } from "../../../../scripts/common/protocol/HeartbetBinary";
import { HeartbeatJson } from "../../../../scripts/common/protocol/HeartbetJson";
import { HeartbeatProto } from "../../../../scripts/common/protocol/HeartbetProto";
import HallHandler from "../../../hall/script/net/HallHandler";
import { NetTest } from "../data/NetTestData";
import ChatHandler from "../net/ChatHandler";
import GameHandler from "../net/GameHandler";


const { ccclass, property } = _decorator;

@ccclass("NetTestView")
export default class NetTestView extends GameView {

    public static getPrefabUrl() {
        return "prefabs/NetTestView";
    }

    private get lobbyService() {
        return App.serviceManager.get(LobbyService, false) as LobbyService;
    }
    private get gameService() {
        return App.serviceManager.get(GameService, false) as GameService;
    }
    private get chatService() {
        return App.serviceManager.get(ChatService, false) as ChatService;
    }

    private reconnects: Toggle[] = [];
    private sends: Toggle[] = [];
    private sendRPCs: Toggle[] = [];

    private logScorllView: ScrollView = null!;
    private logItem: Node = null!;
    private connects: Toggle[] = [];
    private netTypes: Toggle[] = [];
    private lobbyOpenFlow: FlowNode<CommonService> = null!;
    private lobbyCloseFlow: FlowNode<CommonService> = null!;
    private gameOpenFlow: FlowNode<CommonService> = null!;
    private gameCloseFlow: FlowNode<CommonService> = null!;
    private chatOpenFlow: FlowNode<CommonService> = null!;
    private chatCloseFlow: FlowNode<CommonService> = null!;

    @inject("clear", Node)
    private clearNode: Node = null!

    addEvents() {
        super.addEvents();
        this.onD(CommonEvent.TEST_BINARY_MSG, this.onMessage);
        this.onD(CommonEvent.TEST_JSON_MSG, this.onMessage);
        this.onD(CommonEvent.TEST_PROTO_MSG, this.onMessage);
    }

    onShow(): void {
        super.onShow();
        this.lobbyOpenFlow = this.lobbyService.flows.openFlow.push((item: CommonService) => {
            this.onNetConnected(item);
            return item;
        });

        this.lobbyCloseFlow = this.lobbyService.flows.closeFlow.push((item: CommonService) => {
            this.onNetClose(item);
            return item;
        });

        this.gameOpenFlow = this.gameService.flows.openFlow.push((item: CommonService) => {
            this.onNetConnected(item);
            return item;
        });

        this.gameCloseFlow = this.gameService.flows.closeFlow.push((item: CommonService) => {
            this.onNetClose(item);
            return item;
        });

        this.chatOpenFlow = this.chatService.flows.openFlow.push((item: CommonService) => {
            this.onNetConnected(item);
            return item;
        });
        this.chatCloseFlow = this.chatService.flows.closeFlow.push((item: CommonService) => {
            this.onNetClose(item);
            return item;
        });
    }

    onClose(): void {
        this.lobbyService.flows.openFlow.remove(this.lobbyOpenFlow);
        this.lobbyService.flows.closeFlow.remove(this.lobbyCloseFlow);
        this.gameService.flows.openFlow.remove(this.gameOpenFlow);
        this.gameService.flows.closeFlow.remove(this.gameCloseFlow);
        this.chatService.flows.openFlow.remove(this.chatOpenFlow);
        this.chatService.flows.closeFlow.remove(this.chatCloseFlow);

        super.onClose();
    }

    private onMessage(ev: DispatchEvent, hello: string) {
        this.log(`收到：${hello}`);
    }

    private onNetClose(service: CommonService) {
        let isConnected = false;
        if (service == this.lobbyService) {
            this.connects[NetTest.ServiceType.Lobby].isChecked = isConnected;
        } else if (service == this.gameService) {
            this.connects[NetTest.ServiceType.Game].isChecked = isConnected;
        } else if (service == this.chatService) {
            this.connects[NetTest.ServiceType.Chat].isChecked = isConnected;
        }
        this.log(`${service.module} 断开连接!`);
    }
    private onNetConnected(service: CommonService) {
        let isConnected = true;
        if (service == this.lobbyService) {
            this.connects[NetTest.ServiceType.Lobby].isChecked = isConnected;
        } else if (service == this.gameService) {
            this.connects[NetTest.ServiceType.Game].isChecked = isConnected;
        } else if (service == this.chatService) {
            this.connects[NetTest.ServiceType.Chat].isChecked = isConnected;
        }
        this.log(`${service.module} 连接成功!`);
    }

    onDestroy() {
        this.logItem.destroy();
        super.onDestroy();
    }

    private initToggleNode(node: Node | null, out: Toggle[]) {
        if (!node) return;
        for (let i = 0; i < 3; i++) {
            let toggle = find(`type${i}`, node)?.getComponent(Toggle);
            if (toggle) {
                out.push(toggle);
            }
        }
    }

    onLoad() {
        super.onLoad();

        //返回
        this.onN(find("goback", this.node)!, Node.EventType.TOUCH_END, () => {
            this.backBundle();
        });

        //重连
        this.initToggleNode(find("reconnet", this.node), this.reconnects);

        //连接网络
        this.initToggleNode(find("connet", this.node), this.connects);

        //发送消息
        this.initToggleNode(find("send", this.node), this.sends);

        //发送RPC消息
        this.initToggleNode(find("sendRPC", this.node), this.sendRPCs);

        //网络类型
        this.initToggleNode(find("netType", this.node), this.netTypes);

        this.logScorllView = find(`log`, this.node)?.getComponent(ScrollView) as ScrollView;
        this.logItem = this.logScorllView.content?.getChildByName("item") as Node;
        this.logItem.removeFromParent();

        this.onN(this.clearNode, Node.EventType.TOUCH_END, () => {
            this.logScorllView.content!.removeAllChildren();
        });

        this.init();
    }

    private init() {
        //初始化网络类型设置
        for (let i = 0; i < this.netTypes.length; i++) {
            let item = this.netTypes[i];
            if (item) {
                item.node.userData = i;
                if (item.isChecked) {
                    this.changeNetType(i);
                }
                this.onN(item.node, "toggle", this.onNetType);
            }
        }


        //重连组件挂载
        for (let i = 0; i < this.reconnects.length; i++) {
            this.reconnects[i].node.userData = i;
            this.onN(this.reconnects[i].node, "toggle", this.onReconnectToggle);
            this.onReconnectToggle(this.reconnects[i]);
        }

        //连接网络 
        for (let i = 0; i < this.connects.length; i++) {
            this.connects[i].node.userData = i;
            this.onN(this.connects[i].node, Node.EventType.TOUCH_END, this.onConnect);
        }

        //发送消息
        for (let i = 0; i < this.sends.length; i++) {
            this.sends[i].node.userData = i;
            this.onN(this.sends[i].node, "toggle", this.onSend);
        }

        //发送RPC消息
        for (let i = 0; i < this.sendRPCs.length; i++) {
            this.sendRPCs[i].node.userData = i;
            this.onN(this.sendRPCs[i].node, "toggle", this.onSendRPC);
        }
    }

    private onNetType(target: Toggle) {
        this.changeNetType(target.node.userData);
    }

    private _changeNetType(type: NetTest.NetType, service: CommonService) {
        if (type == NetTest.NetType.JSON) {
            this.log(`${service.module} 使用Json方式`);
            service.heartbeat = HeartbeatJson;
        } else if (type == NetTest.NetType.PROTO) {
            this.log(`${service.module} 使用Proto方式`);
            service.heartbeat = HeartbeatProto;
        } else if (type == NetTest.NetType.BINARY) {
            this.log(`${service.module} 使用Binary方式`);
            service.heartbeat = HeartbeatBinary;
        } else {
            Log.e(`未知网络类型`);
        }
    }

    private changeNetType(type: NetTest.NetType) {
        this._changeNetType(type, this.lobbyService);
        this._changeNetType(type, this.gameService);
        this._changeNetType(type, this.chatService);
    }

    private enabledReconnect(service: CommonService, enabled: boolean) {
        service.options.enableReconnect = enabled;
        if (enabled) {
            this.log(`${service.module} 启用重连组件`);
        } else {
            this.log(`${service.module} 禁用重连组件`);
        }
    }
    private onReconnectToggle(toggle: Toggle) {
        if (toggle.node.userData == NetTest.ServiceType.Lobby) {
            this.enabledReconnect(this.lobbyService, toggle.isChecked);
        } else if (toggle.node.userData == NetTest.ServiceType.Game) {
            this.enabledReconnect(this.gameService, toggle.isChecked);
        } else if (toggle.node.userData == NetTest.ServiceType.Chat) {
            this.enabledReconnect(this.chatService, toggle.isChecked);
        }
    }

    private log(data: string) {
        let item = instantiate(this.logItem);
        if (item) {
            let lb = item.getComponent(Label);
            if (lb) {
                lb.string = data;
            }
            if (this.logScorllView.content) {
                this.logScorllView.content.addChild(item);
            }

            this.logScorllView.scrollToBottom(1);
        }
    }

    private async _connect(service: CommonService) {
        if (service.isConnected) {
            //断开连接
            this.log(`${service.module} 断开连接中...`);
            service.stop();
            return;
        }
        this.log(`${service.module} 连接中...`);
        await service.start();
    }
    private async onConnect(ev: EventTouch) {
        const toggle = (ev.target as Node).getComponent(Toggle)!;
        let target = toggle.node;
        toggle.enabled = false;
        if (target.userData == NetTest.ServiceType.Lobby) {
            await this._connect(this.lobbyService);
        } else if (target.userData == NetTest.ServiceType.Game) {
            await this._connect(this.gameService);
        } else if (target.userData == NetTest.ServiceType.Chat) {
            await this._connect(this.chatService);
        }
        toggle.enabled = true;
    }

    private onSend(toggle: Toggle) {
        if (true) {
            let sender = App.handlerManager.get(ChatHandler);
            if (sender) {
                sender.sendEx();
            }
            return
        }
        let target = toggle.node;
        if (target.userData == NetTest.ServiceType.Lobby) {
            let sender = App.handlerManager.get(HallHandler);
            if (sender) {
                sender.sendEx();
            }
        } else if (target.userData == NetTest.ServiceType.Game) {
            let sender = App.handlerManager.get(GameHandler);
            if (sender) {
                sender.sendEx();
            }
        } else if (target.userData == NetTest.ServiceType.Chat) {
            let sender = App.handlerManager.get(ChatHandler);
            if (sender) {
                sender.sendEx();
            }
        }
    }

    private onSendRPC(toggle: Toggle) {
        let target: Node = toggle.node;
        if (target.userData == NetTest.ServiceType.Lobby) {
            let sender = App.handlerManager.get(HallHandler);
            if (sender) {
                sender.sendRPCEx();
            }
        } else if (target.userData == NetTest.ServiceType.Game) {
            let sender = App.handlerManager.get(GameHandler);
            if (sender) {
                sender.sendRPCEx();
            }
        } else if (target.userData == NetTest.ServiceType.Chat) {
            let sender = App.handlerManager.get(ChatHandler);
            if (sender) {
                sender.sendRPCEx();
            }
        }
    }
}

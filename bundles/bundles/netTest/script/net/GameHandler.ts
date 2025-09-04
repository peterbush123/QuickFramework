/**
 * @description 游戏测试
 */

import { CommonEvent } from "../../../../scripts/common/event/CommonEvent";
import { GameService } from "../../../../scripts/common/net/GameService";
import { MainCmd } from "../../../../scripts/common/protocol/CmdDefines";
import { SUB_CMD_LOBBY } from "../../../hall/script/protocol/LobbyCmd";
import { TestBinaryMessage } from "../../../hall/script/protocol/TestBinaryMessage";
import { TestJsonMessage } from "../../../hall/script/protocol/TestJsonMessage";
import { GetCmdKey } from "../../../../scripts/common/net/GetCmdKey";
import { HallProtoConfig } from "../../../hall/proto/HallProtoConfig";
import { Handler } from "db://quick/core/net/service/Handler";
import { inject } from "db://quick/defines/Decorators";
import { Net } from "db://quick/core/net/Net";
import { CmmProto } from "../../../../scripts/common/net/CmmProto";

export default class GameHandler extends Handler {

    static module = "Game"

    @inject({ type: GameService, name: "service" })
    protected service: GameService = null!;
    
    onLoad() {
        super.onLoad()
        this.onS(GetCmdKey(MainCmd.CMD_LOBBY, SUB_CMD_LOBBY.TEST_JSON_MSG), TestJsonMessage, this.onTestJsonMessage);
        this.onS(HallProtoConfig.CMD_ROOM_INFO.cmd, HallProtoConfig.CMD_ROOM_INFO.className, this.onTestProtoMessage);
        this.onS(GetCmdKey(MainCmd.CMD_LOBBY, SUB_CMD_LOBBY.TEST_BINARY_MSG), TestBinaryMessage, this.onTestBinaryMessage);
    }

    private onTestJsonMessage(data: TestJsonMessage,result : number) {
        dispatch(CommonEvent.TEST_JSON_MSG, data.hello);
        if ( result ){
            result += 300;
        }
        Log.d(`${this.module} onTestJsonMessage`,result);
        return result
    }

    private async onTestProtoMessage(data: tp.RoomInfo) {
        dispatch(CommonEvent.TEST_PROTO_MSG, data.name);
    }

    private async onTestBinaryMessage(data: TestBinaryMessage) {
        dispatch(CommonEvent.TEST_BINARY_MSG, data.vHello)
    }

    private sendProtoMessage(hello: string) {
        let roomInfo = App.protoManager.makeCustomProtoMsg<tp.RoomInfo,CmmProto<tp.RoomInfo>>(CmmProto,HallProtoConfig.CMD_ROOM_INFO.className);
        roomInfo.mainCmd = HallProtoConfig.CMD_ROOM_INFO.mainCmd;
        roomInfo.subCmd = HallProtoConfig.CMD_ROOM_INFO.subCmd;
        roomInfo.cmd = HallProtoConfig.CMD_ROOM_INFO.cmd;
        roomInfo.data.name = `${this.service.module} 高级VIP专场`;
        roomInfo.data.roomID = 9999;
        let UserInfo = App.protoManager.getType<typeof tp.UserInfo>("tp.UserInfo");
        let userInfo = UserInfo.create();
        userInfo.id = 6666;
        userInfo.level = 10;
        userInfo.money = 9900009999
        userInfo.name = "我就是玩！！！"

        let GenderType = App.protoManager.getEnum<typeof tp.GenderType>("tp.GenderType");
        userInfo.gender = GenderType.female;
        roomInfo.data.players = [];
        roomInfo.data.players.push(userInfo);
        this.service?.send(roomInfo);
    }

    private sendJsonMessage(hello: string) {
        let msg = new TestJsonMessage();
        msg.hello = hello;
        this.service?.send(msg);
    }

    private sendBinaryMessage(hello: string) {
        let binaryMessage = new TestBinaryMessage();
        binaryMessage.vHello = hello;
        this.service?.send(binaryMessage);
    }

    sendEx() {
        if (this.service) {
            if (this.service.serviceType == Net.ServiceType.BinaryStream) {
                this.sendBinaryMessage(`${this.service.module} 您好，我是Binary消息`);
            } else if (this.service.serviceType == Net.ServiceType.Json) {
                this.sendJsonMessage(`${this.service.module} 您好，我是Json消息`);
                // this.sendHttpMessage();
            } else if (this.service.serviceType == Net.ServiceType.Proto) {
                this.sendProtoMessage(`${this.service.module} 您好，我是Proto消息`);
            }
        }
    }

    async sendRPCEx() {
        if (this.service) {
            if (this.service.serviceType == Net.ServiceType.BinaryStream) {
                let binaryMessage = new TestBinaryMessage();
                binaryMessage.vHello = `${this.service.module} 这是一个RPC消息 Binary`;
                const res = await this.sendAsync(binaryMessage, TestBinaryMessage, binaryMessage.cmd);
                dispatch(CommonEvent.TEST_BINARY_MSG, res?.vHello);
            } else if (this.service.serviceType == Net.ServiceType.Json) {
                let jsonMessage = new TestJsonMessage();
                jsonMessage.hello = `${this.service.module} 这是一个RPC消息 Json`;
                const res = await this.sendAsync(jsonMessage, TestJsonMessage, jsonMessage.cmd);
                dispatch(CommonEvent.TEST_JSON_MSG, res?.hello);
            } else if (this.service.serviceType == Net.ServiceType.Proto) {
                let roomInfo = App.protoManager.makeCustomProtoMsg<tp.RoomInfo,CmmProto<tp.RoomInfo>>(CmmProto,HallProtoConfig.CMD_ROOM_INFO.className);
                roomInfo.mainCmd = HallProtoConfig.CMD_ROOM_INFO.mainCmd;
                roomInfo.subCmd = HallProtoConfig.CMD_ROOM_INFO.subCmd;
                roomInfo.cmd = HallProtoConfig.CMD_ROOM_INFO.cmd;
                roomInfo.data.name = `${this.service.module} 高级VIP专场`;
                roomInfo.data.roomID = 9999;
                let UserInfo = App.protoManager.getType<typeof tp.UserInfo>("tp.UserInfo");
                let userInfo = UserInfo.create();
                userInfo.id = 6666;
                userInfo.level = 10;
                userInfo.money = 9900009999
                userInfo.name = "我就是玩！！！"

                let GenderType = App.protoManager.getEnum<typeof tp.GenderType>("tp.GenderType");
                userInfo.gender = GenderType.female;
                roomInfo.data.players = [];
                roomInfo.data.players.push(userInfo);
                const res = await this.sendAsync(roomInfo,
                    HallProtoConfig.CMD_ROOM_INFO.className,
                    HallProtoConfig.CMD_ROOM_INFO.cmd) as any as tp.RoomInfo;
                dispatch(CommonEvent.TEST_PROTO_MSG, res.name);
            }
        }
    }
}

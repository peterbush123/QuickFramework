import { CmmProto } from "db://assets/scripts/common/net/CmmProto";
import { GameService } from "db://assets/scripts/common/net/GameService";
import { Handler } from "db://quick/core/net/service/Handler";
import { inject } from "db://quick/defines/Decorators";
import { HallProtoConfig } from "../../../hall/proto/HallProtoConfig";

export default class FishGameHandler extends Handler {

    static module = "fishGame"
    @inject({ type: GameService, name: "service" })
    protected service: GameService = null!;

    onLoad() {
        super.onLoad()
    }
    sendEx() {
        this.sendProtoMessage(`${this.service.module} 您好，我是Proto消息`);

    }
    //测试通过了。
    private sendProtoMessage(hello: string) {
        let roomInfo = App.protoManager.makeCustomProtoMsg<tp.RoomInfo, CmmProto<tp.RoomInfo>>(CmmProto, HallProtoConfig.CMD_ROOM_INFO.className);
        roomInfo.mainCmd = HallProtoConfig.CMD_ROOM_INFO.mainCmd;
        roomInfo.subCmd = HallProtoConfig.CMD_ROOM_INFO.subCmd;
        roomInfo.cmd = HallProtoConfig.CMD_ROOM_INFO.cmd;
        roomInfo.data.name = `${this.service.module} 高级VIP专场`;
        roomInfo.data.roomID = 9999;
        let UserInfo = App.protoManager.getType<typeof tp.UserInfo>("tp.UserInfo");
        let userInfo = UserInfo.create({ id: 666, level: 10, money: 999, name: "我就是玩" });
        let GenderType = App.protoManager.getEnum<typeof tp.GenderType>("tp.GenderType");
        userInfo.gender = GenderType.female;
        roomInfo.data.players = [];
        roomInfo.data.players.push(userInfo);
        this.service?.send(roomInfo);
    }

}


import { Proto } from "db://quick/core/net/Net";
import { MainCmd } from "../../../scripts/common/protocol/CmdDefines";
import { GetCmdKey } from "../../../scripts/common/net/GetCmdKey";
import { SUB_CMD_LOBBY } from "../script/protocol/LobbyCmd";
interface BindConfig extends Proto.BindConfig {
    mainCmd : number;
    subCmd : number;
}
export let HallProtoConfig = {
    CMD_ROOM_INFO: {
        cmd: GetCmdKey(MainCmd.CMD_LOBBY, SUB_CMD_LOBBY.TEST_PROTO_MSG),
        className: "tp.RoomInfo",
        mainCmd : MainCmd.CMD_LOBBY,
        subCmd : SUB_CMD_LOBBY.TEST_PROTO_MSG,
    }
}
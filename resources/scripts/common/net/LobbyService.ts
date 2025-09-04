/**
 * @description 子游戏连接服务
 */

import { NetPriority } from "../config/Config";
import { CommonService } from "./CommonService";

export class LobbyService extends CommonService {
    static module = "大厅";
    priority = NetPriority.Lobby;

    constructor(module: string, ip: string, port: number) {
        super(module, ip, port);
        // this.options.printHeartbeatLog = true;
        this.flows.openFlow.push((item) => {
            Log.d(`${item.module} 连接成功111`);
            return item;
        });
        this.flows.closeFlow.push((item) => {
            Log.d(`${item.module} 连接关闭111`);
            return item;
        });
    }
}


/**
 * @description 子游戏连接服务
 */

import { NetPriority } from "../config/Config";
import { CommonService } from "./CommonService";

export class GameService extends CommonService {
    static module = "游戏";
    priority = NetPriority.Game;
}


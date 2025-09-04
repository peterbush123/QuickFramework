/**
 * @description 子游戏连接服务
 */
import { NetPriority } from "../config/Config";
import { CommonService } from "./CommonService";

export class ChatService extends CommonService {
    static module = "聊天";
    priority = NetPriority.Chat;
}



export namespace GameFrameDefine {

    /**@description 游戏状态事件定义 */
    export const GAME_STATUS_FREE = 0;      ///< 空闲状态
    export const GAME_STATUS_PLAY = 100;    ///< 游戏状态
    export const GAME_STATUS_WAIT = 200;    ///< 等待状态

    /**@description 用户状态事件定义 */
    export const US_NULL = 0x00;         ///< 没有状态
    export const US_FREE = 0x01;         ///< 站立状态
    export const US_SIT = 0x02;         ///< 坐下状态
    export const US_READY = 0x03;         ///< 同意状态
    export const US_LOOKON = 0x04;         ///< 旁观状态
    export const US_PLAYING = 0x05;         ///< 游戏状态
    export const US_OFFLINE = 0x06;         ///< 断线状态

    /**@description 无效值 */
    export const INVALID_CHAIR: number = 65535;    ///< 无效椅子
    export const INVALID_TABLE: number = 65535;    ///< 无效桌子

    export const MAX_CHAIR: number = 100;


    /**@description 游戏事件定义 */
    /**@description 大厅连接成功 */
    export const LOBBY_SERVICE_CONNECTED = "LOBBY_SERVICE_CONNECTED";
    /**@description 大厅连接断开 */
    export const LOBBY_SERVICE_CLOSE = "LOBBY_SERVICE_CLOSE";
    /**@description 大厅登录完成 */
    export const LOGON_SERVICE_FINISH = "LOGON_SERVICE_FINISH";

    /**@description 游戏连接成功 */
    export const GAME_SERVICE_CONNECTED = "GAME_SERVICE_CONNECTED";
    /**@description 游戏连接断开 */
    export const GAME_SERVICE_CLOSE = "GAME_SERVICE_CLOSE";
}

/**@description 游戏事件定义 */
export const enum GameEvent {

    /**@description 登录获取游戏列表 */
    LOGON_SERVICE_GETKIND = "LOGON_SERVICE_GETKIND",
    /**@description 登录获取游戏房间列表 */
    LOGON_SERVICE_GETROOM = "LOGON_SERVICE_GETROOM",


    /**@description 游戏网络数据 */
    GAME_SERVICE_MSG = "GAME_SERVICE_MSG",

    USER_ENTER = 'EVENT.USER_ENTER',    // 用户进入
    USER_LEAVE = 'EVENT.USER_LEAVE',    // 用户离开
    USER_SCORE = 'EVENT.USER_SCORE',    // 分数更新
    USER_STATUS = 'EVENT.USER_STATUS',  // 状态更新
    CLOSE_GAME = 'EVENT.CLOSE_GAME',    // 关闭游戏

    GAME_SCENE = "EVENT_SCENE",           // 游戏场景消息
    GAME_MESSAGE = "EVENT_MESSAGE",       // 游戏消息
    CONFIG_SERVER = "CONFIG_SERVER",       // 房间配置
    TABLE_INFO = "TABLE_INFO",             // 桌子信息
    TABLE_STATUS = "TABLE_STATUS",         // 桌子状态
    GAME_STATUS = "EVENT_STATUS",            // 游戏状态
    LOOKON_STATUS = "EVENT_LOOKON_STATUS",        // 旁观状态
    USER_CHAT = "EVENT_USER_CHAT",               // 用户聊天
    USER_EXPRESSION = "EVENT_USER_EXPRESSION",   // 用户表情
    PROPERTY_TRUMPET = "EVENT_PROPERTY_TRUMPET", // 喇叭消息
}

/**@description 消息类型事件定义 */
export const enum MessageType {
    CHAT = 0x01,         // 聊天信息
    TOAST = 0x02,        // TOAST
    POPUP = 0x04,        // 弹出消息
    CLOSE_GAME = 0x08,   // 关闭游戏
    CLOSE_ROOM = 0x10,   // 关闭房间
    CLOSE_HALL = 0x20,   // 关闭大厅
}


export const LogonSvrCMD = {
    MDM_MB_LOGON: 100,

    SUB_MB_REGISTER_ACCOUNT: 1, //账号注册
    SUB_MB_LOGON_ACCOUNTS: 2, //账号登录

    SUB_MB_LOGON_SUCCESS: 100, //登录成功
    SUB_MB_LOGON_FAILURE: 101, //登录失败

    //列表命令
    MDM_MB_SERVER_LIST: 101,    //列表信息
    //列表信息
    SUB_MB_LIST_KIND: 100,      //种类列表
    SUB_MB_LIST_SERVER: 101,    //房间列表
    SUB_MB_LIST_FINISH: 200,    //列表完成

    //PC列表命令
    MDM_GP_SERVER_LIST: 2, //列表信息
    SUB_GP_LIST_KIND: 101, //种类列表
    SUB_GP_LIST_SERVER: 104, //房间列表
    SUB_GP_LIST_FINISH: 200, //发送完成
}

export const GameSvrCMD = {
    //登录命令
    MDM_GR_LOGON: 1,
    SUB_GR_LOGON_USERID: 1,  //I D 登录
    SUB_GR_LOGON_MOBILE: 2, //手机登录
    SUB_GR_LOGON_ACCOUNTS: 3,   //帐户登录
    //登录结果
    SUB_GR_LOGON_SUCCESS: 100,
    SUB_GR_LOGON_FAILURE: 101,
    SUB_GR_LOGON_FINISH: 102,
    SUB_GR_UPDATE_NOTIFY: 200,

    //配置命令
    MDM_GR_CONFIG: 2,
    SUB_GR_CONFIG_COLUMN: 100,
    SUB_GR_CONFIG_SERVER: 101,
    SUB_GR_CONFIG_PROPERTY: 102,
    SUB_GR_CONFIG_FINISH: 103,
    SUB_GR_CONFIG_USER_RIGHT: 104,

    // 用户命令
    MDM_GR_USER: 3,       //用户信息
    SUB_GR_USER_RULE: 1,//用户规则
    SUB_GR_USER_LOOKON: 2,//旁观请求
    SUB_GR_USER_SITDOWN: 3,
    SUB_GR_USER_STANDUP: 4,
    SUB_GR_USER_INFO_REQ: 9,
    SUB_GR_USER_CHAIR_REQ: 10,
    SUB_GR_USER_CHAIR_INFO_REQ: 11,
    // 用户状态
    SUB_GR_USER_ENTER: 100,
    SUB_GR_USER_SCORE: 101,
    SUB_GR_USER_STATUS: 102,
    SUB_GR_REQUEST_FAILURE: 103,

    //状态命令
    MDM_GR_STATUS: 4,
    SUB_GR_TABLE_INFO: 100,
    SUB_GR_TABLE_STATUS: 101,

    // 游戏框架命令
    MDM_GF_FRAME: 100,
    SUB_GF_GAME_OPTION: 1,
    SUB_GF_USER_READY: 2,
    SUB_GF_LOOKON_CONFIG: 3,
    SUB_GF_USER_CHAT: 10,
    SUB_GF_USER_EXPRESSION: 11,
    SUB_GF_GAME_STATUS: 100,
    SUB_GF_GAME_SCENE: 101,
    SUB_GF_LOOKON_STATUS: 102,
    SUB_GF_SYSTEM_MESSAGE: 200,
    SUB_GF_ACTION_MESSAGE: 201,

    //游戏命令
    MDM_GF_GAME: 200,
    SUB_GF_GAME_MESSAGE_1: 99,
    SUB_GF_GAME_MESSAGE_2: 100,
    SUB_GF_GAME_MESSAGE_3: 101,
    SUB_GF_GAME_MESSAGE_4: 102,
    SUB_GF_GAME_MESSAGE_5: 103,
    SUB_GF_GAME_MESSAGE_6: 104,
    SUB_GF_GAME_MESSAGE_7: 105,
    SUB_GF_GAME_MESSAGE_8: 106,
    SUB_GF_GAME_MESSAGE_9: 107,
    SUB_GF_GAME_MESSAGE_10: 108,
    SUB_GF_GAME_MESSAGE_11: 109,
    SUB_GF_GAME_MESSAGE_12: 110,
    SUB_GF_GAME_MESSAGE_13: 111,

    DTP_GR_TABLE_PASSWORD: 1,
}

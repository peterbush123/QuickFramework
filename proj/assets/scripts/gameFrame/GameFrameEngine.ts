/**
 * @description 游戏引擎模块
 */
import { GlobalUserItem } from "./GlobalUserItem";
// import { GameSvr, Proto_Struct } from "./protocol/proto_lobby";
import { Macro } from "db://quick/defines/Macros";
import { Singleton } from "db://quick/utils/Singleton";
import { GameEvent, GameFrameDefine, GameSvrCMD } from "../../scripts/gameFrame/GameFrameEvent";
import { CmmProto } from "../common/net/CmmProto";
import { GameService } from "../common/net/GameService";
import { GetCmdKey } from "./GetCmdKey";


type gameSceneMsg = (gamestatus: number, lookon: boolean, data: any) => void;
const INVALID_TABLE = 65535;

/**@description 游戏框架代理 */
export abstract class IGameDelegate {
    /**@description 重置引擎*/
    abstract OnResetGameEngine(): void;
    /**@description 更新桌子状态*/
    abstract upDataTableStatus(tableid: number): void;
    /**@description 请求失败*/
    abstract onReQueryFailure(code: number, msg: string): void;
    /**@description 请求桌子信息*/
    abstract onGetTableInfo(): void;
    /**@description 进入桌子*/
    abstract onEnterTable(): void;
    /**@description 离开桌子*/
    abstract onExitTable(): void;
    /**@description 用户进入*/
    abstract onEventUserEnter(tableid: number, chairid: number, useritem: Proto_Struct.Itag_UserInfoHead): void;
    /**@description 用户积分*/
    abstract onEventUserScore(useritem: Proto_Struct.Itag_UserInfoHead): void;
    /**@description 用户状态*/
    abstract onEventUserStatus(newstatus: number, oldstatus: number, useritem: Proto_Struct.Itag_UserInfoHead | null): void;

    /**@description 游戏场景事件 */
    abstract onEventGameScene(status: number, lookon: boolean, data: any): void;
}

export class GameFrameEngine implements ISingleton {
    static module: string = "GameFrameEngine";
    module: string = null!;
    private static _instance: GameFrameEngine = null!;
    public static Instance() { return this._instance || (this._instance = new GameFrameEngine()); }


    public get service() {
        return App.serviceManager.get(GameService);
    }

    protected _delegate!: IGameDelegate | null;
    public set delegate(gate: IGameDelegate | any) {
        this._delegate = gate;
    }

    private _cbGameStatus: number = GameFrameDefine.GAME_STATUS_FREE;
    /**@description 设置游戏状态*/
    public set gameStatus(cbGameStatus: number) {
        this._cbGameStatus = cbGameStatus;
    }
    /**@description 获取游戏状态*/
    public get gameStatus() {
        return this._cbGameStatus;
    }

    /** 房间信息 */
    /** 桌子数量 */
    private _TableCount: number = 0;
    /** 椅子数量 */
    private _ChairCount: number = 0;
    /** 游戏类型 */
    private _ServerType: number = 0;
    /** 游戏规则 */
    private _ServerRule: number = 0;
    /** 桌子ID */
    private _TableID: number = INVALID_TABLE;
    /** 椅子ID */
    private _ChairID: number = INVALID_TABLE;
    /** 是否允许旁观 */
    private _AllowLookon: boolean = false;

    private bChangeDesk: boolean = false
    private _tableUserList: { [tableid: number]: { [chairid: number]: number | null } } = {};
    private _tableStatus: Proto_Struct.Itag_TableStatus[] = [];

    //_UserList:Proto_Struct.Itag_UserInfoHead = null;
    // 房间用户列表
    private userList: { [userId: number]: Proto_Struct.Itag_UserInfoHead | null } = {};


    private onInitData() {
        if (CC_DEBUG) console.log("初始化引擎数据!!!")

        this.userList = {};
        this._tableUserList = [];
        this._tableStatus = [];

        /** 桌子数量 */
        this._TableCount = 0;
        /** 椅子数量 */
        this._ChairCount = 0;
        /** 游戏类型 */
        this._ServerType = 0;
        /** 游戏规则 */
        this._ServerRule = 0;
        /** 桌子ID */
        this._TableID = INVALID_TABLE;
        /** 椅子ID */
        this._ChairID = INVALID_TABLE;
        /** 是否允许旁观 */
        this._AllowLookon = false;

        this._cbGameStatus = GameFrameDefine.GAME_STATUS_FREE;
    }

    /**@description 进入房间*/
    public onEnterRoom() {
        App.tips.show('房间连接中...');
        this.onInitData();
        // let Lobby = App.serviceManager.get(LobbyService);//大厅
        // if (Lobby!.isConnected) {
        //     Lobby!.stop();
        // }
        if (this.service?.isConnected) {
            this.service?.stop();
        }
        let _kindID = GlobalUserItem!.nCurrentKindID;
        let gameInfo = GlobalUserItem!.roomList[_kindID][0];
        this.service?.start(gameInfo.serverAddr, gameInfo.serverPort, "ws");
        // this.service?.heartbeat = HeartbeatProto;
        let userid = GlobalUserItem!.UserInfo.userid;
        let psw = GlobalUserItem!.UserInfo.dynamicPass;
        this.SendLogonRoomPacket(userid, psw, _kindID);
    }

    /**@description 退出房间*/
    public onExitRoom() {
        if (this.service?.isConnected) {
            this.service?.stop();
        }
    }

    /**@description 进入桌子*/
    public onEnterTable(): void {
        if (CC_DEBUG) console.log("[GameFrameEngine] 进入桌子");
        this.SitDown(0xFFFF, 0xFFFF, "");
        this.SendGameOption();
    }

    public addNetGameFrame(subID: number, func: (data: any) => void, handleType?: any, target?: any) {
        let cmd = GetCmdKey(GameSvrCMD.MDM_GF_GAME, subID);
        if (func == null) {
            if (CC_DEBUG) console.log(`命令为【${cmd}】设置响应处理程序错误`);
            return false;
        }
        this.service?.onS(cmd, handleType, func, false, target);
        //let [MainID, SubID] = cmd.split('_');
        return true;
    }

    protected setResponeHandler(subID: number, callback: (data: any) => void, target?: any): boolean {
        let cmd = GetCmdKey(GameSvrCMD.MDM_GF_GAME, subID);
        if (callback == null) {
            if (CC_DEBUG) console.log(`命令为【${cmd}】设置响应处理程序错误`);
            return false;
        }
        this.service?.onS(cmd, null, callback, false, target);
        return true;
    }


    /**@description 登录完成*/
    public OnSocketSubLogonFinish() {
        let myUserItem = this.getMeUserInfo();
        if (!myUserItem) {
            if (CC_DEBUG) console.log("获取自己信息失败！");
            return;
        }

        if (this._TableID != INVALID_TABLE) {
            if (this._delegate && this._delegate.onEnterTable) {
                this._delegate.onEnterTable();
            }

            this.SendGameOption();
        }
        GlobalUserItem!.lock_kindid = 0;
        GlobalUserItem!.lock_roomid = 0;
    }


    /**@description 房间配置*/
    public OnSocketSubConfigServer(data: GameSvr.CMD_GR_ConfigServer) {
        this._TableCount = data.tablecount;
        this._ChairCount = data.chaircount;
        this._ServerType = data.servertype;
        this._ServerRule = data.serverrule;
    }

    private OnSocketSubLogonSuccess(data: GameSvr.CMD_GR_LogonSuccess) {

    }

    private OnSocketSubLogonFailure(data: Proto_Struct.CMD_Failed) {
        App.tips.show(data.msg);
    }

    private OnSocketSubUpdateNotify() {
        //dispatch(GameEvent.CONFIG_SERVER, data);
    }

    private OnSocketSubConfigFinish() {

    }

    private OnSocketSubLookonStatus(data: GameSvr.CMD_GF_LookonStatus) {
        this._AllowLookon = data.allowlookon;
    }

    private OnSocketSubSystemMessage() {

    }

    private OnSocketSubActionMessage() {
        // if ((msg.type & MessageType.CLOSE_ROOM) !== 0 || (msg.type & MessageType.CLOSE_GAME) !== 0) {
        //     // 让游戏主动处理
        //     dispatch(GameEvent.CLOSE_GAME, msg.text);

        //     if ((msg.type & MessageType.CLOSE_ROOM) !== 0) {
        //         this.leaveRoom();
        //     }
        // }

        // if ((msg.type & MessageType.TOAST) !== 0) {
        //     UIManager.getInstance().showToast(msg.text);
        // }

        // if ((msg.type & MessageType.POPUP) !== 0) {
        //     UIManager.getInstance().showAlert(msg.text);
        // }
    }

    private OnSocketSubUserChat() {

    }

    private OnSocketSubExpression() {

    }

    /**@description 用户进入*/
    public OnSocketSubUserEnter(msg: GameSvr.notify_user_enter) {
        // this.userList.set(msg.data.userid, msg.data);
        this.userList[msg.data.userid] = msg.data;
        let userItem = msg.data;
        // 自己判断
        let bMySelfInfo: boolean = (userItem.userid === GlobalUserItem!.UserInfo.userid);
        if (bMySelfInfo && (userItem.tableid != INVALID_TABLE)) {
            for (let idx = 0; idx < this._ChairCount; idx++) {
                if (idx != userItem.chairid) {
                    this.QueryUserInfo(userItem.tableid, idx);
                }
            }
        }

        // 非法过滤
        if (!this.userList[GlobalUserItem!.UserInfo.userid]) {
            if (bMySelfInfo == false) {
                if (CC_DEBUG) console.log("还未有自己信息，不处理其他用户信息");
                return;
            }
        } else {
            if (bMySelfInfo == true) {
                if (CC_DEBUG) console.log("GameFrameEngine:OnSocketSubUserEnter 已有自己信息，不再次处理自己信息");
                return;
            }
        }

        // 添加 更新到缓存
        let bAdded = false;
        let item = this.userList[msg.data.userid];
        if (item != null) {
            // 如果不为空，清掉之前的信息
            // 记录旧状态
            let oldstatus = { tableid: INVALID_TABLE, chairid: INVALID_TABLE, user_status: 0 };
            oldstatus.tableid = item.tableid;
            oldstatus.chairid = item.chairid;
            oldstatus.user_status = item.userStatus;

            bAdded = true

            // 更新信息
            item = msg.data;
            // 清除旧桌子椅子记录
            if (oldstatus.tableid != INVALID_TABLE) {
                // 新旧桌子不同 新旧椅子不同
                if ((oldstatus.tableid != item.tableid) || (oldstatus.chairid != item.chairid)) {
                    this.onUpDataTableUser(oldstatus.tableid, oldstatus.chairid, null);
                }
            }
        }
        if (!bAdded) {
            this.userList[userItem.userid] = userItem;
        }

        // // 记录自己桌椅号
        // if (userItem.userid === GlobalUserItem!.UserInfo.userid) {
        //     this._TableID = userItem.tableid;
        //     this._ChairID = userItem.chairid;
        // }

        if (userItem.tableid != INVALID_TABLE && userItem.userStatus != GameFrameDefine.US_LOOKON) {
            this.onUpDataTableUser(userItem.tableid, userItem.chairid, userItem)

            if (this._delegate && this._delegate.onEventUserEnter) {
                if (CC_DEBUG) console.log("------------onEventUserEnter---------------")
                this._delegate.onEventUserEnter(userItem.tableid, userItem.chairid, userItem);
            }
            dispatch(GameEvent.USER_ENTER, userItem.tableid, userItem.chairid, userItem);
        }
    }

    /**@description 用户积分*/
    public OnSocketSubUserScore(msg: GameSvr.CMD_GR_UserScore) {
        let user = this.userList[msg.userid];
        if (user) {
            //user.score = msg.userscore;
            user.experience = user.experience = msg.data.experience;
            user.drawcount = user.drawcount = msg.data.drawcount;
            user.fleecount = msg.data.fleecount;
            user.grade = msg.data.grade;
            user.ingot = msg.data.ingot;
            user.insure = msg.data.insure;
            user.lostcount = msg.data.lostcount;
            user.loveliness = msg.data.loveliness;
            user.wincount = msg.data.wincount;
            user.score = msg.data.score;

            if (user.userid === GlobalUserItem!.UserInfo.userid) {
                // 改变GlobalModel保存的分数
                GlobalUserItem!.globalUserData.score = user.score;
                // TODO 通知界面分数更新
            }
            if (this.getMeUserInfo()!.tableid !== INVALID_TABLE && this.getMeUserInfo()!.tableid === user.tableid) {
                // 通知更新界面
                if (this._TableID != INVALID_TABLE) {
                    if (this._delegate && this._delegate.onEventUserScore) {
                        if (CC_DEBUG) console.log("------------通知更新界面---------------")
                        this._delegate.onEventUserScore(user);
                    }
                    dispatch(GameEvent.USER_SCORE, user);
                }
            }
        } else {
            if (CC_DEBUG) console.log(`notify_userscore 用户 ${msg.userid} 不存在!`);
        }
    }


    public OnSocketSubUserStatus(msg: GameSvr.CMD_GR_UserStatus) {
        //if (CC_DEBUG) console.log("用户状态",msg.userid,msg.info);
        let user = this.userList[msg.userid];
        if (user) {
            let lastTableID = user.tableid;
            let lastChairID = user.chairid;
            if (msg.data.userStatus === GameFrameDefine.US_NULL) {
                if (lastTableID !== INVALID_TABLE && lastChairID !== INVALID_TABLE) {
                    if (this._delegate && this._delegate.onEventUserStatus) {
                        if (CC_DEBUG) console.log("------------通知更新界面1---------------")
                        this._delegate.onEventUserStatus(lastTableID, lastChairID, null);
                    }
                    // 通知桌子更新状态
                    dispatch(GameEvent.USER_STATUS, lastTableID, lastChairID, null);
                }

                if (GlobalUserItem!.UserInfo.userid == msg.userid) {
                    this.gameStatus = GameFrameDefine.GAME_STATUS_FREE;
                    if (CC_DEBUG) console.log('UserStatus.NULL 自己退出房间');
                    this.onInitData();
                } else if (lastTableID === this.getMeUserInfo()!.tableid) {

                    dispatch(GameEvent.USER_LEAVE, lastChairID, user);

                }
                this.userList[user.userid] = null;
            } else {
                let lastUserStatus = user.userStatus
                user.tableid = msg.data.tableid;
                user.chairid = msg.data.chairid;
                user.userStatus = msg.data.userStatus;

                // 离开桌子
                if (lastTableID !== INVALID_TABLE && (lastTableID !== user.tableid || lastChairID !== user.chairid)) {
                    if (this._delegate && this._delegate.onEventUserStatus) {
                        if (CC_DEBUG) console.log("------------通知更新状态2---------------")
                        this._delegate.onEventUserStatus(lastTableID, lastChairID, null);
                    }

                    // 通知桌子更新状态
                    dispatch(GameEvent.USER_STATUS, lastTableID, lastChairID, null);
                }

                // 加入桌子
                if (user.tableid !== INVALID_TABLE && user.userStatus !== GameFrameDefine.US_LOOKON && (user.tableid !== lastTableID || user.chairid !== lastChairID)) {
                    if (this._delegate && this._delegate.onEventUserStatus) {
                        if (CC_DEBUG) console.log("------------通知更新状态3---------------")
                        this._delegate.onEventUserStatus(user.tableid, user.chairid, user);
                    }

                    dispatch(GameEvent.USER_STATUS, user.tableid, user.chairid, user);
                }


                // // 更新用户状态
                // if (user.tableid !== INVALID_TABLE && user.tableid === lastTableID && user.chairid === lastChairID) {
                //     if (this._delegate&&this._delegate.onEventUserStatus) {
                //         if (CC_DEBUG) console.log("------------通知更新状态---------------")
                //         this._delegate.onEventUserStatus(user.tableid, user.chairid,user);
                //     }
                //     dispatch(GameEvent.USER_STATUS, user.tableid, user.chairid, user);
                // }

                // 游戏离开
                if (lastTableID !== INVALID_TABLE && (user.tableid !== lastTableID || user.chairid !== lastChairID)) {
                    if (user.userid === GlobalUserItem!.UserInfo.userid || lastTableID === this.getMeUserInfo()!.tableid) {
                        if (user.userStatus == GameFrameDefine.US_FREE) {
                            if (user.userid == GlobalUserItem!.UserInfo.userid) {

                                this.gameStatus = GameFrameDefine.GAME_STATUS_FREE;
                                if (CC_DEBUG) console.log('UserStatus.FREE 自己退出游戏');
                            } else {

                                // 其他玩家离开
                                dispatch(GameEvent.USER_LEAVE, lastChairID, user);

                            }
                        } else {
                            if (this._delegate && this._delegate.onEventUserStatus) {
                                if (CC_DEBUG) console.log("------------通知更新状态4---------------")
                                this._delegate.onEventUserStatus(user.tableid, user.chairid, user);
                            }

                            // 其他玩家状态更新
                            dispatch(GameEvent.USER_STATUS, user.tableid, user.chairid, user);
                        }
                    }
                    return;
                }

                // 游戏加入
                if (user.tableid !== INVALID_TABLE && (user.tableid !== lastTableID || user.chairid !== lastChairID || (lastUserStatus == GameFrameDefine.US_OFFLINE && user.userStatus == GameFrameDefine.US_PLAYING))) {
                    if (user.userid === GlobalUserItem!.UserInfo.userid) {
                        // 进入游戏
                        this.SendGameOption();
                    } else if (user.tableid === this.getMeUserInfo()!.tableid) {
                        if (this._delegate && this._delegate.onEventUserStatus) {
                            if (CC_DEBUG) console.log("------------通知更新状态5---------------")
                            this._delegate.onEventUserStatus(user.tableid, user.chairid, user);
                        }

                        // 其他玩家加入
                        dispatch(GameEvent.USER_ENTER, user.tableid, user.chairid, user);
                    }
                    return;
                }

                // 状态改变
                // 这个条件判断不会到达 用于判断在同一个桌子 点击不同的椅子的状态判断 但是现在没有提供点击椅子进入
                if (user.tableid !== INVALID_TABLE && user.tableid === lastTableID && this.getMeUserInfo()!.tableid == user.tableid) {
                    if (user.userStatus == GameFrameDefine.US_FREE) {
                        if (user.userid == GlobalUserItem!.UserInfo.userid) {
                            this.gameStatus = GameFrameDefine.GAME_STATUS_FREE;
                            if (CC_DEBUG) console.log('UserStatus.FREE 自己退出游戏 不会到达');
                        } else {
                            if (this._delegate && this._delegate.onEventUserStatus) {
                                if (CC_DEBUG) console.log("------------通知更新状态6---------------")
                                this._delegate.onEventUserStatus(user.tableid, user.chairid, user);
                            }

                            // 其他玩家离开
                            dispatch(GameEvent.USER_LEAVE, lastChairID, user);
                        }
                    } else {
                        if (this._delegate && this._delegate.onEventUserStatus) {
                            if (CC_DEBUG) console.log("------------通知更新状态7---------------")
                            this._delegate.onEventUserStatus(user.tableid, user.chairid, user);
                        }

                        // 其他玩家状态改变
                        dispatch(GameEvent.USER_STATUS, user.tableid, user.chairid, user);
                    }
                    return;
                }
            }
        } else {
            if (CC_DEBUG) console.log(`notify_userstatus 用户 ${msg.userid} 不存在!`);
        }
    }

    /**@description 请求失败*/
    public OnSocketSubRequestFailure(data: Proto_Struct.CMD_Failed) {

        if (this._delegate && this._delegate.onReQueryFailure) {
            if (CC_DEBUG) console.log("------------通知请求失败---------------")
            this._delegate.onReQueryFailure(data.code, data.msg);
        }
        App.alert.show({
            text: data.msg,
            confirmCb: (isOK) => {
                if (isOK) {
                    if (CC_DEBUG) console.log(`用户点击[确定按钮1]`);

                    App.entryManager.enterBundle(Macro.BUNDLE_HALL);
                } else {
                    if (CC_DEBUG) console.log(`用户点击[确定按钮2]`);

                }
            },
            cancelCb: () => {
                if (CC_DEBUG) console.log(`用户点击[取消按钮]`);
            }
        });

        if (this.bChangeDesk == true) {
            this.bChangeDesk = false;

            if (this._delegate && this._delegate.onExitTable) {
                this._delegate.onExitTable();
            }
        }
        // 清理锁表
        GlobalUserItem!.lock_kindid = 0;
        GlobalUserItem!.lock_roomid = 0;
    }

    /**@description 桌子状态*/
    public OnSocketSubTableInfo(data: GameSvr.CMD_GR_TableInfo) {
        for (let i = 0; i < data.vlist.length; i++) {
            this._tableStatus[i] = data.vlist[i];
        }

        //this.onEnterRoom();
        if (this._delegate && this._delegate.onGetTableInfo) {
            this._delegate.onGetTableInfo();
        }
    }

    public OnSocketSubTableStatus(data: GameSvr.CMD_GR_TableStatus) {
        let wTableID = data.vdata.tableid;
        this._tableStatus[wTableID] = data.vdata;
        if (this._delegate && this._delegate.upDataTableStatus) {
            this._delegate.upDataTableStatus(wTableID);
        }
    }

    /**@description 游戏场景*/
    public OnSocketSubGameScene(pData: any) {
        let status: number = this.gameStatus;
        let lookon: boolean = this._AllowLookon;
        let data: any = pData;
        //if (CC_DEBUG) console.log("收到游戏场景消息 ");
        if (this._delegate && this._delegate.onEventGameScene) {
            //if (CC_DEBUG) console.log("转发场景消息 到 GameMoudel ");
            this._delegate.onEventGameScene(status, lookon, data);
        }
    }

    /**
    * 推荐的回调写法
    * @param arg 参数
    * @param caller 调用域 
    * @param method 指定的回调方法（兼容.bind(this) 也可以不加.bind(this) ）
    */
    // public registerGameScene(caller:any,method:Function):void
    // {
    //     //返回 2 x arg
    //     let result={gamestatus:this.gameStatus,lookon:this._AllowLookon,data:pData};
    //     //推荐的做法 .call(caller,result);
    //     method.call(caller,result);
    // }

    /**@description 游戏状态*/
    public OnSocketSubGameStatus(data: GameSvr.CMD_GF_GameStatus) {
        this.gameStatus = data.gamestatus;
        this._AllowLookon = data.allowlookon;
    }

    /**@description 系统消息*/
    private onSocketSystemMessage(data: any) {
        if (CC_DEBUG) console.log("收到网络消息[系统消息]");
    }

    /**@description 系统动作*/
    private onSocketActionMessage(data: any) {
        if (CC_DEBUG) console.log("收到网络消息[系统动作]");
    }

    /**@description 更新桌椅用户*/
    private onUpDataTableUser(tableid: number, chairid: number, useritem?: Proto_Struct.Itag_UserInfoHead | null) {
        if (!this._tableUserList[tableid]) {
            this._tableUserList[tableid] = {}
        }
        if (useritem) {
            this._tableUserList[tableid][chairid] = useritem.userid;
        } else {
            this._tableUserList[tableid][chairid] = null;
        }
    }

    /**@description 移除用户*/
    public onRemoveUser(dwUserID: number) {
        this.userList[dwUserID] = null;
    }

    /**@description 坐下请求*/
    public SitDown(tableid: number, chairid: number, password: string) {
        this.SendSitDownPacket(tableid, chairid, password);
    }

    /**@description 查询用户*/
    public QueryUserInfo(tablerid: number, chairid: number) {
        this.SendQueryUserInfo(tablerid, chairid);
    }

    /**@description 换位请求*/
    protected QueryChangeDesk() {
        this.bChangeDesk = true;


    }

    /**@description 起立请求*/
    protected StandUp(bForce: boolean) {
        let user = this.userList[GlobalUserItem!.UserInfo.userid];
        let TableID!: number;
        let ChairID!: number;
        if (user) {
            TableID = user.tableid;
            ChairID = user.chairid;
        }
        this.SendStandUpPacket(TableID, ChairID, bForce);
    }

    //登录游戏服务器请求
    protected SendLogonRoomPacket(userid: number, lpszPassword: string, kindID: number) {
        type LogonRoomPacket = typeof GameSvr.CMD_GR_LogonMobile;
        let LogonRoomPacket: LogonRoomPacket = App.protoManager.lookup("GameSvr.CMD_GR_LogonMobile") as any;
        let LogonRoom = new CmmProto<GameSvr.CMD_GR_LogonMobile>(LogonRoomPacket);
        LogonRoom.data = LogonRoomPacket.create();
        LogonRoom.mainCmd = GameSvrCMD.MDM_GR_LOGON;
        LogonRoom.subCmd = GameSvrCMD.SUB_GR_LOGON_MOBILE;
        LogonRoom.cmd = GetCmdKey(GameSvrCMD.MDM_GR_LOGON, GameSvrCMD.SUB_GR_LOGON_MOBILE);

        LogonRoom.data.userid = userid;
        LogonRoom.data.password = lpszPassword;
        LogonRoom.data.gameid = kindID;
        LogonRoom.data.behaviorflags = 0x0011;
        LogonRoom.data.pagetablecount = 255;
        LogonRoom.data.devicetype = 1;
        LogonRoom.data.processversion = 101122049;

        this.service?.send(LogonRoom);
    }

    //坐下请求
    protected SendSitDownPacket(wTableID: number, wChairID: number, lpszPassword?: string) {
        type UserSitDown = typeof GameSvr.CMD_GR_UserSitDown;
        let UserSitDown: UserSitDown = App.protoManager.lookup("GameSvr.CMD_GR_UserSitDown") as any;
        let SitDown = new CmmProto<GameSvr.CMD_GR_UserSitDown>(UserSitDown);
        SitDown.data = UserSitDown.create();
        SitDown.mainCmd = GameSvrCMD.MDM_GR_USER;
        SitDown.subCmd = GameSvrCMD.SUB_GR_USER_SITDOWN;
        SitDown.cmd = GetCmdKey(GameSvrCMD.MDM_GR_USER, GameSvrCMD.SUB_GR_USER_SITDOWN);

        SitDown.data.tableid = wTableID;
        SitDown.data.chairid = wChairID;
        if (lpszPassword) {
            SitDown.data.password = lpszPassword;
        }

        this.service?.send(SitDown);
    }

    // 请求旁观
    protected SendLookonPacket(wTableID: number, wChairID: number) {
        type UserLookon = typeof GameSvr.CMD_GR_UserLookon;
        let UserLookon: UserLookon = App.protoManager.lookup("GameSvr.CMD_GR_UserLookon") as any;
        let Lookon = new CmmProto<GameSvr.CMD_GR_UserLookon>(UserLookon);
        Lookon.data = UserLookon.create();
        Lookon.mainCmd = GameSvrCMD.MDM_GR_USER;
        Lookon.subCmd = GameSvrCMD.SUB_GR_USER_LOOKON;
        Lookon.cmd = GetCmdKey(GameSvrCMD.MDM_GR_USER, GameSvrCMD.SUB_GR_USER_LOOKON);

        Lookon.data.tableid = wTableID;
        Lookon.data.chairid = wChairID;
        this.service?.send(Lookon);
    }

    //请求椅子用户信息
    protected SendQueryUserInfo(wTableID: number, wChairID: number) {
        type ChairUserInfoReq = typeof GameSvr.CMD_GR_ChairUserInfoReq;
        let ChairUserInfoReq: ChairUserInfoReq = App.protoManager.lookup("GameSvr.CMD_GR_ChairUserInfoReq") as any;
        let ChairUserInfo = new CmmProto<GameSvr.CMD_GR_ChairUserInfoReq>(ChairUserInfoReq);
        ChairUserInfo.data = ChairUserInfoReq.create();
        ChairUserInfo.mainCmd = GameSvrCMD.MDM_GR_USER;
        ChairUserInfo.subCmd = GameSvrCMD.SUB_GR_USER_CHAIR_INFO_REQ;
        ChairUserInfo.cmd = GetCmdKey(GameSvrCMD.MDM_GR_USER, GameSvrCMD.SUB_GR_USER_CHAIR_INFO_REQ);

        ChairUserInfo.data.tableid = wTableID;
        ChairUserInfo.data.chairid = wChairID;
        this.service?.send(ChairUserInfo);
    }

    //发送起立
    protected SendStandUpPacket(wTableID: number, wChairID: number, cbForceLeave: boolean) {
        type UserStandUp = typeof GameSvr.CMD_GR_UserStandUp;
        let UserStandUp: UserStandUp = App.protoManager.lookup("GameSvr.CMD_GR_UserStandUp") as any;
        let StandUp = new CmmProto<GameSvr.CMD_GR_UserStandUp>(UserStandUp);
        StandUp.data = UserStandUp.create();
        StandUp.mainCmd = GameSvrCMD.MDM_GR_USER;
        StandUp.subCmd = GameSvrCMD.SUB_GR_USER_STANDUP;
        StandUp.cmd = GetCmdKey(GameSvrCMD.MDM_GR_USER, GameSvrCMD.SUB_GR_USER_STANDUP);

        StandUp.data.tableid = wTableID;
        StandUp.data.chairid = wChairID;
        StandUp.data.forceleave = cbForceLeave;
        this.service?.send(StandUp);
    }

    //发送准备
    protected SendUserReady() {
        let StandUp: any;
        StandUp.mainCmd = GameSvrCMD.MDM_GF_FRAME;
        StandUp.subCmd = GameSvrCMD.SUB_GF_USER_READY;
        StandUp.cmd = GetCmdKey(GameSvrCMD.MDM_GF_FRAME, GameSvrCMD.SUB_GF_USER_READY);

        this.service?.send(StandUp);
    }

    //场景规则
    //SendGameOption(framever:number,clientver:number,lookon:boolean){
    public SendGameOption() {
        type GameOption = typeof GameSvr.CMD_GF_GameOption;
        let GameOption: GameOption = App.protoManager.lookup("GameSvr.CMD_GF_GameOption") as any;
        let GameCfg = new CmmProto<GameSvr.CMD_GF_GameOption>(GameOption);
        GameCfg.data = GameOption.create();
        GameCfg.mainCmd = GameSvrCMD.MDM_GF_FRAME;
        GameCfg.subCmd = GameSvrCMD.SUB_GF_GAME_OPTION;
        GameCfg.cmd = GetCmdKey(GameSvrCMD.MDM_GF_FRAME, GameSvrCMD.SUB_GF_GAME_OPTION);

        GameCfg.data.frameversion = 0;
        GameCfg.data.allowlookon = false;
        GameCfg.data.clientversion = 0;

        this.service?.send(GameCfg);
    }


    // 关闭游戏
    public closeGame() {
        if (CC_DEBUG) console.log("[GameFrameEngine] 关闭游戏");
        if (this.getMeUserInfo()) {
            let tableid = this._TableID;
            let chairid = this._ChairID;
            if (tableid !== 0) {
                //this.requestStandup(tableid, chairid, false);
                this.StandUp(false);
            }

            this.onInitData();
        }

        //let szGameMoudel = GlobalUserItem!.curGameMoudel;
        //Manager.uiManager.closeBundleView(szGameMoudel);
    }

    /**@description 获取桌子ID*/
    public GetTableID(): number {
        let user = this.userList[GlobalUserItem!.UserInfo.userid];
        if (user) {
            return user.tableid;
        }
        return INVALID_TABLE;
        //return this._TableID;
    }

    /**@description 获取椅子ID*/
    public GetChairID() {
        let user = this.userList[GlobalUserItem!.UserInfo.userid];
        if (user) {
            return user.chairid;
        }
        return INVALID_TABLE;
        //return this._ChairID;
    }

    /**@description 获取自己游戏信息*/
    protected MeUserItem(): Proto_Struct.Itag_UserInfoHead | null {
        return this.userList[GlobalUserItem!.UserInfo.userid];
    }

    // getMeUserInfo(): Proto_Struct.Itag_UserInfoHead{
    //     if (CC_DEBUG) console.logump(this._UserList,"getMeUserInfo用户数据");
    //     return this._UserList[GlobalUserItem!.UserInfo.userid];
    // }

    public getMeUserInfo(): Proto_Struct.Itag_UserInfoHead | null {
        return this.userList[GlobalUserItem!.UserInfo.userid];//Proto_Struct.Itag_UserInfoHead
    }

    public GetMeUserItem(): Proto_Struct.Itag_UserInfoHead | null {
        return this.userList[GlobalUserItem!.UserInfo.userid]
    }


    public getMeChairID(): number {
        let user = this.userList[GlobalUserItem!.UserInfo.userid];
        if (user) {
            return user.chairid;
        }
        return INVALID_TABLE;
    }

    protected getUserList() {
        return this.userList;
    }

    /**@description 用户积分*/
    protected getTableInfo(index: number) {
        if (index > 0) {
            return this._tableStatus[index];
        }
        return null;
    }

    /**@description 获取桌子用户*/
    public getTableUserItem(tableid: number, chairid: number) {
        if (this._tableUserList[tableid]) {
            let userid = this._tableUserList[tableid][chairid];
            if (userid) {
                return this.userList[userid];
            }
        }
        return null;
    }

    //获取桌子上玩家信息，如果不传chairID，则返回桌子上全部玩家数组
    public onGetTableUserInfo(tableID: number, chairID: number = INVALID_TABLE) {
        if (chairID == INVALID_TABLE && null != this._tableUserList[tableID]) {
            return this._tableUserList[tableID];
        }
        else if (this._tableUserList[tableID] && this._tableUserList[tableID][chairID]) {
            return this._tableUserList[tableID][chairID];
        }
        return null;
    }

    protected KindID() {
        return GlobalUserItem!.nCurrentKindID;
    }

    protected TableCount() {
        return this._TableCount;
    }

    protected ChairCount() {
        return this._ChairCount;
    }

    protected ServerType() {
        return this._ServerType;
    }

    protected ServerRule() {
        return this._ServerRule;
    }



}


export const gameFrame = Singleton.get(GameFrameEngine);
import { Handler } from "db://quick/core/net/service/Handler";
import { inject } from "db://quick/defines/Decorators";
import { CmmProto } from "../common/net/CmmProto";
import { GameService } from "../common/net/GameService";
import { ClientUserItem, ClientUserManager, tagUserInfo } from "./ClientUserManager";
import { GameFrameDefine, GameSvrCMD } from "./GameFrameEvent";
import { GetCmdKey } from "./GetCmdKey";
import { GlobalUserItem } from "./GlobalUserItem";

export default class GameHandler extends Handler {

    static module = "Game"
    // protected get service() {
    //     return App.serviceManager.get(GameService);
    // }

    @inject({ type: GameService, name: "service" })
    protected service: GameService = null!;
    public _wMeTableID: number = GameFrameDefine.INVALID_TABLE;     // 自己桌子
    public _wMeChairID: number = GameFrameDefine.INVALID_CHAIR;     // 自己椅子

    public _pIMySelfUserItem: ClientUserItem | null = null;    // 自己指针
    public _pTableUserItem: (ClientUserItem | null)[] = [];      // 游戏用户100


    onLoad() {
        super.onLoad()
        // 登录信息
        this.onS(GetCmdKey(GameSvrCMD.MDM_GR_LOGON, GameSvrCMD.SUB_GR_LOGON_SUCCESS), 'GameSvr.CMD_GR_LogonSuccess', this.OnSocketSubLogonSuccess);
        this.onS(GetCmdKey(GameSvrCMD.MDM_GR_LOGON, GameSvrCMD.SUB_GR_LOGON_FAILURE), "Proto_Struct.CMD_Failed", this.OnSocketSubLogonFailure);
        // this.onS(GetCmdKey(GameSvrCMD.MDM_GR_LOGON, GameSvrCMD.SUB_GR_LOGON_FINISH), this.OnSocketSubLogonFinish);
        // this.onS(GetCmdKey(GameSvrCMD.MDM_GR_LOGON, GameSvrCMD.SUB_GR_UPDATE_NOTIFY), this.OnSocketSubUpdateNotify);

        // 配置信息
        this.onS(GetCmdKey(GameSvrCMD.MDM_GR_CONFIG, GameSvrCMD.SUB_GR_CONFIG_SERVER), "GameSvr.CMD_GR_ConfigServer", this.OnSocketSubConfigServer);
        // this.onS(GetCmdKey(GameSvrCMD.MDM_GR_CONFIG, GameSvrCMD.SUB_GR_CONFIG_FINISH), this.OnSocketSubConfigFinish);

        // 用户信息
        this.onS(GetCmdKey(GameSvrCMD.MDM_GR_USER, GameSvrCMD.SUB_GR_USER_ENTER), 'GameSvr.notify_user_enter', this.OnSocketSubUserEnter);
        this.onS(GetCmdKey(GameSvrCMD.MDM_GR_USER, GameSvrCMD.SUB_GR_USER_SCORE), 'GameSvr.CMD_GR_UserScore', this.OnSocketSubUserScore);
        this.onS(GetCmdKey(GameSvrCMD.MDM_GR_USER, GameSvrCMD.SUB_GR_USER_STATUS), "GameSvr.CMD_GR_UserStatus", this.OnSocketSubUserStatus);
        this.onS(GetCmdKey(GameSvrCMD.MDM_GR_USER, GameSvrCMD.SUB_GR_REQUEST_FAILURE), "Proto_Struct.CMD_Failed", this.OnSocketSubRequestFailure);

        // 桌子状态信息
        this.onS(GetCmdKey(GameSvrCMD.MDM_GR_STATUS, GameSvrCMD.SUB_GR_TABLE_INFO), "GameSvr.CMD_GR_TableInfo", this.OnSocketSubTableInfo);
        this.onS(GetCmdKey(GameSvrCMD.MDM_GR_STATUS, GameSvrCMD.SUB_GR_TABLE_STATUS), "GameSvr.CMD_GR_TableStatus", this.OnSocketSubTableStatus);

        // 框架信息
        this.onS(GetCmdKey(GameSvrCMD.MDM_GF_FRAME, GameSvrCMD.SUB_GF_GAME_STATUS), "GameSvr.CMD_GF_GameStatus", this.OnSocketSubGameStatus);
        this.onS(GetCmdKey(GameSvrCMD.MDM_GF_FRAME, GameSvrCMD.SUB_GF_LOOKON_STATUS), "GameSvr.CMD_GF_LookonStatus", this.OnSocketSubLookonStatus);
        // this.onS(GetCmdKey(GameSvrCMD.MDM_GF_FRAME, GameSvrCMD.SUB_GF_GAME_SCENE), this.OnSocketSubGameScene);
        // this.onS(GetCmdKey(GameSvrCMD.MDM_GF_FRAME, GameSvrCMD.SUB_GF_SYSTEM_MESSAGE), this.OnSocketSubSystemMessage);
        // this.onS(GetCmdKey(GameSvrCMD.MDM_GF_FRAME, GameSvrCMD.SUB_GF_ACTION_MESSAGE), this.OnSocketSubActionMessage);
        // this.onS(GetCmdKey(GameSvrCMD.MDM_GF_FRAME, GameSvrCMD.SUB_GF_USER_CHAT), this.OnSocketSubUserChat);
        // this.onS(GetCmdKey(GameSvrCMD.MDM_GF_FRAME, GameSvrCMD.SUB_GF_USER_EXPRESSION), this.OnSocketSubExpression);
    }


    private OnSocketSubLogonSuccess(data: GameSvr.CMD_GR_LogonSuccess) {

        GlobalUserItem!.UserAttribute.MasterRight = data.masterright;
        GlobalUserItem!.UserAttribute.UserRight = data.userright;
    }

    private OnSocketSubLogonFailure(data: Proto_Struct.CMD_Failed) {
        App.tips.show(data.msg);
    }

    private OnSocketSubLogonFinish() {
        //gameFrame.OnSocketSubLogonFinish();
        // 进入游戏
        if ((this._pIMySelfUserItem != null)) {
            // 如果正在游戏时, 则重新进入
            if (this._pIMySelfUserItem!.GetUserStatus()! >= GameFrameDefine.US_PLAYING) {
                GlobalUserItem!.UserAttribute.dwUserID = this._pIMySelfUserItem!.GetUserID()!;
                GlobalUserItem!.UserAttribute.wTableID = this._pIMySelfUserItem!.GetTableID()!;
                GlobalUserItem!.UserAttribute.wChairID = this._pIMySelfUserItem!.GetChairID()!;
                // 设置自己的桌子与椅子
                this._wMeTableID = GlobalUserItem!.UserAttribute.wTableID;
                this._wMeChairID = GlobalUserItem!.UserAttribute.wChairID;
                // 执行开始游戏
                this.runPerformStartGame();
                return true;
            }
            // 发送坐下命令
            // const sender = Manager.netHelper.getSender(GameSender)
            // sender.SendSitDownPacket(GameFrameDefine.INVALID_TABLE, GameFrameDefine.INVALID_CHAIR);
            this.SendSitDownPacket(GameFrameDefine.INVALID_TABLE, GameFrameDefine.INVALID_CHAIR);
        }
        return true;
    }


    // 执行开始游戏
    public runPerformStartGame(): void {

        // 发送游戏选项设置
        this.SendGameOption(0, 0, false);
    }


    private OnSocketSubUpdateNotify() {

    }

    private OnSocketSubConfigServer(data: GameSvr.CMD_GR_ConfigServer) {
        //gameFrame.OnSocketSubConfigServer(data);


        //clientSer.GetServerAttribute().ServerRule=data.serverrule;
        //clientSer.GetServerAttribute().ServerType=data.servertype;
    }

    private OnSocketSubConfigFinish() {

    }

    // 用户进入
    private OnSocketSubUserEnter(msg: GameSvr.notify_user_enter) {
        // 变量定义
        let UserInfo: tagUserInfo = new tagUserInfo;
        // 用户属性
        UserInfo.dwGameID = msg.data.gameid;
        UserInfo.dwUserID = msg.data.userid;
        // 用户状态
        UserInfo.wTableID = msg.data.tableid;
        UserInfo.wChairID = msg.data.chairid;
        UserInfo.cbUserStatus = msg.data.userStatus;
        // 用户积分
        UserInfo.lScore = msg.data.score;
        UserInfo.lGrade = msg.data.grade;
        UserInfo.lInsure = msg.data.insure;
        UserInfo.lIngot = msg.data.ingot;
        // 用户昵称
        UserInfo.szNickName = msg.data.nickname;
        // 激活用户
        const pGameUserManager = ClientUserManager.Instance();
        let pIClientUserItem = pGameUserManager.SearchUserByUserID(UserInfo.dwUserID);
        if (pIClientUserItem == null) {
            // 激活大厅用户
            pIClientUserItem = pGameUserManager.ActiveUserItem(UserInfo);
            // 设置自己指针
            if (GlobalUserItem!.dwUserID == pIClientUserItem.GetUserID()) {
                this._pIMySelfUserItem = pIClientUserItem;
            }
        }
        //用户判断
        if (this._pIMySelfUserItem != null && UserInfo.dwUserID == this._pIMySelfUserItem!.GetUserID()) {
            //设置变量
            GlobalUserItem!.lUserScore = this._pIMySelfUserItem!.GetUserScore()!;
        }
        return true;
    }

    // 用户积分
    private OnSocketSubUserScore(data: GameSvr.CMD_GR_UserScore) {
        // 寻找用户
        const pGameUserManager = ClientUserManager.Instance();
        let pIClientUserItem = pGameUserManager.SearchUserByUserID(data.userid);
        // 更新用户
        pGameUserManager.UpdateUserItemScore(pIClientUserItem!, data.data);
        if (GlobalUserItem!.dwUserID == pIClientUserItem!.GetUserID()) {
            GlobalUserItem!.lUserScore = data.data.score;
        }
        // 更新回调
        // if (this.runScene != null) {
        //     this.runScene.onEventUserUpdate(pIClientUserItem!);
        // }
        return true;
    }

    // 用户状态
    private OnSocketSubUserStatus(data: GameSvr.CMD_GR_UserStatus) {
        // 寻找用户
        const pGameUserManager = ClientUserManager.Instance();
        let pIClientUserItem = pGameUserManager.SearchUserByUserID(data.userid);
        // 新旧数据项
        let wNowTableID = data.data.tableid;
        let wLastTableID = pIClientUserItem?.GetTableID();
        let wNowChairID = data.data.tableid;
        let wLastChairID = pIClientUserItem?.GetChairID();
        let cbNowStatus = data.data.userStatus;
        let cbLastStatus = pIClientUserItem?.GetUserStatus();
        const selfUser = this._pIMySelfUserItem;
        // 更新用户
        pGameUserManager.UpdateUserItemStatus(pIClientUserItem!, data.data);
        // 用户属性
        if (selfUser !== null && selfUser === pIClientUserItem) {
            GlobalUserItem!.UserAttribute.dwUserID = pIClientUserItem.GetUserID()!;
            GlobalUserItem!.UserAttribute.wTableID = pIClientUserItem.GetTableID()!;
            GlobalUserItem!.UserAttribute.wChairID = pIClientUserItem.GetChairID()!;
        }
        //变量定义
        if ((cbNowStatus == GameFrameDefine.US_NULL) || (cbNowStatus == GameFrameDefine.US_FREE)) {
            // 离开通知
            if ((pIClientUserItem == this._pIMySelfUserItem) || (wLastTableID == this._wMeTableID)) {
                // if (this.runScene != null) {
                //     this.runScene.onEventUserLeave(pIClientUserItem!);
                // }
                this.onEventUserLeave(pIClientUserItem!);
                if (wLastChairID! < 100) {
                    this._pTableUserItem![wLastChairID!] = null;
                }
            }
            // 删除用户
            if (cbNowStatus == GameFrameDefine.US_NULL) {
                pGameUserManager.DeleteUserItem(pIClientUserItem!);
                if (pIClientUserItem == this._pIMySelfUserItem) {
                    this._pIMySelfUserItem = null;
                }
            }
            return true;
        }
        // 加入处理
        if ((wNowTableID != GameFrameDefine.INVALID_TABLE) && ((wNowTableID != wLastTableID) || (wNowChairID != wLastChairID))) {
            //加载游戏场景
            if (this._pIMySelfUserItem == pIClientUserItem) {
                // 设置自己的桌子与椅子
                this._wMeTableID = wNowTableID;
                this._wMeChairID = wNowChairID;
                // 执行开始游戏
                this.runPerformStartGame();
            }
        }
        return true;
    }



    private OnSocketSubRequestFailure(data: Proto_Struct.CMD_Failed) {
        Log.e("请求失败", data.code, data.msg);

    }
    private OnSocketSubTableInfo(data: GameSvr.CMD_GR_TableInfo) {

    }

    private OnSocketSubTableStatus(data: GameSvr.CMD_GR_TableStatus) {
        //gameFrame.OnSocketSubTableStatus(data);
    }

    private OnSocketSubGameStatus(data: GameSvr.CMD_GF_GameStatus) {
        this.OnSocketSubGameStatus(data);
    }

    private OnSocketSubGameScene(data: any) {
        this.OnSocketSubGameScene(data);
    }

    private OnSocketSubLookonStatus(data: GameSvr.CMD_GF_LookonStatus) {

    }

    private OnSocketSubSystemMessage() {

    }

    private OnSocketSubActionMessage() {

    }

    private OnSocketSubUserChat() {

    }

    private OnSocketSubExpression() {

    }


    // 子类重载函数

    /* 处理游戏场景 */
    onEventSceneMessage(cbGameStatus: number, bLookonUser: boolean, pData: any): void {
        if (CC_DEBUG) Log.d("[ClientService] 游戏场景");

    }

    /* 游戏用户进入 */
    onEventUserEnter(pIClientUserItem: ClientUserItem): void {
        if (CC_DEBUG) Log.d("[ClientService] 用户进入", pIClientUserItem);
    }

    /* 用户数据更新 */
    onEventUserUpdate(pIClientUserItem: ClientUserItem): void {
        if (CC_DEBUG) Log.d("[ClientService] 用户数据更新", pIClientUserItem);
    }

    /* 游戏用户离开 */
    onEventUserLeave(pIClientUserItem: ClientUserItem): void {
        if (CC_DEBUG) Log.d("[ClientService] 用户离开", pIClientUserItem);
    }



    //坐下请求
    SendSitDownPacket(wTableID: number, wChairID: number, lpszPassword?: string) {
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

    //发送起立
    SendStandUpPacket(wTableID: number, wChairID: number, cbForceLeave: boolean) {
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

    SendGameOption(framever: number, clientver: number, lookon: boolean) {
        type GameOption = typeof GameSvr.CMD_GF_GameOption;
        let GameOption: GameOption = App.protoManager.lookup("GameSvr.CMD_GF_GameOption") as any;
        let GameCfg = new CmmProto<GameSvr.CMD_GF_GameOption>(GameOption);
        GameCfg.data = GameOption.create();
        GameCfg.mainCmd = GameSvrCMD.MDM_GF_FRAME;
        GameCfg.subCmd = GameSvrCMD.SUB_GF_GAME_OPTION;
        GameCfg.cmd = GetCmdKey(GameSvrCMD.MDM_GF_FRAME, GameSvrCMD.SUB_GF_GAME_OPTION);

        GameCfg.data.frameversion = framever;
        GameCfg.data.allowlookon = lookon;
        GameCfg.data.clientversion = clientver;

        this.service?.send(GameCfg);
    }

    SendLogonRoomPacket(userid: number, lpszPassword: string, kindID: number) {
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



}

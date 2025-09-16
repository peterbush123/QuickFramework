import { Singleton } from "db://quick/utils/Singleton";

export class UserItemManger implements ISingleton {
    static module: string = "UserItemManger";
    module: string = null!;
    private static _instance: UserItemManger = null!;
    public static Instance() { return this._instance || (this._instance = new UserItemManger()); }

    // 基本资料
    public dwUserID: number = 0;      // 用户 I D
    public dwGameID: number = 0;      // 游戏 I D
    public szNickName: string = '';    // 用户昵称
    //用户成绩
    public lUserScore: number = 0;    // 用户积分
    public lUserInsure: number = 0;   // 用户银行

    public UserAttribute = {
        //用户属性
        dwUserID: -1,    //用户标识
        wTableID: 65535,   //桌子号码
        wChairID: 65535,   //椅子号码
        //权限属性
        UserRight: -1,    //用户权限
        MasterRight: -1   //管理权限
    };   // 用户属性

    //当前房间serverID
    public nCurrentServerID: number = 0;
    //当前游戏ID
    public nCurrentKindID: number = 0;               //游戏类型
    public dwLastLockRoom: number = 0; 				//上次锁房房间，方便拉回
    public dwLockServerID: number = 0;  				//锁定房间
    public dwKindID: number = 0;

    public curGameMoudel: string = "";

    public lock_kindid = 0;      //上次锁房房间，方便拉回
    public lock_roomid = 0;      //锁定房间


    public bSoundAble: boolean = false;
    public bEffectAble: boolean = false;

    public globalUserData: Proto_Struct.Itag_UserInfoHead = {} as Proto_Struct.Itag_UserInfoHead;

    public UserInfo: LogonSvr.CMD_GP_LogonSuccess = {} as LogonSvr.CMD_GP_LogonSuccess;

    public kindList: Proto_Struct.Itag_GameKind[] = [];      /// 游戏列表

    public roomList: { [key: number]: Proto_Struct.Itag_GameServer[] } = {};  /// 房间列表

    public dwUserRight = 0;
    public dwMasterRight = 0;

    public addRoomList(data: Proto_Struct.Itag_GameServer[]) {
        let roomlist = data;
        for (let i = 0; i < roomlist.length; i++) {
            let kindId = roomlist[i].kindId;
            if (!this.roomList[kindId]) {
                this.roomList[kindId] = [];
            }
            this.roomList[kindId].push(roomlist[i]);
        }

        for (const key in this.roomList) {
            const value = this.roomList[key];
            value.sort((a, b) => {
                if (a.sortId < b.sortId) return -1;
                if (a.sortId > b.sortId) return 1;
                return 0;
            });
        }

    }


    // 通过模块名称获取游戏kind_id
    public getKind(name: string) {
        for (let idx = 0; idx < this.kindList.length; ++idx) {
            let s = this.kindList[idx];
            if (s && s.processName == name) {
                return s.kindId;
            }
        }
        return -1;
    }

    //获取游戏房间信息
    public getGameRoomInfo(wKindID: number, wServerID: number) {
        const roomList = this.roomList[wKindID];
        if (!roomList) return null;

        for (let idx = 0; idx < roomList.length; idx++) {
            if (roomList[idx].serverId === wServerID) {
                return roomList[idx];
            }
        }
        return null;
    }


}

export const GlobalUserItem = Singleton.get(UserItemManger);
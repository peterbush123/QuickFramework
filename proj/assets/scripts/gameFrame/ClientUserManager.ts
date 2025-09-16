
//用户信息
export class tagUserInfo {
    //基本属性
    dwUserID?: number;        //用户 I D
    dwGameID?: number;        //游戏 I D
    szNickName?: string;      //用户昵称

    //用户资料
    cbGender?: number;        //用户性别
    cbMemberOrder?: number;   //会员等级
    cbMasterOrder?: number;   //管理等级

    //用户状态
    wTableID?: number;        //桌子索引
    wLastTableID?: number;    //游戏桌子
    wChairID?: number;        //椅子索引
    cbUserStatus?: number;    //用户状态

    //积分信息
    lScore?: number;          //用户分数
    lGrade?: number;          //用户成绩
    lInsure?: number;         //用户银行
    lIngot?: number;          //用户元宝
}


export class ClientUserItem extends tagUserInfo {
    /**@description 用户信息*/
    public m_UserInfo: tagUserInfo = null!;

    /**@description 用户标识*/
    GetUserID() { return this.m_UserInfo.dwUserID; }
    /**@description 游戏标识*/
    GetGameID() { return this.m_UserInfo.dwGameID; }
    /**@description 用户昵称*/
    GetNickName() { return this.m_UserInfo.szNickName; }
    /**@description 用户桌子*/
    GetTableID() { return this.m_UserInfo.wTableID; }
    /**@description 用户椅子*/
    GetChairID() { return this.m_UserInfo.wChairID; }
    /**@description 用户状态*/
    GetUserStatus() { return this.m_UserInfo.cbUserStatus; }
    /**@description 积分数值*/
    GetUserScore() { return this.m_UserInfo.lScore; }
    /**@description 成绩数值*/
    GetUserGrade() { return this.m_UserInfo.lGrade; }
    /**@description 银行数值*/
    GetUserInsure() { return this.m_UserInfo.lInsure; }

    //用户信息
    GetUserInfo(): tagUserInfo { return this.m_UserInfo; }
}

export class ClientUserManager extends ClientUserItem {
    private static _instance: ClientUserManager = null!;
    public static Instance() { return this._instance || (this._instance = new ClientUserManager()); }

    private m_UserItemActive: Array<ClientUserItem> = new Array();

    /**@description 删除所有用户*/
    public DeleteAllUserItems() {
        this.m_UserItemActive = this.m_UserItemActive.filter(item => item !== item);
    }

    /**@description 增加用户*/
    public ActiveUserItem(UserInfo: tagUserInfo): ClientUserItem {
        let pClientUserItem: ClientUserItem = new ClientUserItem;
        pClientUserItem.m_UserInfo = UserInfo;
        this.m_UserItemActive.push(pClientUserItem);
        return pClientUserItem;
    }

    /**@description 删除用户*/
    public DeleteUserItem(pIClientUserItem: ClientUserItem): boolean {
        this.m_UserItemActive = this.m_UserItemActive.filter(obj => obj !== pIClientUserItem);
        return true;
    }

    /**@description 更新用户积分*/
    public UpdateUserItemScore(pIClientUserItem: ClientUserItem, pUserScore: Proto_Struct.Itag_UserScore): boolean {
        let pUserInfo: tagUserInfo = pIClientUserItem.GetUserInfo();
        pUserInfo.lScore = pUserScore.score;
        pUserInfo.lInsure = pUserScore.insure;
        pUserInfo.lIngot = pUserScore.ingot;
        pUserInfo.lGrade = pUserScore.grade;
        return true;
    }

    /**@description 更新用户状态*/
    public UpdateUserItemStatus(pIClientUserItem: ClientUserItem, pUserStatus: Proto_Struct.Itag_UserStatus): boolean {
        let pUserInfo: tagUserInfo = pIClientUserItem.GetUserInfo();
        pUserInfo.wTableID = pUserStatus.tableid;
        pUserInfo.wChairID = pUserStatus.chairid;
        pUserInfo.cbUserStatus = pUserStatus.userStatus;
        return true;
    }

    /**@description 游戏用户*/
    public EnumUserItem(wEnumIndex: number): ClientUserItem | null {
        if (wEnumIndex >= this.m_UserItemActive.length) { return null; }
        return this.m_UserItemActive[wEnumIndex];
    }

    /**@description 查找用户 通过用户ID*/
    public SearchUserByUserID(dwUserID: number): ClientUserItem | null {
        for (let i = 0; i < this.m_UserItemActive.length; i++) {
            const pClientUserItem: ClientUserItem = this.m_UserItemActive[i];
            if (pClientUserItem.m_UserInfo.dwUserID == dwUserID) {
                return pClientUserItem;
            }
        }
        return null;
    }
}

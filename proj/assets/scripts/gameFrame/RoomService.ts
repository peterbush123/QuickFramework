import { Macro } from "db://quick/defines/Macros";
import { GameService } from "../common/net/GameService";
import { LobbyService } from "../common/net/LobbyService";
import GameHandler from "./GameHandler";
import { GlobalUserItem } from "./GlobalUserItem";


export class RoomService {

    private get data() {
        return App.stageData;
    }
    private static _instance: RoomService = null!;
    public static Instance() { return this._instance || (this._instance = new RoomService()); }

    protected get service() {
        return App.serviceManager.get(GameService);
    }

    /**@description 进入房间*/
    public onEnterRoom(kindID?: number) {

        //Manager.uiManager.open({ type: RoomView, bundle: Macro.BUNDLE_RESOURCES, zIndex: ViewZOrder.UI, name: "游戏房间" });

        let Lobby = App.serviceManager.get(LobbyService);
        if (Lobby!.isConnected) {
            Lobby!.stop();
        }
        if (this.service!.isConnected) {
            this.service!.stop();
        }

        let _kindID = kindID || GlobalUserItem!.nCurrentKindID;
        let gameInfo = GlobalUserItem!.roomList[_kindID][0];
        this.service?.start(gameInfo.serverAddr, gameInfo.serverPort, "ws");
        // this.service.heartbeat = HeartbeatProto;
        let user = GlobalUserItem?.UserInfo;


        const sender = App.handlerManager.get(GameHandler);
        sender?.SendLogonRoomPacket(user!.userid, user!.dynamicPass, _kindID);
    }

    /**@description 离开房间*/
    public onExitRoom(kindID?: number) {
        if (this.service?.isConnected) {
            this.service?.stop();
        }
        App.entryManager.enterBundle(Macro.BUNDLE_HALL);
    }

    /* 进入指定的房间 */
    public enterGameServer(wServerID: number) {
        if (CC_DEBUG) Log.d("进入指定的房间")
        let gameInfo = GlobalUserItem!.roomList[wServerID][0];

        this.clickServerViewItemEvent(gameInfo);
    }

    // 点击事件-游戏房间
    protected clickServerViewItemEvent(pGameServerItem: Proto_Struct.Itag_GameServer) {
        if (CC_DEBUG) Log.dump(pGameServerItem, "点击事件-游戏房间")
        if (GlobalUserItem!.UserInfo.score < pGameServerItem.enterscore) {
            let szText = String.format("你当前的金币小于 {0} 不能进入游戏", pGameServerItem.enterscore);
            App.tips.show(szText);
            return;
        }
        // 房间是否已关闭
        if (pGameServerItem.serverId == 0) {
            App.tips.show("很抱歉，此游戏房间已经关闭了，不允许继续进入");
            return;
        }

        // 设置游戏模块名字
        // GlobalUserItem.curGameMoudel = userdata;
        let config = this.data.getEntry(GlobalUserItem!.curGameMoudel);
        if (config && pGameServerItem.kindId === GlobalUserItem!.nCurrentKindID) {
            // 进入游戏场景
            App.entryManager.enterBundle(config.bundle);
            return;
        }

    }

    public onIntoRoomUI() {
        //  App.uiManager.open({ type: RoomView, bundle: Macro.BUNDLE_RESOURCES, zIndex: ViewZOrder.UI, name: "游戏房间" });
    }

    /**@description 进入桌子*/
    public onEnterTable(): void {
        if (CC_DEBUG) Log.d("[RoomService] 进入桌子");
        const sender = App.handlerManager.get(GameHandler);
        sender?.SendSitDownPacket(0xFFFF, 0xFFFF, "");
        sender?.SendGameOption(0, 0, false);
    }

    /**@description 退出桌子*/
    public onExitTable(): void {
        this.onIntoRoomUI();
        //Manager.entryManager.enterBundle(Macro.BUNDLE_ROOM);
    }



}

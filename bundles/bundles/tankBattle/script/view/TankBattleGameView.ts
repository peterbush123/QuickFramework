import { _decorator, EventKeyboard, find, instantiate, Label, Node, PhysicsSystem2D } from "cc";
import GameView from "db://quick/core/ui/GameView";
import { inject } from "../../../../../quick/defines/Decorators";
import { TankBettle } from "../data/TankBattleConfig";
import { TankBattleGameData } from "../data/TankBattleGameData";
import { TankBattleLogic } from "../logic/TankBattleLogic";
import TankBattleMapCtrl from "../logic/TankBattleMapCtrl";


const { ccclass, property } = _decorator;

@ccclass('TankBattleGameView')
export default class TankBattleGameView extends GameView {

    static logicType = TankBattleLogic;

    @inject({ type: TankBattleGameData.module, name: "logic" })
    protected logic: TankBattleLogic = null!;

    public static getPrefabUrl() {
        return "prefabs/TankBattleGameView";
    }

    /**敌机总数显示节点 */
    private _enemyTankCount: Node = null!;
    private _enemyTankPrefab: Node = null!;

    /**@description 玩家1生命指数 */
    private _playerOneLive: Label = null!;
    /**@description 玩家2生命指数 */
    private _playerTwoLive: Label = null!;
    /**@description 当前游戏关卡等级 */
    private _gameLevel: Label = null!;
    private _playerOneTankLive: Label = null!;
    private _playerTwoTankLive: Label = null!;
    @inject("Game", Node)
    private game: Node = null!;
    @inject("prefabs", Node)
    private prefabs: Node = null!;

    onLoad() {
        super.onLoad();
        //允许碰撞
        PhysicsSystem2D.instance.enable = true;
        //显示碰撞包围盒
        // cc.director.getCollisionManager().enabledDrawBoundingBox = true
        //碰撞检测系统debug绘制显示
        // cc.director.getCollisionManager().enabledDebugDraw = true;

        this.init()
    }

    private init() {
        let gameInfo = find("Info", this.node) as Node;
        this._enemyTankCount = find("enemy_count", gameInfo) as Node;
        this._enemyTankPrefab = find("enemy_tank_prefab", gameInfo) as Node;
        this._playerOneLive = find("player_count_1", gameInfo)?.getComponent(Label) as Label;
        this._playerTwoLive = find("player_count_2", gameInfo)?.getComponent(Label) as Label;
        this._playerOneTankLive = find("player_live_1", gameInfo)?.getComponent(Label) as Label;
        this._playerTwoTankLive = find("player_live_2", gameInfo)?.getComponent(Label) as Label;
        this._gameLevel = find("level", gameInfo)?.getComponent(Label) as Label;
    }

    protected onKeyUp(ev: EventKeyboard) {
        if (this.logic) {
            this.logic.onKeyUp(ev, TankBettle.ViewType.GAME_VIEW);
        }
    }

    protected onKeyDown(ev: EventKeyboard) {
        if (this.logic) {
            this.logic.onKeyDown(ev, TankBettle.ViewType.GAME_VIEW);
        }
    }

    public showGameInfo(gameInfo: TankBattleGameInfo) {
        //当前关卡
        this._gameLevel.string = gameInfo.level;
        //玩家的生命
        this._playerOneLive.string = gameInfo.playerOneLive;
        this._playerTwoLive.string = gameInfo.playerTwoLive;
        this._playerOneTankLive.string = gameInfo.playerOneTankLive;
        this._playerTwoTankLive.string = gameInfo.playerTwoTankLive;
        let curLeftEnemy = gameInfo.curLeftEnemy;
        //当前剩余敌人数量 
        let count = this._enemyTankCount.children.length;
        if (count < curLeftEnemy) {
            let addCount = curLeftEnemy - count;
            for (let i = 0; i < addCount; i++) {
                let tank = instantiate(this._enemyTankPrefab);
                this._enemyTankCount.addChild(tank);
            }
        } else if (count > curLeftEnemy) {
            //删除多余出来的
            let delCount = count - curLeftEnemy;
            for (let i = 0; i < delCount; i++) {
                this._enemyTankCount.removeChild(this._enemyTankCount.children[0]);
            }
        }
    }

    onShow(): void {
        this.enabledKeyUp = true;
        this.enabledKeyDown = true;
        if (this.logic) {
            this.logic.gamePrefabs = this.prefabs;
            let mapCtrl = new TankBattleMapCtrl();
            mapCtrl.node = this.game;
            mapCtrl.setPrefabs(this.prefabs);
            this.logic.initMap(mapCtrl);
            this.logic.onOpenSlectedView();
        }
        super.onShow();
    }

    onClose(): void {
        this.enabledKeyUp = false;
        this.enabledKeyDown = false;
        this.logic && this.logic.onCloseGameView();
        super.onClose();
    }

}

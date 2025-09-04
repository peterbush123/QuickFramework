import { instantiate, physics, PhysicsSystem, Prefab } from "cc";
import { Resource } from "db://quick/core/asset/Resource";
import ResourceLoader from "db://quick/core/asset/ResourceLoader";
import { Logic } from "db://quick/core/logic/Logic";
import { TaxiConstants } from "../data/TaxiConstants";
import { TaxiData } from "../data/TaxiData";
import { TaxiCarMgr } from "./TaxiCarMgr";
import { TaxiCustomerMgr } from "./TaxiCustomerMgr";
import { TaxiEffectMgr } from "./TaxiEffectMgr";
import { TaxiMapMgr } from "./TaxiMapMgr";
import UIView from "../../../../../quick/core/ui/UIView";

export class TaxiLogic extends Logic {


    private mapMgr: TaxiMapMgr = null!;
    private carMgr: TaxiCarMgr = null!;
    private customerMgr : TaxiCustomerMgr = null!;
    private effectMgr : TaxiEffectMgr = null!;

    get data() {
        return App.dataCenter.get(TaxiData) as TaxiData;
    }

    protected _view: TaxiGameView = null!;

    get view() {
        return this._view;
    }

    private loader = new ResourceLoader;

    addEvents() {
        super.addEvents();
        this.onD(TaxiConstants.EventName.MAIN_CAR_INI_SUCCUSS, this.onMainCarInitSuccess);
        this.onD(TaxiConstants.EventName.GAME_START, this.onGameStart);
        this.onD(TaxiConstants.EventName.PLAY_SOUND,this.onPlaySound);
        this.onD(TaxiConstants.EventName.GAME_OVER,this.onGameOver);
        this.onD(TaxiConstants.EventName.NEW_LEVEL,this.onNewLevel);
    }

    onLoad(view: GameView) {
        super.onLoad(view);
        PhysicsSystem.instance.enable = true;
        this.data.init();
        this.view.init();
        this.createGround();
        this.mapMgr = this.view.addComponent(TaxiMapMgr) as TaxiMapMgr;
        this.mapMgr.gameView = view;
        this.carMgr = this.view.addComponent(TaxiCarMgr) as TaxiCarMgr;
        this.mapMgr.gameView = view;
        this.customerMgr = this.view.addComponent(TaxiCustomerMgr) as TaxiCustomerMgr;
        this.effectMgr = this.view.addComponent(TaxiEffectMgr) as TaxiEffectMgr;
        this.loadResources(this.data.level);
    }

    unloadResources(){
        this.loader.unLoadResources();
    }

    private loadResources(mapId : number ){
        this.loader.getLoadResources = () => {
            let res: Resource.Data[] = [
                { url : "prefabs/customer/customer01" , bundle : this.module , type : Prefab},
                { url : "prefabs/customer/customer02" , bundle : this.module , type : Prefab},
                { url : "prefabs/car/car101" , bundle : this.module , type : Prefab},
                { url : "prefabs/car/car201" , bundle : this.module , type : Prefab},
                { url : "prefabs/car/car202" , bundle : this.module , type : Prefab},
                { url : "prefabs/car/car203" , bundle : this.module , type : Prefab},
                { url : "prefabs/car/car204" , bundle : this.module , type : Prefab},
                { url : "prefabs/effect/brakeTrail" , bundle : this.module , type : Prefab},
                { url : "prefabs/effect/coin" , bundle : this.module , type : Prefab},
            ];
            return res;
        };
        this.loader.onLoadComplete = (err) => {
            if (err = Resource.LoaderError.SUCCESS) {
                this.customerMgr.init();
                this.effectMgr.init();
                this.loadMap(mapId);
            }
        };
        this.loader.onLoadProgress = ( loaded , total )=>{
            this.view.updateLoadingProgress(loaded,total);
        }
        this.view.updateLoadingText(this.data.getLanguage("loadingRes"));
        this.loader.loadResources();
    }

    private createGround(){
        let data = App.cache.get(this.module,"prefabs/map/ground",Prefab);
        if ( data && data.data instanceof Prefab ){
            let node = instantiate(data.data);
            App.uiManager.root3D.addChild(node);
        }
    }

    onDestroy() {
        //删除动画加载的3d节点
        App.uiManager.root3D.removeAllChildren();
        //卸载资源,这里卸载已经晚了在entry里面处理
        // this.loader.unLoadResources();
        //清除缓存
        this.carMgr.clear();
        this.effectMgr.clear();
        super.onDestroy();
    }

    private onMainCarInitSuccess() {
        this.view.showMain();
    }

    private onPlaySound(ev:DispatchEvent,name: string) {
        const path = `audio/sound/${name}`;
        this.view.audioHelper.playEffect(path)
    }

    onTouchStart() {
        this.carMgr.controlMoving();
    }

    onTouchEnd() {
        this.carMgr.controlMoving(false);
    }

    private onGameStart() {
        this.view.showGameUI();
    }

    private onGameOver() {
        this.view.showResult();
    }

    private onNewLevel() {
        this.view.hideResult();
        if ( this.data.level == this.data.curLevel ){
            this.reset();
            return;
        }
        this.mapMgr.recycle();
        this.view.showLoading();
        this.data.curLevel = this.data.level;
        this.loadMap(this.data.curLevel);
    }

    reset() {
        this.data.reset(this.mapMgr.maxProgress);
        this.carMgr.reset(this.mapMgr.currPath);
        this.view.updateData();
    }

    private loadMap(level: number) {

        if (level < 1 || level > 18) {
            level = 1;
        }

        let mapID = 100 + level;
        this.view.updateLoadingText(this.data.getLanguage("loadingMap"));
        this.mapMgr.loadMap(mapID, (data) => {
            if (data) {
                this.reset();
            }
        }, (finish, total) => {
            this.view.updateLoadingProgress(finish, total);
        });
    }
}
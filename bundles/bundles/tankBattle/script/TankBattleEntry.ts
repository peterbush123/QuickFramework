import TankBattleGameView from "./view/TankBattleGameView";
import { TankBattleLanguage } from "./data/TankBattleLanguage";
import { Entry } from "db://quick/core/entry/Entry";
import { Resource } from "db://quick/core/asset/Resource";
import { TankBattleGameData } from "./data/TankBattleGameData";
import { registerEntry } from "db://quick/defines/Decorators";
/**
 * @description 坦克大战入口
 */
@registerEntry("TankBattleEntry",TankBattleGameData.module,TankBattleGameView)
class TankBattleEntry extends Entry {
    protected language = new TankBattleLanguage;
    private get data(){
        return App.dataCenter.get(TankBattleGameData) as TankBattleGameData
    }

    protected addNetHandler(): void {
    }
    protected removeNetHandler(): void {
    }
    protected loadResources(completeCb: () => void): void {
        this.loader.getLoadResources = ()=>{
            return [{ preloadView: TankBattleGameView, bundle: this.bundle }];
        };
        this.loader.onLoadComplete = (err : Resource.LoaderError)=>{
            if ( err == Resource.LoaderError.LOADING){
                return;
            }
            completeCb();
        };
        this.loader.loadResources();
    }
    protected initData(): void {
        //游戏数据初始化
        this.data.clear();
    }
    protected pauseMessageQueue(): void {
        
    }
    protected resumeMessageQueue(): void {
        
    }

    onUnloadBundle(){
        App.dataCenter.destory(TankBattleGameData);
        super.onUnloadBundle();
    }
}
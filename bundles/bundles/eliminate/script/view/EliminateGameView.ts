import { _decorator,find ,Node, Label} from "cc";
import GameView from "db://quick/core/ui/GameView";
import { Macro } from "db://quick/defines/Macros";
import { EliminateData } from "../data/EliminateData";
import { EliminateEffect } from "../data/EliminateDefines";
import EliminateEffectsView from "./EliminateEffectsView";
import EliminateGridView from "./EliminateGridView";
import { DEBUG } from "cc/env";

//主游戏视图
const { ccclass, property } = _decorator;

@ccclass("EliminateGameView")
export default class EliminateGameView extends GameView {

    static getPrefabUrl() {
        return "prefabs/EliminateGameView";
    }

    private effectsView : EliminateEffectsView = null!;

    private onTest(){
        App.tips.show("Are You Kidding Me");
        // App.tips.show("Fuck You");
    }

    addEvents(): void {
        super.addEvents();
        if ( DEBUG ){
            this.onD("测试",()=>{
                Log.d(`收到测试事件`)
            })
        }
    }

    onLoad() {
        super.onLoad();

        this.onN(find("test",this.node)!,Node.EventType.TOUCH_END,this.onTest);
        this.onN(find("goBack", this.node)!,Node.EventType.TOUCH_END, this.onGoBack);

        //初始化游戏数据模型
        let data = App.dataCenter.get(EliminateData) as EliminateData;
        data.initGameModel();
        let gridView = find("GridView", this.node);
        if (gridView) {
            let view = gridView.addComponent(EliminateGridView);
            view.view = this;
            view.initWithCellModels(data.gameModel.getCells());
        }

        let effectsView = find("EffectsView",this.node);
        if( effectsView ){
            let view = effectsView.addComponent(EliminateEffectsView);
            view.view = this;
            this.effectsView = view;
        }

        let version = find("version",this.node)?.getComponent(Label);
        if ( version ){
            version.string = App.updateManager.getVersion(this.bundle);
        }
    }

    private onGoBack() {
        this.enterBundle(Macro.BUNDLE_HALL);
    }

    playClick() {
        Log.d(`playClick : audios/click.bubble`);
        this.audioHelper.playEffect("audios/click.bubble");
    }

    playSwap() {
        Log.d(`playSwap : audios/swap`);
        this.audioHelper.playEffect("audios/swap");
    }

    playEliminate(step: number) {
        if( step < 1 ){
            step = 1;
        }
        step = Math.min(8,step);
        Log.d(`playEliminate : audios/eliminate${step}`);
        this.audioHelper.playEffect(`audios/eliminate${step}`);
    }

    playContinuousMatch(step: number) {
        Log.d(`playContinuousMatch : step ${step}`);
        step = Math.min(step,11);
        if( step < 2 ){
            return;
        }
        let arr = [3,5,7,9,11];
        let index = Math.floor(step/2) -1;
        let url = `audios/contnuousMatch${arr[index]}`;
        Log.d(`playContinuousMatch : ${url}`);
        this.audioHelper.playEffect(url);
    }

    playEffect(effects: EliminateEffect[]){
        if( this.effectsView ){
            this.effectsView.playEffect(effects);
        }
    }

    onShow(): void {
        this.audioHelper.playMusic("audios/gamescenebgm");
        super.onShow();
    }
}

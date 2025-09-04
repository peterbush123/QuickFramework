import { find, ProgressBar, Slider, Toggle, _decorator , Node, Input, game } from "cc";
import { Config } from "../config/Config";
import UIView from "db://quick/core/ui/UIView";
import { inject } from "db://quick/defines/Decorators";
import { Macro } from "db://quick/defines/Macros";

const { ccclass } = _decorator;
@ccclass("SettingView")
export default class SettingView extends UIView {

    public static getPrefabUrl() {
        return "common/prefabs/SettingView";
    }

    private musicStatus: Toggle = null!;
    private effectStatus: Toggle = null!;
    private musicVolume: Slider = null!;
    private effectVolume: Slider = null!;
    @inject("content",Node)
    private content : Node = null!;
    onLoad() {
        super.onLoad();

        this.onN(find("close",this.content)!,Input.EventType.TOUCH_END, this.onClickClose);
        this.onN(find("background/quit",this.content)!,Input.EventType.TOUCH_END, this.onQuit);
        this.onN(find("background/restart",this.content)!,Input.EventType.TOUCH_END, this.onRestart);
        let music = find("background/musicVolume",this.content)!
        this.onN(music,"slide", this.onMusicVolumeChange);

        let effect = find("background/effectVolume",this.content)!;
        this.onN(effect,"slide", this.onEffectVolumeChange);
        this.musicVolume = music.getComponent(Slider) as Slider;
        this.effectVolume = effect.getComponent(Slider) as Slider;
        this.musicVolume.progress = App.gAudio.musicVolume;
        this.effectVolume.progress = App.gAudio.effectVolume;
        this.onMusicVolumeChange(this.musicVolume);
        this.onEffectVolumeChange(this.effectVolume);

        let musicStatusNode = find("background/musicStatus",this.content) as Node;
        this.musicStatus = musicStatusNode.getComponent(Toggle) as Toggle;
        let effectStatusNode = find("background/effectStatus",this.content) as Node;
        this.effectStatus = effectStatusNode.getComponent(Toggle) as Toggle;
        this.onN(musicStatusNode,"toggle",this.onMusicStatusChange);
        this.onN(effectStatusNode,"toggle",this.onEffectStatusChange);
        this.musicStatus.isChecked = App.gAudio.isMusicOn;
        this.effectStatus.isChecked = App.gAudio.isEffectOn;
        this.onMusicStatusChange(this.musicStatus, false);
        this.onEffectStatusChange(this.effectStatus, false);

        this.show(this.args);
    }

    protected get showAction(){
        return App.utils.showView(this.content);
    }

    protected get closeAction(){
        return App.utils.hideView(this.content);
    }

    private onClickClose() {
        this.close();
    }

    private onQuit() {
        this.close();
        App.alert.show({
            immediatelyCallback: true,
            text: App.getLanguage("quitGame"),
            confirmCb: (isOk) => {
                if (isOk) {
                    App.entryManager.enterBundle(Macro.BUNDLE_RESOURCES);
                }
            },
        });
    }

    private onRestart() {
        game.restart();
    }

    private onMusicVolumeChange(target: Slider) {
        // Log.d("onMusicVolumeChange",target.progress);
        App.gAudio.musicVolume = target.progress;
        (target.node.getComponent(ProgressBar) as ProgressBar).progress = target.progress;
    }

    private onEffectVolumeChange(target: Slider) {
        // Log.d("onEffectVolumeChange",target.progress);
        App.gAudio.effectVolume = target.progress;
        (target.node.getComponent(ProgressBar) as ProgressBar).progress = target.progress;
    }

    private onMusicStatusChange(target: Toggle, isPlay: boolean) {
        if( isPlay == undefined ) App.gAudio.playEffect(Config.audioPath.button);
        (target.node.getChildByName("off") as Node).active = !target.isChecked;
        App.gAudio.isMusicOn = target.isChecked;
    }

    private onEffectStatusChange(target: Toggle, isPlay: boolean) {
        if( isPlay == undefined ) App.gAudio.playEffect(Config.audioPath.button);
        (target.node.getChildByName("off") as Node).active = !target.isChecked;
        App.gAudio.isEffectOn = target.isChecked;
    }
}

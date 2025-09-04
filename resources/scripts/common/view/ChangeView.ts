import UIView from "db://quick/core/ui/UIView";
import { _decorator, Component, Node, ResolutionPolicy, view } from 'cc';
import { Macro } from "db://quick/defines/Macros";
const { ccclass, property } = _decorator;

@ccclass('ChangeView')
export default class ChangeView extends UIView {
    
    public static getPrefabUrl() {
        return "common/prefabs/ChangeView";
    }

    onShow(): void {
        if ( App.stageData.isLandscape ){
            const designResolutionSize = view.getDesignResolutionSize();
            // cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            view.setDesignResolutionSize(designResolutionSize.height,designResolutionSize.width,ResolutionPolicy.SHOW_ALL);
        }else{
            const designResolutionSize = view.getDesignResolutionSize();
            // cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            view.setDesignResolutionSize(designResolutionSize.width,designResolutionSize.height,ResolutionPolicy.SHOW_ALL);
        }
        super.onShow();
        App.entryManager.enterBundle(Macro.BUNDLE_RESOURCES,{
            changeOrientation:true
        });
    }
}



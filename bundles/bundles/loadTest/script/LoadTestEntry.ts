import { Font, ParticleAsset, Prefab, SpriteAtlas, SpriteFrame, sp } from "cc";
import { Resource } from "db://quick/core/asset/Resource";
import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import LoadTestView from "./view/LoadTestView";
import { Macro } from "db://quick/defines/Macros";

@registerEntry("LoadTestEntry","loadTest",LoadTestView)
class LoadTestEntry extends Entry {
    protected addNetHandler(): void {
    }
    protected removeNetHandler(): void {
    }
    protected loadResources(completeCb: () => void): void {
        this.loader.getLoadResources = ()=>{
            return [
                { dir: "texture", bundle: this.bundle, type: SpriteFrame },
                // { dir: "texture/sheep", bundle: this.bundle, type: SpriteFrame },
                // { dir: "texture", bundle: Macro.BUNDLE_HALL, type: SpriteFrame },
                // { preloadView: LoadTestView, bundle: this.bundle },
                // { url : "common/texture/setting_title", bundle : Macro.BUNDLE_RESOURCES,type : cc.SpriteFrame},
                // { dir : "common/images", bundle : Macro.BUNDLE_RESOURCES,type : SpriteAtlas},
                // { dir : "common/textures", bundle : Macro.BUNDLE_RESOURCES,type : SpriteFrame},
                // { dir : "font", bundle : this.bundle,type : Font},
                // { dir : "particle", bundle : this.bundle,type : ParticleAsset},
                // { dir : "spine", bundle : this.bundle,type : sp.SkeletonData},
                // { dir : "dragonBones", bundle : this.bundle,type : dragonBones.DragonBonesAsset},
                // { dir : "dragonBones", bundle : this.bundle,type : dragonBones.DragonBonesAtlasAsset},
                // { dir : "prefabs", bundle : this.bundle,type : Prefab},
            ];
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
    }
    protected pauseMessageQueue(): void {
    }
    protected resumeMessageQueue(): void {
    }
}
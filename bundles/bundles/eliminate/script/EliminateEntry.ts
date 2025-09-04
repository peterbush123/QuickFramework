import { Prefab } from "cc";
import { Resource } from "db://quick/core/asset/Resource";
import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import { EliminateData } from "./data/EliminateData";
import { CELL_PREFAB_URL, EFFECTS_CONFIG } from "./data/EliminateDefines";
import EliminateGameView from "./view/EliminateGameView";

@registerEntry("EliminateEntry",EliminateData.module,EliminateGameView)
class EliminateEntry extends Entry {
    protected addNetHandler(): void {
    }
    protected removeNetHandler(): void {
    }
    protected loadResources(completeCb: () => void): void {
        App.loading.show(App.getLanguage("loading_game_resources"));
        this.loader.getLoadResources = () => {
            let res: Resource.Data[] = [];
            for (let i = 0; i < CELL_PREFAB_URL.length; i++) {
                if (CELL_PREFAB_URL[i]) {
                    res.push({ url: CELL_PREFAB_URL[i] as string, type: Prefab, bundle: this.bundle })
                }
            }

            res.push({ url: EFFECTS_CONFIG.crush.url, type: Prefab, bundle: this.bundle });
            res.push({ url: EFFECTS_CONFIG.colBomb.url, type: Prefab, bundle: this.bundle });
            return res;
        };
        this.loader.onLoadComplete = (err)=>{
            if ( err = Resource.LoaderError.SUCCESS){
                App.loading.hide();
                completeCb();
            }
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
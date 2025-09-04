
import { director, math, Prefab } from "cc";
import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import { TaxiLanguage } from "./data/TaxiLanguage";
import { TaxiGameView } from "./view/TaxiGameView";
import { Resource } from "db://quick/core/asset/Resource";

@registerEntry("TaxiEntry","taxi",TaxiGameView)
class TaxiEntry extends Entry {
    protected language = new TaxiLanguage;
    protected addNetHandler(): void {

    }
    protected removeNetHandler(): void {

    }
    protected loadResources(completeCb: () => void): void {
        this.loader.getLoadResources = () => {
            let res: Resource.Data[] = [
                { preloadView: TaxiGameView, bundle: this.bundle , isCache : false },
                { url : "prefabs/map/ground" , bundle : this.bundle , type : Prefab},
            ];
            return res;
        };
        this.loader.onLoadComplete = (err) => {
            if (err = Resource.LoaderError.SUCCESS) {
                completeCb();
            }
        };
        this.loader.loadResources();
    }

    onEnter(userData?:any){
        super.onEnter(userData);
        (<any>director.getScene()!.globals.ambient.skyColor) = new math.Color(74,152,228,1)
    }
    protected initData(): void {

    }
    protected pauseMessageQueue(): void {

    }
    protected resumeMessageQueue(): void {

    }

    call(eventName: string, args: any[]) {

    }

    onUnloadBundle(){
        super.onUnloadBundle();
        (App.logicManager.get("taxi") as TaxiLogic)?.unloadResources();
        (<any>director.getScene()!.globals.ambient.skyColor) = new math.Color(0,0,0,1)
    }
}
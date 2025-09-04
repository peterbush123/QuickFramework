import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import { Resource } from "db://quick/core/asset/Resource";
import MultiLogicGameView from "./view/MultiLogicGameView";
import { MultiGameData } from "./data/MultiGameData";

//注册自己的bundle名及GameView的具体实现类型
@registerEntry("MultiLogicEntry",MultiGameData.module,MultiLogicGameView)
class MultiLogicEntry extends Entry {
    
    protected addNetHandler(): void {
        
    }
    protected removeNetHandler(): void {
        
    }
    protected loadResources(completeCb: () => void): void {
        //可显示自己的加载load界面
        App.loading.show(App.getLanguage("loading_game_resources"));
        this.loader.getLoadResources = () => {
            let res: Resource.Data[] = [];
            // 添加自己需要加载资源
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



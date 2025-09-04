import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import ChangeOrientationView from "./view/ChangeOrientationView";

//注册自己的bundle名及GameView的具体实现类型
@registerEntry("ChangeOrientationEntry","changeOrientation",ChangeOrientationView)
class ChangeOrientationEntry extends Entry {
    
    protected addNetHandler(): void {
        
    }
    protected removeNetHandler(): void {
        
    }
    protected loadResources(completeCb: () => void): void {
        completeCb();
    }
    protected initData(): void {
        
    }
    protected pauseMessageQueue(): void {
        
    }
    protected resumeMessageQueue(): void {
        
    }
}



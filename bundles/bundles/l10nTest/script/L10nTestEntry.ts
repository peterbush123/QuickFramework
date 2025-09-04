import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import L10nTestView from "./L10nTestView";

//注册自己的bundle名及GameView的具体实现类型
@registerEntry("L10nTestEntry","l10nTest",L10nTestView)
class L10nTestEntry extends Entry {
    
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



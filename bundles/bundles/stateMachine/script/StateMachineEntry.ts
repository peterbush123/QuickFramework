import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import StateMachineGameView from "./view/StateMachineGameView";

/**
 * @description slot 入口
 */
@registerEntry("StateMachineEntry","stateMachine",StateMachineGameView)
class StateMachineEntry extends Entry{
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
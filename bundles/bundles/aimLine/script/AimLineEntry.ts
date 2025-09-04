import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import AimLineView from "./view/AimLineView";

@registerEntry("AimLineEntry","aimLine",AimLineView)
class AimLineEntry extends Entry {
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
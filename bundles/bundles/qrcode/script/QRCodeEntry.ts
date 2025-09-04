import { Entry } from "db://quick/core/entry/Entry";
import { registerEntry } from "db://quick/defines/Decorators";
import QRCodeView from "./view/QRCodeView";

@registerEntry("QRCodeEntry","qrcode",QRCodeView)
export default class QRCodeEntry extends Entry {
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

import { _decorator,Node, find, Label } from "cc";
import GameView from "db://quick/core/ui/GameView";
import { inject } from "db://quick/defines/Decorators";
import { Macro } from "db://quick/defines/Macros";
import LoginLogic from "../logic/LoginLogic";

const {ccclass, property} = _decorator;

@ccclass("LoginView")
export default class LoginView extends GameView {

    static logicType = LoginLogic;
    static getPrefabUrl(){
        return `@LoginView`;
    }

    @inject({ type : LoginLogic , name : "logic"})
    private logic : LoginLogic = null!;

    @inject("login",Node)
    private login : Node = null!;
    @inject("version",Label)
    private version : Label = null!;
    @inject("md5",Label)
    private md5 : Label = null!;

    onLoad() {
        super.onLoad();
        this.version.string = `${App.updateManager.appVersion}(${App.updateManager.getVersion(this.bundle)})`;
        this.md5.string = `MD5:${App.updateManager.getMd5(this.bundle)}`;
        this.onN(this.login,Node.EventType.TOUCH_END,this.onLogin);
    }

    private onLogin(){
        this.logic.onLogin();
    }
}

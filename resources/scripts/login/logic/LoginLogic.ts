
import { Logic } from "db://quick/core/logic/Logic";
import { Macro } from "db://quick/defines/Macros";

export default class LoginLogic extends Logic {

    onLogin(){
        this.enterBundle(Macro.BUNDLE_HALL);
    }
}

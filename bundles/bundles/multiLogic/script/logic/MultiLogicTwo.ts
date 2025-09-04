import { Logic } from "db://quick/core/logic/Logic";
import { Macro } from "db://quick/defines/Macros";


export class MultiLogicTwo extends Logic {
    
    static module: string = "MultiLogicTwo";
    get logicName(){
        return "控制器2"
    }
}
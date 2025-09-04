import { Logic } from "db://quick/core/logic/Logic";
import { Macro } from "db://quick/defines/Macros";


export class MultiLogicThree extends Logic {
    
    static module: string = "MultiLogicThree";
    get logicName(){
        return "控制器3"
    }
}
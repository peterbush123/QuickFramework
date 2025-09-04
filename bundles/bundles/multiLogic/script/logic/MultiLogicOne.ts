import { Logic } from "db://quick/core/logic/Logic";
import { Macro } from "db://quick/defines/Macros";


export class MultiLogicOne extends Logic {
    
    static module: string = "MultiLogicOne";
    
    get logicName(){
        return "控制器1"
    }
}
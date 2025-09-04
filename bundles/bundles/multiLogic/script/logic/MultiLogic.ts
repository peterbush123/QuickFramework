import { Logic } from "db://quick/core/logic/Logic";
import { Macro } from "db://quick/defines/Macros";
import { MultiLogicOne } from "./MultiLogicOne";
import { MultiLogicTwo } from "./MultiLogicTwo";
import { MultiLogicThree } from "./MultiLogicThree";


export class MultiLogic extends Logic {
    
    onLoad(view: UIView): void {
        super.onLoad(view);
        App.logicManager.get(MultiLogicOne,true)
        App.logicManager.get(MultiLogicTwo,true)
        App.logicManager.get(MultiLogicThree,true)
    }

    onDestroy(...args: any[]): void {
        App.logicManager.destory(MultiLogicOne)
        App.logicManager.destory(MultiLogicTwo)
        App.logicManager.destory(MultiLogicThree)
        super.onDestroy(...args);
    }

    get logicName(){
        return "主控制器"
    }
}


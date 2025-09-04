import { SingletonT } from "../utils/SingletonT";
import { GameData } from "./GameData";
import { Node } from "cc";

export class DataCenter extends SingletonT<GameData> implements ISingleton {
    static module: string = "【数据中心】";
    module: string = null!;

    onDestroy(node:Node): void {
        this._datas.forEach(v=>{
            v.onDestroy(node);
        })
    }
}


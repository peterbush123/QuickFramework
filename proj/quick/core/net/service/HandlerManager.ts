import { SingletonT } from "../../../utils/SingletonT";
import { Node } from "cc";

export class HandlerManager extends SingletonT<Handler> implements ISingleton {
    static module: string = "【Handler管理器】";
    module: string = null!;

    onDestroy(node: Node): void {
        this.clear();
    }
}
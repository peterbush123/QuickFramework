import { Net } from "../Net";
import { Message } from "./Message";

/**
 * @description protobuf解析基类
 */
export abstract class IProtoMessage<T> extends Message {
    /**@description 发送或接收的消息流 */
    buffer: Uint8Array = null!;

    /**@description 直接把真正的Proto类型给赋值 */
    private type: any = null;

    /**@description 真空的Proto数据 */
    data: T = null!;

    constructor(protoType:any){
        super();
        this.type = protoType;
    }

    /**@description 打包数据 */
    encode(): boolean {
        this.buffer = this.type.encode(this.data).finish();
        if (this.buffer) {
            return true;
        }
        return false;
    }
    /**@description 解析数据 */
    decode(data: Uint8Array): boolean {
        if (data) {
            this.buffer = data;
            this.data = this.type.decode(this.buffer);
            return true;
        }
        return false;
    }
}

export class ProtoMessage<T> extends IProtoMessage<T>{
    cmd : number|string = 0;
}

export abstract class ProtoMessageHeartbeat extends Message{
    static type = Net.ServiceType.Proto;
}
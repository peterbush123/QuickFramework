import { ProtoMessage } from "db://quick/core/net/message/ProtoMessage";
import { MessageStruct } from "./CommonService";


/**@description 根据自己项目扩展 */
export class CmmProto<T> extends ProtoMessage<T> implements MessageStruct{
    cmd : string | number = "";
    mainCmd: number = 0;
    subCmd: number = 0;
}
import { Node, sys, TextAsset } from "cc";
import { DEBUG } from "cc/env";
import protobuf from "protobufjs";
import { ProtoMessage } from "../message/ProtoMessage";
import { Proto } from "../Net";

export class ProtoManager implements ISingleton {

    /**@description 记录已经加载过的目录，加载过的proto将不会重新加载 */
    private _loadDir: { [key: string]: boolean } = {};

    private _root: protobuf.Root = null!;
    constructor() {
        this._root = new protobuf.Root();
    }
    static module: string = "【Protobuf协议管理器】";
    module: string = null!;

    destory() {
        this.unload();
    }

    /**
     * @description 加载所有bundle.path下的所有proto描述文件
     * @param bundle 所在 bundle
     * @param path 相对 bundle 的 path proto资源文件目录,默认为bundle/proto目录
     * @returns 
     */
    load(bundle: string, path: string = "proto") {
        return new Promise<boolean>((resolove, reject) => {
            if (this._loadDir[`${bundle}/${path}`]) {
                if (DEBUG) {
                    Log.w(this.module, `${bundle}/${path}目录下所有proto文件已经存在，无需加载`);
                }
                resolove(true);
                return;
            }
            this._loadDir[`${bundle}/${path}`] = false;
            App.asset.loadDir(bundle, path, TextAsset, (finish, total, item) => { }, (cacheData) => {
                if (this._loadDir[`${bundle}/${path}`]) {
                    //如果已经加载过，则不进行加载
                    resolove(true);
                    return;
                }
                if (cacheData && cacheData.data && Array.isArray(cacheData.data)) {

                    //解析proto文件
                    for (let i = 0; i < cacheData.data.length; i++) {
                        let asset = cacheData.data[i] as TextAsset;
                        protobuf.parse(asset.text, this._root, { keepCase: true })
                    }

                    //释放proto资源文件
                    App.asset.releaseAsset(cacheData);
                    this._loadDir[`${bundle}/${path}`] = true;
                    resolove(true);
                } else {
                    resolove(false);
                }
            });
        });
    }

    /**@description 当进入登录界面，不需要网络配置时，卸载proto的类型，以防止后面有更新，原有的proto类型还保存在内存中 */
    unload() {
        this._loadDir = {};
        this._root = new protobuf.Root();
    }

    /**
     * @description 查找 proto类型
     * @param className 类型名
     */
    lookup(className: string): (protobuf.ReflectionObject | null) {
        if (this._root) {
            return this._root.lookup(className);
        }
        return null;
    }

    /**
     * @description 查找 proto类型
     * @param className 类型名
     */
    getType<T>(className: string): T {
        let type = this.lookup(className);
        return type as T;
    }

    getEnum<T>(className: string): T {
        let EnumType = this.lookup(className) as protobuf.Enum;
        let Values = ((EnumType.values) as any);
        return Values as T;
    }

    /**
     * @description 创建 proto消息
     * @param className 类型名
     */
    makeProtoMsg<T>(className: string): ProtoMessage<T> {
        let type = this.getType<T>(className);
        let proto = new ProtoMessage<T>(type);
        if (type instanceof protobuf.Type) {
            proto.data = type.create() as T;
        } else {
            if (DEBUG) {
                Log.e(this.module, `${className}不是一个protobuf类型`);
            }
        }
        return proto;
    }

    makeCustomProtoMsg<T, C extends ProtoMessage<T>>(customProtoType: { new(type: T): C }, className: string): C {
        let type = this.getType<T>(className);
        let proto = new customProtoType(type);
        if (type instanceof protobuf.Type) {
            proto.data = type.create() as T;
        } else {
            if (DEBUG) {
                Log.e(this.module, `${className}不是一个protobuf类型`);
            }
        }
        return proto;
    }

    public createProtoMsg(msgName: string, msgBody: any) {
        let rs = this._root.lookupType(msgName);
        let msg = rs.create(msgBody);
        return msg;
    }

    /**
     * 序列化消息
     * @param msgName 消息名称
     * @param msgBody 数据结构
     * @returns 序列化二进制数据
     */
    public SerializeMsg(msgName: string, msgBody: any) {
        let rs = this._root.lookupType(msgName);
        let msg = rs.create(msgBody);
        let buf = rs.encode(msg).finish();
        return buf;
    }

    /**
     * 反序列化消息
     * @param msgName 消息名称
     * @param msgBuf 序列化二进制数据
     * @returns 消息体
     */
    // public DeserializeMsg(msgName: string, msgBuf: Uint8Array) {
    //     let rs = this._root.lookupType(msgName);
    //     let msg = rs.decode(msgBuf);
    //     return msg;
    // }

    public DeserializeMsg<T>(msgName: string, msgBuf: Uint8Array): T {
        let rs = this._root.lookupType(msgName);
        let msg = rs.decode(msgBuf);
        return msg as T;
    }


    decode<ProtoType>(config: Proto.decodeConfig): ProtoType | null {
        let protoType = this.lookup(config.className) as protobuf.Type;
        if (protoType) {
            return protoType.decode(config.buffer) as any;
        }
        return null;
    }

    debug() {
        Log.d(`-------Proto文件加载信息,所有proto文件都加载在同一个root下,文件加载完成后，资源文件就会初释放-------`);
        if (sys.isNative) {
            Log.dump(this._loadDir);
        } else {
            Log.d(this._loadDir);
        }
    }

    onDestroy(node: Node | UIView): void {
        this.clear();
    }

    clear() {
        this.unload();
    }
}

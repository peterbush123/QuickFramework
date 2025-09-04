import { _decorator ,Node, find, instantiate, Vec3, randomRangeInt, UITransform} from "cc";
import { NodePool } from "db://quick/core/nodePool/NodePoolManager";
import GameView from "db://quick/core/ui/GameView";
import { inject } from "db://quick/defines/Decorators";
import { Macro } from "db://quick/defines/Macros";

const {ccclass, property} = _decorator;

@ccclass("NodePoolView")
export default class NodePoolView extends GameView {

    static getPrefabUrl(){
        return "prefabs/NodePoolView";
    }

    private pool : NodePool|null = null;
    @inject("star",Node)
    private star : Node = null!;

    @inject("content",Node)
    private content : Node = null!;
    onLoad() {
        super.onLoad();

        this.onN(find("goback", this.node)!,Node.EventType.TOUCH_END, () => {
            this.enterBundle(Macro.BUNDLE_HALL);
        });
        let op = find("op",this.node) as Node;

        let createNode = find("create",op);
        let deleteNode = find("delete",op);
        let getNode = find("get",op);
        let putNode = find("put",op);
        this.onN(createNode!,Node.EventType.TOUCH_END,this.onCreate);
        this.onN(deleteNode!,Node.EventType.TOUCH_END,this.onDelete);
        this.onN(getNode!,Node.EventType.TOUCH_END,this.onGet);
        this.onN(putNode!,Node.EventType.TOUCH_END,this.onPut);

    }

    private onCreate( ){
        this.pool = App.pool.createPool("Star");
        if ( this.pool) {
            this.pool.cloneNode = instantiate(this.star);
        }
    }

    private onDelete(){
        App.pool.deletePool(this.pool);
        this.pool = null;
    }

    private onGet(){
        if( this.pool == null ){
            Log.e("未创建对象池")
            return;
        }
        if( !this.content ) return;
        //从对象池中取出一个节点并添加到界面
        let node = this.pool.get();
        if( !node ) return;
        this.content.addChild(node);
        let transform = this.content.getComponent(UITransform) as UITransform;
        node.position = new Vec3(
            randomRangeInt(-transform.width/2,transform.width/2),
            randomRangeInt(-transform.height/2,transform.height/2)
        )
    }

    private onPut(){
        if( this.pool == null ){
            Log.e("未创建对象池")
            return;
        }
        if( !this.content ) return;
        //从界面上取出一个节点，添加到对象池中
        if( this.content.children.length > 0 ){
            this.pool.put(this.content.children[0]);
        }
    }

    onDestroy(){
        this.onDelete();
        super.onDestroy();
    }

}

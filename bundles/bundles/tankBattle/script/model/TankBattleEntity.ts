
import { _decorator, Component, Node, BoxCollider2D, Contact2DType, IPhysics2DContact } from 'cc';
import { TankBattleGameData } from '../data/TankBattleGameData';
const { ccclass, property } = _decorator;

@ccclass('TankBattleEntity')
export class TankBattleEntity extends Component {


    protected get data( ){
        return App.dataCenter.get(TankBattleGameData) as TankBattleGameData;
    }

    protected get logic():TankBattleLogic | null{
        return App.logicManager.get<TankBattleLogic>(this.data.module);
    }

    start(){
        let collider = this.getComponent(BoxCollider2D) as BoxCollider2D;
        collider.on(Contact2DType.BEGIN_CONTACT, this.onBeginContact, this);
        collider.on(Contact2DType.END_CONTACT, this.onEndContact, this);
    }
    protected onBeginContact (selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体开始接触时被调用一次
        // console.log('onBeginContact');
    }
    protected onEndContact (selfCollider: BoxCollider2D, otherCollider: BoxCollider2D, contact: IPhysics2DContact | null) {
        // 只在两个碰撞体结束接触时被调用一次
        // console.log('onEndContact');
    }
}

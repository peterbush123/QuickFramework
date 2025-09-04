import { find, _decorator, Node } from "cc";
import GameView from "db://quick/core/ui/GameView";
import StateMachineBoy from "./StateMachineBoy";

/**
 * @description StateMachineGameView
 */
const { ccclass, property } = _decorator;

@ccclass("StateMachineGameView")
export default class StateMachineGameView extends GameView {
    public static getPrefabUrl() {
        return "prefabs/StateMachineGameView";
    }

    private boy: StateMachineBoy = null!;

    onLoad(): void {
        super.onLoad();
        this.onN(find("goback", this.node)!, Node.EventType.TOUCH_END, this.backBundle);
        this.boy = find("Boy", this.node)?.addComponent(StateMachineBoy)!;
        // doStateMachine();
        let op = find("op", this.node)!;
        if (op) {
            const State = StateMachineBoy.State;
            let values = [State.Idle,State.Jump,State.Run,State.Walk];
            values.forEach(v => {
                this.onN(find(v, op)!, Node.EventType.TOUCH_END, () => {
                    this.boy.onChangeState(v);
                })
            })
            this.onN(find(this.boy.shoot, op)!, Node.EventType.TOUCH_END, () => {
                this.boy.onShoot();
            });
            this.onN(find("debugSlots", op)!, Node.EventType.TOUCH_END, () => {
                this.boy.onDebugSlots();
            });
            this.onN(find("debugBones", op)!, Node.EventType.TOUCH_END, () => {
                this.boy.onDebugBones();
            });
            this.onN(find("timeScale", op)!, Node.EventType.TOUCH_END, () => {
                this.boy.onTimeScale();
            });
            this.onN(find("step", op)!, Node.EventType.TOUCH_END, () => {
                this.boy.onStep();
            })
        }
    }
}
